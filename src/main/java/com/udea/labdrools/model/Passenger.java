package com.udea.labdrools.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class Passenger {
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String name;

    @Min(value = 0, message = "La edad no puede ser negativa")
    @Max(value = 120, message = "La edad no puede ser mayor a 120 años")
    private int age;

    @NotBlank(message = "La membresía es obligatoria")
    @Pattern(regexp = "Basic|Silver|Gold|Platinum", message = "La membresía debe ser Basic, Silver, Gold o Platinum")
    private String membershipStatus;

    @NotBlank(message = "La preferencia de asiento es obligatoria")
    @Pattern(regexp = "Any|Window|Aisle", message = "La preferencia de asiento debe ser Any, Window o Aisle")
    private String seatPreference; // Any = sin preferencia específica

    private boolean travelingWithChildren;

    @Min(value = 0, message = "El peso del equipaje no puede ser negativo")
    private double luggageWeight; // kg

    public Passenger() {
    }

    public Passenger(String name, int age, String membershipStatus, String seatPreference,
                     boolean travelingWithChildren, double luggageWeight) {
        this.name = name;
        this.age = age;
        this.membershipStatus = membershipStatus;
        this.seatPreference = seatPreference;
        this.travelingWithChildren = travelingWithChildren;
        this.luggageWeight = luggageWeight;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getMembershipStatus() {
        return membershipStatus;
    }

    public void setMembershipStatus(String membershipStatus) {
        this.membershipStatus = membershipStatus;
    }

    public String getSeatPreference() {
        return seatPreference;
    }

    public void setSeatPreference(String seatPreference) {
        this.seatPreference = seatPreference;
    }

    public boolean isTravelingWithChildren() {
        return travelingWithChildren;
    }

    public void setTravelingWithChildren(boolean travelingWithChildren) {
        this.travelingWithChildren = travelingWithChildren;
    }

    public double getLuggageWeight() {
        return luggageWeight;
    }

    public void setLuggageWeight(double luggageWeight) {
        this.luggageWeight = luggageWeight;
    }
}
