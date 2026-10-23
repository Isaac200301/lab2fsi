package com.udea.labdrools.controller;

import com.udea.labdrools.ai.AIExplanationService;
import com.udea.labdrools.model.AirlineRequest;
import com.udea.labdrools.model.AirlineResponse;
import com.udea.labdrools.model.ExplainedResponse;
import com.udea.labdrools.model.Flight;
import com.udea.labdrools.model.Passenger;
import com.udea.labdrools.service.AirlineEvaluationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/airline")
public class AirlineController {

    @Autowired
    private AirlineEvaluationService evaluationService;

    @Autowired
    private AIExplanationService aiService;

    // Endpoint REST: solo reglas de Drools
    @PostMapping("/api/evaluate")
    @ResponseBody
    public ResponseEntity<?> evaluateApi(@Valid @RequestBody AirlineRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return validationErrors(result);
        }
        return ResponseEntity.ok(evaluationService.evaluate(request));
    }

    // Endpoint REST: reglas de Drools + explicación de la IA
    @PostMapping("/api/evaluate-ai")
    @ResponseBody
    public ResponseEntity<?> evaluateWithAi(@Valid @RequestBody AirlineRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return validationErrors(result);
        }
        AirlineResponse decision = evaluationService.evaluate(request);
        return ResponseEntity.ok(new ExplainedResponse(decision, aiService.explain(request, decision)));
    }

    // Mostrar el formulario web
    @GetMapping("/form")
    public String showForm(Model model) {
        AirlineRequest airlineRequest = new AirlineRequest();
        airlineRequest.setPassenger(new Passenger());
        airlineRequest.setFlight(new Flight());
        model.addAttribute("airlineRequest", airlineRequest);
        return "airline_form";
    }

    // Procesar la solicitud desde el formulario web
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

    private ResponseEntity<Map<String, List<String>>> validationErrors(BindingResult result) {
        List<String> errors = result.getAllErrors().stream()
                .map(error -> error.getDefaultMessage())
                .toList();
        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }
}
