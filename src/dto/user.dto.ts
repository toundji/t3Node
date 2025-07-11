import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min, MinLength } from "class-validator";
import { UserRole } from "../core/enums/user-role";

export class UserDto {

    @IsString()
    @MinLength(3)
    @MinLength(200)
    @IsNotEmpty()
    name?: string;

    @IsEmail()
    email?: string;

    @IsString()
    password?: string;

    @IsDateString()
    birthDate?: Date;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsBoolean()
    @IsOptional()
    status?: boolean

}

export class LoginDto {
    @IsEmail()
    email?: string;

    @IsString()
    @IsNotEmpty()
    password?: string;
}

export class RegisterDto {

    @IsString()
    @MinLength(3)
    @MinLength(200)
    @IsNotEmpty()
    name?: string;

    @IsEmail()
    email?: string;

    @IsString()
    password?: string;

    @IsDateString()
    birthDate?: Date;
}

export class UserCreateDto extends RegisterDto {

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsBoolean()
    @IsOptional()
    status?: boolean
}

export class UserUpDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: Date;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

}


export class UserFilterDto {

    @IsString()
    @IsMongoId()
    @IsOptional()
    _id?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: Date;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

    @IsDateString()
    @IsOptional()
    createdAt?: Date;

    @IsDateString()
    @IsOptional()
    updatedAt?: Date;

}

export class IdDto {
    @IsString()
    @IsMongoId()
    id?: string;
}