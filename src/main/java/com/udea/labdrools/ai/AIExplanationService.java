package com.udea.labdrools.ai;

import com.udea.labdrools.model.AirlineRequest;
import com.udea.labdrools.model.AirlineResponse;
import com.udea.labdrools.model.Flight;
import com.udea.labdrools.model.Passenger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Genera, con un modelo de lenguaje, una explicación en español del resultado de las reglas.
 *
 * <p>Usa Spring AI con el cliente de OpenAI, apuntado por defecto a Groq, que ofrece una API
 * compatible y un plan gratuito. El proveedor, el modelo y la clave se configuran en
 * {@code application.yaml} mediante las variables de entorno {@code AI_BASE_URL},
 * {@code AI_MODEL} y {@code AI_API_KEY}.</p>
 *
 * <p>El servicio nunca lanza excepciones hacia el controlador. Si no hay API key o el proveedor
 * falla, devuelve un texto que explica el motivo y la evaluación de Drools se entrega igual.</p>
 */
@Service
public class AIExplanationService {

    private static final Logger log = LoggerFactory.getLogger(AIExplanationService.class);

    /** Valor por defecto de {@code AI_API_KEY} en {@code application.yaml}; indica que no hay clave. */
    private static final String NO_API_KEY = "sin-configurar";

    /**
     * Plantilla del prompt. Incluye el catálogo de las diez reglas para que el modelo explique con
     * las condiciones reales y no invente criterios. Los {@code %s}, {@code %d} y {@code %.1f} se
     * llenan en {@link #buildPrompt(AirlineRequest, AirlineResponse)}; {@code %%} es un {@code %}
     * literal.
     */
    private static final String PROMPT_TEMPLATE = """
            Eres un experto en reglas de negocio de aerolíneas.
            Explica, en español y de forma breve, el siguiente resultado generado por Drools.
            Usa únicamente las condiciones de las reglas listadas abajo; no inventes criterios.
            Responde en texto plano, sin Markdown, sin tablas y sin asteriscos.

            Catálogo de reglas (condición -> acción):
            1. UpgradeToBusinessClassForFrequentFlyersWithDelays: membresía Gold o Platinum y retraso > 60 min, si sigue elegible para ascensos -> clase ejecutiva.
            2. PriorityCheckInForSeniors: edad > 65 -> check-in prioritario.
            3. DiscountForLightLuggage: equipaje < 10 kg -> 10%% de descuento.
            4. DenyUpgradeForOverweightLuggage: equipaje > 23 kg -> no elegible para ascensos.
            5. AssignEmergencyExitSeatToYoungAdults: edad entre 18 y 40, preferencia de asiento Any, no viaja con niños y hay asiento de salida de emergencia disponible -> asigna ese asiento y lo marca como ocupado.
            6. CompensationForExtremeDelays: retraso > 180 min -> compensación de $200.
            7. ExtraLoyaltyPointsForLongFlights: membresía distinta de Basic y vuelo > 5 horas -> 500 puntos de lealtad.
            8. RestrictLuggageOnShortFlights: equipaje > 15 kg y vuelo < 2 horas -> equipaje no permitido.
            9. VipLoungeAccessForPlatinumMembers: membresía Platinum -> acceso al salón VIP.
            10. PreferentialSeatForFamilies: viaja con niños y preferencia de asiento Any -> asiento preferencial para familias.

            Pasajero: %s, %d años, membresía %s, preferencia de asiento %s, viaja con niños: %s, equipaje %.1f kg.
            Vuelo: %s, retraso %d minutos, duración %.1f horas, precio del tiquete $%.2f.

            Reglas activadas:
            %s

            Explica:
            - Qué reglas se activaron
            - Por qué se activaron
            - Qué significa para el pasajero
            """;

    private final ChatClient chatClient;
    private final boolean configured;

    /**
     * @param builder constructor de {@link ChatClient} que provee la autoconfiguración de Spring AI
     * @param apiKey  clave del proveedor; si no se definió {@code AI_API_KEY} llega {@value #NO_API_KEY}
     */
    public AIExplanationService(ChatClient.Builder builder,
                                @Value("${spring.ai.openai.api-key:}") String apiKey) {
        this.chatClient = builder.build();
        this.configured = apiKey != null && !apiKey.isBlank() && !apiKey.equals(NO_API_KEY);
    }

    /**
     * Pide al modelo una explicación del resultado.
     *
     * @param request  datos del pasajero y del vuelo que se evaluaron
     * @param response resultado de las reglas de Drools
     * @return la explicación generada, o un mensaje que indica por qué no está disponible
     */
    public String explain(AirlineRequest request, AirlineResponse response) {
        if (!configured) {
            return "Explicación de IA no disponible: configure la variable de entorno AI_API_KEY.";
        }
        try {
            String content = chatClient.prompt()
                    .user(buildPrompt(request, response))
                    .call()
                    .content();
            return plainText(content);
        } catch (Exception e) {
            // Un fallo del proveedor (cuota, red, modelo retirado) no debe tumbar la evaluación
            log.warn("No fue posible obtener la explicación de IA", e);
            return "No fue posible obtener la explicación de IA: " + e.getMessage();
        }
    }

    /**
     * Quita las negritas de Markdown ({@code **texto**}). El prompt pide texto plano, pero el
     * modelo a veces las usa igual y la vista web las mostraría como asteriscos literales.
     */
    private static String plainText(String content) {
        if (content == null || content.isBlank()) {
            return "La IA no devolvió ninguna explicación.";
        }
        return content.replace("**", "");
    }

    /**
     * Llena {@link #PROMPT_TEMPLATE} con los datos de la solicitud y los mensajes de las reglas
     * activadas.
     */
    private String buildPrompt(AirlineRequest request, AirlineResponse response) {
        Passenger p = request.getPassenger();
        Flight f = request.getFlight();
        String activatedRules = response.getMessages().isEmpty()
                ? "Ninguna"
                : "- " + String.join("\n- ", response.getMessages());
        return PROMPT_TEMPLATE.formatted(
                p.getName(), p.getAge(), p.getMembershipStatus(), p.getSeatPreference(),
                p.isTravelingWithChildren() ? "sí" : "no", p.getLuggageWeight(),
                f.getFlightNumber(), f.getDelayMinutes(), f.getDurationHours(), f.getTicketPrice(),
                activatedRules);
    }
}
