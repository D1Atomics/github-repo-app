import { Test, TestingModule } from '@nestjs/testing';
import { GithubSearchController } from '../../src/github-search/controllers/github-search.controller';
import { GithubSearchService } from '../../src/github-search/services/github-search.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('GithubSearchController', () => {
  let controller: GithubSearchController;
  let service: GithubSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      controllers: [GithubSearchController],
      providers: [
        {
          provide: GithubSearchService,
          useValue: {
            getRepositories: jest.fn(() =>
              Promise.resolve({
                repos: [
                  {
                    id: 1,
                    name: 'test-repo',
                    owner: { login: 'test-user' },
                  },
                ],
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<GithubSearchController>(GithubSearchController);
    service = module.get<GithubSearchService>(GithubSearchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return repositories', async () => {
    const result = await controller.searchRepos({ search: 'test' });
    expect(result).toEqual({
      repos: [
        {
          id: 1,
          name: 'test-repo',
          owner: { login: 'test-user' },
        },
      ],
    });
    expect(service.getRepositories).toHaveBeenCalledWith(
      'test',
      undefined,
      undefined,
    );
  });
});
