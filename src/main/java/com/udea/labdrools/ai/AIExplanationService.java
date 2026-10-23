package com.udea.labdrools.ai;

import com.udea.labdrools.model.AirlineRequest;
import com.udea.labdrools.model.AirlineResponse;
import com.udea.labdrools.model.Flight;
import com.udea.labdrools.model.Passenger;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AIExplanationService {

    private final ChatClient chatClient;
    private final boolean configured;

    public AIExplanationService(ChatClient.Builder builder,
                                @Value("${spring.ai.openai.api-key:}") String apiKey) {
        this.chatClient = builder.build();
        this.configured = apiKey != null && !apiKey.isBlank() && !apiKey.equals("sin-configurar");
    }

    public String explain(AirlineRequest request, AirlineResponse response) {
        if (!configured) {
            return "Explicación de IA no disponible: configure la variable de entorno AI_API_KEY.";
        }
        Passenger p = request.getPassenger();
        Flight f = request.getFlight();
        String prompt = """
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
                """.formatted(p.getName(), p.getAge(), p.getMembershipStatus(), p.getSeatPreference(),
                p.isTravelingWithChildren() ? "sí" : "no", p.getLuggageWeight(),
                f.getFlightNumber(), f.getDelayMinutes(), f.getDurationHours(), f.getTicketPrice(),
                response.getMessages().isEmpty() ? "Ninguna" : "- " + String.join("\n- ", response.getMessages()));
        try {
            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
        } catch (Exception e) {
            return "No fue posible obtener la explicación de IA: " + e.getMessage();
        }
    }
}
