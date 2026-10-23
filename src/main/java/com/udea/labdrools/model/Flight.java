package com.udea.labdrools.model;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

/**
 * Hecho de entrada con los datos del vuelo.
 *
 * <p>Es el único hecho de entrada que una regla modifica: la Regla 5 cambia
 * {@link #emergencyExitSeatAvailable} a {@code false} cuando asigna el asiento de salida de
 * emergencia, para que no se asigne dos veces.</p>
 */
public class Flight {

    @NotBlank(message = "El número de vuelo es obligatorio")
    private String flightNumber;

    /** Retraso en minutos. Lo usan la Regla 1 (más de 60) y la Regla 6 (más de 180). */
    @Min(value = 0, message = "El retraso no puede ser negativo")
    private int delayMinutes;

    /** Duración en horas. La usan la Regla 7 (más de 5) y la Regla 8 (menos de 2). */
    @DecimalMin(value = "0.1", message = "La duración del vuelo debe ser mayor a 0 horas")
    private double durationHours;

    /** Indica si queda un asiento de salida de emergencia libre. Lo usa la Regla 5. */
    private boolean emergencyExitSeatAvailable;

    /** Precio del tiquete. Es la base del descuento de la Regla 3. */
    @Min(value = 0, message = "El precio del tiquete no puede ser negativo")
    private double ticketPrice;

    /** Constructor vacío requerido por Jackson y por el enlace de datos del formulario. */
    public Flight() {
    }

    /**
     * @param flightNumber               código del vuelo, por ejemplo {@code AV123}
     * @param delayMinutes               retraso en minutos
     * @param durationHours              duración en horas
     * @param emergencyExitSeatAvailable {@code true} si hay un asiento de salida de emergencia libre
     * @param ticketPrice                precio del tiquete
     */
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
