import 'reflect-metadata';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDate, IsEnum, IsInt, IsNotEmpty, Min, IsUUID, IsEmail, IsOptional, ValidateNested, ArrayUnique, ArrayMaxSize, IsBoolean, MinLength, IsString, IsNumber } from 'class-validator';



export class Coordinates {
    /**
     * @property {number} speed_left speed for left motor
     */
    @IsNumber()
    speed_left: number;

    /**
     * @property {number} speed_right speed for right motor
     */
    @IsNumber()
    speed_right: number;
}
