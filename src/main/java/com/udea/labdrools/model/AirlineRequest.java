package com.udea.labdrools.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

/**
 * Cuerpo de una solicitud de evaluación: un pasajero y el vuelo en el que viaja.
 *
 * <p>{@link Valid} propaga la validación a los objetos anidados, de modo que las restricciones
 * de {@link Passenger} y {@link Flight} también se verifican.</p>
 */
public class AirlineRequest {

    @NotNull(message = "El pasajero es obligatorio")
    @Valid
    private Passenger passenger;

    @NotNull(message = "El vuelo es obligatorio")
    @Valid
    private Flight flight;

    /** Constructor vacío requerido por Jackson y por el enlace de datos del formulario. */
    public AirlineRequest() {
    }

    /**
     * @param passenger datos del pasajero
     * @param flight    datos del vuelo
     */
    public AirlineRequest(Passenger passenger, Flight flight) {
        this.passenger = passenger;
        this.flight = flight;
    }

    public Passenger getPassenger() {
        return passenger;
    }

    public void setPassenger(Passenger passenger) {
        this.passenger = passenger;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }
}
