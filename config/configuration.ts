import { GithubConfig } from './interfaces/config.interface';

export const githubConfig = (): GithubConfig => {
  return {
    apiUrl: process.env.GITHUB_API_URL as string,
  };
};
