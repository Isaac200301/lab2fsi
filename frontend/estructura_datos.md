# Estructura de datos del CRM de AeroVirtual

Adaptación a la aerolínea del esquema CRM del Laboratorio 3 (Fase I). Las "oportunidades" del CRM son **reservas**
de vuelo; los contactos son **pasajeros**; los productos son **vuelos**. El archivo `schema.json` contiene el JSON Schema formal.

| Entidad CRM (guía) | Entidad AeroVirtual | Registros | Archivo |
|---|---|---|---|
| users | Agentes de ventas | 6 | `src/data/mockData.js` → `users` |
| pipeline_stages | Etapas del proceso de la reserva | 6 | `stages` |
| contacts | Pasajeros | 48 | `passengers` |
| products / companies | Vuelos | 80 | `flights` |
| deals | Reservas (con la decisión de Drools embebida en `evaluation`) | 130 | `bookings` |

## Relaciones

```
users 1───N bookings N───1 stages
                 │N
                 ├───1 passengers
                 └───1 flights
```

## Cómo se generan los datos

`npm run generate:data` ejecuta `scripts/generate-mock-data.mjs`: genera datos sintéticos reproducibles (semilla `SEED`, por defecto 555)
y, **para cada reserva, llama al backend real** `POST /airline/api/evaluate` (motor Drools del Laboratorio 2). Así los KPIs del dashboard
(descuentos, compensaciones, ascensos, puntos) son decisiones reales de las 10 reglas, no números inventados.
El backend debe estar corriendo en `http://localhost:8080` (o `API_URL`).

## Reglas de cálculo de métricas

| KPI | Fórmula |
|---|---|
| Ingresos totales | Σ `evaluation.finalPrice` de reservas con `status = won` |
| Reservas activas | Conteo de `status = open` |
| Tasa de cierre | won / (won + lost) |
| Ticket promedio | Ingresos totales / won |
| Puntualidad | % de reservas won con `delay_minutes ≤ 15` |
| Compensaciones | Σ `evaluation.compensation` (Regla 6) |
| Ascensos a ejecutiva | Conteo con Regla 1 activada |
| Puntos de lealtad extra | Σ `evaluation.extraLoyaltyPoints` (Regla 7) |

Fecha de referencia del dashboard: `2026-11-05`. Una reserva cuenta en el periodo según `closed_at ?? created_at`; la variación (▲/▼)
se compara con el periodo anterior contiguo de igual duración.
