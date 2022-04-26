import { IsString, IsUrl, IsNumber, Length, Min } from 'class-validator';

export class CreateProductDto {
    @Length(3, 255)
    name: string;

    @Length(3)
    description: string;

    @IsString()
    category: string;

    @IsUrl()
    imageUrl: string;

    @IsNumber()
    @Min(0)
    price: number;
}
