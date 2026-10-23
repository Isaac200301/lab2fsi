package com.udea.labdrools.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Hecho de salida: reúne las decisiones que toman las reglas sobre un pasajero.
 *
 * <p>Se inserta en la sesión con los valores por defecto de un pasajero sin beneficios, y cada
 * regla que se activa cambia solo los atributos que le corresponden. Además, cada regla llama a
 * {@link #addRule(String, String)} para dejar constancia de su activación.</p>
 */
public class AirlineResponse {

    /** Clase del asiento. La Regla 1 la cambia a {@code Ejecutiva}. */
    private String seatClass = "Económica";

    /** Check-in prioritario (Regla 2). */
    private boolean priorityCheckIn;

    /** Porcentaje de descuento aplicado al tiquete (Regla 3). */
    private double discountPercentage;

    /** Precio a pagar. Empieza igual al precio del tiquete y la Regla 3 lo reduce. */
    private double finalPrice;

    /**
     * Elegibilidad para ascensos. La Regla 4 la cambia a {@code false}, y la Regla 1 la exige en
     * su condición.
     */
    private boolean upgradeEligible = true;

    /** Asiento asignado. Lo cambian la Regla 5 (salida de emergencia) y la Regla 10 (familias). */
    private String assignedSeat = "Asignación estándar";

    /** Compensación económica por retraso (Regla 6). */
    private double compensation;

    /** Puntos de lealtad adicionales (Regla 7). */
    private int extraLoyaltyPoints;

    /** Indica si el equipaje está permitido. La Regla 8 lo cambia a {@code false}. */
    private boolean luggageAllowed = true;

    /** Acceso al salón VIP (Regla 9). */
    private boolean vipLoungeAccess;

    /** Nombres de las reglas activadas, en orden de ejecución. */
    private final List<String> appliedRules = new ArrayList<>();

    /** Mensaje para el pasajero de cada regla activada, en el mismo orden que {@link #appliedRules}. */
    private final List<String> messages = new ArrayList<>();

    public AirlineResponse() {
    }

    /**
     * Registra la activación de una regla. Se llama desde la sección {@code then} del .drl.
     *
     * @param ruleName nombre de la regla, obtenido con {@code drools.getRule().getName()}
     * @param message  explicación breve que se muestra al pasajero
     */
    public void addRule(String ruleName, String message) {
        appliedRules.add(ruleName);
        messages.add(message);
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(String seatClass) {
        this.seatClass = seatClass;
    }

    public boolean isPriorityCheckIn() {
        return priorityCheckIn;
    }

    public void setPriorityCheckIn(boolean priorityCheckIn) {
        this.priorityCheckIn = priorityCheckIn;
    }

    public double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public double getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(double finalPrice) {
        this.finalPrice = finalPrice;
    }

    public boolean isUpgradeEligible() {
        return upgradeEligible;
    }

    public void setUpgradeEligible(boolean upgradeEligible) {
        this.upgradeEligible = upgradeEligible;
    }

    public String getAssignedSeat() {
        return assignedSeat;
    }

    public void setAssignedSeat(String assignedSeat) {
        this.assignedSeat = assignedSeat;
    }

    public double getCompensation() {
        return compensation;
    }

    public void setCompensation(double compensation) {
        this.compensation = compensation;
    }

    public int getExtraLoyaltyPoints() {
        return extraLoyaltyPoints;
    }

    public void setExtraLoyaltyPoints(int extraLoyaltyPoints) {
        this.extraLoyaltyPoints = extraLoyaltyPoints;
    }

    public boolean isLuggageAllowed() {
        return luggageAllowed;
    }

    public void setLuggageAllowed(boolean luggageAllowed) {
        this.luggageAllowed = luggageAllowed;
    }

    public boolean isVipLoungeAccess() {
        return vipLoungeAccess;
    }

    public void setVipLoungeAccess(boolean vipLoungeAccess) {
        this.vipLoungeAccess = vipLoungeAccess;
    }

    public List<String> getAppliedRules() {
        return appliedRules;
    }

    public List<String> getMessages() {
        return messages;
    }
}
