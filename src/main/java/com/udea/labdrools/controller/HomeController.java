package com.udea.labdrools.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controlador de la raíz del sitio.
 */
@Controller
public class HomeController {

    /**
     * Redirige la raíz ({@code /}) al formulario de evaluación.
     *
     * @return redirección a {@code /airline/form}
     */
    @GetMapping("/")
    public String home() {
        return "redirect:/airline/form";
    }
}
