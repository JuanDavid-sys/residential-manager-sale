/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DashboardState, TowerInfo, Vehicle, Pet, ParkingSpot, PQRS } from './types';

// ==========================================
// STATIC MARKETING DATA
// ==========================================

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export const featuresList: FeatureItem[] = [
  {
    id: "residentes",
    title: "1. Expediente Digital de la Unidad",
    description: "Sepa quién vive dónde, quién es propietario o arrendatario, qué vehículos y mascotas se registran por cada apartamento, con historial inalterable por Ley de Habeas Data.",
    iconName: "Users",
    badge: "Control Central"
  },
  {
    id: "finanzas",
    title: "2. Estados de Cartera & Recaudos",
    description: "Visualice de un vistazo quién está al día y quién debe la cuota de administración, con registros transparentes y pasarela de pago para evitar excusas de 'yo sí transferí'.",
    iconName: "DollarSign",
    badge: "Transparencia"
  },
  {
    id: "comunicacion",
    title: "3. Comunicaciones Oficiales Integradas",
    description: "Envíe comunicados y circulares por portal, WhatsApp e email. Lleve control y acuse de lectura para saber quién leyó los anuncios sin dar lugar a debates abiertos.",
    iconName: "MessageSquare"
  },
  {
    id: "parqueaderos",
    title: "4. Portería Rápida y Organizada",
    description: "Tome control sobre qué vehículo pertenece a qué parqueadero, controle visitantes y paquetería de forma ágil con trazabilidad inmediata en un historial inalterable de ingresos.",
    iconName: "Truck"
  },
  {
    id: "pqrs",
    title: "5. PQRS Auditables y Novedades",
    description: "Sepa qué residente reportó algo y qué empleado está a cargo de resolverlo. Convierta reclamos informales en radicados formales y ordenados que desescalan los conflictos.",
    iconName: "ClipboardCheck"
  },
  {
    id: "reportes",
    title: "6. Auditoría Operacional",
    description: "Consolide novedades, novedades de turnos, asambleas de copropietarios e informes financieros listos en segundos, sin duplicación de datos ni archivos perdidos de Excel.",
    iconName: "BarChart3"
  }
];

export interface PlanItem {
  name: string;
  price: string;
  copLabel: string;
  period: string;
  saving?: string;
  buttonText: string;
  features: string[];
  recommended: boolean;
}

export const planesList: PlanItem[] = [
  {
    name: "Plan Mensual",
    price: "$90.000",
    copLabel: "COP",
    period: "al mes",
    buttonText: "Comenzar gratis (1er Mes Gratis)",
    recommended: false,
    features: [
      "Registro ilimitado de Unidades (Aptos/Casas)",
      "Expedientes digitales de propietarios e inquilinos",
      "Control de Vehículos, Mascotas y Parqueaderos",
      "Módulo de Comunicaciones Oficiales y PQRS",
      "Reportes de morosidad y ocupación básicos"
    ]
  },
  {
    name: "Plan Anual",
    price: "$900.000",
    copLabel: "COP",
    period: "al año",
    saving: "Ahorras $180.000 COP",
    buttonText: "Obtener Plan Anual (Capacitación Incluida)",
    recommended: true,
    features: [
      "Todo lo incluido en el Plan Mensual",
      "Ahorro equivalente a 2 meses gratis",
      "Soporte técnico prioritario 24/7",
      "Capacitación presencial para Portería y Administración",
      "Configuración inicial asistida (Carga inicial de censo)",
      "Módulo avanzado para Empleados y Turnos"
    ]
  }
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqList: FAQItem[] = [
  {
    question: "¿Por qué el sistema de Residential Manager es mejor que usar grupos de WhatsApp y correos?",
    answer: "WhatsApp genera ruido, desorden y falta de privacidad. Los mensajes se pierden, los residentes se quejan en público sin control y no hay un registro formal de PQRS. Residential Manager clasifica los mensajes de forma organizada, permite enviar comunicados por torre (solo a quienes les interesa) y otorga un canal único para quejas y reclamos con número de radicado con total transparencia."
  },
  {
    question: "¿Cómo funciona el cobro de administración y la integración con pagos PSE?",
    answer: "El sistema genera las cuentas de cobro automáticamente al inicio de cada mes calculando el coeficiente de copropiedad e intereses si los hay. El residente recibe la notificación por email o app, pulsa el botón de pago y puede realizar la transacción por PSE, Nequi o Daviplata de forma 100% segura. El dinero llega directo a la cuenta corriente o de ahorros autorizada del conjunto."
  },
  {
    question: "¿Cómo se realiza la importación inicial de todos los datos del conjunto?",
    answer: "No tienes que digitar apartamento por apartamento a mano. En el momento de la contratación, te entregamos una plantilla de Excel muy sencilla para que pegues el censo actual (apartamentos, torres, nombres, cédulas y correos). Nuestro equipo técnico la procesa y en menos de 24 horas hábiles tu conjunto está configurado y listo para despegar."
  }
];

export interface VisionRoadmapItem {
  phase: string;
  title: string;
  tagline: string;
  details: string[];
}

export const visionRoadmapList: VisionRoadmapItem[] = [
  {
    phase: "MÓDULO 1",
    title: "1. Comunicaciones Oficiales Integradas",
    tagline: "Envíe comunicados y notificaciones por WhatsApp, email y portal residencial desde una sola plataforma.",
    details: [
      "Notificaciones Multi-Canal: Circulares urgentes enviadas por correo, portal privado y alertas integradas a WhatsApp.",
      "Registro y Control de Lectura: Trazabilidad real de qué residentes abrieron la circular oficial de la administración.",
      "Gestor de Comunicados por Torre: Segmente la comunicación para avisar únicamente a las unidades afectadas por cortes o mantenimientos.",
      "PQRS Clasificadas: Canal único para radicar quejas, reclamos y sugerencias ordenadamente con número consecutivo."
    ]
  },
  {
    phase: "MÓDULO 2",
    title: "2. Gestión Integral de Seguridad y Vigilancia",
    tagline: "Unifica los contratos de seguridad y audita las rondas en tiempo real.",
    details: [
      "Catálogo de Empresas: Registro y vigencia con la Superintendencia de Vigilancia y Seguridad Privada.",
      "Asignación de Turnos y Rondas: Registros de puntos de control por QR en pasillos, parqueaderos y zonas perimetrales.",
      "Historial de Incidencias: Cuaderno de novedades digitales para reportar vehículos sospechosos, problemas con mascotas o ruidosos."
    ]
  },
  {
    phase: "MÓDULO 3",
    title: "3. Planificación de Limpieza y Mantenimiento",
    tagline: "Cronogramas de aseo transparentes y auditoría física con check-list digital.",
    details: [
      "Planillas de Aseo Digital: Escaneo de códigos QR en áreas comunes para registrar la hora exacta y quién limpió el salón social o el gimnasio.",
      "Mantenimiento de Maquinaria: Gestión de contratos de ascensores, motobombas, transformadores de energía y tanques de reserva de agua programados."
    ]
  },
  {
    phase: "MÓDULO 4",
    title: "4. Finanzas y Coeficientes Copropiedad",
    tagline: "Contabilidad y leyes unificadas para el contador y revisor fiscal.",
    details: [
      "Coeficientes Automáticos: Cálculo de las cuotas de administración exactas basadas en el área privada estipulada en las escrituras.",
      "Libros Oficiales de PH: Actas del Consejo, Libro de Bancos conciliados, y Generación ágil de Paz y Salvos con firma digital criptográfica de la administración."
    ]
  }
];

// ==========================================
// INITIAL DATABASE SIMULATION STATE
// ==========================================

export const createInitialState = (): DashboardState => {
  const towers: TowerInfo[] = [
    {
      id: "torre_a",
      name: "Torre A",
      apartments: [
        { id: "A-101", towerId: "torre_a", number: "101", occupied: true, ownerName: "Juan Carlos Montoya", residentCount: 3, contactEmail: "j.montoya@gmail.com" },
        { id: "A-102", towerId: "torre_a", number: "102", occupied: true, ownerName: "Marcela Bermúdez", residentCount: 4, contactEmail: "m.bermudez@outlook.com" },
        { id: "A-201", towerId: "torre_a", number: "201", occupied: false, ownerName: "Liliana Rincón", residentCount: 0, contactEmail: "l.rincon@gmail.com" },
        { id: "A-202", towerId: "torre_a", number: "202", occupied: true, ownerName: "Pedro Nel Restrepo", residentCount: 2, contactEmail: "pedro.restrepo@php.com" },
        { id: "A-301", towerId: "torre_a", number: "301", occupied: true, ownerName: "Claudia Gómez", residentCount: 5, contactEmail: "claudita@gmail.com" },
        { id: "A-302", towerId: "torre_a", number: "302", occupied: true, ownerName: "Camilo Torres", residentCount: 1, contactEmail: "ctorres@outlook.com" },
        { id: "A-401", towerId: "torre_a", number: "401", occupied: true, ownerName: "Alejandro Alzate", residentCount: 3, contactEmail: "alejo.alzate@gmail.com" },
        { id: "A-402", towerId: "torre_a", number: "402", occupied: false, ownerName: "Inmobiliaria Éxito", residentCount: 0, contactEmail: "arriendos@inmoexito.co" }
      ]
    },
    {
      id: "torre_b",
      name: "Torre B",
      apartments: [
        { id: "B-101", towerId: "torre_b", number: "101", occupied: true, ownerName: "María Camila Díaz", residentCount: 2, contactEmail: "mcdiaz@gmail.com" },
        { id: "B-102", towerId: "torre_b", number: "102", occupied: true, ownerName: "Julio César Pinzón", residentCount: 3, contactEmail: "juliopinzon@hotmail.com" },
        { id: "B-201", towerId: "torre_b", number: "201", occupied: true, ownerName: "Silvia Helena Castro", residentCount: 2, contactEmail: "silvita@gmail.com" },
        { id: "B-202", towerId: "torre_b", number: "202", occupied: true, ownerName: "Gustavo Petrocelli", residentCount: 4, contactEmail: "gustavo.p@hotmail.com" },
        { id: "B-301", towerId: "torre_b", number: "301", occupied: false, ownerName: "Diana María López", residentCount: 0, contactEmail: "dlopez@gmail.com" },
        { id: "B-302", towerId: "torre_b", number: "302", occupied: true, ownerName: "Guillermo León", residentCount: 3, contactEmail: "guille.leon@outlook.com" },
        { id: "B-401", towerId: "torre_b", number: "401", occupied: true, ownerName: "Amparo Grisales (Apt)", residentCount: 2, contactEmail: "amparo@me.com" },
        { id: "B-402", towerId: "torre_b", number: "402", occupied: true, ownerName: "René Higuita (Apt)", residentCount: 5, contactEmail: "rincon-rene@higuita.net" }
      ]
    },
    {
      id: "torre_c",
      name: "Torre C",
      apartments: [
        { id: "C-101", towerId: "torre_c", number: "101", occupied: true, ownerName: "Wilson Antonio Ochoa", residentCount: 4, contactEmail: "wilson@gmail.com" },
        { id: "C-102", towerId: "torre_c", number: "102", occupied: true, ownerName: "Sonia Patricia Rojas", residentCount: 3, contactEmail: "sonia@gmail.com" },
        { id: "C-201", towerId: "torre_c", number: "201", occupied: true, ownerName: "Edwar Fernando Ortiz", residentCount: 3, contactEmail: "edf@hotmail.com" },
        { id: "C-202", towerId: "torre_c", number: "202", occupied: true, ownerName: "Yolanda Rodríguez", residentCount: 2, contactEmail: "yolanda.r@gmail.com" },
        { id: "C-301", towerId: "torre_c", number: "301", occupied: true, ownerName: "Fabio Nelson Aristizábal", residentCount: 1, contactEmail: "fabio@gmail.com" },
        { id: "C-302", towerId: "torre_c", number: "302", occupied: false, ownerName: "Esteban Valderrama", residentCount: 0, contactEmail: "esteban@outlook.com" },
        { id: "C-401", towerId: "torre_c", number: "401", occupied: true, ownerName: "Victoria Eugenia Giraldo", residentCount: 4, contactEmail: "vgiraldo@gmail.com" },
        { id: "C-402", towerId: "torre_c", number: "402", occupied: true, ownerName: "Nelson Enrique Beltrán", residentCount: 3, contactEmail: "nebeltran@gmail.com" }
      ]
    },
    {
      id: "torre_d",
      name: "Torre D",
      apartments: [
        { id: "D-101", towerId: "torre_d", number: "101", occupied: true, ownerName: "Marisol Henao", residentCount: 2, contactEmail: "marisol.henao@gmail.com" },
        { id: "D-102", towerId: "torre_d", number: "102", occupied: true, ownerName: "Carlos Mario Cano", residentCount: 5, contactEmail: "cmcano@gmail.com" },
        { id: "D-201", towerId: "torre_d", number: "201", occupied: true, ownerName: "Martha Cecilia Ruiz", residentCount: 3, contactEmail: "mruiz@outlook.com" },
        { id: "D-202", towerId: "torre_d", number: "202", occupied: true, ownerName: "Jhon Jairo Arango", residentCount: 4, contactEmail: "jjarango@gmail.com" },
        { id: "D-301", towerId: "torre_d", number: "301", occupied: true, ownerName: "Beatriz Elena Saldarriaga", residentCount: 2, contactEmail: "beatriz@outlook.com" },
        { id: "D-302", towerId: "torre_d", number: "302", occupied: true, ownerName: "Hernán Darío Herrera", residentCount: 3, contactEmail: "hernan.h@hotmail.com" },
        { id: "D-401", towerId: "torre_d", number: "401", occupied: false, ownerName: "Sandra Milena Londoño", residentCount: 0, contactEmail: "sandra.london@gmail.com" },
        { id: "D-402", towerId: "torre_d", number: "402", occupied: true, ownerName: "Óscar de Jesús Córdoba", residentCount: 4, contactEmail: "ocordoba@gmail.com" }
      ]
    }
  ];

  const vehicles: Vehicle[] = [
    { id: "v_1", plate: "MHZ345", type: "Automóvil", ownerUnit: "A-101" },
    { id: "v_2", plate: "XYZ890", type: "Automóvil", ownerUnit: "A-102" },
    { id: "v_3", plate: "JKL212", type: "Moto", ownerUnit: "A-301" },
    { id: "v_4", plate: "QWE76C", type: "Automóvil", ownerUnit: "B-101" },
    { id: "v_5", plate: "RTY543", type: "Moto", ownerUnit: "B-202" },
    { id: "v_6", plate: "WER999", type: "Bicicleta", ownerUnit: "B-401" },
    { id: "v_7", plate: "IUW821", type: "Automóvil", ownerUnit: "C-101" },
    { id: "v_8", plate: "OIP814", type: "Moto", ownerUnit: "C-301" },
    { id: "v_9", plate: "OXX77B", type: "Scooter", ownerUnit: "C-402" },
    { id: "v_10", plate: "ASD55D", type: "Automóvil", ownerUnit: "D-102" },
    { id: "v_11", plate: "WER123", type: "Moto", ownerUnit: "D-302" }
  ];

  const pets: Pet[] = [
    { id: "p_1", name: "Sasha", species: "Perros", vaccinated: true, ownerUnit: "A-101" },
    { id: "p_2", name: "Michi", species: "Gatos", vaccinated: true, ownerUnit: "A-301" },
    { id: "p_3", name: "Lucas", species: "Perros", vaccinated: false, ownerUnit: "B-101" },
    { id: "p_4", name: "Lupe", species: "Perros", vaccinated: true, ownerUnit: "B-201" },
    { id: "p_5", name: "Tom", species: "Gatos", vaccinated: false, ownerUnit: "B-402" },
    { id: "p_6", name: "Fito", species: "Perros", vaccinated: true, ownerUnit: "C-102" },
    { id: "p_7", name: "Salem", species: "Gatos", vaccinated: true, ownerUnit: "C-401" },
    { id: "p_8", name: "Kira", species: "Perros", vaccinated: false, ownerUnit: "D-201" },
    { id: "p_9", name: "Pipo", species: "Otros", vaccinated: true, ownerUnit: "D-302" }
  ];

  const parkingSpots: ParkingSpot[] = [
    // Resident parkings
    { id: "pk_1", number: "101", type: "Residente", status: "Ocupado", assignedTo: "A-101" },
    { id: "pk_2", number: "102", type: "Residente", status: "Ocupado", assignedTo: "A-102" },
    { id: "pk_3", number: "103", type: "Residente", status: "Disponible" },
    { id: "pk_4", number: "104", type: "Residente", status: "Ocupado", assignedTo: "B-101" },
    { id: "pk_5", number: "105", type: "Residente", status: "Ocupado", assignedTo: "B-202" },
    { id: "pk_6", number: "106", type: "Residente", status: "Disponible" },
    { id: "pk_7", number: "107", type: "Residente", status: "Ocupado", assignedTo: "C-101" },
    { id: "pk_8", number: "108", type: "Residente", status: "Ocupado", assignedTo: "C-301" },
    { id: "pk_9", number: "109", type: "Residente", status: "Disponible" },
    { id: "pk_10", number: "110", type: "Residente", status: "Ocupado", assignedTo: "D-102" },
    // Visitor parkings
    { id: "pk_v1", number: "V-1", type: "Visitante", status: "Ocupado", assignedTo: "FGT452" },
    { id: "pk_v2", number: "V-2", type: "Visitante", status: "Disponible" },
    { id: "pk_v3", number: "V-3", type: "Visitante", status: "Ocupado", assignedTo: "DFR98E" },
    { id: "pk_v4", number: "V-4", type: "Visitante", status: "Disponible" },
    { id: "pk_v5", number: "V-5", type: "Visitante", status: "Disponible" },
    { id: "pk_v6", number: "V-6", type: "Visitante", status: "Ocupado", assignedTo: "HJK112" }
  ];

  const pqrsList: PQRS[] = [
    { id: "pqrs_1", title: "Gotera en techo parqueadero", unit: "A-101", type: "Reclamo", status: "En Curso", date: "2026-05-24", assignedTo: "Don Pedro (Mantenimiento)" },
    { id: "pqrs_2", title: "Falta de iluminación en Torre B Piso 3", unit: "B-302", type: "Petición", status: "Abierto", date: "2026-05-26", assignedTo: "Portería" },
    { id: "pqrs_3", title: "Mascota sin traílla en jardínes", unit: "C-202", type: "Queja", status: "Resuelto", date: "2026-05-22", assignedTo: "Administrador" },
    { id: "pqrs_4", title: "Sugerencia de bicicleteros adicionales", unit: "D-402", type: "Sugerencia", status: "Cerrado", date: "2026-05-18", assignedTo: "Administrador" }
  ];

  return {
    towers,
    vehicles,
    pets,
    parkingSpots,
    pqrsList,
    packagesInPorteria: 14
  };
};
