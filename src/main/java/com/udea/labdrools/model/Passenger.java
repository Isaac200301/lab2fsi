package com.udea.labdrools.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Hecho de entrada con los datos del pasajero.
 *
 * <p>Las reglas lo consultan pero no lo modifican. Las restricciones de validación garantizan
 * que al motor solo lleguen valores que las reglas saben interpretar; por ejemplo, la membresía
 * solo puede ser uno de los cuatro niveles que usan las reglas 1, 7 y 9.</p>
 */
public class Passenger {

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String name;

    /** Edad en años. La usan la Regla 2 (mayor de 65) y la Regla 5 (entre 18 y 40). */
    @Min(value = 0, message = "La edad no puede ser negativa")
    @Max(value = 120, message = "La edad no puede ser mayor a 120 años")
    private int age;

    /** Nivel de membresía: {@code Basic}, {@code Silver}, {@code Gold} o {@code Platinum}. */
    @NotBlank(message = "La membresía es obligatoria")
    @Pattern(regexp = "Basic|Silver|Gold|Platinum", message = "La membresía debe ser Basic, Silver, Gold o Platinum")
    private String membershipStatus;

    /** Preferencia de asiento: {@code Any} (sin preferencia específica), {@code Window} o {@code Aisle}. */
    @NotBlank(message = "La preferencia de asiento es obligatoria")
    @Pattern(regexp = "Any|Window|Aisle", message = "La preferencia de asiento debe ser Any, Window o Aisle")
    private String seatPreference;

    /** Indica si el pasajero viaja con niños. Lo usan las reglas 5 y 10. */
    private boolean travelingWithChildren;

    /** Peso del equipaje en kilogramos. Lo usan las reglas 3, 4 y 8. */
    @Min(value = 0, message = "El peso del equipaje no puede ser negativo")
    private double luggageWeight;

    /** Constructor vacío requerido por Jackson y por el enlace de datos del formulario. */
    public Passenger() {
    }

    /**
     * @param name                  nombre del pasajero
     * @param age                   edad en años
     * @param membershipStatus      {@code Basic}, {@code Silver}, {@code Gold} o {@code Platinum}
     * @param seatPreference        {@code Any}, {@code Window} o {@code Aisle}
     * @param travelingWithChildren {@code true} si viaja con niños
     * @param luggageWeight         peso del equipaje en kg
     */
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
