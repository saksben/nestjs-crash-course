import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3) // Class Validator to ensure name has at least 3 characters
  name: string;

  @IsEnum(['stars', 'nunchucks'], {message: 'Use correct weapon'}) // Weapon must only be either stars or nunchucks
  weapon: 'stars' | 'nunchucks';
}
