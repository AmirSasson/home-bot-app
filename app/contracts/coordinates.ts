import 'reflect-metadata';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDate, IsEnum, IsInt, IsNotEmpty, Min, IsUUID, IsEmail, IsOptional, ValidateNested, ArrayUnique, ArrayMaxSize, IsBoolean, MinLength, IsString, IsNumber } from 'class-validator';



export class Coordinates {
  /**
   * @property {number} x coordinates
   */
  @IsNumber()
  x: number;

  /**
   * @property {number} y coordinates
   */
  @IsNumber()
  y: number;
}
