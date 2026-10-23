package com.udea.labdrools;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Punto de entrada de la aplicación del Laboratorio 2.
 *
 * <p>Al arrancar, Spring Boot compila las reglas de Drools
 * ({@link com.udea.labdrools.config.DroolsConfig}), publica los endpoints REST y las vistas web
 * ({@link com.udea.labdrools.controller.AirlineController}) y configura el cliente de IA
 * ({@link com.udea.labdrools.ai.AIExplanationService}).</p>
 *
 * @author Isaac Cano Orozco
 */
@SpringBootApplication
public class LabdroolsApplication {

	/**
	 * Inicia la aplicación en el puerto 8080 (valor por defecto de Spring Boot).
	 *
	 * @param args argumentos de línea de comandos que se pasan a Spring Boot
	 */
	public static void main(String[] args) {
		SpringApplication.run(LabdroolsApplication.class, args);
	}

}
