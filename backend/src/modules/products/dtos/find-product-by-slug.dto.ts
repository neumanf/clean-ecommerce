import { IsString } from 'class-validator';

export class FindProductBySlugDto {
    @IsString()
    slug: string;
}
