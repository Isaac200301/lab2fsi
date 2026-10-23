# Laboratorio 2: Reglas de negocio de una aerolínea con Spring Boot y Drools

Universidad de Antioquia, Fundamentos de Sistemas de Información 2026-2.

Aplicación Spring Boot que evalúa a un pasajero y su vuelo con 10 reglas de negocio escritas en Drools (DRL) y explica el resultado con un modelo de IA.

## Stack

| Capa | Tecnología |
|------|------------|
| Aplicación | Spring Boot 3.5.16, Java 17 |
| Motor de reglas | Drools 10.2.0 (KIE API) |
| Vistas web | Thymeleaf y Bootstrap 5 |
| IA | Spring AI 1.1.2 con Groq (API compatible con OpenAI), modelo `openai/gpt-oss-120b` |
| Pruebas | JUnit 5 y una colección de Postman |

## Reglas

Definidas en [`src/main/resources/rules/airline_rules.drl`](src/main/resources/rules/airline_rules.drl):

1. `UpgradeToBusinessClassForFrequentFlyersWithDelays`: Gold o Platinum con retraso mayor a 60 min pasa a clase ejecutiva.
2. `PriorityCheckInForSeniors`: mayor de 65 años obtiene check-in prioritario.
3. `DiscountForLightLuggage`: equipaje menor a 10 kg obtiene 10% de descuento.
4. `DenyUpgradeForOverweightLuggage`: equipaje mayor a 23 kg deja al pasajero no elegible para ascensos.
5. `AssignEmergencyExitSeatToYoungAdults`: entre 18 y 40 años, preferencia `Any` y salida de emergencia disponible recibe ese asiento, que queda ocupado.
6. `CompensationForExtremeDelays`: retraso mayor a 180 min da $200 de compensación.
7. `ExtraLoyaltyPointsForLongFlights`: membresía distinta de Basic en vuelo de más de 5 h da 500 puntos.
8. `RestrictLuggageOnShortFlights`: equipaje mayor a 15 kg en vuelo de menos de 2 h no se permite.
9. `VipLoungeAccessForPlatinumMembers`: Platinum obtiene acceso al salón VIP.
10. `PreferentialSeatForFamilies`: viaja con niños y preferencia `Any` recibe asiento preferencial para familias.

## Ejecución

```bash
# Opcional: API key gratuita de Groq (https://console.groq.com) para la explicación con IA
setx AI_API_KEY "gsk_..."

mvn spring-boot:run
```

- Formulario web: http://localhost:8080/airline/form
- API REST (solo reglas): `POST /airline/api/evaluate`
- API REST (reglas y explicación de la IA): `POST /airline/api/evaluate-ai`

Ejemplo de cuerpo:

```json
{
  "passenger": { "name": "Laura Torres", "age": 28, "membershipStatus": "Gold",
                 "seatPreference": "Any", "travelingWithChildren": false, "luggageWeight": 25 },
  "flight": { "flightNumber": "AV245", "delayMinutes": 200, "durationHours": 6,
              "emergencyExitSeatAvailable": true, "ticketPrice": 600 }
}
```

La colección [`postman/Lab2-Aerolinea.postman_collection.json`](postman/Lab2-Aerolinea.postman_collection.json) trae un caso por regla. Las pruebas automáticas se corren con `mvn test`.

Sin `AI_API_KEY` la aplicación funciona igual; la sección de IA indica que falta configurarla.
