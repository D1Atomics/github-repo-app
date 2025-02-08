import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  GitHubApiResponse,
  GithubRepo,
  RepositoriesResult,
} from '../interfaces/github-repo.interface';
import { GithubConfig } from 'config/interfaces/config.interface';

@Injectable()
export class GithubSearchService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService<GithubConfig>,
  ) {}

  async getRepositories(
    query: string,
    sortOrder?: 'asc' | 'desc',
    ignorePattern?: string,
  ): Promise<RepositoriesResult> {
    const apiUrl = this.configService.get<string>('apiUrl');
    const searchUrl = `${apiUrl}/search/repositories`;

    // Build query parameters
    const searchParams = new URLSearchParams({
      q: `${query.trim()} in:name`,
      ...(sortOrder && {
        sort: 'name',
        order: sortOrder,
      }),
    });

    // Execute API request
    const { data } = await firstValueFrom(
      this.httpService.get<GitHubApiResponse>(searchUrl, {
        params: searchParams,
      }),
    );

    // Filter results
    const filteredRepos = this.filterRepositories(data.items, ignorePattern);

    return { repos: filteredRepos };
  }

  private filterRepositories(
    repositories: GithubRepo[],
    ignorePattern?: string,
  ): GithubRepo[] {
    if (!ignorePattern) return repositories;

    const lowerCasePattern = ignorePattern.toLowerCase();
    return repositories.filter(
      (repo) => !repo.name.toLowerCase().includes(lowerCasePattern),
    );
  }
}
