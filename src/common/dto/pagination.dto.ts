import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";


export class PaginationDto {

    @IsPositive()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    //@Transform(({value}) => value ?? 1)  // opcion 1 para agregar un valor por defecto en caso que venga null o undefined
    page?: number// se puede asignar un valor por defecto por las validaciones 

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Type(() => Number)
    //@Transform(({value}) => value ?? 10)
    limit?: number

    // opcion 2 para agregar un valor por defecto ya que es una clase
    // constructor(page?: number) {
    //     this.page = page ?? 1; 
    // }
}