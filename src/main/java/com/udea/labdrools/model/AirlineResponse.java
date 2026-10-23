package com.udea.labdrools.model;

import java.util.ArrayList;
import java.util.List;

public class AirlineResponse {
    private String seatClass = "Económica";
    private boolean priorityCheckIn;
    private double discountPercentage;
    private double finalPrice;
    private boolean upgradeEligible = true;
    private String assignedSeat = "Asignación estándar";
    private double compensation;
    private int extraLoyaltyPoints;
    private boolean luggageAllowed = true;
    private boolean vipLoungeAccess;
    private final List<String> appliedRules = new ArrayList<>();
    private final List<String> messages = new ArrayList<>();

    public AirlineResponse() {
    }

    // Registra la regla activada y el mensaje que se le muestra al pasajero
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
