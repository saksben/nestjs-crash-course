import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

// Provider. Can be injected into other classes. Tells Nest it is responsible for instantiating this class and it can automatically inject it into anything that needs it
@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'ninjaA', weapon: 'stars' },
    { id: 1, name: 'ninjaB', weapon: 'nunchucks' },
  ];

  // Get ninjas. Allow query filter by weapon.
  getNinjas(weapon?: 'stars' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  // Get one ninja by its id
  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('ninja not found');
    }
    return ninja;
  }

  // Create ninja
  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }

  // Update ninja by its id
  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updateNinjaDto };
      }
      return ninja;
    });
    return this.getNinja(id);
  }

  // Remove ninja by its id
  removeNinja(id: number) {
    const toBeRemoved = this.getNinja(id);
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
    return toBeRemoved;
  }
}
