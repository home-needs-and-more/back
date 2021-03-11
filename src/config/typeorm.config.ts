import { ConfigService } from '@nestjs/config';

export default (configService: ConfigService) => {
  let config = {
    type: 'mysql' as const,
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.database'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
  if (configService.get<string>('node.env') === 'dev') {
    const sslConfig = {
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
    config = {
      ...config,
      ...sslConfig,
    };
  }
  return config;
};
