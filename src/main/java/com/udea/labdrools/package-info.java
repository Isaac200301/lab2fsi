/**
 * Aplicación Spring Boot que evalúa pasajeros y vuelos de una aerolínea con reglas de negocio
 * escritas en Drools y explica el resultado con un modelo de lenguaje.
 *
 * <p>Organización por capas:</p>
 * <ul>
 *   <li>{@code config}: construcción del {@code KieContainer} a partir del archivo .drl.</li>
 *   <li>{@code model}: hechos que se insertan en el motor de reglas y objetos de petición y respuesta.</li>
 *   <li>{@code service}: ejecución de las reglas sobre una sesión de Drools.</li>
 *   <li>{@code ai}: explicación en lenguaje natural del resultado mediante Spring AI.</li>
 *   <li>{@code controller}: endpoints REST y vistas Thymeleaf.</li>
 * </ul>
 */
package com.udea.labdrools;
