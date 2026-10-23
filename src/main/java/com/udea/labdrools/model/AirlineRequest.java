package com.udea.labdrools.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class AirlineRequest {
    @NotNull(message = "El pasajero es obligatorio")
    @Valid
    private Passenger passenger;

    @NotNull(message = "El vuelo es obligatorio")
    @Valid
    private Flight flight;

    public AirlineRequest() {
    }

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
