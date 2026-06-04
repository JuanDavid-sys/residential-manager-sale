/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, Shield, Zap, Users, CheckCircle2, DollarSign, MessageSquare, 
  Truck, ClipboardCheck, BarChart3, ChevronDown, ChevronUp, 
  ArrowRight, Sparkles, Clock, Split, UserCheck, RefreshCw, HelpCircle, AlertTriangle
} from 'lucide-react';
import { featuresList, planesList, faqList } from '../data';

interface MarketingProps {
  onNavigateToDashboard: () => void;
}

export default function MarketingView({ onNavigateToDashboard }: MarketingProps) {
  // ROI / Friction Calculator State
  const [apartmentsCount, setApartmentsCount] = useState<number>(120);
  
  // FAQs expanded state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Proportional metrics under management
  const calculatedResidents = Math.round(apartmentsCount * 2.9);
  const calculatedVehicles = Math.round(apartmentsCount * 1.5);
  const calculatedPets = Math.round(apartmentsCount * 0.5);
  const calculatedParking = Math.round(apartmentsCount * 1.1 + 8);
  const calculatedPackages = Math.round(apartmentsCount * 2.1);
  const calculatedPqrs = Math.round(apartmentsCount * 0.33);

  return (
    <div id="marketing_experience_root" className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* PROFESSIONAL NAVBAR */}
      <nav id="marketing_navbar" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">R</div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-800 whitespace-nowrap">Residential <span className="text-blue-600">Manager</span></span>
          </div>
          
          <div className="hidden sm:flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href="#problem_section" className="hover:text-blue-600 transition-colors">Problemática</a>
            <a href="#features_section" className="hover:text-blue-600 transition-colors">Características</a>
            <a href="#planes_section" className="hover:text-blue-600 transition-colors">Planes</a>
            <a href="#faq_section" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>

          <button 
            id="nav_cta_dashboard_btn"
            onClick={onNavigateToDashboard}
            className="hidden sm:flex px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors cursor-pointer active:scale-95 items-center gap-2 shrink-0"
          >
            <span>Ver Demo Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="hero_section" className="pt-10 sm:pt-16 pb-20 px-4 sm:px-6 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-8">
            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] sm:text-xs font-extrabold rounded-full mb-1 tracking-wider uppercase border border-indigo-200">
              Residential Manager • Infraestructura Operativa Residencial
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter leading-tight">
              Controle toda la operación de su conjunto <span className="text-blue-600">desde un solo lugar.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Administre apartamentos, residentes, vehículos, parqueaderos, pagos, comunicaciones y portería en una plataforma centralizada diseñada para propiedad horizontal en Colombia.
            </p>
            
            {/* Value checklist requested by user */}
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 shadow-sm max-w-xl space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Todo queda organizado. Todo queda registrado.
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 text-[11px] sm:text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Residentes</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Vehículos</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Parqueaderos</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Mascotas</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Visitantes</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Pagos</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> PQRS</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Comunicaciones</span>
              </div>
              <p className="text-[11px] text-indigo-700 font-semibold bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/50 text-center font-mono">
                Toda la información del conjunto conectada en un solo sistema.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onNavigateToDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-3"
              >
                <span className="text-sm sm:text-base">Acceder al Sistema <span className="hidden sm:inline">(Simulación)</span></span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>
              <a 
                href="#planes_section" 
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-6 py-4 rounded-2xl text-center transition-all text-sm"
              >
                Ver tarifas (Cop $90.000/mes)
              </a>
            </div>
          </motion.div>

          {/* Visual Operations and Admin Statistics Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-xl border border-slate-200"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-650" />
                <span>¿Cuánta información administra realmente?</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Visualice el volumen de activos y datos que procesa su copropiedad mensualmente.
              </p>
            </div>

            <div className="space-y-6">
              {/* Slider for units */}
              <div>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-600">Tamaño de la Copropiedad (Aptos/Casas):</span>
                  <span className="text-blue-700 font-bold font-mono">{apartmentsCount} Unidades</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="500" 
                  step="10"
                  value={apartmentsCount} 
                  onChange={(e) => setApartmentsCount(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
              </div>

              {/* Information Grid under management */}
              <div className="space-y-4">
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block font-mono">
                  Activos bajo gestión estimada:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">Residents</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                      👥 {calculatedResidents}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">Vehículos</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                      🚗 {calculatedVehicles}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">Parqueaderos</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                      🅿️ {calculatedParking}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">PQRS / Mes</span>
                    <span className="text-sm sm:text-base font-bold text-indigo-600 mt-1">
                      📋 {calculatedPqrs}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Contrast Box: Sin vs Con */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold font-mono">
                  Realidad Operativa
                </div>
                
                <div className="grid grid-cols-1 gap-3 text-xs">
                  <div className="p-3 bg-white text-red-900 border border-red-100 rounded-xl space-y-1">
                    <strong className="font-bold text-[11px] flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Sin Residential Manager</strong>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      Información dispersa en chats informales y Exceles. Trazabilidad nula.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-emerald-50 text-emerald-950 border border-emerald-100 rounded-xl space-y-1">
                    <strong className="font-bold text-[11px] text-emerald-800 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-600" /> Con Residential Manager</strong>
                    <p className="text-[10px] text-slate-600 leading-normal">
                      Todo conectado y centralizado. Expediente digital instantáneo por unidad.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[11px] text-indigo-700 font-semibold bg-indigo-50/50 py-1.5 px-3 rounded-lg border border-indigo-150/50 inline-block">
                  Toda la operación organizada y conectada en un solo sistema.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </header>

      {/* WHY US / CENTRALIZATION CONCEPT */}
      <section id="problem_section" className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 font-mono">El Desafío de la Copropiedad Moderna</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            El verdadero problema hoy no es "no tener herramientas"
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-light">
            Es tener <span className="text-red-600 font-semibold">información desorganizada y operaciones desconectadas.</span>
            <br />
            Eso sí sigue siendo un dolor <strong className="font-semibold text-slate-900">REAL</strong> incluso usando otros softwares del mercado.
          </p>
        </motion.div>

        {/* Traditional vs Centralized Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-red-600 bg-red-50 border border-red-100 rounded-full px-2.5 py-0.5 uppercase tracking-wider font-extrabold">
                  Operación Fragmentada
                </span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="text-red-500">✕</span>
                  <span>Información Dispersa</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  La realidad de operar con múltiples fuentes de datos independientes, silos de información y procesos incompletos.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">⁃</div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-800">Falta de Trazabilidad Real</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Datos que no coinciden entre la base de datos contable, el censo residencial de propietarios y la bitácora física de portería.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">⁃</div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-800">Desgaste en Auditorías y Actas</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Horas invertidas buscando correos de copropietarios, documentos archivados o novedades pasadas ante requerimientos de consejo o revisoría fiscal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">⁃</div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-800">Historiales Incompletos por Unidad</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Los cambios de arrendatarios, autorizaciones de vehículos, bitácora de visitantes y memorias de PQRS están desconectados o duplicados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">⁃</div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-800">Respuestas Lentas por Silos</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Incapacidad para acceder de inmediato al expediente consolidado de un apartamento cuando un residente reporta un requerimiento urgente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-center">
              <p className="text-[11px] text-slate-500 leading-tight">
                El administrador asume la carga mental de organizar piezas que no encajan entre sí, perdiendo tiempo y exponiéndose a reclamos legales.
              </p>
            </div>
          </motion.div>

          {/* Unified Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900 text-slate-100 p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-900/60 rounded-full px-2.5 py-0.5 uppercase tracking-wider font-extrabold">
                  Infraestructura Operativa Centralizada
                </span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span className="text-emerald-500">✓</span>
                  <span>Residential Manager</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  El centro de control unificado donde toda la operación del conjunto está conectada, disponible y lista para su consulta.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white">Expediente Digital Único de la Unidad</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Consulte en segundos propietarios, inquilinos autorizados, vehículos de residentes con placa, mascotas, parqueaderos asignados e historial.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white">Trazabilidad Absoluta Inalterable</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Lleve un registro histórico auditable de correspondencia, ingresos de parqueaderos de visitantes, estados de cartera y PQRS con sello de hora.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white">Operaciones Conectadas en Tiempo Real</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Si portería registra un residente, el censo se actualiza. Si el consejo emite una circular, el historial de lectura se actualiza de inmediato.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white font-sans">Administración 100% Protegida y Auditable</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Presente informes libres de duda al consejo de administración o asambleas generales respaldado en datos estructurados y Ley de Habeas Data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-950/40 p-3.5 rounded-xl border border-blue-900/40 text-center">
              <p className="text-[11px] text-indigo-300 font-semibold font-mono">
                Paz mental para el administrador: Control total y reducción del ruido operativo en segundos.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 KEY QUESTIONS SECTION — RESPUESTAS DIRECTAS */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 font-mono">
              ¿Su administración realmente está en control?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              4 preguntas que todo administrador debería hacerse
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                number: "01",
                question: "¿Qué tan fácil es obtener una visión completa del conjunto cuando la información está repartida en múltiples herramientas, documentos y procesos?",
                answer: "Sin un sistema centralizado, obtener una visión completa es prácticamente imposible. Con Residential Manager, el censo, los vehículos, las mascotas, los parqueaderos, los pagos, las PQRS y las comunicaciones viven en un solo lugar. Un clic y tienes el expediente completo de cualquier unidad al instante."
              },
              {
                number: "02",
                question: "¿Qué tan preparada está la administración para operar sin la persona que más conoce el conjunto?",
                answer: "Con Residential Manager, el conocimiento no depende de una sola persona. Cada novedad, cada autorización, cada novedad de portería queda registrada con fecha y hora exacta. Si el administrador o el portero se ausenta, quien llegue encuentra el historial intacto, digital y operativo desde el día uno."
              },
              {
                number: "03",
                question: "¿La información trabaja para usted o usted trabaja para encontrarla?",
                answer: "La información trabaja para usted. Todos los datos están centralizados, indexados y disponibles al instante. No más búsquedas en chats de WhatsApp, carpetas físicas o archivos de Excel perdidos. Usted consulta, el sistema responde."
              },
              {
                number: "04",
                question: "¿Cuántas horas al mes dedica a recopilar información de diferentes fuentes?",
                answer: "Los administradores reportan entre 8 y 20 horas mensuales perdidas buscando y cruzando datos entre hojas de cálculo, correos y cuadernos de portería. Con Residential Manager esa tarea se reduce a minutos porque todo está en un solo lugar, actualizado en tiempo real."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-extrabold text-blue-600/20 font-mono leading-none">{item.number}</span>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h3>
                    <p className="text-[12px] text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-light">
              Si alguna de estas preguntas le generó inquietud, Residential Manager está diseñado precisamente para resolverla.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE FEATURES INDEXED (6 CARDS) */}
      <section id="features_section" className="py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 font-mono">
              La Suite Completa
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Nuestras Funcionalidades Clave
            </h2>
            <p className="text-slate-500 text-sm">
              Cada módulo ha sido afinado para solucionar las minucias reales exigidas por conserjes, contadores y residentes en edificios colombianos.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuresList.map((feature) => {
              // Dynamically resolve icon component
              const renderIcon = () => {
                switch(feature.iconName) {
                  case 'DollarSign': return <DollarSign className="w-6 h-6 text-blue-600" />;
                  case 'MessageSquare': return <MessageSquare className="w-6 h-6 text-blue-600" />;
                  case 'Users': return <Users className="w-6 h-6 text-blue-600" />;
                  case 'Truck': return <Truck className="w-6 h-6 text-blue-600" />;
                  case 'ClipboardCheck': return <ClipboardCheck className="w-6 h-6 text-blue-600" />;
                  case 'BarChart3': return <BarChart3 className="w-6 h-6 text-blue-600" />;
                  default: return <Building className="w-6 h-6 text-blue-600" />;
                }
              };

              return (
                <motion.div
                  key={feature.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  id={`feature_card_${feature.id}`}
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="bg-blue-50 p-3 rounded-xl inline-block">
                        {renderIcon()}
                      </div>
                      {feature.badge && (
                        <span className="text-[10px] font-bold text-blue-700 uppercase px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 tracking-wider">
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-slate-400 font-medium font-mono">
                    <span>Módulo Listo</span>
                    <span className="text-blue-500">✓</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* PLANES & PRECIOS */}
      <section id="planes_section" className="py-20 bg-white border-t border-b border-indigo-100/40 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 font-mono">
              Planes Flexibles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Sin sorpresas ni contratos complejos
            </h2>
            <p className="text-slate-500 text-sm">
              Implemente Residential Manager en su copropiedad y experimente un control operacional incomparable desde el primer día.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch"
          >
            {planesList.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                id={`plan_price_card_${idx}`}
                className={`flex flex-col justify-between p-8 rounded-3xl border transition-all ${
                  plan.recommended 
                    ? 'bg-slate-900 text-slate-100 border-slate-900 shadow-xl relative scale-100 md:scale-105' 
                    : 'bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                {/* Best badge */}
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-extrabold text-[10px] tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md">
                    RECOMENDADO
                  </div>
                )}

                <div className="space-y-6">
                  <div className="border-b border-dashed border-slate-700/20 pb-4">
                    <h3 className={`text-xl font-extrabold ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-3xl font-extrabold tracking-tight text-blue-600">{plan.price}</span>
                      <span className={`text-xs uppercase font-mono ${plan.recommended ? 'text-slate-400' : 'text-slate-500'}`}>
                        {plan.copLabel}
                      </span>
                      <span className={`text-xs ml-1 ${plan.recommended ? 'text-slate-400' : 'text-slate-500'}`}>
                        {plan.period}
                      </span>
                    </div>
                    {plan.saving && (
                      <span className="inline-block mt-2 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded uppercase font-mono">
                        {plan.saving}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 pb-6">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex gap-2.5 items-start text-xs leading-relaxed">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.recommended ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={plan.recommended ? 'text-slate-300' : 'text-slate-600'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <a 
                    href="https://wa.me/573212915001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 px-4 rounded-xl font-extrabold text-sm text-center transition-all cursor-pointer active:scale-95 ${
                      plan.recommended 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {plan.buttonText}
                  </a>
                  <p className="text-center text-[10px] text-slate-400 mt-2.5">
                    Habilitación inmediata de la cuenta demo interactiva.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION (6 COLLAPSIBLE Qs) */}
      <section id="faq_section" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 font-mono">
              Resolución de dudas
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Preguntas Frecuentes (FAQ)
            </h2>
            <p className="text-slate-500 text-sm">
              Aquí recopilamos las 6 dudas legales y prácticas más comunes formuladas por consejos de administración.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div 
                  key={idx} 
                  id={`faq_accordion_${idx}`}
                  className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:bg-slate-100/50 transition-colors cursor-pointer text-sm"
                  >
                    <span>{faq.question}</span>
                    <span className="bg-white p-1 rounded-full border border-slate-200 shrink-0 text-slate-500">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-200/50 bg-white text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="marketing_footer"
        className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-lg font-bold text-white tracking-tight block">Residential <span className="text-blue-500">Manager</span></span>
            <p className="text-xs text-slate-500 max-w-sm">
              El primer ecosistema digital de automatización y administración para Propiedades Horizontales colombianas.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3 text-xs">
            <div className="flex gap-4 font-medium">
              <a href="#hero_section" className="hover:text-white transition-colors">Volver Arriba</a>
              <span>·</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={onNavigateToDashboard}>Dashboard Demo</span>
              <span>·</span>
              <a href="#planes_section" className="hover:text-white transition-colors">Planes</a>
            </div>
            <p className="text-[10px] text-slate-600">
              © {new Date().getFullYear()} Residential Manager. Todos los derechos reservados. Hecho de forma real para Colombia.
            </p>
          </div>
        </div>
      </motion.footer>

    </div>
  );
}
