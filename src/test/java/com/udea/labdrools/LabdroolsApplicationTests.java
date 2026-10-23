package com.udea.labdrools;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Verifica que el contexto de Spring arranca. Esto incluye compilar el archivo .drl, así que la
 * prueba falla si alguna regla tiene errores de sintaxis.
 */
@SpringBootTest
class LabdroolsApplicationTests {

	@Test
	void contextLoads() {
	}

}
