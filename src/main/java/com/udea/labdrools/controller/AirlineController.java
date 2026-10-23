package com.udea.labdrools.controller;

import com.udea.labdrools.ai.AIExplanationService;
import com.udea.labdrools.model.AirlineRequest;
import com.udea.labdrools.model.AirlineResponse;
import com.udea.labdrools.model.ExplainedResponse;
import com.udea.labdrools.model.Flight;
import com.udea.labdrools.model.Passenger;
import com.udea.labdrools.service.AirlineEvaluationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Expone la evaluación de pasajeros por dos vías, bajo el prefijo {@code /airline}.
 *
 * <ul>
 *   <li><b>API REST</b> ({@code /airline/api/**}): recibe y devuelve JSON. Está pensada para
 *       Postman u otros clientes.</li>
 *   <li><b>Web</b> ({@code /airline/form} y {@code /airline/evaluate}): formulario y página de
 *       resultados con Thymeleaf.</li>
 * </ul>
 *
 * <p>En ambos casos los datos se validan con Jakarta Bean Validation antes de llegar a Drools.</p>
 */
@Controller
@RequestMapping("/airline")
public class AirlineController {

    private final AirlineEvaluationService evaluationService;
    private final AIExplanationService aiService;

    /**
     * @param evaluationService servicio que ejecuta las reglas de Drools
     * @param aiService         servicio que genera la explicación en lenguaje natural
     */
    public AirlineController(AirlineEvaluationService evaluationService, AIExplanationService aiService) {
        this.evaluationService = evaluationService;
        this.aiService = aiService;
    }

    /**
     * Evalúa la solicitud solo con las reglas de Drools.
     *
     * @param request pasajero y vuelo en formato JSON
     * @param result  resultado de la validación de {@code request}
     * @return 200 con el {@link AirlineResponse}, o 400 con {@code {"errors": [...]}} si la
     *         validación falla
     */
    @PostMapping("/api/evaluate")
    @ResponseBody
    public ResponseEntity<?> evaluateApi(@Valid @RequestBody AirlineRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return validationErrors(result);
        }
        return ResponseEntity.ok(evaluationService.evaluate(request));
    }

    /**
     * Evalúa la solicitud con Drools y añade la explicación generada por la IA.
     *
     * <p>Si la IA no está configurada o falla, la respuesta sigue siendo 200 y el campo
     * {@code aiExplanation} indica el motivo. La decisión de las reglas nunca depende de la IA.</p>
     *
     * @param request pasajero y vuelo en formato JSON
     * @param result  resultado de la validación de {@code request}
     * @return 200 con un {@link ExplainedResponse}, o 400 con la lista de errores de validación
     */
    @PostMapping("/api/evaluate-ai")
    @ResponseBody
    public ResponseEntity<?> evaluateWithAi(@Valid @RequestBody AirlineRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return validationErrors(result);
        }
        AirlineResponse decision = evaluationService.evaluate(request);
        return ResponseEntity.ok(new ExplainedResponse(decision, aiService.explain(request, decision)));
    }

    /**
     * Muestra el formulario web vacío.
     *
     * @param model modelo de la vista; recibe un {@link AirlineRequest} vacío al que se enlazan los campos
     * @return nombre de la plantilla {@code airline_form}
     */
    @GetMapping("/form")
    public String showForm(Model model) {
        AirlineRequest airlineRequest = new AirlineRequest();
        airlineRequest.setPassenger(new Passenger());
        airlineRequest.setFlight(new Flight());
        model.addAttribute("airlineRequest", airlineRequest);
        return "airline_form";
    }

    /**
     * Procesa el formulario web.
     *
     * @param airlineRequest datos enviados desde el formulario
     * @param result         resultado de la validación. Si tiene errores, se vuelve a mostrar el
     *                       formulario con los mensajes junto a cada campo
     * @param explain        {@code true} si el usuario marcó "Explicar el resultado con IA"
     * @param model          modelo de la vista de resultados
     * @return {@code airline_result} si los datos son válidos, o {@code airline_form} si no lo son
     */
    @PostMapping("/evaluate")
    public String evaluateWeb(@Valid AirlineRequest airlineRequest, BindingResult result,
                              @RequestParam(defaultValue = "false") boolean explain, Model model) {
        if (result.hasErrors()) {
            return "airline_form";
        }
        AirlineResponse airlineResponse = evaluationService.evaluate(airlineRequest);
        model.addAttribute("airlineResponse", airlineResponse);
        if (explain) {
            model.addAttribute("aiExplanation", aiService.explain(airlineRequest, airlineResponse));
        }
        return "airline_result";
    }

    /**
     * Convierte los errores de validación en una respuesta 400 con un JSON simple.
     *
     * @param result errores detectados por Bean Validation
     * @return cuerpo {@code {"errors": ["mensaje 1", "mensaje 2", ...]}}
     */
    private ResponseEntity<Map<String, List<String>>> validationErrors(BindingResult result) {
        List<String> errors = result.getAllErrors().stream()
                .map(error -> error.getDefaultMessage())
                .toList();
        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }
}
