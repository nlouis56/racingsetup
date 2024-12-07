import Dexie from 'dexie';
import { Vehicule, Setup } from '@/utils/types';

class AppDatabase extends Dexie {
  vehicles: Dexie.Table<Vehicule, number>;
  setups: Dexie.Table<Setup, number>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      vehicles: 'id, name, description, createdAt',
      setups: 'id, name, track, description, createdAt, vehicle.id',
    });

    this.vehicles = this.table('vehicles');
    this.setups = this.table('setups');
  }
}

export const db = new AppDatabase();
