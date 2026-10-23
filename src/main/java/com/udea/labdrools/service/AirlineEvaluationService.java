package com.udea.labdrools.service;

import com.udea.labdrools.model.AirlineRequest;
import com.udea.labdrools.model.AirlineResponse;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirlineEvaluationService {
    @Autowired
    private KieContainer kieContainer;

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
            // Liberar la sesión
            kieSession.dispose();
        }
        return response;
    }
}
