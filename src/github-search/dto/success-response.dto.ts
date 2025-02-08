import { ApiProperty } from '@nestjs/swagger';

export class RepoResponse {
  @ApiProperty({ example: 123 })
  id: number;

  @ApiProperty({ example: 'repo1' })
  name: string;

  @ApiProperty({
    type: 'object',
    properties: {
      login: { type: 'string', example: 'lorem' },
      id: { type: 'number', example: 9677443 },
      node_id: { type: 'string', example: 'string' },
      avatar_url: {
        type: 'string',
        example: 'string',
      },
      url: { type: 'string', example: 'string' },
      html_url: { type: 'string', example: 'string' },
      type: { type: 'string', example: 'Organization' },
      site_admin: { type: 'boolean', example: false },
    },
  })
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    url: string;
    html_url: string;
    type: string;
    site_admin: boolean;
  };

  @ApiProperty({ example: 100 })
  stargazers_count: number;

  @ApiProperty({ example: 'https://github.com/' })
  html_url: string;

  @ApiProperty({ example: false })
  private: boolean;

  @ApiProperty({ example: 'https://api.github.com/repos/' })
  url: string;

  @ApiProperty({ example: 'master' })
  default_branch: string;

  @ApiProperty({ example: 'CSS' })
  language: string;

  @ApiProperty({ example: 0 })
  open_issues_count: number;

  @ApiProperty({ example: 6 })
  forks_count: number;

  @ApiProperty({ example: 4 })
  watchers_count: number;
}
