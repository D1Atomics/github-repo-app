import { Test, TestingModule } from '@nestjs/testing';
import { GithubSearchService } from '../../src/github-search/services/github-search.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('GithubSearchService', () => {
  let service: GithubSearchService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('https://api.github.com'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubSearchService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<GithubSearchService>(GithubSearchService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return repositories on successful API call', async () => {
    const mockResponse = {
      data: {
        items: [{ id: 1, name: 'repo1', owner: { login: 'user', id: 1 } }],
      },
    };

    mockHttpService.get.mockReturnValue(of(mockResponse));

    const result = await service.getRepositories('test');
    expect(result.repos).toEqual(mockResponse.data.items);
  });
});
