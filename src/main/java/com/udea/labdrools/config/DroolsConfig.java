package com.udea.labdrools.config;

import org.kie.api.KieServices;
import org.kie.api.builder.KieBuilder;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.builder.KieModule;
import org.kie.api.builder.Message;
import org.kie.api.runtime.KieContainer;
import org.kie.internal.io.ResourceFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Compila las reglas de negocio y publica el {@link KieContainer} como bean de Spring.
 *
 * <p>El contenedor se construye una sola vez, al arrancar la aplicación. Cada evaluación abre
 * después su propia {@code KieSession} a partir de él
 * (ver {@link com.udea.labdrools.service.AirlineEvaluationService}).</p>
 */
@Configuration
public class DroolsConfig {

    private static final KieServices KIE_SERVICES = KieServices.Factory.get();

    /** Ruta, dentro del classpath, del archivo con las diez reglas de la aerolínea. */
    private static final String RULES_AIRLINE_RULES_DRL = "rules/airline_rules.drl";

    /**
     * Compila {@value #RULES_AIRLINE_RULES_DRL} y crea el contenedor de reglas.
     *
     * <p>{@link KieBuilder#buildAll()} no lanza una excepción cuando el .drl tiene errores: solo
     * los deja en sus resultados. Por eso se revisan explícitamente. Así una regla mal escrita
     * impide el arranque, en lugar de producir una aplicación que corre sin reglas.</p>
     *
     * @return contenedor con la base de conocimiento compilada
     * @throws IllegalStateException si el archivo de reglas tiene errores de compilación
     */
    @Bean
    public KieContainer kieContainer() {
        KieFileSystem kieFileSystem = KIE_SERVICES.newKieFileSystem();
        kieFileSystem.write(ResourceFactory.newClassPathResource(RULES_AIRLINE_RULES_DRL));
        KieBuilder kb = KIE_SERVICES.newKieBuilder(kieFileSystem);
        kb.buildAll();
        // Detener el arranque si el archivo .drl tiene errores de compilación
        if (kb.getResults().hasMessages(Message.Level.ERROR)) {
            throw new IllegalStateException("Errores en las reglas Drools: " + kb.getResults().getMessages());
        }
        KieModule kieModule = kb.getKieModule();
        return KIE_SERVICES.newKieContainer(kieModule.getReleaseId());
    }
}
