import { IsString } from 'class-validator';

export class NotifyUnavailableProductDto {
    @IsString()
    userEmail: string;

    @IsString()
    userAddress: string;

    @IsString()
    userMessage: string;
}
