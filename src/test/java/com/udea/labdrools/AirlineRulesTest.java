package com.udea.labdrools;

import com.udea.labdrools.model.AirlineRequest;
import com.udea.labdrools.model.AirlineResponse;
import com.udea.labdrools.model.Flight;
import com.udea.labdrools.model.Passenger;
import com.udea.labdrools.service.AirlineEvaluationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AirlineRulesTest {

    @Autowired
    private AirlineEvaluationService service;

    // Pasajero y vuelo base que no activan ninguna regla
    private Passenger basePassenger() {
        return new Passenger("Ana Gómez", 30, "Basic", "Window", false, 12);
    }

    private Flight baseFlight() {
        return new Flight("AV123", 0, 3, false, 500);
    }

    private AirlineResponse evaluate(Passenger p, Flight f) {
        return service.evaluate(new AirlineRequest(p, f));
    }

    @Test
    void baseCaseActivatesNoRules() {
        AirlineResponse r = evaluate(basePassenger(), baseFlight());
        assertTrue(r.getAppliedRules().isEmpty());
        assertEquals("Económica", r.getSeatClass());
        assertEquals(500, r.getFinalPrice());
    }

    @Test
    void rule1UpgradeToBusinessClassForFrequentFlyersWithDelays() {
        Passenger p = basePassenger();
        p.setMembershipStatus("Gold");
        Flight f = baseFlight();
        f.setDelayMinutes(90);
        AirlineResponse r = evaluate(p, f);
        assertEquals("Ejecutiva", r.getSeatClass());
        assertTrue(r.getAppliedRules().contains("UpgradeToBusinessClassForFrequentFlyersWithDelays"));
    }

    @Test
    void rule1NotAppliedWithDelayOfExactly60Minutes() {
        Passenger p = basePassenger();
        p.setMembershipStatus("Platinum");
        Flight f = baseFlight();
        f.setDelayMinutes(60);
        assertEquals("Económica", evaluate(p, f).getSeatClass());
    }

    @Test
    void rule2PriorityCheckInForSeniors() {
        Passenger p = basePassenger();
        p.setAge(70);
        AirlineResponse r = evaluate(p, baseFlight());
        assertTrue(r.isPriorityCheckIn());
        assertTrue(r.getAppliedRules().contains("PriorityCheckInForSeniors"));
    }

    @Test
    void rule3DiscountForLightLuggage() {
        Passenger p = basePassenger();
        p.setLuggageWeight(8);
        AirlineResponse r = evaluate(p, baseFlight());
        assertEquals(10, r.getDiscountPercentage());
        assertEquals(450, r.getFinalPrice(), 0.001);
        assertTrue(r.getAppliedRules().contains("DiscountForLightLuggage"));
    }

    @Test
    void rule4DenyUpgradeForOverweightLuggageBlocksRule1() {
        Passenger p = basePassenger();
        p.setMembershipStatus("Gold");
        p.setLuggageWeight(25);
        Flight f = baseFlight();
        f.setDelayMinutes(90);
        AirlineResponse r = evaluate(p, f);
        assertFalse(r.isUpgradeEligible());
        assertEquals("Económica", r.getSeatClass());
        assertTrue(r.getAppliedRules().contains("DenyUpgradeForOverweightLuggage"));
        assertFalse(r.getAppliedRules().contains("UpgradeToBusinessClassForFrequentFlyersWithDelays"));
    }

    @Test
    void rule5AssignEmergencyExitSeatToYoungAdults() {
        Passenger p = basePassenger();
        p.setSeatPreference("Any");
        Flight f = baseFlight();
        f.setEmergencyExitSeatAvailable(true);
        AirlineResponse r = evaluate(p, f);
        assertEquals("Salida de emergencia", r.getAssignedSeat());
        assertFalse(f.isEmergencyExitSeatAvailable(), "El asiento debe quedar marcado como ocupado");
        assertTrue(r.getAppliedRules().contains("AssignEmergencyExitSeatToYoungAdults"));
    }

    @Test
    void rule5NotAppliedWhenNoEmergencySeatAvailable() {
        Passenger p = basePassenger();
        p.setSeatPreference("Any");
        AirlineResponse r = evaluate(p, baseFlight());
        assertFalse(r.getAppliedRules().contains("AssignEmergencyExitSeatToYoungAdults"));
    }

    @Test
    void rule6CompensationForExtremeDelays() {
        Flight f = baseFlight();
        f.setDelayMinutes(200);
        AirlineResponse r = evaluate(basePassenger(), f);
        assertEquals(200, r.getCompensation());
        assertTrue(r.getAppliedRules().contains("CompensationForExtremeDelays"));
    }

    @Test
    void rule7ExtraLoyaltyPointsForLongFlights() {
        Passenger p = basePassenger();
        p.setMembershipStatus("Silver");
        Flight f = baseFlight();
        f.setDurationHours(6);
        AirlineResponse r = evaluate(p, f);
        assertEquals(500, r.getExtraLoyaltyPoints());
        assertTrue(r.getAppliedRules().contains("ExtraLoyaltyPointsForLongFlights"));
    }

    @Test
    void rule7NotAppliedForBasicMembers() {
        Flight f = baseFlight();
        f.setDurationHours(6);
        assertEquals(0, evaluate(basePassenger(), f).getExtraLoyaltyPoints());
    }

    @Test
    void rule8RestrictLuggageOnShortFlights() {
        Passenger p = basePassenger();
        p.setLuggageWeight(18);
        Flight f = baseFlight();
        f.setDurationHours(1.5);
        AirlineResponse r = evaluate(p, f);
        assertFalse(r.isLuggageAllowed());
        assertTrue(r.getAppliedRules().contains("RestrictLuggageOnShortFlights"));
    }

    @Test
    void rule9VipLoungeAccessForPlatinumMembers() {
        Passenger p = basePassenger();
        p.setMembershipStatus("Platinum");
        AirlineResponse r = evaluate(p, baseFlight());
        assertTrue(r.isVipLoungeAccess());
        assertTrue(r.getAppliedRules().contains("VipLoungeAccessForPlatinumMembers"));
    }

    @Test
    void rule10PreferentialSeatForFamilies() {
        Passenger p = basePassenger();
        p.setTravelingWithChildren(true);
        p.setSeatPreference("Any");
        Flight f = baseFlight();
        f.setEmergencyExitSeatAvailable(true);
        AirlineResponse r = evaluate(p, f);
        assertEquals("Asiento preferencial para familias", r.getAssignedSeat());
        assertTrue(r.getAppliedRules().contains("PreferentialSeatForFamilies"));
        assertFalse(r.getAppliedRules().contains("AssignEmergencyExitSeatToYoungAdults"));
    }
}
