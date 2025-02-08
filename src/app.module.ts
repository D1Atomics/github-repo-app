import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubSearchModule } from './github-search/github-search.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from 'config/validation/config.validation';
import { githubConfig } from 'config/configuration';
import { MorganMiddleware } from './common/middleware/morgan-logger.middleware';

@Module({
  imports: [
    GithubSearchModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
      load: [githubConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
