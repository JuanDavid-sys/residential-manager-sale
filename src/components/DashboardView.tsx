/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, Users, Car, Heart, Package, LogOut, ArrowRight, 
  Trash2, Plus, Sparkles, Table, CheckCircle2, ChevronRight, 
  AlertCircle, ShieldCheck, Home, Info, UserPlus, RefreshCw,
  ClipboardCheck, Clock, Calendar, Key, FileText, Check
} from 'lucide-react';
import { DashboardState, Apartment, Vehicle, Pet, ParkingSpot, PQRS } from '../types';
import { createInitialState } from '../data';

interface DashboardProps {
  onNavigateToLanding: () => void;
}

export default function DashboardView({ onNavigateToLanding }: DashboardProps) {
  // DB State in React
  const [db, setDb] = useState<DashboardState>(createInitialState());
  
  // Apartment Selection for interactive Timeline (Conflict-reduction & Auditing)
  const [selectedAptId, setSelectedAptId] = useState<string>('A-101');
  
  // Simulation Form States
  const [isAddingResident, setIsAddingResident] = useState(false);
  const [newResName, setNewResName] = useState('');
  const [newResTower, setNewResTower] = useState('torre_a');
  const [newResApto, setNewResApto] = useState('');
  const [newResEmail, setNewResEmail] = useState('');
  const [newResCount, setNewResCount] = useState(2);

  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [newVehPlate, setNewVehPlate] = useState('');
  const [newVehType, setNewVehType] = useState<'Automóvil' | 'Moto' | 'Bicicleta' | 'Scooter'>('Automóvil');
  const [newVehApto, setNewVehApto] = useState('');

  const [simulationLogStr, setSimulationLogStr] = useState<string>('Módulo de base de datos local e interactivo iniciado.');

  const writeLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setSimulationLogStr(`[${time}] ${msg}`);
  };

  // Reset db state
  const handleResetDb = () => {
    setDb(createInitialState());
    setIsAddingResident(false);
    setIsAddingVehicle(false);
    writeLog('Base de datos restaurada a los valores iniciales de fábrica.');
  };

  // Toggle parking space status
  const toggleParkingSpace = (spotId: string) => {
    setDb(prev => {
      const updatedSpots = prev.parkingSpots.map(spot => {
        if (spot.id === spotId) {
          const newStatus = spot.status === 'Disponible' ? 'Ocupado' : 'Disponible';
          writeLog(`Parqueadero ${spot.type} #${spot.number} cambiado a: ${newStatus}`);
          return {
            ...spot,
            status: newStatus,
            assignedTo: newStatus === 'Disponible' ? undefined : (spot.assignedTo || 'TEMPORAL')
          };
        }
        return spot;
      });
      return { ...prev, parkingSpots: updatedSpots };
    });
  };

  // Vaccinate a pet toggle
  const togglePetVaccine = (petId: string) => {
    setDb(prev => {
      const updatedPets = prev.pets.map(pet => {
        if (pet.id === petId) {
          const nextState = !pet.vaccinated;
          writeLog(`Cambio de estado de vacuna de mascota "${pet.name}" a: ${nextState ? "VACUNADO" : "PENDIENTE"}`);
          return { ...pet, vaccinated: nextState };
        }
        return pet;
      });
      return { ...prev, pets: updatedPets };
    });
  };

  // Add resident handler
  const handleAddResidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResName || !newResApto) {
      alert("Por favor ingrese nombre y número de apartamento.");
      return;
    }

    setDb(prev => {
      // Find and update apartment state
      const targetAptId = `${newResTower.replace('torre_', '').toUpperCase()}-${newResApto}`;
      
      const newTowers = prev.towers.map(tow => {
        if (tow.id === newResTower) {
          // Check if apartment exists
          let aptExists = false;
          let updatedAptList = tow.apartments.map(apt => {
            if (apt.number === newResApto) {
              aptExists = true;
              return {
                ...apt,
                occupied: true,
                ownerName: newResName,
                residentCount: apt.residentCount + newResCount,
                contactEmail: newResEmail || `${newResName.toLowerCase().replace(/\s+/g, '')}@ph.com`
              };
            }
            return apt;
          });

          // If it doesn't exist, append it
          if (!aptExists) {
            const newApt: Apartment = {
              id: targetAptId,
              towerId: newResTower,
              number: newResApto,
              occupied: true,
              ownerName: newResName,
              residentCount: newResCount,
              contactEmail: newResEmail || `${newResName.toLowerCase().replace(/\s+/g, '')}@ph.com`
            };
            updatedAptList.push(newApt);
          }

          return { ...tow, apartments: updatedAptList };
        }
        return tow;
      });

      writeLog(`Residente "${newResName}" registrado exitosamente en el Apartamento ${targetAptId}.`);

      return {
        ...prev,
        towers: newTowers
      };
    });

    // Reset fields
    setNewResName('');
    setNewResApto('');
    setNewResEmail('');
    setIsAddingResident(false);
  };

  // Add vehicle handler
  const handleAddVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehPlate || !newVehApto) {
      alert("Por favor ingrese la placa y unidad.");
      return;
    }

    const cleanPlate = newVehPlate.toUpperCase().replace(/\s+/g, '');

    setDb(prev => {
      const newV: Vehicle = {
        id: `v_${Date.now()}`,
        plate: cleanPlate,
        type: newVehType,
        ownerUnit: newVehApto
      };

      writeLog(`Vehículo con placa ${cleanPlate} (${newVehType}) registrado en la unidad ${newVehApto}.`);

      return {
        ...prev,
        vehicles: [...prev.vehicles, newV]
      };
    });

    setNewVehPlate('');
    setIsAddingVehicle(false);
  };

  // Quick simulate package arrival
  const handleSimulatePackage = () => {
    setDb(prev => {
      const nextCount = prev.packagesInPorteria + 1;
      writeLog(`Portería: Paquete recibido. Enviando alerta por WhatsApp simulado al apartamento.`);
      return { ...prev, packagesInPorteria: nextCount };
    });
  };

  // Clear simulated packages
  const handleClearPackages = () => {
    setDb(prev => {
      writeLog(`Portería: Todos los paquetes retirados por los residentes.`);
      return { ...prev, packagesInPorteria: 0 };
    });
  };

  // Resolve calculations reactively from live database state
  let totalApartments = 0;
  let occupiedApartments = 0;
  let totalResidents = 0;
  
  db.towers.forEach(t => {
    t.apartments.forEach(a => {
      totalApartments++;
      if (a.occupied) {
        occupiedApartments++;
        totalResidents += a.residentCount;
      }
    });
  });

  const overallOccupancyPct = totalApartments > 0 ? (occupiedApartments / totalApartments) * 100 : 0;

  // Parking stats
  const totalParkingSpots = db.parkingSpots.length;
  const occupiedParkingSpots = db.parkingSpots.filter(s => s.status === 'Ocupado').length;
  const parkingOccupancyPct = totalParkingSpots > 0 ? (occupiedParkingSpots / totalParkingSpots) * 100 : 0;

  const residentSpots = db.parkingSpots.filter(s => s.type === 'Residente');
  const visitorSpots = db.parkingSpots.filter(s => s.type === 'Visitante');

  // Vehicles donut chart counts
  const vehicleCounts = db.vehicles.reduce((acc, veh) => {
    acc[veh.type] = (acc[veh.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalVehicles = db.vehicles.length;

  // Pets stats
  const totalPets = db.pets.length;
  const vaccinatedPets = db.pets.filter(p => p.vaccinated).length;
  const pendingPets = totalPets - vaccinatedPets;

  const petCounts = db.pets.reduce((acc, pet) => {
    acc[pet.species] = (acc[pet.species] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div id="dashboard_root_canvas" className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* COPROPED-NAVBAR */}
      <nav id="dashboard_navbar" className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-xl text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">
              Conjunto Residencial San Marcos
            </h1>
            <span className="text-[10px] text-blue-600 font-mono tracking-widest font-semibold uppercase">
              Consola del Administrador (Live Demo)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Quick status dots */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-slate-500 border-r border-slate-200 pr-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Base de datos: Conectada</span>
            </span>
            <span>·</span>
            <span>Estándar: Ley 675</span>
          </div>

          <button 
            id="back_to_landing_btn"
            onClick={onNavigateToLanding}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-full text-xs font-bold transition-all border border-slate-200 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-500" />
            <span>Volver al Portal de Ventas</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="lg:col-span-9 space-y-8">
          
          {/* WELCOME BANNER WITH METRICS */}
          <section id="welcome_banner" className="bg-slate-900 border border-slate-850 p-6 rounded-3xl relative overflow-hidden text-white shadow-md">
            <div className="absolute top-0 right-0 p-5 opacity-10 pointer-events-none">
              <Sparkles className="w-24 h-24 text-blue-300" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
              
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest font-mono">
                  SISTEMA EN VIVO
                </span>
                <h2 className="text-xl font-extrabold text-white">
                  ¡Hola, Administrador San Marcos! 👋
                </h2>
                <p className="text-xs text-slate-400 max-w-md">
                  Este panel refleja los registros activos de la copropiedad calculados en tiempo real. Utilice el simulador inferior para alterar el estado legal y financiero.
                </p>
              </div>

              {/* Progress utilization group */}
              <div className="flex flex-col sm:flex-row gap-6 shrink-0 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {/* Apt Occupancy bar */}
                <div className="space-y-1.5 min-w-[140px]">
                  <div className="flex justify-between text-[11px] font-medium text-slate-300 font-mono">
                    <span>Ocupación Aptos</span>
                    <span className="font-bold text-blue-400">{overallOccupancyPct.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                      style={{ width: `${overallOccupancyPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    {occupiedApartments} de {totalApartments} apartamentos
                  </span>
                </div>

                {/* Parking utilization progress */}
                <div className="space-y-1.5 min-w-[140px]">
                  <div className="flex justify-between text-[11px] font-medium text-slate-300 font-mono font-bold">
                    <span>Uso Parqueaderos</span>
                    <span className="font-bold text-indigo-400">{parkingOccupancyPct.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                      style={{ width: `${parkingOccupancyPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    {occupiedParkingSpots} de {totalParkingSpots} celdas ocupadas
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* KEY PERFORMANCE INDICATORS (KPIs) */}
          <section id="kpi_grid" className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* KPI 1: Residents */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Personas Registradas
                </span>
                <h3 id="kpi_residents_val" className="text-2xl font-extrabold text-slate-900 font-mono">
                  {totalResidents}
                </h3>
                <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block font-medium">
                  Censo Oficial PH
                </span>
              </div>
              <div className="bg-blue-50 p-3.5 rounded-xl text-blue-600 shrink-0">
                <Users className="w-6 h-6" />
              </div>
            </div>

            {/* KPI 2: Vehicles */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Vehículos Activos
                </span>
                <h3 id="kpi_vehicles_val" className="text-2xl font-extrabold text-slate-900 font-mono">
                  {totalVehicles}
                </h3>
                <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded inline-block font-medium">
                  Control Portería
                </span>
              </div>
              <div className="bg-indigo-50 p-3.5 rounded-xl text-indigo-600 shrink-0">
                <Car className="w-6 h-6" />
              </div>
            </div>

            {/* KPI 3: Pets */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Mascotas Registradas
                </span>
                <h3 id="kpi_pets_val" className="text-2xl font-extrabold text-slate-900 font-mono">
                  {totalPets}
                </h3>
                <div className="flex flex-wrap items-center gap-1 mt-1">
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold border border-emerald-100">
                    {vaccinatedPets} Vacunas ✔
                  </span>
                  <span className="text-[9px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold border border-amber-100">
                    {pendingPets} pendientes ⚠
                  </span>
                </div>
              </div>
              <div className="bg-rose-50 p-3.5 rounded-xl text-rose-600 shrink-0">
                <Heart className="w-6 h-6" />
              </div>
            </div>

          </section>

          {/* LÍNEA TEMPORAL COMPLETA DEL APARTAMENTO - RESOLUCIÓN DE CONFLICTOS Y PAZ MENTAL */}
          <section id="apartment_timeline_section" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase tracking-widest inline-block">
                  Residential OS • Trazabilidad Antidisputas
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span>Historial & Línea Temporal Unificada de la Unidad</span>
                </h3>
                <p className="text-xs text-slate-500 max-w-xl">
                  Centralice todas las pruebas en un solo lugar. Elimine las discusiones de <span className="italic font-semibold">"yo no sabía"</span> o <span className="italic font-semibold">"nunca me avisaron"</span> con un expediente digital inalterable de cada apartamento.
                </p>
              </div>

              {/* Fast Selector dropdown */}
              <div className="shrink-0 flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Seleccionar Unidad:</span>
                <select
                  value={selectedAptId}
                  onChange={(e) => setSelectedAptId(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500"
                >
                  {db.towers.map(tower => (
                    <optgroup key={tower.id} label={tower.name}>
                      {tower.apartments.map(apt => (
                        <option key={apt.id} value={apt.id}>
                          Apto {apt.number} - {apt.ownerName || 'Sin ocupar'}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Interactive Grid: Selectors & Timeline View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Interactive Quick Grid Map to choose apartments directly */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Click rápido para auditar:
                  </span>
                  
                  <div className="space-y-3">
                    {db.towers.map((tower) => (
                      <div key={tower.id} className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">{tower.name}</span>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                          {tower.apartments.map((apt) => {
                            const isSelected = selectedAptId === apt.id;
                            return (
                              <button
                                type="button"
                                key={apt.id}
                                onClick={() => setSelectedAptId(apt.id)}
                                className={`py-1.5 px-1 rounded-lg border text-[11px] font-bold font-mono transition-all text-center cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm scale-105'
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                {apt.number}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conflict desescalation quick card */}
                <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold">Paz Mental Garantizada</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-tight">
                    ¿Un residente alega que no le notificaron una correspondencia o que pagó a tiempo pero el correo falló? El sistema genera un radicado firmado con fecha y hora exacta del servidor como prueba irrefutable.
                  </p>
                  <div className="bg-white/80 border border-emerald-100 p-2.5 rounded-xl text-[10px] font-mono text-emerald-800 space-y-1">
                    <div>• Menos llamadas y chats directos</div>
                    <div>• Cero errores de fórmulas Excel</div>
                    <div>• Respaldo legal Ley 675 completa</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Timeline Scroll */}
              <div className="lg:col-span-8 bg-slate-50/50 rounded-2xl border border-slate-200 p-5 p-md-6 space-y-6">
                
                {/* Apartment Header Card */}
                {(() => {
                  const allApts = db.towers.flatMap(t => t.apartments);
                  const apt = allApts.find(a => a.id === selectedAptId) || allApts[0];
                  
                  const currentAptVehicles = db.vehicles.filter(v => v.ownerUnit === apt.id);
                  const currentAptPets = db.pets.filter(p => p.ownerUnit === apt.id);
                  const currentAptParkings = db.parkingSpots.filter(s => s.assignedTo === apt.id || s.assignedTo === apt.number);
                  const currentAptPqrs = db.pqrsList.filter(p => p.unit === apt.id || p.unit === apt.number);

                  return (
                    <div className="space-y-6">
                      
                      {/* Summary card with stats */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-indigo-600 font-bold block">
                            EXPEDIENTE DIGITAL DE CONVIVENCIA
                          </div>
                          <h4 className="text-base font-extrabold text-slate-800">
                            Unidad {apt.number} • {apt.ownerName || 'Arrendatario no registrado'}
                          </h4>
                          <span className="text-xs text-slate-500 block">
                            Contacto principal: <span className="font-mono text-slate-700 font-semibold">{apt.contactEmail}</span>
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                          <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            {apt.residentCount || 0} Habitantes
                          </span>
                          <span className={`${apt.occupied ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'} px-2 py-1 rounded-full border`}>
                            {apt.occupied ? 'Habitado' : 'Desocupado'}
                          </span>
                        </div>
                      </div>

                      {/* Visual Timeline entries */}
                      <div className="relative border-l border-slate-300 pl-6 ml-3.5 space-y-6">
                        
                        {/* 1. Censo Entry */}
                        <div className="relative">
                          {/* Timeline dot */}
                          <span className="absolute -left-[31px] top-0 bg-blue-100 border-2 border-blue-600 text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold z-10">
                            1
                          </span>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-blue-600" />
                                <span>Censo y Ficha de Población Autorizada</span>
                              </span>
                              <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                                2026-02-10 14:22
                              </span>
                            </div>
                            
                            <p className="text-[11px] text-slate-600">
                              Registro oficial de {apt.residentCount || 'Ningún'} residente(s) registrado(s) en base de datos. Firma digital Habeas Data aceptada en el portal.
                            </p>
                            
                            {/* Traceability detail */}
                            <div className="bg-white p-2 rounded border border-slate-150 text-[10px] leading-snug text-slate-500 font-mono">
                              <div className="text-slate-700 font-bold flex items-center gap-1">
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Evidencia de no duplicidad:</span>
                              </div>
                              Nombres oficiales: {apt.ownerName || 'Ninguno'}. Correo confirmado: {apt.contactEmail}. No permite excusas de duplicación ni "no me llegó".
                            </div>
                          </div>
                        </div>

                        {/* 2. Cartera / Cobros Entry */}
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 bg-emerald-100 border-2 border-emerald-600 text-emerald-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold z-10">
                            2
                          </span>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Cartera Mensual & Estado de Cobros</span>
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold font-mono">
                                Pagado PSE ✔
                              </span>
                            </div>
                            
                            <p className="text-[11px] text-slate-600">
                              La cuenta de cobro de copropiedad por valor de <strong className="text-slate-850">$320.000 COP</strong> fue generada de manera automática y sin intervención manual.
                            </p>
                            
                            <div className="bg-white p-2.5 rounded-lg border border-slate-150 text-[10px] leading-snug text-slate-500 space-y-1">
                              <div className="font-mono text-emerald-800 flex items-center gap-1 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>Trazabilidad de Pago Inviolable:</span>
                              </div>
                              <p className="font-mono text-[9px]">
                                Transacción bancaria aprobada vía pasarela integrada. <strong className="text-slate-800">Radicado ID: TX-May-89104</strong>. Fecha exacta: 2026-05-02 a las 10:14:02 AM. Impide el clásico "sí transferí" sin soportes legítimos.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 3. Parqueaderos e Ingreso Entry */}
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 bg-amber-100 border-2 border-amber-600 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold z-10">
                            3
                          </span>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                                <Car className="w-3.5 h-3.5 text-amber-600" />
                                <span>Control de Parqueaderos y Placas</span>
                              </span>
                              <span className="text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded font-bold font-mono">
                                {currentAptParkings.length > 0 ? `Celda #${currentAptParkings[0].number}` : 'Censo Activo'}
                              </span>
                            </div>
                            
                            <p className="text-[11px] text-slate-600">
                              Vehículos asociados al apartamento que tienen permitido el acceso regular y uso de parqueadero residente asignado.
                            </p>

                            {/* Live list of vehicles */}
                            <div className="bg-white p-2.5 rounded-lg border border-slate-150 space-y-1.5">
                              {currentAptVehicles.length === 0 ? (
                                <span className="text-[9px] font-mono text-slate-400 block italic">Sin vehículos residentes activos registrados.</span>
                              ) : (
                                <div className="grid grid-cols-2 gap-2">
                                  {currentAptVehicles.map((v) => (
                                    <div key={v.id} className="p-1 px-2 bg-slate-50 rounded border border-slate-200 flex items-center justify-between font-mono text-[10px]">
                                      <strong className="text-slate-800 uppercase">{v.plate}</strong>
                                      <span className="text-slate-400 text-[9px]">{v.type}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <p className="text-[9px] font-mono text-slate-400 leading-tight">
                                Evita discusiones de "este carro es de mi primo y vive acá". Vehículos fuera de esta lista se registran como visitantes con cobro por minuto en la simulación.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 4. Correspondencia / Paquetes Entry */}
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 bg-indigo-100 border-2 border-indigo-600 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold z-10">
                            4
                          </span>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                                <Package className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Correspondencia y Alertas en Portería</span>
                              </span>
                              <span className="text-[10px] bg-red-50 text-rose-700 px-1.5 py-0.5 rounded font-bold font-mono">
                                {db.packagesInPorteria > 0 ? `${db.packagesInPorteria} Paquetes en Cola` : 'Al día'}
                              </span>
                            </div>
                            
                            <p className="text-[11px] text-slate-600">
                              Registro en la minuta digital de correspondencia para retirar en la recepción principal.
                            </p>

                            <div className="bg-white p-2 rounded border border-slate-150 text-[10px] font-mono text-slate-500">
                              <div className="text-slate-700 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                <span>Trazabilidad de Recepción:</span>
                              </div>
                              Guarda de seguridad registra ingreso de paquetería ➔ Envío inmediato de alerta digital WhatsApp simulado ➔ Firma inalterable requerida para el retiro físico.
                            </div>
                          </div>
                        </div>

                        {/* 5. Censo de Mascotas */}
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 bg-rose-100 border-2 border-rose-600 text-rose-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold z-10">
                            5
                          </span>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                                <Heart className="w-3.5 h-3.5 text-rose-600" />
                                <span>Censo Sanitario del Reino Animal</span>
                              </span>
                              <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold font-mono">
                                {currentAptPets.length} Animales
                              </span>
                            </div>
                            
                            <p className="text-[11px] text-slate-600">
                              Cumplimiento de sanidad e higiene de acuerdo a normas municipales y reglamento interno.
                            </p>

                            <div className="bg-white p-2.5 rounded-lg border border-slate-150 space-y-1.5">
                              {currentAptPets.length === 0 ? (
                                <span className="text-[9px] font-mono text-slate-400 block italic">Sin mascotas registradas en este apartamento.</span>
                              ) : (
                                <div className="space-y-1">
                                  {currentAptPets.map(p => (
                                    <div key={p.id} className="flex items-center justify-between text-[10px] font-mono">
                                      <span className="text-slate-700 font-bold">• {p.name} ({p.species})</span>
                                      <span className={`px-1 rounded text-[9px] ${p.vaccinated ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-rose-500 animate-pulse'}`}>
                                        {p.vaccinated ? 'Vacunado antirrábica ✔' : 'Vacuna Pendiente ⚠'}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 6. Radicados de Conflictos/PQRS */}
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 bg-slate-200 border-2 border-slate-650 text-slate-700 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold z-10">
                            6
                          </span>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                                <ClipboardCheck className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Radicados de PQRS y Solicitudes Formales</span>
                              </span>
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-bold">
                                {currentAptPqrs.length} Registradas
                              </span>
                            </div>
                            
                            <p className="text-[11px] text-slate-600">
                              Canal digital único que centraliza requerimientos para evitar chats airados a horas inapropiadas en el celular personal del administrador.
                            </p>

                            <div className="bg-white p-2.5 rounded-lg border border-slate-150 space-y-2">
                              {currentAptPqrs.length === 0 ? (
                                <span className="text-[9px] font-mono text-slate-400 block italic">Ninguna reclamación vigente registrada en este apartamento. ¡Todo marcha en silencio y paz!</span>
                              ) : (
                                <div className="space-y-2">
                                  {currentAptPqrs.map(p => (
                                    <div key={p.id} className="p-2 bg-slate-50 rounded border border-slate-150 text-[10px] font-mono space-y-1">
                                      <div className="flex justify-between font-bold text-slate-800">
                                        <span>Radicado {p.id} ({p.type})</span>
                                        <span className="text-indigo-600">{p.status}</span>
                                      </div>
                                      <p className="text-slate-600 italic text-[9px]">"{p.title}"</p>
                                      <div className="text-[8px] text-slate-400 flex justify-between">
                                        <span>Responsable: {p.assignedTo}</span>
                                        <span>Fecha: {p.date}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <p className="text-[9px] font-mono text-slate-400 leading-tight">
                                Cada interacción, respuesta del consejo o adjunto queda respaldado en el registro histórico. No se borra nada, no se pierden pruebas de convivencia.
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  );
                })()}

              </div>

            </div>
          </section>

          {/* CHARTS LAYER (STACKED OCCUPANCY + DONUTS DE VEHICULOS Y MASCOTAS) */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left: Occupancy Stacked bar chart Torre x Torre (6 columns) */}
            <div className="md:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-600 rounded-full" />
                  <span>Ocupación de Unidades por Torre</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Apartamentos habitados vs desocupados en cada bloque de San Marcos.
                </p>
              </div>

              {/* Stacked bars wrapper */}
              <div className="space-y-5 py-2">
                {db.towers.map((tower) => {
                  const occupiedCount = tower.apartments.filter(a => a.occupied).length;
                  const totalCount = tower.apartments.length;
                  const vacantCount = totalCount - occupiedCount;
                  const occupiedPct = totalCount > 0 ? (occupiedCount / totalCount) * 100 : 0;
                  const vacantPct = 100 - occupiedPct;

                  return (
                    <div key={tower.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-bold text-slate-700">{tower.name}</span>
                        <span className="text-slate-500 text-[11px]">
                          <strong className="text-blue-600">{occupiedCount}</strong> / <strong className="text-slate-400">{vacantCount}</strong> (Total: {totalCount})
                        </span>
                      </div>

                      {/* Stacked indicator */}
                      <div className="h-5 rounded-lg overflow-hidden flex border border-slate-250 bg-slate-100">
                        {occupiedCount > 0 ? (
                          <div 
                            className="bg-blue-600 hover:bg-blue-700 transition-all text-[10px] text-blue-50 font-extrabold flex items-center justify-center cursor-default font-mono" 
                            style={{ width: `${occupiedPct}%` }}
                            title={`${occupiedCount} ocupados`}
                          >
                            {Math.round(occupiedPct)}%
                          </div>
                        ) : null}
                        
                        {vacantCount > 0 ? (
                          <div 
                            className="bg-slate-200 hover:bg-slate-350 transition-all text-[10px] text-slate-400 font-medium flex items-center justify-center cursor-default font-mono" 
                            style={{ width: `${vacantPct}%` }}
                            title={`${vacantCount} vacantes`}
                          >
                            {Math.round(vacantPct)}%
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legends */}
              <div className="flex gap-4 items-center justify-center border-t border-slate-200 pt-4 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" />
                  <span>Unidades Ocupadas</span>
                </span>
                
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-slate-200 inline-block" />
                  <span>Unidades Disponibles</span>
                </span>
              </div>
            </div>

            {/* Right: Two distribution donuts (6 columns) */}
            <div className="md:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-indigo-600 rounded-full" />
                  <span>Distribución de Activos Copropiedad</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Categorización censal de vehículos y especies de mascotas registradas.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Donut 1: Vehicles */}
                <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    1. Vehículos
                  </span>
                  
                  {/* Custom SVG radial representation */}
                  <div className="relative w-23 h-23 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.9155"
                      />
                      <circle
                        className="text-indigo-600"
                        strokeDasharray="70, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.9155"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs font-extrabold text-slate-900 font-mono">{totalVehicles}</span>
                      <span className="text-[8px] text-slate-500 font-mono">Placas</span>
                    </div>
                  </div>

                  <div className="text-[9px] text-left space-y-1 font-mono text-slate-600">
                    <div className="flex justify-between">
                      <span>🚗 Auto:</span>
                      <span className="font-bold text-slate-800">{vehicleCounts['Automóvil'] || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🏍 Moto:</span>
                      <span className="font-bold text-slate-800">{vehicleCounts['Moto'] || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🚲 Bici:</span>
                      <span className="font-bold text-slate-800">{(vehicleCounts['Bicicleta'] || 0) + (vehicleCounts['Scooter'] || 0)}</span>
                    </div>
                  </div>
                </div>

                {/* Donut 2: Pets */}
                <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    2. Especies Mascotas
                  </span>

                  <div className="relative w-23 h-23 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.9155"
                      />
                      <circle
                        className="text-amber-500"
                        strokeDasharray="50, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.9155"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs font-extrabold text-slate-900 font-mono">{totalPets}</span>
                      <span className="text-[8px] text-slate-500 font-mono">Animales</span>
                    </div>
                  </div>

                  <div className="text-[9px] text-left space-y-1 font-mono text-slate-600">
                    <div className="flex justify-between">
                      <span>🐶 Perro:</span>
                      <span className="font-bold text-slate-800">{petCounts['Perros'] || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🐱 Gato:</span>
                      <span className="font-bold text-slate-800">{petCounts['Gatos'] || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🦜 Otros:</span>
                      <span className="font-bold text-slate-800">{petCounts['Otros'] || 0}</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="text-center pt-2 border-t border-slate-200">
                <p className="text-[10px] text-slate-400">
                  Censo actualizado bajo la ley de tenencia de animales en PH.
                </p>
              </div>

            </div>

          </section>

          {/* PARKING MAP GRID VISUAL (CLICKABLE TOGGLES STATE) */}
          <section id="parking_grid_section" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                  <span>Mapa de Parqueaderos Activos</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Haga un clic en cualquier celda para alternar su estado de ocupación (Simula actualización física en portería).
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 text-[9px] font-mono font-semibold">
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>R: Disponible</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>R: Ocupado</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>V: Ocupado</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>V: Disponible</span>
                </span>
              </div>
            </div>

            {/* Parking cells layout */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
              {db.parkingSpots.map((spot) => {
                let cellStyle = "";
                let badgeText = spot.number;

                // custom coloring based on status and type
                if (spot.type === 'Residente') {
                  if (spot.status === 'Disponible') {
                    cellStyle = "bg-emerald-50/40 border-emerald-200/60 text-emerald-800 hover:bg-emerald-50";
                  } else {
                    cellStyle = "bg-rose-50/40 border-rose-200/60 text-rose-800 hover:bg-rose-50";
                  }
                } else { // Visitor
                  if (spot.status === 'Ocupado') {
                    cellStyle = "bg-blue-50/40 border-blue-200/60 text-blue-800 hover:bg-blue-50";
                  } else {
                    cellStyle = "bg-amber-50/40 border-amber-200/60 text-amber-800 hover:bg-amber-50";
                  }
                }

                return (
                  <button
                    key={spot.id}
                    onClick={() => toggleParkingSpace(spot.id)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer active:scale-95 space-y-1 ${cellStyle}`}
                  >
                    <span className="text-xs font-mono font-bold block leading-none">
                      {badgeText}
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-widest block font-mono opacity-60">
                      {spot.type === 'Residente' ? 'RES' : 'VIS'}
                    </span>
                    
                    {spot.assignedTo ? (
                      <span className="text-[8px] block font-mono truncate text-slate-700 font-semibold leading-none pt-0.5">
                        {spot.assignedTo}
                      </span>
                    ) : (
                      <span className="text-[8px] block font-mono opacity-30 leading-none pt-0.5">Libre</span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* TOWER BREAKDOWN DETAILS TABLE */}
          <section id="table_breakdown_section" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Table className="w-4 h-4 text-blue-600" />
                <span>Desglose Estructural por Torre</span>
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Datos unificados del censo correspondientes a cada torre de la copropiedad.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-mono font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-4">Identificador</th>
                    <th className="p-4">Ocupación %</th>
                    <th className="p-4">Aptos Ocupados</th>
                    <th className="p-4 font-bold text-slate-700">Habitantes</th>
                    <th className="p-4">Vehículos</th>
                    <th className="p-4 text-right">Mascotas Totales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {db.towers.map((tower) => {
                    const occupied = tower.apartments.filter(a => a.occupied).length;
                    const total = tower.apartments.length;
                    const pct = total > 0 ? (occupied / total) * 100 : 0;
                    
                    // Calc inhabitants
                    const inhabitants = tower.apartments.reduce((acc, a) => acc + a.residentCount, 0);
                    
                    // Vehicles owned by this tower's apts
                    const towerAptIds = tower.apartments.map(a => a.id);
                    const vehiclesCount = db.vehicles.filter(v => towerAptIds.includes(v.ownerUnit)).length;
                    
                    // Pets owned by this tower's apts
                    const petsCount = db.pets.filter(p => towerAptIds.includes(p.ownerUnit)).length;

                    return (
                      <tr key={tower.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="p-4 font-bold text-slate-800">
                          {tower.name}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pct > 80 ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {pct.toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-4 text-slate-600 font-mono">
                          {occupied} de {total} unidades
                        </td>
                        <td className="p-4 font-mono font-bold text-slate-800">
                          {inhabitants} personas
                        </td>
                        <td className="p-4 text-slate-600 font-mono">
                          {vehiclesCount} vehículos
                        </td>
                        <td className="p-4 text-right font-mono text-slate-600 font-bold">
                          {petsCount} animales
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* ACTIVE QUEUES OUTLINE (PQRS) */}
          <section id="pqrs_ledger_section" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4 text-blue-600" />
                  <span>Bitácora de Solicitudes PQRS Recientes</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Estado actual de los procesos de quejas y requerimientos de San Marcos.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Total Radicados: {db.pqrsList.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {db.pqrsList.map((pqr) => {
                let statusColor = "";
                if (pqr.status === 'Abierto') statusColor = 'bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-mono';
                else if (pqr.status === 'En Curso') statusColor = 'bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-mono';
                else if (pqr.status === 'Resuelto') statusColor = 'bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono';
                else statusColor = 'bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-mono';

                return (
                  <div key={pqr.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between gap-3 text-xs">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-semibold uppercase text-slate-400">
                          {pqr.type} • Radicado {pqr.id}
                        </span>
                        <h5 className="font-bold text-slate-800 text-xs mt-0.5">
                          {pqr.title}
                        </h5>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full uppercase ${statusColor}`}>
                        {pqr.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-100 p-2 rounded border border-slate-200 text-[11px] font-mono text-slate-600">
                      <span>Unidad: <strong className="text-slate-800">{pqr.unit}</strong></span>
                      <span>Asignado: <strong className="text-indigo-600">{pqr.assignedTo}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </main>

        {/* SIDE ACTIONS AND SIMULATION PANEL */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* SIMULATOR BOARD / CONTROL CENTER */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[9px] font-mono font-bold text-blue-700 uppercase tracking-widest block bg-blue-50 px-2 py-0.5 rounded border border-blue-200 w-fit">
                Consola Simuladora
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Simulador de Eventos</span>
              </h4>
              <p className="text-[10px] text-slate-500 leading-tight mt-1">
                Realice modificaciones sobre el censo de residentes, vehículos o paquetes y observe la reactividad inmediata del censo.
              </p>
            </div>

            {/* Simulated Live Logs feed */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                Log Historial Base de Datos:
              </span>
              <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl overflow-y-auto max-h-[80px] text-[10px] font-mono text-emerald-400 leading-tight">
                {simulationLogStr}
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-3">
              
              {/* Add resident toggler */}
              <div>
                {!isAddingResident ? (
                  <button
                    onClick={() => {
                      setIsAddingResident(true);
                      setIsAddingVehicle(false);
                    }}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-blue-600" />
                      <span>Registrar Nuevo Copropietario</span>
                    </span>
                    <Plus className="w-4 h-4 text-slate-400" />
                  </button>
                ) : (
                  <form onSubmit={handleAddResidentSubmit} className="bg-slate-50 p-3.5 rounded-xl border border-blue-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-255 pb-1.5 mb-2">
                      <span className="font-bold text-blue-700">Nuevo Residente</span>
                      <button 
                        type="button" 
                        onClick={() => setIsAddingResident(false)}
                        className="text-[10px] text-slate-500 hover:text-slate-800"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="space-y-2">
                      {/* Name */}
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Nombre Completo:</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Martha Ligia Gil"
                          value={newResName}
                          onChange={(e) => setNewResName(e.target.value)}
                          className="w-full bg-white border border-slate-350 p-2 rounded text-slate-800 outline-none focus:border-blue-500 text-xs text-slate-800"
                        />
                      </div>

                      {/* Tower and apt */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-1">Torre:</label>
                          <select
                            value={newResTower}
                            onChange={(e) => setNewResTower(e.target.value)}
                            className="w-full bg-white border border-slate-350 p-1.5 rounded text-slate-800 outline-none text-xs"
                          >
                            <option value="torre_a">Torre A</option>
                            <option value="torre_b">Torre B</option>
                            <option value="torre_c">Torre C</option>
                            <option value="torre_d">Torre D</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-1 font-bold">Unidad (Apto):</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. 104"
                            value={newResApto}
                            onChange={(e) => setNewResApto(e.target.value)}
                            className="w-full bg-white border border-slate-350 p-1.5 rounded text-slate-800 outline-none text-xs text-slate-800 font-bold"
                          />
                        </div>
                      </div>

                      {/* email */}
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Email:</label>
                        <input
                          type="email"
                          placeholder="martha@gil.com"
                          value={newResEmail}
                          onChange={(e) => setNewResEmail(e.target.value)}
                          className="w-full bg-white border border-slate-350 p-2 rounded text-slate-800 outline-none focus:border-blue-500 text-xs text-slate-800"
                        />
                      </div>

                      {/* resident count */}
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Inquilinos en la unidad:</label>
                        <select
                          value={newResCount}
                          onChange={(e) => setNewResCount(Number(e.target.value))}
                          className="w-full bg-white border border-slate-350 p-1.5 rounded text-slate-800 outline-none text-xs"
                        >
                          <option value="1">1 Persona</option>
                          <option value="2">2 Personas</option>
                          <option value="3">3 Personas</option>
                          <option value="4">4 Personas o más</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded pointer-events-auto cursor-pointer text-xs transition-colors"
                    >
                      Inyectar Registro
                    </button>
                  </form>
                )}
              </div>

              {/* Add vehicle form */}
              <div>
                {!isAddingVehicle ? (
                  <button
                    onClick={() => {
                      setIsAddingVehicle(true);
                      setIsAddingResident(false);
                    }}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-indigo-600" />
                      <span>Registrar Vehículo Visitante / Propietario</span>
                    </span>
                    <Plus className="w-4 h-4 text-slate-400" />
                  </button>
                ) : (
                  <form onSubmit={handleAddVehicleSubmit} className="bg-slate-50 p-3.5 rounded-xl border border-indigo-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-255 pb-1.5 mb-2">
                      <span className="font-bold text-indigo-700">Nuevo Vehículo</span>
                      <button 
                        type="button" 
                        onClick={() => setIsAddingVehicle(false)}
                        className="text-[10px] text-slate-500 hover:text-slate-800"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Placa (Ej. MHZ345):</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="MHZ345"
                          value={newVehPlate}
                          onChange={(e) => setNewVehPlate(e.target.value)}
                          className="w-full bg-white border border-slate-350 p-2 rounded text-slate-800 outline-none focus:border-indigo-500 text-xs uppercase text-slate-850"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-1">Categoría:</label>
                          <select
                            value={newVehType}
                            onChange={(e) => setNewVehType(e.target.value as any)}
                            className="w-full bg-white border border-slate-350 p-1.5 rounded text-slate-800 outline-none text-xs animate-none"
                          >
                            <option value="Automóvil">Automóvil</option>
                            <option value="Moto">Moto</option>
                            <option value="Bicicleta">Bicicleta</option>
                            <option value="Scooter">Scooter</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-1 font-bold font-mono">Apto Propietario:</label>
                          <input
                            type="text"
                            required
                            placeholder="A-101"
                            value={newVehApto}
                            onChange={(e) => setNewVehApto(e.target.value)}
                            className="w-full bg-white border border-slate-350 p-1.5 rounded text-slate-800 outline-none text-xs text-slate-850"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded pointer-events-auto cursor-pointer text-xs transition-colors"
                    >
                      Registrar en Portería
                    </button>
                  </form>
                )}
              </div>

              {/* Package arrival trigger */}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulatePackage}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-3 rounded-xl text-[11px] border border-slate-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Recibir Paquete</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearPackages}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold p-2.5 rounded-xl text-[11px] border border-rose-200 cursor-pointer"
                  title="Marcar todos como retirados"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Package current counter badge */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Paquetes en Portería:</span>
                <span className="bg-amber-100 text-amber-800 border border-amber-250 px-2 py-0.5 rounded-full font-extrabold text-[10px]">
                  {db.packagesInPorteria} en cola
                </span>
              </div>

              {/* Reset simulator database */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetDb}
                  className="w-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-bold py-2.5 rounded-xl text-[11px] transition-colors border border-slate-200 hover:border-rose-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reconfigurar Base de Datos Original</span>
                </button>
              </div>

            </div>

          </div>

          {/* VIRTUAL PETS VACCINATION RECORD QUICK TOGGLER */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Censo Sanitario Mascotas</span>
              </h4>
              <p className="text-[10px] text-slate-500 mt-1">
                La Ley colombiana exige certificar la vacunación antirrábica. Haga clic para convalidar.
              </p>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[160px] pr-1">
              {db.pets.map((pet) => (
                <button
                  key={pet.id}
                  onClick={() => togglePetVaccine(pet.id)}
                  className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between transition-colors text-xs text-left cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 block">{pet.name} ({pet.species})</span>
                    <span className="text-[9px] text-slate-400 block leading-none font-mono">Unidad: {pet.ownerUnit}</span>
                  </div>
                  
                  {pet.vaccinated ? (
                    <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200 font-mono">
                      VACUNADO
                    </span>
                  ) : (
                    <span className="text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold border border-amber-200 font-mono animate-pulse">
                      PENDIENTE
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="pt-2 border-t border-slate-200 text-center">
              <span className="text-[9px] text-slate-400">
                Mascotas totales registradas: {totalPets}
              </span>
            </div>
          </div>

          {/* COMPLIANCE CHECK FOR COLOMBIAN PH LEY 675 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-3.5">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Cumplimiento Ley 675 / 1581</span>
            </h5>
            <p className="text-[11px] text-slate-500 leading-snug">
              Los registros de censo, correspondencia, placas y PQRS generados cumplen con las normativas colombianas de propiedad horizontal y protección de datos (Habeas Data).
            </p>
            
            <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold">Módulos Auditados:</span>
              <div className="space-y-1 text-[11px] text-slate-600">
                <div className="flex justify-between">
                  <span>• Coeficiente de copropiedad:</span>
                  <span className="text-emerald-700 font-bold">Aprobado</span>
                </div>
                <div className="flex justify-between">
                  <span>• Protección Habeas Data:</span>
                  <span className="text-emerald-700 font-bold">Aprobado</span>
                </div>
                <div className="flex justify-between">
                  <span>• Regulación PQRS (15 días):</span>
                  <span className="text-emerald-700 font-bold">Activo</span>
                </div>
              </div>
            </div>
          </div>

        </aside>

      </div>

      {/* ADMIN FOOTER */}
      <footer id="dashboard_console_footer" className="bg-white border-t border-slate-200 py-6 px-6 mt-12 text-center text-xs text-slate-400 font-mono shadow-inner">
        <p>© Residential Manager - Panel Administrativo Protegido. Licencia Demostrativa Organizada.</p>
      </footer>

    </div>
  );
}
