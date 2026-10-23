package com.udea.labdrools.model;

/**
 * Respuesta del endpoint {@code /airline/api/evaluate-ai}.
 *
 * @param result        decisiones tomadas por las reglas de Drools
 * @param aiExplanation explicación en lenguaje natural generada por la IA, o el motivo por el que
 *                      no se pudo generar
 */
public record ExplainedResponse(AirlineResponse result, String aiExplanation) {
}
