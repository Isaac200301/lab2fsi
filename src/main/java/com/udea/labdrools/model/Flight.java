package com.udea.labdrools.model;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class Flight {
    @NotBlank(message = "El número de vuelo es obligatorio")
    private String flightNumber;

    @Min(value = 0, message = "El retraso no puede ser negativo")
    private int delayMinutes;

    @DecimalMin(value = "0.1", message = "La duración del vuelo debe ser mayor a 0 horas")
    private double durationHours;

    private boolean emergencyExitSeatAvailable;

    @Min(value = 0, message = "El precio del tiquete no puede ser negativo")
    private double ticketPrice;

    public Flight() {
    }

    public Flight(String flightNumber, int delayMinutes, double durationHours,
                  boolean emergencyExitSeatAvailable, double ticketPrice) {
        this.flightNumber = flightNumber;
        this.delayMinutes = delayMinutes;
        this.durationHours = durationHours;
        this.emergencyExitSeatAvailable = emergencyExitSeatAvailable;
        this.ticketPrice = ticketPrice;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public int getDelayMinutes() {
        return delayMinutes;
    }

    public void setDelayMinutes(int delayMinutes) {
        this.delayMinutes = delayMinutes;
    }

    public double getDurationHours() {
        return durationHours;
    }

    public void setDurationHours(double durationHours) {
        this.durationHours = durationHours;
    }

    public boolean isEmergencyExitSeatAvailable() {
        return emergencyExitSeatAvailable;
    }

    public void setEmergencyExitSeatAvailable(boolean emergencyExitSeatAvailable) {
        this.emergencyExitSeatAvailable = emergencyExitSeatAvailable;
    }

    public double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
}
