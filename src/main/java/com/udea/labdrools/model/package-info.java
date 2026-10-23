/**
 * Modelo de hechos del motor de reglas y objetos de entrada y salida de la API.
 *
 * <ul>
 *   <li>{@link com.udea.labdrools.model.Passenger} y {@link com.udea.labdrools.model.Flight}:
 *       hechos de entrada que las reglas consultan.</li>
 *   <li>{@link com.udea.labdrools.model.AirlineResponse}: hecho de salida que las reglas modifican.</li>
 *   <li>{@link com.udea.labdrools.model.AirlineRequest}: cuerpo de la petición.</li>
 *   <li>{@link com.udea.labdrools.model.ExplainedResponse}: resultado junto con la explicación de la IA.</li>
 * </ul>
 *
 * <p>Los hechos son JavaBeans (constructor vacío, getters y setters) porque Drools accede a sus
 * atributos por medio de los getters, por ejemplo {@code Passenger(age > 65)} llama a
 * {@code getAge()}.</p>
 */
package com.udea.labdrools.model;
