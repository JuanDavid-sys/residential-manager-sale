/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Apartment {
  id: string; // e.g. "A-101"
  towerId: string; // e.g. "Torre A"
  number: string; // e.g. "101"
  occupied: boolean;
  ownerName: string;
  residentCount: number;
  contactEmail: string;
}

export interface TowerInfo {
  id: string;
  name: string;
  apartments: Apartment[];
}

export interface Vehicle {
  id: string;
  plate: string;
  type: 'Automóvil' | 'Moto' | 'Bicicleta' | 'Scooter';
  ownerUnit: string; // e.g. "A-101"
}

export interface Pet {
  id: string;
  name: string;
  species: 'Perros' | 'Gatos' | 'Otros';
  vaccinated: boolean;
  ownerUnit: string;
}

export interface ParkingSpot {
  id: string; // e.g. "P-101"
  number: string;
  type: 'Residente' | 'Visitante';
  status: 'Disponible' | 'Ocupado';
  assignedTo?: string; // e.g. "A-101" or Visitor license plate
}

export interface PQRS {
  id: string;
  title: string;
  unit: string;
  type: 'Petición' | 'Queja' | 'Reclamo' | 'Sugerencia';
  status: 'Abierto' | 'En Curso' | 'Resuelto' | 'Cerrado';
  date: string;
  assignedTo: string;
}

export interface DashboardState {
  towers: TowerInfo[];
  vehicles: Vehicle[];
  pets: Pet[];
  parkingSpots: ParkingSpot[];
  pqrsList: PQRS[];
  packagesInPorteria: number;
}
