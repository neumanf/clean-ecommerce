import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    getConnection(): Connection {
        return this.connection;
    }
}
