import 'reflect-metadata';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDate, IsEnum, IsInt, IsNotEmpty, Min, IsUUID, IsEmail, IsOptional, ValidateNested, ArrayUnique, ArrayMaxSize, IsBoolean, MinLength, IsString, IsNumber, IsNumberString } from 'class-validator';



export class Coordinates {
    /**
     * @property {number} speed_left speed for left motor
     */
    @IsNumberString()
    speed_left: number;

    /**
     * @property {number} speed_right speed for right motor
     */
    @IsNumberString()
    speed_right: number;
}
