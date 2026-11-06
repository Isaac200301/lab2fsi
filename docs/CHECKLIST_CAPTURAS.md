# Capturas que debe tomar usted (n8n y chat con el agente)

El informe (`informe/Informe_Laboratorio3_IsaacCano.docx`) ya trae las 15 capturas de la aplicación. Los recuadros amarillos con
borde rojo son las capturas que solo se pueden tomar con su cuenta de n8n y su clave de Gemini. Reemplace cada recuadro
por la imagen (ancho 6,5 pulgadas).

| Figura | Qué capturar |
|---|---|
| 16 | Lienzo de n8n con los 5 nodos conectados (workflow importado) |
| 17 | Nodo *Google Gemini Chat Model* con la credencial y el modelo. **No muestre la API key.** |
| 18 | Nodo *AI Agent* abierto: prompt `{{ $json.body.message }}` y System Message |
| 19 | Nodo *Webhook*, pestaña *Production URL* (difumine el dominio si quiere) |
| 20 | Workflow publicado (Published/Active) |
| 22 | Chat de la app respondiendo con datos reales: «¿Cómo van los ingresos frente al periodo anterior?» |
| 23 | Cambie un filtro (p. ej. equipo Call Center), repita la pregunta: la respuesta cambia y coincide con el dashboard |
| 24 | *Executions* de n8n con ejecuciones exitosas (una abierta) |

Antes de capturar: backend corriendo (`./mvnw spring-boot:run`), `frontend/.env` con la Production URL y `npm run dev`.
Después de importar y probar el workflow en su n8n, exporte de nuevo el JSON (⋯ → Download) y reemplace
`n8n/airline-crm-agent.workflow.json` si hizo cambios.

Notas honestas para la entrega:
- El workflow se escribió y validó como JSON, pero **no se pudo importar ni ejecutar en un n8n real desde este entorno**.
  Si la importación falla en algún nodo, cree el nodo a mano con los parámetros de la tabla de `docs/LAB3.md`.
- El «taller de procesos de la aerolínea» no estaba entre los archivos; se usaron como procesos las 10 reglas del Lab 2.
  Si el profesor entregó otro documento de procesos, ajuste la sección «Caso de Uso y Métricas».
- Si usó Antigravity u otra herramienta para el desarrollo, menciónelo en el informe; aquí no se afirma.
- Pablo Luis Rodríguez Burgos no figura en la portada; agréguelo si el trabajo es en pareja.
- La fecha de la portada es 5 de noviembre de 2026; cámbiela por la de entrega (límite: 27 de noviembre de 2026).
