import { Controller, Get, Query } from '@nestjs/common';
import { GithubSearchService } from '../services/github-search.service';
import { SearchReposDto } from '../dto/search-repos.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RepoResponse } from '../dto/success-response.dto';
import { ErrorResponse } from '../dto/error-response.dto';

@ApiTags('GitHub Repositories')
@Controller('v1/github/repositories')
export class GithubSearchController {
  constructor(private readonly githubSearchService: GithubSearchService) {}

  @Get()
  @ApiOperation({
    summary: 'Search GitHub repositories',
    description: 'Search repositories with advanced filtering and sorting',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved repositories',
    type: RepoResponse,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
    type: ErrorResponse,
  })
  async searchRepos(@Query() searchReposDto: SearchReposDto) {
    const { repos } = await this.githubSearchService.getRepositories(
      searchReposDto.search,
      searchReposDto.sort,
      searchReposDto.ignore,
    );
    return {
      repos,
    };
  }
}
