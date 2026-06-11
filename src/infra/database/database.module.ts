import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        database: config.get('DB_DATABASE'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        autoLoadEntities: Boolean(Number(config.get('DB_AUTO_LOAD'))),
        synchronize: Boolean(Number(config.get('DB_SYNC'))),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
