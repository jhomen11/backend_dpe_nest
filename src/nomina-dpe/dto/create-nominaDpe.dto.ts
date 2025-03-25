import { IsString } from "class-validator";

export class CreateNominaDpeDto {
    
    @IsString()
    periodoDpe: string;
    
}