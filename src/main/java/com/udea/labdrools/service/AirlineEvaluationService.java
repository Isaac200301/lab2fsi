package com.udea.labdrools.service;

import com.udea.labdrools.model.AirlineRequest;
import com.udea.labdrools.model.AirlineResponse;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.stereotype.Service;

/**
 * Evalúa a un pasajero y su vuelo con las reglas de negocio de la aerolínea.
 *
 * <p>Cada evaluación abre una {@link KieSession} nueva y la cierra al terminar. Así los hechos
 * de una solicitud nunca se mezclan con los de otra, y el servicio es seguro ante peticiones
 * concurrentes.</p>
 */
@Service
public class AirlineEvaluationService {

    private final KieContainer kieContainer;

    /**
     * @param kieContainer contenedor con las reglas compiladas, creado en
     *                     {@link com.udea.labdrools.config.DroolsConfig}
     */
    public AirlineEvaluationService(KieContainer kieContainer) {
        this.kieContainer = kieContainer;
    }

    /**
     * Ejecuta las diez reglas sobre los datos de la solicitud.
     *
     * <p>Se insertan tres hechos: el {@code Passenger}, el {@code Flight} y un
     * {@link AirlineResponse} inicial cuyo precio final es el precio del tiquete. Cada regla que
     * se cumple modifica esa respuesta y registra su nombre y un mensaje.</p>
     *
     * <p>La Regla 5 modifica el hecho {@code Flight}, porque marca el asiento de salida de
     * emergencia como ocupado. Por eso el vuelo de la solicitud puede cambiar tras la evaluación.</p>
     *
     * @param request pasajero y vuelo ya validados
     * @return decisiones tomadas por las reglas, con la lista de reglas activadas
     */
    public AirlineResponse evaluate(AirlineRequest request) {
        // Crear una respuesta inicial con el precio sin descuento
        AirlineResponse response = new AirlineResponse();
        response.setFinalPrice(request.getFlight().getTicketPrice());

        // Crear una sesión de Drools
        KieSession kieSession = kieContainer.newKieSession();
        try {
            // Insertar los hechos (pasajero, vuelo y respuesta) en la sesión
            kieSession.insert(request.getPassenger());
            kieSession.insert(request.getFlight());
            kieSession.insert(response);
            // Ejecutar todas las reglas
            kieSession.fireAllRules();
        } finally {
            // Liberar la sesión aunque una regla falle
            kieSession.dispose();
        }
        return response;
    }
}
