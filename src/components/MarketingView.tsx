/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
      <nav id="marketing_navbar" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Residential <span className="text-blue-600">Manager</span></span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6 text-sm font-medium text-slate-600 overflow-x-auto max-sm:-mx-4 max-sm:px-4 scrollbar-none flex-nowrap">
            <a href="#problem_section" className="hover:text-blue-600 transition-colors shrink-0">Problemática</a>
            <a href="#features_section" className="hover:text-blue-600 transition-colors shrink-0">Características</a>
            <a href="#vision_section" className="hover:text-blue-600 transition-colors shrink-0">Visión 675</a>
            <a href="#planes_section" className="hover:text-blue-600 transition-colors shrink-0">Planes</a>
            <a href="#faq_section" className="hover:text-blue-600 transition-colors shrink-0">FAQ</a>
          </div>

          <button 
            id="nav_cta_dashboard_btn"
            onClick={onNavigateToDashboard}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors cursor-pointer active:scale-95 flex items-center gap-2"
          >
            <span>Ver Demo Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="hero_section" className="pt-16 pb-20 px-6 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-full mb-1 tracking-wider uppercase border border-indigo-200">
              Residential Manager • Infraestructura Operativa Residencial
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter leading-tight">
              Controle toda la operación de su conjunto <span className="text-blue-600">desde un solo lugar.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Administre apartamentos, residentes, vehículos, parqueaderos, pagos, comunicaciones y portería en una plataforma centralizada diseñada para propiedad horizontal en Colombia.
            </p>
            
            {/* Value checklist requested by user */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm max-w-xl space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                Todo queda organizado. Todo queda registrado.
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Residentes</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Vehículos</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Parqueaderos</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Mascotas</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Visitantes</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Pagos</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> PQRS</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Comunicaciones</span>
              </div>
              <p className="text-[11px] text-indigo-700 font-semibold bg-indigo-50/50 p-2 rounded border border-indigo-100/50 text-center font-mono">
                Toda la información del conjunto conectada en un solo sistema.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onNavigateToDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-sm text-center transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-3"
              >
                <span className="max-sm:text-sm">Acceder al Sistema <span className="max-sm:hidden">(Simulación Real-Time)</span></span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>
              <a 
                href="#planes_section" 
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold px-6 py-4 rounded-full text-center transition-all text-sm"
              >
                Ver tarifas (Cop $90.000/mes)
              </a>
            </div>
          </div>

          {/* Visual Operations and Admin Statistics Widget */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
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
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block font-mono">
                  Información y activos bajo gestión:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Residents</span>
                    <span className="text-base font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                      👥 {calculatedResidents}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Vehículos</span>
                    <span className="text-base font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                      🚗 {calculatedVehicles}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Mascotas</span>
                    <span className="text-base font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                      🐶 {calculatedPets}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Parqueaderos</span>
                    <span className="text-base font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                      🅿️ {calculatedParking}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Paquetes / Mes</span>
                    <span className="text-base font-bold text-blue-600 mt-1 flex items-center gap-1.5">
                      📦 {calculatedPackages}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">PQRS Mensuales</span>
                    <span className="text-base font-bold text-indigo-600 mt-1 flex items-center gap-1.5">
                      📋 {calculatedPqrs}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Contrast Box: Sin vs Con */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 pt-3">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold font-mono">
                  La Realidad Operativa del Conjunto
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-red-50 text-red-900 border border-red-100 rounded-lg space-y-1">
                    <strong className="font-bold text-[11px] block">Sin Residential Manager</strong>
                    <p className="text-[10px] text-slate-600 leading-normal">
                      Información dispersa en chats informales, cuadernos de mano, Exceles que se corrompen y carpetas físicas. Trazabilidad nula.
                    </p>
                  </div>
                  
                  <div className="p-2.5 bg-emerald-50 text-emerald-950 border border-emerald-100 rounded-lg space-y-1">
                    <strong className="font-bold text-[11px] text-emerald-800 block">Con Residential Manager</strong>
                    <p className="text-[10px] text-slate-600 leading-normal">
                      Todo conectado y centralizado. Expediente digital instantáneo por unidad con un único historial inalterable.
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
          </div>

        </div>
      </header>

      {/* WHY US / CENTRALIZATION CONCEPT */}
      <section id="problem_section" className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 font-mono">El Desafío de la Copropiedad Moderna</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            El verdadero problema hoy no es "no tener herramientas"
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-light">
            Es tener <span className="text-red-600 font-semibold">información desorganizada y operaciones desconectadas.</span>
            <br />
            Eso sí sigue siendo un dolor <strong className="font-semibold text-slate-900">REAL</strong> incluso usando otros softwares del mercado.
          </p>
        </div>

        {/* Traditional vs Centralized Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 relative overflow-hidden flex flex-col justify-between">
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
          </div>

          {/* Unified Card */}
          <div className="bg-slate-900 text-slate-100 p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl flex flex-col justify-between">
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
          </div>
        </div>
      </section>

      {/* CORE FEATURES INDEXED (6 CARDS) */}
      <section id="features_section" className="py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 font-mono">
              La Suite Completa
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Nuestras Funcionalidades Clave
            </h2>
            <p className="text-slate-500 text-sm">
              Cada módulo ha sido afinado para solucionar las minucias reales exigidas por conserjes, contadores y residentes en edificios colombianos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div 
                  key={feature.id} 
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLANES & PRECIOS */}
      <section id="planes_section" className="py-20 bg-white border-t border-b border-indigo-100/40 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 font-mono">
              Planes Flexibles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Sin sorpresas ni contratos complejos
            </h2>
            <p className="text-slate-500 text-sm">
              Implemente Residential Manager en su copropiedad y experimente un control operacional incomparable desde el primer día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {planesList.map((plan, idx) => (
              <div 
                key={idx} 
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION (6 COLLAPSIBLE Qs) */}
      <section id="faq_section" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 font-mono">
              Resolución de dudas
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Preguntas Frecuentes (FAQ)
            </h2>
            <p className="text-slate-500 text-sm">
              Aquí recopilamos las 6 dudas legales y prácticas más comunes formuladas por consejos de administración.
            </p>
          </div>

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
      <footer id="marketing_footer" className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-lg font-bold text-white tracking-tight block">Residential <span className="text-blue-500">Manager</span></span>
            <p className="text-xs text-slate-500 max-w-sm">
              El primer ecosistema digital de automatización y administración para Propiedades Horizontales bajo la Ley 675 colombiana.
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
      </footer>

    </div>
  );
}
