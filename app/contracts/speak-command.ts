import 'reflect-metadata';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDate, IsEnum, IsInt, IsNotEmpty, Min, IsUUID, IsEmail, IsOptional, ValidateNested, ArrayUnique, ArrayMaxSize, IsBoolean, MinLength, IsString, IsNumber } from 'class-validator';
import { isString } from 'util';



export class SpeakCommand {
    /**
     * @property {string} msg a string message to send the bot to say
     */
    @IsString()
    @MinLength(2)
    msg: string;

    /**
     * @property {string} by name of the person that sent this msg
     */
    @IsString()
    @MinLength(2)
    by: string;
}
