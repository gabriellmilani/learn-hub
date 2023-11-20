import { DataSource } from 'typeorm';
import { Class } from './entities/class.entity';

export const classProviders = [
  {
    provide: 'CLASS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Class),
    inject: ['DATA_SOURCE'],
  },
];