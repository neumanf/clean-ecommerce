import { IsNumberString } from 'class-validator';

export class FindProductDto {
    @IsNumberString()
    id: number;
}
