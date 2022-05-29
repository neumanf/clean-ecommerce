import { IsNumberString } from 'class-validator';

export class FindProductByIdDto {
    @IsNumberString()
    id: number;
}
