import { Module } from '@nestjs/common';
import { GithubSearchService } from './services/github-search.service';
import { GithubSearchController } from './controllers/github-search.controller';
import { ConfigModule } from '@nestjs/config';
import { githubConfig } from 'config/configuration';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forFeature(githubConfig), HttpModule],
  controllers: [GithubSearchController],
  providers: [GithubSearchService],
})
export class GithubSearchModule {}
