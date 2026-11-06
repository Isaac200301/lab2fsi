/**
 * DATOS SIMULADOS del dashboard CRM de la aerolínea (Laboratorio 3).
 *
 * Este es el único archivo de datos de la aplicación y se puede editar a mano. Por ejemplo, cambie
 * el `status` y el `stage_id` de una reserva a 'won' / 's5' y los KPIs se recalculan solos.
 *
 * Generado con scripts/generate-mock-data.mjs: cada `evaluation` es la respuesta real del motor
 * de reglas Drools del Laboratorio 2 (POST /airline/api/evaluate) para esa reserva.
 *
 * Relaciones:
 *   1 agente (users)     gestiona N reservas (bookings.owner_id)
 *   1 pasajero           tiene N reservas   (bookings.passenger_id)
 *   1 vuelo              tiene N reservas   (bookings.flight_id)
 *   1 etapa (stages)     agrupa N reservas  (bookings.stage_id)
 */

/** Fecha "de hoy" de la demo. Se fija para que los filtros por periodo sean reproducibles. */
export const REFERENCE_DATE = '2026-11-05';

export const users = [
  {
    "id": "u1",
    "full_name": "Ana García",
    "email": "ana.garcia@aerovirtual.co",
    "role": "sales_rep",
    "team": "Ventas Online",
    "quota_amount": 1800,
    "status": "active",
    "avatar_url": "https://i.pravatar.cc/80?u=u1"
  },
  {
    "id": "u2",
    "full_name": "Luis Herrera",
    "email": "luis.herrera@aerovirtual.co",
    "role": "sales_rep",
    "team": "Ventas Online",
    "quota_amount": 1600,
    "status": "active",
    "avatar_url": "https://i.pravatar.cc/80?u=u2"
  },
  {
    "id": "u3",
    "full_name": "Marta Ospina",
    "email": "marta.ospina@aerovirtual.co",
    "role": "manager",
    "team": "Call Center",
    "quota_amount": 1700,
    "status": "active",
    "avatar_url": "https://i.pravatar.cc/80?u=u3"
  },
  {
    "id": "u4",
    "full_name": "Camilo Restrepo",
    "email": "camilo.restrepo@aerovirtual.co",
    "role": "sales_rep",
    "team": "Call Center",
    "quota_amount": 1400,
    "status": "active",
    "avatar_url": "https://i.pravatar.cc/80?u=u4"
  },
  {
    "id": "u5",
    "full_name": "Valentina Ruiz",
    "email": "valentina.ruiz@aerovirtual.co",
    "role": "sales_rep",
    "team": "Aeropuerto",
    "quota_amount": 1500,
    "status": "active",
    "avatar_url": "https://i.pravatar.cc/80?u=u5"
  },
  {
    "id": "u6",
    "full_name": "Andrés Mejía",
    "email": "andres.mejia@aerovirtual.co",
    "role": "sales_rep",
    "team": "Aeropuerto",
    "quota_amount": 1300,
    "status": "active",
    "avatar_url": "https://i.pravatar.cc/80?u=u6"
  }
];

export const stages = [
  {
    "id": "s1",
    "name": "Cotización",
    "display_order": 1,
    "win_probability": 10,
    "type": "open"
  },
  {
    "id": "s2",
    "name": "Reserva",
    "display_order": 2,
    "win_probability": 30,
    "type": "open"
  },
  {
    "id": "s3",
    "name": "Check-in",
    "display_order": 3,
    "win_probability": 60,
    "type": "open"
  },
  {
    "id": "s4",
    "name": "Abordaje",
    "display_order": 4,
    "win_probability": 85,
    "type": "open"
  },
  {
    "id": "s5",
    "name": "Vuelo completado",
    "display_order": 5,
    "win_probability": 100,
    "type": "won"
  },
  {
    "id": "s6",
    "name": "Cancelado",
    "display_order": 6,
    "win_probability": 0,
    "type": "lost"
  }
];

export const passengers = [
  {
    "id": "p01",
    "full_name": "Gabriela Gómez Cardona",
    "email": "gabriela.gomez.cardona@correo.co",
    "phone": "+57 307 678 2869",
    "city": "Bogotá",
    "age": 42,
    "membership_status": "Basic",
    "created_at": "2026-03-05T12:00:00.000Z"
  },
  {
    "id": "p02",
    "full_name": "Luciana Ocampo Moreno",
    "email": "luciana.ocampo.moreno@correo.co",
    "phone": "+57 301 931 5882",
    "city": "Cali",
    "age": 31,
    "membership_status": "Silver",
    "created_at": "2024-06-09T12:00:00.000Z"
  },
  {
    "id": "p03",
    "full_name": "Gabriela Giraldo Londoño",
    "email": "gabriela.giraldo.londono@correo.co",
    "phone": "+57 310 487 8078",
    "city": "Pereira",
    "age": 23,
    "membership_status": "Gold",
    "created_at": "2025-03-11T12:00:00.000Z"
  },
  {
    "id": "p04",
    "full_name": "Laura Henao Castaño",
    "email": "laura.henao.castano@correo.co",
    "phone": "+57 319 512 5815",
    "city": "Cali",
    "age": 73,
    "membership_status": "Gold",
    "created_at": "2026-05-28T12:00:00.000Z"
  },
  {
    "id": "p05",
    "full_name": "Carmen Cardona Quintero",
    "email": "carmen.cardona.quintero@correo.co",
    "phone": "+57 320 830 3599",
    "city": "Bucaramanga",
    "age": 73,
    "membership_status": "Gold",
    "created_at": "2025-07-01T12:00:00.000Z"
  },
  {
    "id": "p06",
    "full_name": "Rosa Salazar Torres",
    "email": "rosa.salazar.torres@correo.co",
    "phone": "+57 326 203 9249",
    "city": "Bello",
    "age": 23,
    "membership_status": "Gold",
    "created_at": "2025-10-22T12:00:00.000Z"
  },
  {
    "id": "p07",
    "full_name": "Diana Gómez Londoño",
    "email": "diana.gomez.londono@correo.co",
    "phone": "+57 311 382 8332",
    "city": "Barranquilla",
    "age": 63,
    "membership_status": "Silver",
    "created_at": "2024-10-27T12:00:00.000Z"
  },
  {
    "id": "p08",
    "full_name": "Alejandro Agudelo Ocampo",
    "email": "alejandro.agudelo.ocampo@correo.co",
    "phone": "+57 326 525 3383",
    "city": "Medellín",
    "age": 22,
    "membership_status": "Basic",
    "created_at": "2025-02-09T12:00:00.000Z"
  },
  {
    "id": "p09",
    "full_name": "Samuel Zapata Cardona",
    "email": "samuel.zapata.cardona@correo.co",
    "phone": "+57 313 158 9891",
    "city": "Bogotá",
    "age": 55,
    "membership_status": "Gold",
    "created_at": "2025-08-30T12:00:00.000Z"
  },
  {
    "id": "p10",
    "full_name": "Samuel Ramírez Arango",
    "email": "samuel.ramirez.arango@correo.co",
    "phone": "+57 313 174 8796",
    "city": "Bogotá",
    "age": 41,
    "membership_status": "Gold",
    "created_at": "2026-02-21T12:00:00.000Z"
  },
  {
    "id": "p11",
    "full_name": "Diana Gómez Castaño",
    "email": "diana.gomez.castano@correo.co",
    "phone": "+57 310 686 2404",
    "city": "Barranquilla",
    "age": 31,
    "membership_status": "Silver",
    "created_at": "2025-09-03T12:00:00.000Z"
  },
  {
    "id": "p12",
    "full_name": "Rosa Zapata Gómez",
    "email": "rosa.zapata.gomez@correo.co",
    "phone": "+57 314 133 5331",
    "city": "Barranquilla",
    "age": 61,
    "membership_status": "Basic",
    "created_at": "2024-06-17T12:00:00.000Z"
  },
  {
    "id": "p13",
    "full_name": "Carmen Pérez Moreno",
    "email": "carmen.perez.moreno@correo.co",
    "phone": "+57 326 273 7258",
    "city": "Cali",
    "age": 23,
    "membership_status": "Silver",
    "created_at": "2025-06-30T12:00:00.000Z"
  },
  {
    "id": "p14",
    "full_name": "Juliana Agudelo Ramírez",
    "email": "juliana.agudelo.ramirez@correo.co",
    "phone": "+57 305 974 9279",
    "city": "Bogotá",
    "age": 71,
    "membership_status": "Gold",
    "created_at": "2025-04-24T12:00:00.000Z"
  },
  {
    "id": "p15",
    "full_name": "Antonia Giraldo Castaño",
    "email": "antonia.giraldo.castano@correo.co",
    "phone": "+57 313 252 7486",
    "city": "Cartagena",
    "age": 73,
    "membership_status": "Silver",
    "created_at": "2024-12-19T12:00:00.000Z"
  },
  {
    "id": "p16",
    "full_name": "Álvaro Torres Henao",
    "email": "alvaro.torres.henao@correo.co",
    "phone": "+57 325 861 5947",
    "city": "Bucaramanga",
    "age": 40,
    "membership_status": "Basic",
    "created_at": "2025-01-19T12:00:00.000Z"
  },
  {
    "id": "p17",
    "full_name": "Cristian Montoya Torres",
    "email": "cristian.montoya.torres@correo.co",
    "phone": "+57 318 138 5566",
    "city": "Cartagena",
    "age": 48,
    "membership_status": "Silver",
    "created_at": "2024-11-02T12:00:00.000Z"
  },
  {
    "id": "p18",
    "full_name": "Daniel Vélez Pérez",
    "email": "daniel.velez.perez@correo.co",
    "phone": "+57 319 896 7934",
    "city": "Cali",
    "age": 29,
    "membership_status": "Gold",
    "created_at": "2024-06-17T12:00:00.000Z"
  },
  {
    "id": "p19",
    "full_name": "Felipe Henao Vélez",
    "email": "felipe.henao.velez@correo.co",
    "phone": "+57 313 850 9897",
    "city": "Medellín",
    "age": 33,
    "membership_status": "Basic",
    "created_at": "2025-07-16T12:00:00.000Z"
  },
  {
    "id": "p20",
    "full_name": "Gabriela Torres Torres",
    "email": "gabriela.torres.torres@correo.co",
    "phone": "+57 319 177 6297",
    "city": "Medellín",
    "age": 57,
    "membership_status": "Basic",
    "created_at": "2024-09-12T12:00:00.000Z"
  },
  {
    "id": "p21",
    "full_name": "Emmanuel Ocampo Henao",
    "email": "emmanuel.ocampo.henao@correo.co",
    "phone": "+57 307 901 7345",
    "city": "Bogotá",
    "age": 26,
    "membership_status": "Basic",
    "created_at": "2026-03-05T12:00:00.000Z"
  },
  {
    "id": "p22",
    "full_name": "Juliana Duque Torres",
    "email": "juliana.duque.torres@correo.co",
    "phone": "+57 308 322 1120",
    "city": "Bello",
    "age": 60,
    "membership_status": "Silver",
    "created_at": "2025-10-11T12:00:00.000Z"
  },
  {
    "id": "p23",
    "full_name": "Esteban Moreno Londoño",
    "email": "esteban.moreno.londono@correo.co",
    "phone": "+57 304 785 1688",
    "city": "Bogotá",
    "age": 43,
    "membership_status": "Gold",
    "created_at": "2024-09-13T12:00:00.000Z"
  },
  {
    "id": "p24",
    "full_name": "Sofía Londoño Castaño",
    "email": "sofia.londono.castano@correo.co",
    "phone": "+57 314 725 3093",
    "city": "Cartagena",
    "age": 37,
    "membership_status": "Gold",
    "created_at": "2024-11-27T12:00:00.000Z"
  },
  {
    "id": "p25",
    "full_name": "Esteban Ramírez Pérez",
    "email": "esteban.ramirez.perez@correo.co",
    "phone": "+57 304 407 4109",
    "city": "Bello",
    "age": 23,
    "membership_status": "Basic",
    "created_at": "2025-12-23T12:00:00.000Z"
  },
  {
    "id": "p26",
    "full_name": "Carmen Salazar Arango",
    "email": "carmen.salazar.arango@correo.co",
    "phone": "+57 309 783 2844",
    "city": "Bogotá",
    "age": 29,
    "membership_status": "Basic",
    "created_at": "2026-04-18T12:00:00.000Z"
  },
  {
    "id": "p27",
    "full_name": "Laura Arango Londoño",
    "email": "laura.arango.londono@correo.co",
    "phone": "+57 313 900 9122",
    "city": "Bello",
    "age": 70,
    "membership_status": "Basic",
    "created_at": "2025-03-10T12:00:00.000Z"
  },
  {
    "id": "p28",
    "full_name": "Laura Salazar Vélez",
    "email": "laura.salazar.velez@correo.co",
    "phone": "+57 309 629 3584",
    "city": "Cali",
    "age": 63,
    "membership_status": "Platinum",
    "created_at": "2025-07-19T12:00:00.000Z"
  },
  {
    "id": "p29",
    "full_name": "Paula Agudelo Torres",
    "email": "paula.agudelo.torres@correo.co",
    "phone": "+57 310 457 8375",
    "city": "Cali",
    "age": 24,
    "membership_status": "Basic",
    "created_at": "2024-10-17T12:00:00.000Z"
  },
  {
    "id": "p30",
    "full_name": "Isabella Moreno Moreno",
    "email": "isabella.moreno.moreno@correo.co",
    "phone": "+57 304 128 6493",
    "city": "Bucaramanga",
    "age": 77,
    "membership_status": "Basic",
    "created_at": "2024-08-24T12:00:00.000Z"
  },
  {
    "id": "p31",
    "full_name": "Julián Gómez Torres",
    "email": "julian.gomez.torres@correo.co",
    "phone": "+57 324 603 2857",
    "city": "Bucaramanga",
    "age": 58,
    "membership_status": "Platinum",
    "created_at": "2025-10-17T12:00:00.000Z"
  },
  {
    "id": "p32",
    "full_name": "Jorge Vélez Cardona",
    "email": "jorge.velez.cardona@correo.co",
    "phone": "+57 329 829 7462",
    "city": "Barranquilla",
    "age": 54,
    "membership_status": "Silver",
    "created_at": "2025-04-05T12:00:00.000Z"
  },
  {
    "id": "p33",
    "full_name": "Julián Castaño Moreno",
    "email": "julian.castano.moreno@correo.co",
    "phone": "+57 321 488 3077",
    "city": "Bogotá",
    "age": 60,
    "membership_status": "Gold",
    "created_at": "2025-12-27T12:00:00.000Z"
  },
  {
    "id": "p34",
    "full_name": "Carmen Torres Salazar",
    "email": "carmen.torres.salazar@correo.co",
    "phone": "+57 318 826 9718",
    "city": "Medellín",
    "age": 63,
    "membership_status": "Basic",
    "created_at": "2026-03-09T12:00:00.000Z"
  },
  {
    "id": "p35",
    "full_name": "Antonia Henao Gómez",
    "email": "antonia.henao.gomez@correo.co",
    "phone": "+57 307 928 1323",
    "city": "Bucaramanga",
    "age": 58,
    "membership_status": "Gold",
    "created_at": "2024-06-15T12:00:00.000Z"
  },
  {
    "id": "p36",
    "full_name": "Carmen Vélez Agudelo",
    "email": "carmen.velez.agudelo@correo.co",
    "phone": "+57 310 266 6645",
    "city": "Cartagena",
    "age": 60,
    "membership_status": "Basic",
    "created_at": "2025-05-19T12:00:00.000Z"
  },
  {
    "id": "p37",
    "full_name": "Valeria Henao Zapata",
    "email": "valeria.henao.zapata@correo.co",
    "phone": "+57 329 937 8518",
    "city": "Bello",
    "age": 34,
    "membership_status": "Silver",
    "created_at": "2024-06-21T12:00:00.000Z"
  },
  {
    "id": "p38",
    "full_name": "Carmen Moreno Arango",
    "email": "carmen.moreno.arango@correo.co",
    "phone": "+57 326 283 9776",
    "city": "Bogotá",
    "age": 21,
    "membership_status": "Basic",
    "created_at": "2026-02-26T12:00:00.000Z"
  },
  {
    "id": "p39",
    "full_name": "Felipe Castaño Zapata",
    "email": "felipe.castano.zapata@correo.co",
    "phone": "+57 301 544 5065",
    "city": "Bello",
    "age": 22,
    "membership_status": "Basic",
    "created_at": "2025-04-04T12:00:00.000Z"
  },
  {
    "id": "p40",
    "full_name": "Camila Zapata Ocampo",
    "email": "camila.zapata.ocampo@correo.co",
    "phone": "+57 304 502 2438",
    "city": "Bucaramanga",
    "age": 25,
    "membership_status": "Gold",
    "created_at": "2025-07-13T12:00:00.000Z"
  },
  {
    "id": "p41",
    "full_name": "Samuel Cardona Montoya",
    "email": "samuel.cardona.montoya@correo.co",
    "phone": "+57 303 166 6050",
    "city": "Cartagena",
    "age": 49,
    "membership_status": "Basic",
    "created_at": "2025-11-14T12:00:00.000Z"
  },
  {
    "id": "p42",
    "full_name": "Emmanuel Castaño Duque",
    "email": "emmanuel.castano.duque@correo.co",
    "phone": "+57 319 234 1184",
    "city": "Bello",
    "age": 61,
    "membership_status": "Basic",
    "created_at": "2025-06-13T12:00:00.000Z"
  },
  {
    "id": "p43",
    "full_name": "Antonia Montoya Mendoza",
    "email": "antonia.montoya.mendoza@correo.co",
    "phone": "+57 301 349 7901",
    "city": "Bucaramanga",
    "age": 55,
    "membership_status": "Basic",
    "created_at": "2025-09-14T12:00:00.000Z"
  },
  {
    "id": "p44",
    "full_name": "Julián Moreno Zapata",
    "email": "julian.moreno.zapata@correo.co",
    "phone": "+57 319 959 4262",
    "city": "Bello",
    "age": 24,
    "membership_status": "Silver",
    "created_at": "2025-02-02T12:00:00.000Z"
  },
  {
    "id": "p45",
    "full_name": "Julián Giraldo Henao",
    "email": "julian.giraldo.henao@correo.co",
    "phone": "+57 313 791 1842",
    "city": "Pereira",
    "age": 35,
    "membership_status": "Basic",
    "created_at": "2024-12-29T12:00:00.000Z"
  },
  {
    "id": "p46",
    "full_name": "Laura Zapata Mendoza",
    "email": "laura.zapata.mendoza@correo.co",
    "phone": "+57 318 951 4345",
    "city": "Bucaramanga",
    "age": 32,
    "membership_status": "Gold",
    "created_at": "2026-06-20T12:00:00.000Z"
  },
  {
    "id": "p47",
    "full_name": "Juliana Arango Cardona",
    "email": "juliana.arango.cardona@correo.co",
    "phone": "+57 310 330 8259",
    "city": "Cali",
    "age": 44,
    "membership_status": "Platinum",
    "created_at": "2025-06-01T12:00:00.000Z"
  },
  {
    "id": "p48",
    "full_name": "Valeria Londoño Giraldo",
    "email": "valeria.londono.giraldo@correo.co",
    "phone": "+57 316 472 7086",
    "city": "Pereira",
    "age": 38,
    "membership_status": "Gold",
    "created_at": "2024-06-14T12:00:00.000Z"
  }
];

export const flights = [
  {
    "id": "f001",
    "flight_number": "UD163",
    "origin": "BOG",
    "destination": "MEX",
    "departure_date": "2026-08-03",
    "delay_minutes": 286,
    "duration_hours": 5.2,
    "emergency_exit_seat_available": false,
    "base_price": 450
  },
  {
    "id": "f002",
    "flight_number": "UD125",
    "origin": "MDE",
    "destination": "CTG",
    "departure_date": "2026-08-06",
    "delay_minutes": 56,
    "duration_hours": 1.3,
    "emergency_exit_seat_available": true,
    "base_price": 110
  },
  {
    "id": "f003",
    "flight_number": "UD186",
    "origin": "MDE",
    "destination": "MAD",
    "departure_date": "2026-08-07",
    "delay_minutes": 15,
    "duration_hours": 9.8,
    "emergency_exit_seat_available": true,
    "base_price": 920
  },
  {
    "id": "f004",
    "flight_number": "UD190",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-08-09",
    "delay_minutes": 9,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  },
  {
    "id": "f005",
    "flight_number": "UD134",
    "origin": "BOG",
    "destination": "CLO",
    "departure_date": "2026-08-09",
    "delay_minutes": 9,
    "duration_hours": 1,
    "emergency_exit_seat_available": true,
    "base_price": 90
  },
  {
    "id": "f006",
    "flight_number": "UD107",
    "origin": "MDE",
    "destination": "BOG",
    "departure_date": "2026-08-13",
    "delay_minutes": 42,
    "duration_hours": 0.9,
    "emergency_exit_seat_available": true,
    "base_price": 95
  },
  {
    "id": "f007",
    "flight_number": "UD138",
    "origin": "BOG",
    "destination": "CLO",
    "departure_date": "2026-08-14",
    "delay_minutes": 46,
    "duration_hours": 1,
    "emergency_exit_seat_available": true,
    "base_price": 90
  },
  {
    "id": "f008",
    "flight_number": "UD133",
    "origin": "BOG",
    "destination": "CLO",
    "departure_date": "2026-08-15",
    "delay_minutes": 85,
    "duration_hours": 1,
    "emergency_exit_seat_available": true,
    "base_price": 90
  },
  {
    "id": "f009",
    "flight_number": "UD180",
    "origin": "MDE",
    "destination": "MAD",
    "departure_date": "2026-08-16",
    "delay_minutes": 11,
    "duration_hours": 9.8,
    "emergency_exit_seat_available": false,
    "base_price": 920
  },
  {
    "id": "f010",
    "flight_number": "UD193",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-08-17",
    "delay_minutes": 44,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": false,
    "base_price": 980
  },
  {
    "id": "f011",
    "flight_number": "UD197",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-08-17",
    "delay_minutes": 13,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": false,
    "base_price": 980
  },
  {
    "id": "f012",
    "flight_number": "UD199",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-08-18",
    "delay_minutes": 13,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  },
  {
    "id": "f013",
    "flight_number": "UD192",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-08-23",
    "delay_minutes": 159,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  },
  {
    "id": "f014",
    "flight_number": "UD111",
    "origin": "BOG",
    "destination": "CTG",
    "departure_date": "2026-08-24",
    "delay_minutes": 126,
    "duration_hours": 1.6,
    "emergency_exit_seat_available": true,
    "base_price": 125
  },
  {
    "id": "f015",
    "flight_number": "UD119",
    "origin": "BOG",
    "destination": "CTG",
    "departure_date": "2026-08-24",
    "delay_minutes": 130,
    "duration_hours": 1.6,
    "emergency_exit_seat_available": true,
    "base_price": 125
  },
  {
    "id": "f016",
    "flight_number": "UD142",
    "origin": "BOG",
    "destination": "BAQ",
    "departure_date": "2026-08-25",
    "delay_minutes": 11,
    "duration_hours": 1.5,
    "emergency_exit_seat_available": true,
    "base_price": 120
  },
  {
    "id": "f017",
    "flight_number": "UD171",
    "origin": "BOG",
    "destination": "JFK",
    "departure_date": "2026-08-26",
    "delay_minutes": 10,
    "duration_hours": 5.8,
    "emergency_exit_seat_available": false,
    "base_price": 640
  },
  {
    "id": "f018",
    "flight_number": "UD168",
    "origin": "BOG",
    "destination": "MEX",
    "departure_date": "2026-08-26",
    "delay_minutes": 291,
    "duration_hours": 5.2,
    "emergency_exit_seat_available": true,
    "base_price": 450
  },
  {
    "id": "f019",
    "flight_number": "UD142",
    "origin": "BOG",
    "destination": "BAQ",
    "departure_date": "2026-08-27",
    "delay_minutes": 13,
    "duration_hours": 1.5,
    "emergency_exit_seat_available": true,
    "base_price": 120
  },
  {
    "id": "f020",
    "flight_number": "UD116",
    "origin": "BOG",
    "destination": "CTG",
    "departure_date": "2026-08-27",
    "delay_minutes": 124,
    "duration_hours": 1.6,
    "emergency_exit_seat_available": true,
    "base_price": 125
  },
  {
    "id": "f021",
    "flight_number": "UD189",
    "origin": "MDE",
    "destination": "MAD",
    "departure_date": "2026-08-28",
    "delay_minutes": 51,
    "duration_hours": 9.8,
    "emergency_exit_seat_available": true,
    "base_price": 920
  },
  {
    "id": "f022",
    "flight_number": "UD193",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-08-29",
    "delay_minutes": 14,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  },
  {
    "id": "f023",
    "flight_number": "UD164",
    "origin": "BOG",
    "destination": "MEX",
    "departure_date": "2026-08-30",
    "delay_minutes": 11,
    "duration_hours": 5.2,
    "emergency_exit_seat_available": true,
    "base_price": 450
  },
  {
    "id": "f024",
    "flight_number": "UD153",
    "origin": "MDE",
    "destination": "MIA",
    "departure_date": "2026-09-04",
    "delay_minutes": 6,
    "duration_hours": 3.7,
    "emergency_exit_seat_available": true,
    "base_price": 340
  },
  {
    "id": "f025",
    "flight_number": "UD198",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-09-05",
    "delay_minutes": 136,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  },
  {
    "id": "f026",
    "flight_number": "UD112",
    "origin": "BOG",
    "destination": "CTG",
    "departure_date": "2026-09-07",
    "delay_minutes": 10,
    "duration_hours": 1.6,
    "emergency_exit_seat_available": true,
    "base_price": 125
  },
  {
    "id": "f027",
    "flight_number": "UD103",
    "origin": "MDE",
    "destination": "BOG",
    "departure_date": "2026-09-07",
    "delay_minutes": 15,
    "duration_hours": 0.9,
    "emergency_exit_seat_available": true,
    "base_price": 95
  },
  {
    "id": "f028",
    "flight_number": "UD130",
    "origin": "BOG",
    "destination": "CLO",
    "departure_date": "2026-09-08",
    "delay_minutes": 2,
    "duration_hours": 1,
    "emergency_exit_seat_available": true,
    "base_price": 90
  },
  {
    "id": "f029",
    "flight_number": "UD149",
    "origin": "BOG",
    "destination": "BAQ",
    "departure_date": "2026-09-13",
    "delay_minutes": 14,
    "duration_hours": 1.5,
    "emergency_exit_seat_available": false,
    "base_price": 120
  },
  {
    "id": "f030",
    "flight_number": "UD102",
    "origin": "MDE",
    "destination": "BOG",
    "departure_date": "2026-09-14",
    "delay_minutes": 12,
    "duration_hours": 0.9,
    "emergency_exit_seat_available": false,
    "base_price": 95
  },
  {
    "id": "f031",
    "flight_number": "UD127",
    "origin": "MDE",
    "destination": "CTG",
    "departure_date": "2026-09-21",
    "delay_minutes": 9,
    "duration_hours": 1.3,
    "emergency_exit_seat_available": true,
    "base_price": 110
  },
  {
    "id": "f032",
    "flight_number": "UD150",
    "origin": "MDE",
    "destination": "MIA",
    "departure_date": "2026-09-22",
    "delay_minutes": 17,
    "duration_hours": 3.7,
    "emergency_exit_seat_available": true,
    "base_price": 340
  },
  {
    "id": "f033",
    "flight_number": "UD128",
    "origin": "MDE",
    "destination": "CTG",
    "departure_date": "2026-09-26",
    "delay_minutes": 13,
    "duration_hours": 1.3,
    "emergency_exit_seat_available": true,
    "base_price": 110
  },
  {
    "id": "f034",
    "flight_number": "UD173",
    "origin": "BOG",
    "destination": "JFK",
    "departure_date": "2026-09-28",
    "delay_minutes": 175,
    "duration_hours": 5.8,
    "emergency_exit_seat_available": true,
    "base_price": 640
  },
  {
    "id": "f035",
    "flight_number": "UD128",
    "origin": "MDE",
    "destination": "CTG",
    "departure_date": "2026-09-28",
    "delay_minutes": 2,
    "duration_hours": 1.3,
    "emergency_exit_seat_available": true,
    "base_price": 110
  },
  {
    "id": "f036",
    "flight_number": "UD188",
    "origin": "MDE",
    "destination": "MAD",
    "departure_date": "2026-09-29",
    "delay_minutes": 2,
    "duration_hours": 9.8,
    "emergency_exit_seat_available": true,
    "base_price": 920
  },
  {
    "id": "f037",
    "flight_number": "UD164",
    "origin": "BOG",
    "destination": "MEX",
    "departure_date": "2026-10-07",
    "delay_minutes": 127,
    "duration_hours": 5.2,
    "emergency_exit_seat_available": true,
    "base_price": 450
  },
  {
    "id": "f038",
    "flight_number": "UD151",
    "origin": "MDE",
    "destination": "MIA",
    "departure_date": "2026-10-09",
    "delay_minutes": 4,
    "duration_hours": 3.7,
    "emergency_exit_seat_available": true,
    "base_price": 340
  },
  {
    "id": "f039",
    "flight_number": "UD124",
    "origin": "MDE",
    "destination": "CTG",
    "departure_date": "2026-10-10",
    "delay_minutes": 7,
    "duration_hours": 1.3,
    "emergency_exit_seat_available": false,
    "base_price": 110
  },
  {
    "id": "f040",
    "flight_number": "UD137",
    "origin": "BOG",
    "destination": "CLO",
    "departure_date": "2026-10-11",
    "delay_minutes": 43,
    "duration_hours": 1,
    "emergency_exit_seat_available": false,
    "base_price": 90
  },
  {
    "id": "f041",
    "flight_number": "UD196",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-10-12",
    "delay_minutes": 223,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  },
  {
    "id": "f042",
    "flight_number": "UD166",
    "origin": "BOG",
    "destination": "MEX",
    "departure_date": "2026-10-18",
    "delay_minutes": 43,
    "duration_hours": 5.2,
    "emergency_exit_seat_available": true,
    "base_price": 450
  },
  {
    "id": "f043",
    "flight_number": "UD177",
    "origin": "BOG",
    "destination": "JFK",
    "departure_date": "2026-10-23",
    "delay_minutes": 9,
    "duration_hours": 5.8,
    "emergency_exit_seat_available": true,
    "base_price": 640
  },
  {
    "id": "f044",
    "flight_number": "UD136",
    "origin": "BOG",
    "destination": "CLO",
    "departure_date": "2026-10-26",
    "delay_minutes": 10,
    "duration_hours": 1,
    "emergency_exit_seat_available": true,
    "base_price": 90
  },
  {
    "id": "f045",
    "flight_number": "UD167",
    "origin": "BOG",
    "destination": "MEX",
    "departure_date": "2026-10-28",
    "delay_minutes": 0,
    "duration_hours": 5.2,
    "emergency_exit_seat_available": true,
    "base_price": 450
  },
  {
    "id": "f046",
    "flight_number": "UD127",
    "origin": "MDE",
    "destination": "CTG",
    "departure_date": "2026-10-31",
    "delay_minutes": 8,
    "duration_hours": 1.3,
    "emergency_exit_seat_available": true,
    "base_price": 110
  },
  {
    "id": "f047",
    "flight_number": "UD188",
    "origin": "MDE",
    "destination": "MAD",
    "departure_date": "2026-11-03",
    "delay_minutes": 10,
    "duration_hours": 9.8,
    "emergency_exit_seat_available": false,
    "base_price": 920
  },
  {
    "id": "f048",
    "flight_number": "UD110",
    "origin": "BOG",
    "destination": "CTG",
    "departure_date": "2026-11-05",
    "delay_minutes": 0,
    "duration_hours": 1.6,
    "emergency_exit_seat_available": true,
    "base_price": 125
  },
  {
    "id": "f049",
    "flight_number": "UD152",
    "origin": "MDE",
    "destination": "MIA",
    "departure_date": "2026-11-05",
    "delay_minutes": 0,
    "duration_hours": 3.7,
    "emergency_exit_seat_available": false,
    "base_price": 340
  },
  {
    "id": "f050",
    "flight_number": "UD102",
    "origin": "MDE",
    "destination": "BOG",
    "departure_date": "2026-11-05",
    "delay_minutes": 0,
    "duration_hours": 0.9,
    "emergency_exit_seat_available": true,
    "base_price": 95
  },
  {
    "id": "f051",
    "flight_number": "UD133",
    "origin": "BOG",
    "destination": "CLO",
    "departure_date": "2026-11-05",
    "delay_minutes": 0,
    "duration_hours": 1,
    "emergency_exit_seat_available": true,
    "base_price": 90
  },
  {
    "id": "f052",
    "flight_number": "UD123",
    "origin": "MDE",
    "destination": "CTG",
    "departure_date": "2026-11-05",
    "delay_minutes": 0,
    "duration_hours": 1.3,
    "emergency_exit_seat_available": true,
    "base_price": 110
  },
  {
    "id": "f053",
    "flight_number": "UD106",
    "origin": "MDE",
    "destination": "BOG",
    "departure_date": "2026-11-06",
    "delay_minutes": 0,
    "duration_hours": 0.9,
    "emergency_exit_seat_available": false,
    "base_price": 95
  },
  {
    "id": "f054",
    "flight_number": "UD145",
    "origin": "BOG",
    "destination": "BAQ",
    "departure_date": "2026-11-06",
    "delay_minutes": 0,
    "duration_hours": 1.5,
    "emergency_exit_seat_available": false,
    "base_price": 120
  },
  {
    "id": "f055",
    "flight_number": "UD178",
    "origin": "BOG",
    "destination": "JFK",
    "departure_date": "2026-11-06",
    "delay_minutes": 0,
    "duration_hours": 5.8,
    "emergency_exit_seat_available": false,
    "base_price": 640
  },
  {
    "id": "f056",
    "flight_number": "UD186",
    "origin": "MDE",
    "destination": "MAD",
    "departure_date": "2026-11-07",
    "delay_minutes": 0,
    "duration_hours": 9.8,
    "emergency_exit_seat_available": true,
    "base_price": 920
  },
  {
    "id": "f057",
    "flight_number": "UD121",
    "origin": "MDE",
    "destination": "CTG",
    "departure_date": "2026-11-07",
    "delay_minutes": 0,
    "duration_hours": 1.3,
    "emergency_exit_seat_available": true,
    "base_price": 110
  },
  {
    "id": "f058",
    "flight_number": "UD149",
    "origin": "BOG",
    "destination": "BAQ",
    "departure_date": "2026-11-07",
    "delay_minutes": 0,
    "duration_hours": 1.5,
    "emergency_exit_seat_available": true,
    "base_price": 120
  },
  {
    "id": "f059",
    "flight_number": "UD130",
    "origin": "BOG",
    "destination": "CLO",
    "departure_date": "2026-11-07",
    "delay_minutes": 0,
    "duration_hours": 1,
    "emergency_exit_seat_available": true,
    "base_price": 90
  },
  {
    "id": "f060",
    "flight_number": "UD179",
    "origin": "BOG",
    "destination": "JFK",
    "departure_date": "2026-11-08",
    "delay_minutes": 0,
    "duration_hours": 5.8,
    "emergency_exit_seat_available": true,
    "base_price": 640
  },
  {
    "id": "f061",
    "flight_number": "UD172",
    "origin": "BOG",
    "destination": "JFK",
    "departure_date": "2026-11-08",
    "delay_minutes": 0,
    "duration_hours": 5.8,
    "emergency_exit_seat_available": true,
    "base_price": 640
  },
  {
    "id": "f062",
    "flight_number": "UD132",
    "origin": "BOG",
    "destination": "CLO",
    "departure_date": "2026-11-08",
    "delay_minutes": 0,
    "duration_hours": 1,
    "emergency_exit_seat_available": true,
    "base_price": 90
  },
  {
    "id": "f063",
    "flight_number": "UD147",
    "origin": "BOG",
    "destination": "BAQ",
    "departure_date": "2026-11-09",
    "delay_minutes": 0,
    "duration_hours": 1.5,
    "emergency_exit_seat_available": true,
    "base_price": 120
  },
  {
    "id": "f064",
    "flight_number": "UD160",
    "origin": "BOG",
    "destination": "MEX",
    "departure_date": "2026-11-11",
    "delay_minutes": 0,
    "duration_hours": 5.2,
    "emergency_exit_seat_available": true,
    "base_price": 450
  },
  {
    "id": "f065",
    "flight_number": "UD158",
    "origin": "MDE",
    "destination": "MIA",
    "departure_date": "2026-11-12",
    "delay_minutes": 0,
    "duration_hours": 3.7,
    "emergency_exit_seat_available": true,
    "base_price": 340
  },
  {
    "id": "f066",
    "flight_number": "UD156",
    "origin": "MDE",
    "destination": "MIA",
    "departure_date": "2026-11-12",
    "delay_minutes": 0,
    "duration_hours": 3.7,
    "emergency_exit_seat_available": false,
    "base_price": 340
  },
  {
    "id": "f067",
    "flight_number": "UD190",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-11-14",
    "delay_minutes": 0,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  },
  {
    "id": "f068",
    "flight_number": "UD191",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-11-15",
    "delay_minutes": 0,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  },
  {
    "id": "f069",
    "flight_number": "UD188",
    "origin": "MDE",
    "destination": "MAD",
    "departure_date": "2026-11-17",
    "delay_minutes": 0,
    "duration_hours": 9.8,
    "emergency_exit_seat_available": true,
    "base_price": 920
  },
  {
    "id": "f070",
    "flight_number": "UD160",
    "origin": "BOG",
    "destination": "MEX",
    "departure_date": "2026-11-21",
    "delay_minutes": 0,
    "duration_hours": 5.2,
    "emergency_exit_seat_available": false,
    "base_price": 450
  },
  {
    "id": "f071",
    "flight_number": "UD142",
    "origin": "BOG",
    "destination": "BAQ",
    "departure_date": "2026-11-21",
    "delay_minutes": 0,
    "duration_hours": 1.5,
    "emergency_exit_seat_available": true,
    "base_price": 120
  },
  {
    "id": "f072",
    "flight_number": "UD109",
    "origin": "MDE",
    "destination": "BOG",
    "departure_date": "2026-11-24",
    "delay_minutes": 0,
    "duration_hours": 0.9,
    "emergency_exit_seat_available": false,
    "base_price": 95
  },
  {
    "id": "f073",
    "flight_number": "UD199",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-11-28",
    "delay_minutes": 0,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": false,
    "base_price": 980
  },
  {
    "id": "f074",
    "flight_number": "UD107",
    "origin": "MDE",
    "destination": "BOG",
    "departure_date": "2026-11-29",
    "delay_minutes": 0,
    "duration_hours": 0.9,
    "emergency_exit_seat_available": true,
    "base_price": 95
  },
  {
    "id": "f075",
    "flight_number": "UD190",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-12-06",
    "delay_minutes": 0,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  },
  {
    "id": "f076",
    "flight_number": "UD144",
    "origin": "BOG",
    "destination": "BAQ",
    "departure_date": "2026-12-06",
    "delay_minutes": 0,
    "duration_hours": 1.5,
    "emergency_exit_seat_available": true,
    "base_price": 120
  },
  {
    "id": "f077",
    "flight_number": "UD106",
    "origin": "MDE",
    "destination": "BOG",
    "departure_date": "2026-12-08",
    "delay_minutes": 0,
    "duration_hours": 0.9,
    "emergency_exit_seat_available": true,
    "base_price": 95
  },
  {
    "id": "f078",
    "flight_number": "UD167",
    "origin": "BOG",
    "destination": "MEX",
    "departure_date": "2026-12-10",
    "delay_minutes": 0,
    "duration_hours": 5.2,
    "emergency_exit_seat_available": true,
    "base_price": 450
  },
  {
    "id": "f079",
    "flight_number": "UD192",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-12-12",
    "delay_minutes": 0,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": false,
    "base_price": 980
  },
  {
    "id": "f080",
    "flight_number": "UD198",
    "origin": "BOG",
    "destination": "MAD",
    "departure_date": "2026-12-13",
    "delay_minutes": 0,
    "duration_hours": 10.3,
    "emergency_exit_seat_available": true,
    "base_price": 980
  }
];

export const bookings = [
  {
    "id": "b001",
    "title": "UD163 · BOG → MEX",
    "passenger_id": "p47",
    "flight_id": "f001",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 436,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 24.6,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-03",
    "closed_at": "2026-08-03T18:46:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 436,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 200,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "CompensationForExtremeDelays",
        "ExtraLoyaltyPointsForLongFlights",
        "VipLoungeAccessForPlatinumMembers"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (24.6 kg).",
        "Compensación de $200 por un retraso de 286 minutos.",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas).",
        "Acceso al salón VIP por membresía Platinum."
      ]
    }
  },
  {
    "id": "b002",
    "title": "UD171 · BOG → JFK",
    "passenger_id": "p08",
    "flight_id": "f017",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 720,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 8.3,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-26",
    "closed_at": "2026-08-26T16:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 648,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (8.3 kg)."
      ]
    }
  },
  {
    "id": "b003",
    "title": "UD189 · MDE → MAD",
    "passenger_id": "p17",
    "flight_id": "f021",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 1085,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 10.4,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-28",
    "closed_at": "2026-08-28T17:51:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1085,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (9.8 horas)."
      ]
    }
  },
  {
    "id": "b004",
    "title": "UD180 · MDE → MAD",
    "passenger_id": "p48",
    "flight_id": "f009",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 987,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 9.2,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-16",
    "closed_at": "2026-08-16T17:11:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 888.3000000000001,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (9.2 kg).",
        "500 puntos de lealtad extra por vuelo largo (9.8 horas)."
      ]
    }
  },
  {
    "id": "b005",
    "title": "UD163 · BOG → MEX",
    "passenger_id": "p18",
    "flight_id": "f001",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 462,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 6.7,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-03",
    "closed_at": "2026-08-03T17:46:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Ejecutiva",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 415.8,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 200,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "UpgradeToBusinessClassForFrequentFlyersWithDelays",
        "DiscountForLightLuggage",
        "CompensationForExtremeDelays",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Ascenso a clase ejecutiva por ser pasajero Gold con un retraso de 286 minutos.",
        "Descuento del 10% por equipaje liviano (6.7 kg).",
        "Compensación de $200 por un retraso de 286 minutos.",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b006",
    "title": "UD197 · BOG → MAD",
    "passenger_id": "p30",
    "flight_id": "f011",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 965,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 10.9,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-17",
    "closed_at": "2026-08-17T13:13:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 965,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años."
      ]
    }
  },
  {
    "id": "b007",
    "title": "UD189 · MDE → MAD",
    "passenger_id": "p16",
    "flight_id": "f021",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 1027,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 21,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-28",
    "closed_at": "2026-08-28T15:51:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1027,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b008",
    "title": "UD163 · BOG → MEX",
    "passenger_id": "p40",
    "flight_id": "f001",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 483,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 11.4,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-03",
    "closed_at": "2026-08-03T21:46:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Ejecutiva",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 483,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 200,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "UpgradeToBusinessClassForFrequentFlyersWithDelays",
        "CompensationForExtremeDelays",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Ascenso a clase ejecutiva por ser pasajero Gold con un retraso de 286 minutos.",
        "Compensación de $200 por un retraso de 286 minutos.",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b009",
    "title": "UD107 · MDE → BOG",
    "passenger_id": "p14",
    "flight_id": "f006",
    "owner_id": "u4",
    "stage_id": "s6",
    "amount": 85,
    "currency": "USD",
    "status": "lost",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 18.3,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-13",
    "closed_at": "2026-08-04T12:00:00.000Z",
    "loss_reason": "No-show (no se presentó)",
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 85,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Equipaje no permitido: 18.3 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b010",
    "title": "UD190 · BOG → MAD",
    "passenger_id": "p22",
    "flight_id": "f004",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 863,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 22.2,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-09",
    "closed_at": "2026-08-09T16:09:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 863,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b011",
    "title": "UD107 · MDE → BOG",
    "passenger_id": "p13",
    "flight_id": "f006",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 88,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 23.9,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-13",
    "closed_at": "2026-08-13T14:42:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 88,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (23.9 kg).",
        "Equipaje no permitido: 23.9 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b012",
    "title": "UD142 · BOG → BAQ",
    "passenger_id": "p09",
    "flight_id": "f016",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 133,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 22,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-25",
    "closed_at": "2026-08-25T13:11:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 133,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 22.0 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b013",
    "title": "UD190 · BOG → MAD",
    "passenger_id": "p05",
    "flight_id": "f004",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 1156,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 7.1,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-09",
    "closed_at": "2026-08-09T16:09:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 10,
      "finalPrice": 1040.4,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors",
        "DiscountForLightLuggage",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Descuento del 10% por equipaje liviano (7.1 kg).",
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b014",
    "title": "UD125 · MDE → CTG",
    "passenger_id": "p30",
    "flight_id": "f002",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 127,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 2.6,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-06",
    "closed_at": "2026-08-06T13:56:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 10,
      "finalPrice": 114.3,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors",
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Descuento del 10% por equipaje liviano (2.6 kg)."
      ]
    }
  },
  {
    "id": "b015",
    "title": "UD198 · BOG → MAD",
    "passenger_id": "p44",
    "flight_id": "f025",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 897,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 15.5,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-09-05",
    "closed_at": "2026-09-05T18:16:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 897,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado.",
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b016",
    "title": "UD186 · MDE → MAD",
    "passenger_id": "p21",
    "flight_id": "f003",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 894,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 7.4,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-07",
    "closed_at": "2026-08-07T16:15:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 804.6,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (7.4 kg).",
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b017",
    "title": "UD111 · BOG → CTG",
    "passenger_id": "p04",
    "flight_id": "f014",
    "owner_id": "u2",
    "stage_id": "s6",
    "amount": 119,
    "currency": "USD",
    "status": "lost",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 7,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-24",
    "closed_at": "2026-08-22T12:00:00.000Z",
    "loss_reason": "Cambio de itinerario",
    "evaluation": {
      "seatClass": "Ejecutiva",
      "priorityCheckIn": true,
      "discountPercentage": 10,
      "finalPrice": 107.10000000000001,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "UpgradeToBusinessClassForFrequentFlyersWithDelays",
        "PriorityCheckInForSeniors",
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Ascenso a clase ejecutiva por ser pasajero Gold con un retraso de 126 minutos.",
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Descuento del 10% por equipaje liviano (7.0 kg)."
      ]
    }
  },
  {
    "id": "b018",
    "title": "UD199 · BOG → MAD",
    "passenger_id": "p04",
    "flight_id": "f012",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 869,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 27.8,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-18",
    "closed_at": "2026-08-18T13:13:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 869,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "PriorityCheckInForSeniors",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (27.8 kg).",
        "Check-in prioritario activado por ser mayor de 65 años.",
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b019",
    "title": "UD133 · BOG → CLO",
    "passenger_id": "p14",
    "flight_id": "f008",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 82,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 3.9,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-15",
    "closed_at": "2026-08-15T17:25:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Ejecutiva",
      "priorityCheckIn": true,
      "discountPercentage": 10,
      "finalPrice": 73.8,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "UpgradeToBusinessClassForFrequentFlyersWithDelays",
        "PriorityCheckInForSeniors",
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Ascenso a clase ejecutiva por ser pasajero Gold con un retraso de 85 minutos.",
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Descuento del 10% por equipaje liviano (3.9 kg)."
      ]
    }
  },
  {
    "id": "b020",
    "title": "UD107 · MDE → BOG",
    "passenger_id": "p39",
    "flight_id": "f006",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 97,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 11.1,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-13",
    "closed_at": "2026-08-13T14:42:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 97,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b021",
    "title": "UD138 · BOG → CLO",
    "passenger_id": "p13",
    "flight_id": "f007",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 91,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 9.1,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-14",
    "closed_at": "2026-08-14T13:46:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 81.9,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (9.1 kg)."
      ]
    }
  },
  {
    "id": "b022",
    "title": "UD186 · MDE → MAD",
    "passenger_id": "p29",
    "flight_id": "f003",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 1033,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 18,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-07",
    "closed_at": "2026-08-07T16:15:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1033,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b023",
    "title": "UD134 · BOG → CLO",
    "passenger_id": "p25",
    "flight_id": "f005",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 80,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 6.3,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-09",
    "closed_at": "2026-08-09T16:09:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 72,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (6.3 kg)."
      ]
    }
  },
  {
    "id": "b024",
    "title": "UD116 · BOG → CTG",
    "passenger_id": "p17",
    "flight_id": "f020",
    "owner_id": "u6",
    "stage_id": "s5",
    "amount": 120,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": true,
    "luggage_weight": 13.9,
    "created_at": "2026-07-18T12:00:00.000Z",
    "expected_close_date": "2026-08-27",
    "closed_at": "2026-08-27T19:04:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 120,
      "upgradeEligible": true,
      "assignedSeat": "Asiento preferencial para familias",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PreferentialSeatForFamilies"
      ],
      "messages": [
        "Asiento preferencial para familias asignado por viajar con niños."
      ]
    }
  },
  {
    "id": "b025",
    "title": "UD164 · BOG → MEX",
    "passenger_id": "p04",
    "flight_id": "f023",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 465,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 11.7,
    "created_at": "2026-07-19T12:00:00.000Z",
    "expected_close_date": "2026-08-30",
    "closed_at": "2026-08-30T14:11:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 465,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años.",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b026",
    "title": "UD103 · MDE → BOG",
    "passenger_id": "p41",
    "flight_id": "f027",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 88,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": true,
    "luggage_weight": 19,
    "created_at": "2026-07-21T05:00:00.000Z",
    "expected_close_date": "2026-09-07",
    "closed_at": "2026-09-07T16:15:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 88,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 19.0 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b027",
    "title": "UD119 · BOG → CTG",
    "passenger_id": "p36",
    "flight_id": "f015",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 115,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 11.2,
    "created_at": "2026-07-21T05:00:00.000Z",
    "expected_close_date": "2026-08-24",
    "closed_at": "2026-08-24T17:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 115,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b028",
    "title": "UD198 · BOG → MAD",
    "passenger_id": "p10",
    "flight_id": "f025",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 1066,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": true,
    "luggage_weight": 25.7,
    "created_at": "2026-07-21T12:00:00.000Z",
    "expected_close_date": "2026-09-05",
    "closed_at": "2026-09-05T16:16:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1066,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (25.7 kg).",
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b029",
    "title": "UD180 · MDE → MAD",
    "passenger_id": "p31",
    "flight_id": "f009",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 873,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 13.8,
    "created_at": "2026-07-24T04:00:00.000Z",
    "expected_close_date": "2026-08-16",
    "closed_at": "2026-08-16T16:11:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 873,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights",
        "VipLoungeAccessForPlatinumMembers"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (9.8 horas).",
        "Acceso al salón VIP por membresía Platinum."
      ]
    }
  },
  {
    "id": "b030",
    "title": "UD142 · BOG → BAQ",
    "passenger_id": "p43",
    "flight_id": "f019",
    "owner_id": "u6",
    "stage_id": "s5",
    "amount": 127,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": true,
    "luggage_weight": 16.2,
    "created_at": "2026-07-25T09:00:00.000Z",
    "expected_close_date": "2026-08-27",
    "closed_at": "2026-08-27T17:13:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 127,
      "upgradeEligible": true,
      "assignedSeat": "Asiento preferencial para familias",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights",
        "PreferentialSeatForFamilies"
      ],
      "messages": [
        "Equipaje no permitido: 16.2 kg supera los 15 kg en un vuelo corto.",
        "Asiento preferencial para familias asignado por viajar con niños."
      ]
    }
  },
  {
    "id": "b031",
    "title": "UD190 · BOG → MAD",
    "passenger_id": "p06",
    "flight_id": "f004",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 1123,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 6.9,
    "created_at": "2026-07-25T12:00:00.000Z",
    "expected_close_date": "2026-08-09",
    "closed_at": "2026-08-09T15:09:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 1010.7,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "AssignEmergencyExitSeatToYoungAdults",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (6.9 kg).",
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado.",
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b032",
    "title": "UD171 · BOG → JFK",
    "passenger_id": "p27",
    "flight_id": "f017",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 716,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 13.7,
    "created_at": "2026-07-27T05:00:00.000Z",
    "expected_close_date": "2026-08-26",
    "closed_at": "2026-08-26T13:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 716,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años."
      ]
    }
  },
  {
    "id": "b033",
    "title": "UD168 · BOG → MEX",
    "passenger_id": "p13",
    "flight_id": "f018",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 446,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 20.8,
    "created_at": "2026-07-28T04:00:00.000Z",
    "expected_close_date": "2026-08-26",
    "closed_at": "2026-08-26T18:51:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 446,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 200,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "CompensationForExtremeDelays",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Compensación de $200 por un retraso de 291 minutos.",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b034",
    "title": "UD171 · BOG → JFK",
    "passenger_id": "p38",
    "flight_id": "f017",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 681,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 11.6,
    "created_at": "2026-07-30T06:00:00.000Z",
    "expected_close_date": "2026-08-26",
    "closed_at": "2026-08-26T16:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 681,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b035",
    "title": "UD142 · BOG → BAQ",
    "passenger_id": "p25",
    "flight_id": "f019",
    "owner_id": "u6",
    "stage_id": "s5",
    "amount": 112,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 10.9,
    "created_at": "2026-07-30T12:00:00.000Z",
    "expected_close_date": "2026-08-27",
    "closed_at": "2026-08-27T17:13:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 112,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b036",
    "title": "UD180 · MDE → MAD",
    "passenger_id": "p47",
    "flight_id": "f009",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 911,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 29,
    "created_at": "2026-07-31T05:00:00.000Z",
    "expected_close_date": "2026-08-16",
    "closed_at": "2026-08-16T16:11:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 911,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "ExtraLoyaltyPointsForLongFlights",
        "VipLoungeAccessForPlatinumMembers"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (29.0 kg).",
        "500 puntos de lealtad extra por vuelo largo (9.8 horas).",
        "Acceso al salón VIP por membresía Platinum."
      ]
    }
  },
  {
    "id": "b037",
    "title": "UD112 · BOG → CTG",
    "passenger_id": "p21",
    "flight_id": "f026",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 134,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 25,
    "created_at": "2026-07-31T12:00:00.000Z",
    "expected_close_date": "2026-09-07",
    "closed_at": "2026-09-07T17:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 134,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (25.0 kg).",
        "Equipaje no permitido: 25.0 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b038",
    "title": "UD134 · BOG → CLO",
    "passenger_id": "p19",
    "flight_id": "f005",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 77,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 17,
    "created_at": "2026-08-02T05:00:00.000Z",
    "expected_close_date": "2026-08-09",
    "closed_at": "2026-08-09T13:09:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 77,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado.",
        "Equipaje no permitido: 17.0 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b039",
    "title": "UD103 · MDE → BOG",
    "passenger_id": "p45",
    "flight_id": "f027",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 110,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 26.9,
    "created_at": "2026-08-02T10:00:00.000Z",
    "expected_close_date": "2026-09-07",
    "closed_at": "2026-09-07T15:15:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 110,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (26.9 kg).",
        "Equipaje no permitido: 26.9 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b040",
    "title": "UD103 · MDE → BOG",
    "passenger_id": "p30",
    "flight_id": "f027",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 92,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 17,
    "created_at": "2026-08-03T10:00:00.000Z",
    "expected_close_date": "2026-09-07",
    "closed_at": "2026-09-07T16:15:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 92,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Equipaje no permitido: 17.0 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b041",
    "title": "UD164 · BOG → MEX",
    "passenger_id": "p46",
    "flight_id": "f023",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 537,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 20.4,
    "created_at": "2026-08-04T06:00:00.000Z",
    "expected_close_date": "2026-08-30",
    "closed_at": "2026-08-30T13:11:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 537,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado.",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b042",
    "title": "UD171 · BOG → JFK",
    "passenger_id": "p06",
    "flight_id": "f017",
    "owner_id": "u6",
    "stage_id": "s5",
    "amount": 639,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 4.9,
    "created_at": "2026-08-04T10:00:00.000Z",
    "expected_close_date": "2026-08-26",
    "closed_at": "2026-08-26T17:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 575.1,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (4.9 kg).",
        "500 puntos de lealtad extra por vuelo largo (5.8 horas)."
      ]
    }
  },
  {
    "id": "b043",
    "title": "UD189 · MDE → MAD",
    "passenger_id": "p01",
    "flight_id": "f021",
    "owner_id": "u6",
    "stage_id": "s5",
    "amount": 832,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": true,
    "luggage_weight": 1.5,
    "created_at": "2026-08-05T05:00:00.000Z",
    "expected_close_date": "2026-08-28",
    "closed_at": "2026-08-28T17:51:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 748.8000000000001,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (1.5 kg)."
      ]
    }
  },
  {
    "id": "b044",
    "title": "UD127 · MDE → CTG",
    "passenger_id": "p18",
    "flight_id": "f031",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 107,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 26.3,
    "created_at": "2026-08-05T08:00:00.000Z",
    "expected_close_date": "2026-09-21",
    "closed_at": "2026-09-21T15:09:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 107,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (26.3 kg).",
        "Equipaje no permitido: 26.3 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b045",
    "title": "UD130 · BOG → CLO",
    "passenger_id": "p21",
    "flight_id": "f028",
    "owner_id": "u6",
    "stage_id": "s5",
    "amount": 96,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 21.5,
    "created_at": "2026-08-07T06:00:00.000Z",
    "expected_close_date": "2026-09-08",
    "closed_at": "2026-09-08T14:02:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 96,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 21.5 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b046",
    "title": "UD189 · MDE → MAD",
    "passenger_id": "p25",
    "flight_id": "f021",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 828,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 5.2,
    "created_at": "2026-08-07T11:00:00.000Z",
    "expected_close_date": "2026-08-28",
    "closed_at": "2026-08-28T16:51:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 745.2,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (5.2 kg)."
      ]
    }
  },
  {
    "id": "b047",
    "title": "UD150 · MDE → MIA",
    "passenger_id": "p18",
    "flight_id": "f032",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 362,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 15.3,
    "created_at": "2026-08-08T11:00:00.000Z",
    "expected_close_date": "2026-09-22",
    "closed_at": "2026-09-22T15:17:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 362,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b048",
    "title": "UD192 · BOG → MAD",
    "passenger_id": "p07",
    "flight_id": "f013",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 1094,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 11.5,
    "created_at": "2026-08-09T11:00:00.000Z",
    "expected_close_date": "2026-08-23",
    "closed_at": "2026-08-23T18:39:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1094,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b049",
    "title": "UD116 · BOG → CTG",
    "passenger_id": "p13",
    "flight_id": "f020",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 120,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 27.1,
    "created_at": "2026-08-11T08:00:00.000Z",
    "expected_close_date": "2026-08-27",
    "closed_at": "2026-08-27T18:04:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 120,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (27.1 kg).",
        "Equipaje no permitido: 27.1 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b050",
    "title": "UD164 · BOG → MEX",
    "passenger_id": "p37",
    "flight_id": "f023",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 513,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 18.6,
    "created_at": "2026-08-13T09:00:00.000Z",
    "expected_close_date": "2026-08-30",
    "closed_at": "2026-08-30T13:11:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 513,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b051",
    "title": "UD142 · BOG → BAQ",
    "passenger_id": "p25",
    "flight_id": "f019",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 133,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 21.5,
    "created_at": "2026-08-17T05:00:00.000Z",
    "expected_close_date": "2026-08-27",
    "closed_at": "2026-08-27T13:13:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 133,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 21.5 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b052",
    "title": "UD142 · BOG → BAQ",
    "passenger_id": "p42",
    "flight_id": "f019",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 138,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 1.3,
    "created_at": "2026-08-17T05:00:00.000Z",
    "expected_close_date": "2026-08-27",
    "closed_at": "2026-08-27T17:13:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 124.2,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (1.3 kg)."
      ]
    }
  },
  {
    "id": "b053",
    "title": "UD198 · BOG → MAD",
    "passenger_id": "p08",
    "flight_id": "f025",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 976,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 1.8,
    "created_at": "2026-08-18T07:00:00.000Z",
    "expected_close_date": "2026-09-05",
    "closed_at": "2026-09-05T16:16:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 878.4,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (1.8 kg)."
      ]
    }
  },
  {
    "id": "b054",
    "title": "UD188 · MDE → MAD",
    "passenger_id": "p48",
    "flight_id": "f036",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 857,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": true,
    "luggage_weight": 14.5,
    "created_at": "2026-08-19T09:00:00.000Z",
    "expected_close_date": "2026-09-29",
    "closed_at": "2026-09-29T13:02:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 857,
      "upgradeEligible": true,
      "assignedSeat": "Asiento preferencial para familias",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights",
        "PreferentialSeatForFamilies"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (9.8 horas).",
        "Asiento preferencial para familias asignado por viajar con niños."
      ]
    }
  },
  {
    "id": "b055",
    "title": "UD188 · MDE → MAD",
    "passenger_id": "p07",
    "flight_id": "f036",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 1031,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 20.8,
    "created_at": "2026-08-19T10:00:00.000Z",
    "expected_close_date": "2026-09-29",
    "closed_at": "2026-09-29T16:02:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1031,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (9.8 horas)."
      ]
    }
  },
  {
    "id": "b056",
    "title": "UD116 · BOG → CTG",
    "passenger_id": "p34",
    "flight_id": "f020",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 140,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 30.4,
    "created_at": "2026-08-21T06:00:00.000Z",
    "expected_close_date": "2026-08-27",
    "closed_at": "2026-08-27T16:04:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 140,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (30.4 kg).",
        "Equipaje no permitido: 30.4 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b057",
    "title": "UD142 · BOG → BAQ",
    "passenger_id": "p24",
    "flight_id": "f016",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 124,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 15.3,
    "created_at": "2026-08-21T11:00:00.000Z",
    "expected_close_date": "2026-08-25",
    "closed_at": "2026-08-25T13:11:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 124,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 15.3 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b058",
    "title": "UD153 · MDE → MIA",
    "passenger_id": "p22",
    "flight_id": "f024",
    "owner_id": "u6",
    "stage_id": "s5",
    "amount": 302,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 11.1,
    "created_at": "2026-08-22T09:00:00.000Z",
    "expected_close_date": "2026-09-04",
    "closed_at": "2026-09-04T17:06:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 302,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b059",
    "title": "UD150 · MDE → MIA",
    "passenger_id": "p13",
    "flight_id": "f032",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 402,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 6.1,
    "created_at": "2026-08-25T09:00:00.000Z",
    "expected_close_date": "2026-09-22",
    "closed_at": "2026-09-22T16:17:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 361.8,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (6.1 kg)."
      ]
    }
  },
  {
    "id": "b060",
    "title": "UD112 · BOG → CTG",
    "passenger_id": "p20",
    "flight_id": "f026",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 147,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 11.3,
    "created_at": "2026-08-25T10:00:00.000Z",
    "expected_close_date": "2026-09-07",
    "closed_at": "2026-09-07T17:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 147,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b061",
    "title": "UD164 · BOG → MEX",
    "passenger_id": "p40",
    "flight_id": "f037",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 522,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 16.6,
    "created_at": "2026-08-27T10:00:00.000Z",
    "expected_close_date": "2026-10-07",
    "closed_at": "2026-10-07T16:07:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Ejecutiva",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 522,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "UpgradeToBusinessClassForFrequentFlyersWithDelays",
        "AssignEmergencyExitSeatToYoungAdults",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Ascenso a clase ejecutiva por ser pasajero Gold con un retraso de 127 minutos.",
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado.",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b062",
    "title": "UD130 · BOG → CLO",
    "passenger_id": "p04",
    "flight_id": "f028",
    "owner_id": "u6",
    "stage_id": "s6",
    "amount": 77,
    "currency": "USD",
    "status": "lost",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 22.1,
    "created_at": "2026-08-28T04:00:00.000Z",
    "expected_close_date": "2026-09-08",
    "closed_at": "2026-09-06T04:00:00.000Z",
    "loss_reason": "Cambio a la competencia",
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 77,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Equipaje no permitido: 22.1 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b063",
    "title": "UD102 · MDE → BOG",
    "passenger_id": "p25",
    "flight_id": "f030",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 94,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 16.4,
    "created_at": "2026-08-28T10:00:00.000Z",
    "expected_close_date": "2026-09-14",
    "closed_at": "2026-09-14T13:12:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 94,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 16.4 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b064",
    "title": "UD124 · MDE → CTG",
    "passenger_id": "p01",
    "flight_id": "f039",
    "owner_id": "u6",
    "stage_id": "s5",
    "amount": 108,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": true,
    "luggage_weight": 11.8,
    "created_at": "2026-09-02T10:00:00.000Z",
    "expected_close_date": "2026-10-10",
    "closed_at": "2026-10-10T14:07:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 108,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b065",
    "title": "UD164 · BOG → MEX",
    "passenger_id": "p29",
    "flight_id": "f037",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 453,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 1.2,
    "created_at": "2026-09-05T05:00:00.000Z",
    "expected_close_date": "2026-10-07",
    "closed_at": "2026-10-07T15:07:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 407.7,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (1.2 kg)."
      ]
    }
  },
  {
    "id": "b066",
    "title": "UD196 · BOG → MAD",
    "passenger_id": "p03",
    "flight_id": "f041",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 933,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 11.5,
    "created_at": "2026-09-08T08:00:00.000Z",
    "expected_close_date": "2026-10-12",
    "closed_at": "2026-10-12T20:43:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Ejecutiva",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 933,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 200,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "UpgradeToBusinessClassForFrequentFlyersWithDelays",
        "CompensationForExtremeDelays",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Ascenso a clase ejecutiva por ser pasajero Gold con un retraso de 223 minutos.",
        "Compensación de $200 por un retraso de 223 minutos.",
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b067",
    "title": "UD166 · BOG → MEX",
    "passenger_id": "p30",
    "flight_id": "f042",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 507,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 30.4,
    "created_at": "2026-09-09T09:00:00.000Z",
    "expected_close_date": "2026-10-18",
    "closed_at": "2026-10-18T13:43:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 507,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "PriorityCheckInForSeniors"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (30.4 kg).",
        "Check-in prioritario activado por ser mayor de 65 años."
      ]
    }
  },
  {
    "id": "b068",
    "title": "UD164 · BOG → MEX",
    "passenger_id": "p43",
    "flight_id": "f037",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 418,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": true,
    "luggage_weight": 20.8,
    "created_at": "2026-09-13T05:00:00.000Z",
    "expected_close_date": "2026-10-07",
    "closed_at": "2026-10-07T15:07:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 418,
      "upgradeEligible": true,
      "assignedSeat": "Asiento preferencial para familias",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PreferentialSeatForFamilies"
      ],
      "messages": [
        "Asiento preferencial para familias asignado por viajar con niños."
      ]
    }
  },
  {
    "id": "b069",
    "title": "UD177 · BOG → JFK",
    "passenger_id": "p12",
    "flight_id": "f043",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 548,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 30.6,
    "created_at": "2026-09-13T10:00:00.000Z",
    "expected_close_date": "2026-10-23",
    "closed_at": "2026-10-23T16:09:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 548,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (30.6 kg)."
      ]
    }
  },
  {
    "id": "b070",
    "title": "UD128 · MDE → CTG",
    "passenger_id": "p30",
    "flight_id": "f035",
    "owner_id": "u4",
    "stage_id": "s5",
    "amount": 110,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 25.4,
    "created_at": "2026-09-16T06:00:00.000Z",
    "expected_close_date": "2026-09-28",
    "closed_at": "2026-09-28T14:02:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 110,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "PriorityCheckInForSeniors",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (25.4 kg).",
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Equipaje no permitido: 25.4 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b071",
    "title": "UD188 · MDE → MAD",
    "passenger_id": "p31",
    "flight_id": "f036",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 1005,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 19.8,
    "created_at": "2026-09-16T12:00:00.000Z",
    "expected_close_date": "2026-09-29",
    "closed_at": "2026-09-29T13:02:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1005,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights",
        "VipLoungeAccessForPlatinumMembers"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (9.8 horas).",
        "Acceso al salón VIP por membresía Platinum."
      ]
    }
  },
  {
    "id": "b072",
    "title": "UD123 · MDE → CTG",
    "passenger_id": "p09",
    "flight_id": "f052",
    "owner_id": "u4",
    "stage_id": "s4",
    "amount": 94,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": true,
    "luggage_weight": 14.5,
    "created_at": "2026-09-18T08:00:00.000Z",
    "expected_close_date": "2026-11-05",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 94,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b073",
    "title": "UD127 · MDE → CTG",
    "passenger_id": "p37",
    "flight_id": "f031",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 103,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 13.5,
    "created_at": "2026-09-18T12:00:00.000Z",
    "expected_close_date": "2026-09-21",
    "closed_at": "2026-09-21T13:09:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 103,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b074",
    "title": "UD178 · BOG → JFK",
    "passenger_id": "p31",
    "flight_id": "f055",
    "owner_id": "u4",
    "stage_id": "s4",
    "amount": 565,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 18.5,
    "created_at": "2026-09-22T07:00:00.000Z",
    "expected_close_date": "2026-11-06",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 565,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights",
        "VipLoungeAccessForPlatinumMembers"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (5.8 horas).",
        "Acceso al salón VIP por membresía Platinum."
      ]
    }
  },
  {
    "id": "b075",
    "title": "UD147 · BOG → BAQ",
    "passenger_id": "p34",
    "flight_id": "f063",
    "owner_id": "u2",
    "stage_id": "s3",
    "amount": 103,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 17.9,
    "created_at": "2026-09-22T11:00:00.000Z",
    "expected_close_date": "2026-11-09",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 103,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 17.9 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b076",
    "title": "UD152 · MDE → MIA",
    "passenger_id": "p32",
    "flight_id": "f049",
    "owner_id": "u2",
    "stage_id": "s4",
    "amount": 325,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": true,
    "luggage_weight": 30.8,
    "created_at": "2026-09-23T04:00:00.000Z",
    "expected_close_date": "2026-11-05",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 325,
      "upgradeEligible": false,
      "assignedSeat": "Asiento preferencial para familias",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "PreferentialSeatForFamilies"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (30.8 kg).",
        "Asiento preferencial para familias asignado por viajar con niños."
      ]
    }
  },
  {
    "id": "b077",
    "title": "UD102 · MDE → BOG",
    "passenger_id": "p45",
    "flight_id": "f050",
    "owner_id": "u1",
    "stage_id": "s4",
    "amount": 110,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 5.1,
    "created_at": "2026-09-23T08:00:00.000Z",
    "expected_close_date": "2026-11-05",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 99,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (5.1 kg).",
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b078",
    "title": "UD136 · BOG → CLO",
    "passenger_id": "p15",
    "flight_id": "f044",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 87,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 1.4,
    "created_at": "2026-09-23T11:00:00.000Z",
    "expected_close_date": "2026-10-26",
    "closed_at": "2026-10-26T15:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 10,
      "finalPrice": 78.3,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors",
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Descuento del 10% por equipaje liviano (1.4 kg)."
      ]
    }
  },
  {
    "id": "b079",
    "title": "UD128 · MDE → CTG",
    "passenger_id": "p47",
    "flight_id": "f035",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 120,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": true,
    "luggage_weight": 11.1,
    "created_at": "2026-09-24T07:00:00.000Z",
    "expected_close_date": "2026-09-28",
    "closed_at": "2026-09-28T15:02:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 120,
      "upgradeEligible": true,
      "assignedSeat": "Asiento preferencial para familias",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "VipLoungeAccessForPlatinumMembers",
        "PreferentialSeatForFamilies"
      ],
      "messages": [
        "Acceso al salón VIP por membresía Platinum.",
        "Asiento preferencial para familias asignado por viajar con niños."
      ]
    }
  },
  {
    "id": "b080",
    "title": "UD136 · BOG → CLO",
    "passenger_id": "p22",
    "flight_id": "f044",
    "owner_id": "u6",
    "stage_id": "s5",
    "amount": 90,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 21.3,
    "created_at": "2026-09-24T09:00:00.000Z",
    "expected_close_date": "2026-10-26",
    "closed_at": "2026-10-26T17:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 90,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 21.3 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b081",
    "title": "UD149 · BOG → BAQ",
    "passenger_id": "p11",
    "flight_id": "f058",
    "owner_id": "u2",
    "stage_id": "s2",
    "amount": 118,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 7,
    "created_at": "2026-09-27T08:00:00.000Z",
    "expected_close_date": "2026-11-07",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 106.2,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (7.0 kg).",
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b082",
    "title": "UD124 · MDE → CTG",
    "passenger_id": "p06",
    "flight_id": "f039",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 126,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 20.6,
    "created_at": "2026-09-28T07:00:00.000Z",
    "expected_close_date": "2026-10-10",
    "closed_at": "2026-10-10T17:07:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 126,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 20.6 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b083",
    "title": "UD188 · MDE → MAD",
    "passenger_id": "p28",
    "flight_id": "f047",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 941,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 10.7,
    "created_at": "2026-09-29T12:00:00.000Z",
    "expected_close_date": "2026-11-03",
    "closed_at": "2026-11-03T16:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 941,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights",
        "VipLoungeAccessForPlatinumMembers"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (9.8 horas).",
        "Acceso al salón VIP por membresía Platinum."
      ]
    }
  },
  {
    "id": "b084",
    "title": "UD123 · MDE → CTG",
    "passenger_id": "p30",
    "flight_id": "f052",
    "owner_id": "u1",
    "stage_id": "s4",
    "amount": 109,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 31.2,
    "created_at": "2026-09-30T04:00:00.000Z",
    "expected_close_date": "2026-11-05",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 109,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "PriorityCheckInForSeniors",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (31.2 kg).",
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Equipaje no permitido: 31.2 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b085",
    "title": "UD164 · BOG → MEX",
    "passenger_id": "p27",
    "flight_id": "f037",
    "owner_id": "u5",
    "stage_id": "s5",
    "amount": 435,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 7.5,
    "created_at": "2026-10-01T09:00:00.000Z",
    "expected_close_date": "2026-10-07",
    "closed_at": "2026-10-07T18:07:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 10,
      "finalPrice": 391.5,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors",
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Descuento del 10% por equipaje liviano (7.5 kg)."
      ]
    }
  },
  {
    "id": "b086",
    "title": "UD178 · BOG → JFK",
    "passenger_id": "p38",
    "flight_id": "f055",
    "owner_id": "u1",
    "stage_id": "s4",
    "amount": 603,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 29.1,
    "created_at": "2026-10-03T07:00:00.000Z",
    "expected_close_date": "2026-11-06",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 603,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (29.1 kg)."
      ]
    }
  },
  {
    "id": "b087",
    "title": "UD132 · BOG → CLO",
    "passenger_id": "p02",
    "flight_id": "f062",
    "owner_id": "u2",
    "stage_id": "s3",
    "amount": 90,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 20.4,
    "created_at": "2026-10-03T09:00:00.000Z",
    "expected_close_date": "2026-11-08",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 90,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado.",
        "Equipaje no permitido: 20.4 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b088",
    "title": "UD127 · MDE → CTG",
    "passenger_id": "p20",
    "flight_id": "f046",
    "owner_id": "u3",
    "stage_id": "s5",
    "amount": 125,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 10.5,
    "created_at": "2026-10-05T08:00:00.000Z",
    "expected_close_date": "2026-10-31",
    "closed_at": "2026-10-31T15:08:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 125,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b089",
    "title": "UD188 · MDE → MAD",
    "passenger_id": "p28",
    "flight_id": "f047",
    "owner_id": "u2",
    "stage_id": "s5",
    "amount": 1060,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 14.4,
    "created_at": "2026-10-07T04:00:00.000Z",
    "expected_close_date": "2026-11-03",
    "closed_at": "2026-11-03T13:10:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1060,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights",
        "VipLoungeAccessForPlatinumMembers"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (9.8 horas).",
        "Acceso al salón VIP por membresía Platinum."
      ]
    }
  },
  {
    "id": "b090",
    "title": "UD178 · BOG → JFK",
    "passenger_id": "p25",
    "flight_id": "f055",
    "owner_id": "u4",
    "stage_id": "s3",
    "amount": 598,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 14.3,
    "created_at": "2026-10-07T08:00:00.000Z",
    "expected_close_date": "2026-11-06",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 598,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b091",
    "title": "UD147 · BOG → BAQ",
    "passenger_id": "p04",
    "flight_id": "f063",
    "owner_id": "u5",
    "stage_id": "s2",
    "amount": 115,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 20.2,
    "created_at": "2026-10-09T08:00:00.000Z",
    "expected_close_date": "2026-11-09",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 115,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Equipaje no permitido: 20.2 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b092",
    "title": "UD110 · BOG → CTG",
    "passenger_id": "p15",
    "flight_id": "f048",
    "owner_id": "u5",
    "stage_id": "s4",
    "amount": 113,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 25.4,
    "created_at": "2026-10-09T09:00:00.000Z",
    "expected_close_date": "2026-11-05",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 113,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "PriorityCheckInForSeniors",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (25.4 kg).",
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Equipaje no permitido: 25.4 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b093",
    "title": "UD199 · BOG → MAD",
    "passenger_id": "p47",
    "flight_id": "f073",
    "owner_id": "u2",
    "stage_id": "s1",
    "amount": 998,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 30.4,
    "created_at": "2026-10-09T10:00:00.000Z",
    "expected_close_date": "2026-11-28",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 998,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "ExtraLoyaltyPointsForLongFlights",
        "VipLoungeAccessForPlatinumMembers"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (30.4 kg).",
        "500 puntos de lealtad extra por vuelo largo (10.3 horas).",
        "Acceso al salón VIP por membresía Platinum."
      ]
    }
  },
  {
    "id": "b094",
    "title": "UD172 · BOG → JFK",
    "passenger_id": "p16",
    "flight_id": "f061",
    "owner_id": "u6",
    "stage_id": "s6",
    "amount": 585,
    "currency": "USD",
    "status": "lost",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 11.6,
    "created_at": "2026-10-10T11:00:00.000Z",
    "expected_close_date": "2026-11-08",
    "closed_at": "2026-10-13T11:00:00.000Z",
    "loss_reason": "No-show (no se presentó)",
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 585,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b095",
    "title": "UD106 · MDE → BOG",
    "passenger_id": "p48",
    "flight_id": "f053",
    "owner_id": "u5",
    "stage_id": "s4",
    "amount": 81,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 7.3,
    "created_at": "2026-10-11T04:00:00.000Z",
    "expected_close_date": "2026-11-06",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 72.9,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (7.3 kg)."
      ]
    }
  },
  {
    "id": "b096",
    "title": "UD130 · BOG → CLO",
    "passenger_id": "p15",
    "flight_id": "f059",
    "owner_id": "u5",
    "stage_id": "s3",
    "amount": 92,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 30.3,
    "created_at": "2026-10-12T12:00:00.000Z",
    "expected_close_date": "2026-11-07",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 92,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "PriorityCheckInForSeniors",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (30.3 kg).",
        "Check-in prioritario activado por ser mayor de 65 años.",
        "Equipaje no permitido: 30.3 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b097",
    "title": "UD160 · BOG → MEX",
    "passenger_id": "p45",
    "flight_id": "f070",
    "owner_id": "u1",
    "stage_id": "s1",
    "amount": 416,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 14.9,
    "created_at": "2026-10-13T06:00:00.000Z",
    "expected_close_date": "2026-11-21",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 416,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b098",
    "title": "UD188 · MDE → MAD",
    "passenger_id": "p42",
    "flight_id": "f069",
    "owner_id": "u5",
    "stage_id": "s2",
    "amount": 904,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 11.8,
    "created_at": "2026-10-13T07:00:00.000Z",
    "expected_close_date": "2026-11-17",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 904,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b099",
    "title": "UD121 · MDE → CTG",
    "passenger_id": "p39",
    "flight_id": "f057",
    "owner_id": "u1",
    "stage_id": "s3",
    "amount": 126,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 3.6,
    "created_at": "2026-10-16T06:00:00.000Z",
    "expected_close_date": "2026-11-07",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 113.4,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (3.6 kg).",
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b100",
    "title": "UD121 · MDE → CTG",
    "passenger_id": "p29",
    "flight_id": "f057",
    "owner_id": "u1",
    "stage_id": "s3",
    "amount": 109,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 15.4,
    "created_at": "2026-10-16T07:00:00.000Z",
    "expected_close_date": "2026-11-07",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 109,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 15.4 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b101",
    "title": "UD179 · BOG → JFK",
    "passenger_id": "p44",
    "flight_id": "f060",
    "owner_id": "u1",
    "stage_id": "s3",
    "amount": 711,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 2.3,
    "created_at": "2026-10-17T08:00:00.000Z",
    "expected_close_date": "2026-11-08",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 639.9,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (2.3 kg).",
        "500 puntos de lealtad extra por vuelo largo (5.8 horas)."
      ]
    }
  },
  {
    "id": "b102",
    "title": "UD121 · MDE → CTG",
    "passenger_id": "p22",
    "flight_id": "f057",
    "owner_id": "u5",
    "stage_id": "s3",
    "amount": 110,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 4.6,
    "created_at": "2026-10-18T05:00:00.000Z",
    "expected_close_date": "2026-11-07",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 99,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (4.6 kg)."
      ]
    }
  },
  {
    "id": "b103",
    "title": "UD152 · MDE → MIA",
    "passenger_id": "p10",
    "flight_id": "f049",
    "owner_id": "u6",
    "stage_id": "s4",
    "amount": 320,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 10.4,
    "created_at": "2026-10-18T08:00:00.000Z",
    "expected_close_date": "2026-11-05",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 320,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b104",
    "title": "UD160 · BOG → MEX",
    "passenger_id": "p32",
    "flight_id": "f064",
    "owner_id": "u2",
    "stage_id": "s2",
    "amount": 421,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 18.8,
    "created_at": "2026-10-19T04:00:00.000Z",
    "expected_close_date": "2026-11-11",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 421,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b105",
    "title": "UD160 · BOG → MEX",
    "passenger_id": "p47",
    "flight_id": "f070",
    "owner_id": "u1",
    "stage_id": "s2",
    "amount": 501,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 27.6,
    "created_at": "2026-10-19T06:00:00.000Z",
    "expected_close_date": "2026-11-21",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 501,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": true,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "ExtraLoyaltyPointsForLongFlights",
        "VipLoungeAccessForPlatinumMembers"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (27.6 kg).",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas).",
        "Acceso al salón VIP por membresía Platinum."
      ]
    }
  },
  {
    "id": "b106",
    "title": "UD127 · MDE → CTG",
    "passenger_id": "p05",
    "flight_id": "f046",
    "owner_id": "u1",
    "stage_id": "s5",
    "amount": 131,
    "currency": "USD",
    "status": "won",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 12.7,
    "created_at": "2026-10-22T06:00:00.000Z",
    "expected_close_date": "2026-10-31",
    "closed_at": "2026-10-31T16:08:00.000Z",
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 131,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años."
      ]
    }
  },
  {
    "id": "b107",
    "title": "UD178 · BOG → JFK",
    "passenger_id": "p17",
    "flight_id": "f055",
    "owner_id": "u5",
    "stage_id": "s4",
    "amount": 621,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 13.5,
    "created_at": "2026-10-22T06:00:00.000Z",
    "expected_close_date": "2026-11-06",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 621,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (5.8 horas)."
      ]
    }
  },
  {
    "id": "b108",
    "title": "UD130 · BOG → CLO",
    "passenger_id": "p42",
    "flight_id": "f059",
    "owner_id": "u5",
    "stage_id": "s3",
    "amount": 100,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 10.8,
    "created_at": "2026-10-23T07:00:00.000Z",
    "expected_close_date": "2026-11-07",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 100,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b109",
    "title": "UD106 · MDE → BOG",
    "passenger_id": "p34",
    "flight_id": "f077",
    "owner_id": "u4",
    "stage_id": "s1",
    "amount": 91,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 10.1,
    "created_at": "2026-10-23T07:00:00.000Z",
    "expected_close_date": "2026-12-08",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 91,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b110",
    "title": "UD144 · BOG → BAQ",
    "passenger_id": "p23",
    "flight_id": "f076",
    "owner_id": "u4",
    "stage_id": "s1",
    "amount": 105,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 3.5,
    "created_at": "2026-10-24T07:00:00.000Z",
    "expected_close_date": "2026-12-06",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 94.5,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (3.5 kg)."
      ]
    }
  },
  {
    "id": "b111",
    "title": "UD123 · MDE → CTG",
    "passenger_id": "p21",
    "flight_id": "f052",
    "owner_id": "u5",
    "stage_id": "s4",
    "amount": 103,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 27.8,
    "created_at": "2026-10-26T04:00:00.000Z",
    "expected_close_date": "2026-11-05",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 103,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (27.8 kg).",
        "Equipaje no permitido: 27.8 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b112",
    "title": "UD199 · BOG → MAD",
    "passenger_id": "p07",
    "flight_id": "f073",
    "owner_id": "u1",
    "stage_id": "s1",
    "amount": 1081,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 14.9,
    "created_at": "2026-10-26T06:00:00.000Z",
    "expected_close_date": "2026-11-28",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1081,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b113",
    "title": "UD142 · BOG → BAQ",
    "passenger_id": "p27",
    "flight_id": "f071",
    "owner_id": "u3",
    "stage_id": "s2",
    "amount": 121,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 12,
    "created_at": "2026-10-26T08:00:00.000Z",
    "expected_close_date": "2026-11-21",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": true,
      "discountPercentage": 0,
      "finalPrice": 121,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PriorityCheckInForSeniors"
      ],
      "messages": [
        "Check-in prioritario activado por ser mayor de 65 años."
      ]
    }
  },
  {
    "id": "b114",
    "title": "UD160 · BOG → MEX",
    "passenger_id": "p48",
    "flight_id": "f064",
    "owner_id": "u3",
    "stage_id": "s2",
    "amount": 466,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 9,
    "created_at": "2026-10-27T06:00:00.000Z",
    "expected_close_date": "2026-11-11",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 419.40000000000003,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "AssignEmergencyExitSeatToYoungAdults",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (9.0 kg).",
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado.",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b115",
    "title": "UD144 · BOG → BAQ",
    "passenger_id": "p11",
    "flight_id": "f076",
    "owner_id": "u3",
    "stage_id": "s2",
    "amount": 142,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Aisle",
    "traveling_with_children": true,
    "luggage_weight": 29.3,
    "created_at": "2026-10-27T11:00:00.000Z",
    "expected_close_date": "2026-12-06",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 142,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (29.3 kg).",
        "Equipaje no permitido: 29.3 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b116",
    "title": "UD123 · MDE → CTG",
    "passenger_id": "p06",
    "flight_id": "f052",
    "owner_id": "u5",
    "stage_id": "s4",
    "amount": 132,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 17.4,
    "created_at": "2026-10-28T08:00:00.000Z",
    "expected_close_date": "2026-11-05",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 132,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "Equipaje no permitido: 17.4 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b117",
    "title": "UD191 · BOG → MAD",
    "passenger_id": "p39",
    "flight_id": "f068",
    "owner_id": "u4",
    "stage_id": "s2",
    "amount": 935,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 16,
    "created_at": "2026-10-28T12:00:00.000Z",
    "expected_close_date": "2026-11-15",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 935,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b118",
    "title": "UD199 · BOG → MAD",
    "passenger_id": "p37",
    "flight_id": "f073",
    "owner_id": "u3",
    "stage_id": "s2",
    "amount": 1093,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": true,
    "luggage_weight": 0.2,
    "created_at": "2026-10-29T08:00:00.000Z",
    "expected_close_date": "2026-11-28",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 983.7,
      "upgradeEligible": true,
      "assignedSeat": "Asiento preferencial para familias",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "ExtraLoyaltyPointsForLongFlights",
        "PreferentialSeatForFamilies"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (0.2 kg).",
        "500 puntos de lealtad extra por vuelo largo (10.3 horas).",
        "Asiento preferencial para familias asignado por viajar con niños."
      ]
    }
  },
  {
    "id": "b119",
    "title": "UD190 · BOG → MAD",
    "passenger_id": "p11",
    "flight_id": "f067",
    "owner_id": "u5",
    "stage_id": "s2",
    "amount": 1027,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": true,
    "luggage_weight": 11.5,
    "created_at": "2026-10-30T10:00:00.000Z",
    "expected_close_date": "2026-11-14",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 1027,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b120",
    "title": "UD106 · MDE → BOG",
    "passenger_id": "p39",
    "flight_id": "f077",
    "owner_id": "u1",
    "stage_id": "s2",
    "amount": 102,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 2.6,
    "created_at": "2026-10-30T10:00:00.000Z",
    "expected_close_date": "2026-12-08",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 91.8,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "AssignEmergencyExitSeatToYoungAdults"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (2.6 kg).",
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado."
      ]
    }
  },
  {
    "id": "b121",
    "title": "UD167 · BOG → MEX",
    "passenger_id": "p40",
    "flight_id": "f078",
    "owner_id": "u6",
    "stage_id": "s2",
    "amount": 533,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 10.3,
    "created_at": "2026-10-30T12:00:00.000Z",
    "expected_close_date": "2026-12-10",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 533,
      "upgradeEligible": true,
      "assignedSeat": "Salida de emergencia",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "AssignEmergencyExitSeatToYoungAdults",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Asiento de salida de emergencia asignado; el asiento queda marcado como ocupado.",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b122",
    "title": "UD110 · BOG → CTG",
    "passenger_id": "p02",
    "flight_id": "f048",
    "owner_id": "u4",
    "stage_id": "s4",
    "amount": 133,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": true,
    "luggage_weight": 14.4,
    "created_at": "2026-10-31T09:00:00.000Z",
    "expected_close_date": "2026-11-05",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 133,
      "upgradeEligible": true,
      "assignedSeat": "Asiento preferencial para familias",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "PreferentialSeatForFamilies"
      ],
      "messages": [
        "Asiento preferencial para familias asignado por viajar con niños."
      ]
    }
  },
  {
    "id": "b123",
    "title": "UD107 · MDE → BOG",
    "passenger_id": "p22",
    "flight_id": "f074",
    "owner_id": "u3",
    "stage_id": "s1",
    "amount": 85,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 12.3,
    "created_at": "2026-11-01T04:00:00.000Z",
    "expected_close_date": "2026-11-29",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 85,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b124",
    "title": "UD132 · BOG → CLO",
    "passenger_id": "p24",
    "flight_id": "f062",
    "owner_id": "u5",
    "stage_id": "s6",
    "amount": 77,
    "currency": "USD",
    "status": "lost",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 10.1,
    "created_at": "2026-11-01T11:00:00.000Z",
    "expected_close_date": "2026-11-08",
    "closed_at": "2026-11-05T12:00:00.000Z",
    "loss_reason": "Cambio a la competencia",
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 77,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  },
  {
    "id": "b125",
    "title": "UD199 · BOG → MAD",
    "passenger_id": "p26",
    "flight_id": "f073",
    "owner_id": "u2",
    "stage_id": "s1",
    "amount": 968,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 4.5,
    "created_at": "2026-11-01T12:00:00.000Z",
    "expected_close_date": "2026-11-28",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 871.2,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (4.5 kg)."
      ]
    }
  },
  {
    "id": "b126",
    "title": "UD179 · BOG → JFK",
    "passenger_id": "p44",
    "flight_id": "f060",
    "owner_id": "u2",
    "stage_id": "s3",
    "amount": 648,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 17.6,
    "created_at": "2026-11-02T08:00:00.000Z",
    "expected_close_date": "2026-11-08",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 648,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "500 puntos de lealtad extra por vuelo largo (5.8 horas)."
      ]
    }
  },
  {
    "id": "b127",
    "title": "UD106 · MDE → BOG",
    "passenger_id": "p26",
    "flight_id": "f077",
    "owner_id": "u1",
    "stage_id": "s1",
    "amount": 106,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Window",
    "traveling_with_children": false,
    "luggage_weight": 31.2,
    "created_at": "2026-11-03T09:00:00.000Z",
    "expected_close_date": "2026-12-08",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 106,
      "upgradeEligible": false,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": false,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DenyUpgradeForOverweightLuggage",
        "RestrictLuggageOnShortFlights"
      ],
      "messages": [
        "No elegible para ascensos por equipaje con sobrepeso (31.2 kg).",
        "Equipaje no permitido: 31.2 kg supera los 15 kg en un vuelo corto."
      ]
    }
  },
  {
    "id": "b128",
    "title": "UD192 · BOG → MAD",
    "passenger_id": "p13",
    "flight_id": "f079",
    "owner_id": "u2",
    "stage_id": "s1",
    "amount": 907,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Aisle",
    "traveling_with_children": false,
    "luggage_weight": 5,
    "created_at": "2026-11-03T12:00:00.000Z",
    "expected_close_date": "2026-12-12",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 816.3000000000001,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (5.0 kg).",
        "500 puntos de lealtad extra por vuelo largo (10.3 horas)."
      ]
    }
  },
  {
    "id": "b129",
    "title": "UD167 · BOG → MEX",
    "passenger_id": "p33",
    "flight_id": "f078",
    "owner_id": "u2",
    "stage_id": "s6",
    "amount": 385,
    "currency": "USD",
    "status": "lost",
    "seat_preference": "Any",
    "traveling_with_children": false,
    "luggage_weight": 2.5,
    "created_at": "2026-11-05T07:00:00.000Z",
    "expected_close_date": "2026-12-10",
    "closed_at": "2026-11-05T12:00:00.000Z",
    "loss_reason": "No-show (no se presentó)",
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 10,
      "finalPrice": 346.5,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 500,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [
        "DiscountForLightLuggage",
        "ExtraLoyaltyPointsForLongFlights"
      ],
      "messages": [
        "Descuento del 10% por equipaje liviano (2.5 kg).",
        "500 puntos de lealtad extra por vuelo largo (5.2 horas)."
      ]
    }
  },
  {
    "id": "b130",
    "title": "UD172 · BOG → JFK",
    "passenger_id": "p16",
    "flight_id": "f061",
    "owner_id": "u6",
    "stage_id": "s3",
    "amount": 600,
    "currency": "USD",
    "status": "open",
    "seat_preference": "Aisle",
    "traveling_with_children": true,
    "luggage_weight": 10.9,
    "created_at": "2026-11-05T10:00:00.000Z",
    "expected_close_date": "2026-11-08",
    "closed_at": null,
    "loss_reason": null,
    "evaluation": {
      "seatClass": "Económica",
      "priorityCheckIn": false,
      "discountPercentage": 0,
      "finalPrice": 600,
      "upgradeEligible": true,
      "assignedSeat": "Asignación estándar",
      "compensation": 0,
      "extraLoyaltyPoints": 0,
      "luggageAllowed": true,
      "vipLoungeAccess": false,
      "appliedRules": [],
      "messages": []
    }
  }
];
