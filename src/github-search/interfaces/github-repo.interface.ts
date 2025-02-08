export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  license: Record<string, unknown> | null;
}

export interface GitHubApiResponse {
  total_count: number;
  items: GithubRepo[];
}

export interface RepositoriesResult {
  repos: GithubRepo[];
}
