import { IsNumberString, IsOptional } from 'class-validator';

export class FindAllProductsDto {
    @IsNumberString()
    @IsOptional()
    page?: number;

    @IsNumberString()
    @IsOptional()
    limit?: number;
}
