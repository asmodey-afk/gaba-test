import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {addTransactionalDataSource} from 'typeorm-transactional';
import {
    databaseConfiguration,
    DatabaseConfigType,
    buildDataSourceOptions,
} from './config/DatabaseConfig';
import {PromoCodeModule} from './promo-code/PromoCodeModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfiguration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forFeature(databaseConfiguration)],
            inject: [databaseConfiguration.KEY],
            useFactory: (config: DatabaseConfigType) => buildDataSourceOptions(config),
            dataSourceFactory: async (options) => {
                if (!options) {
                    throw new Error('DataSource options not provided');
                }

                return addTransactionalDataSource(new DataSource(options));
            },
        }),
        PromoCodeModule,
    ],
    providers: [
        {provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor},
    ],
})
export class AppModule {}
