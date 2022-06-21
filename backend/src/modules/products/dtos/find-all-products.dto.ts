import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FindAllProductsDto {
    @IsNumberString()
    @IsOptional()
    page?: number;

    @IsNumberString()
    @IsOptional()
    limit?: number;

    @IsString()
    @IsOptional()
    category?: string;
}
