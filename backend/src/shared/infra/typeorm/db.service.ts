import { AppDataSource } from './data-source';

export class DBService {
    static async init() {
        return AppDataSource.initialize();
    }
}
