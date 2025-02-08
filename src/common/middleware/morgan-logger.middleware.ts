import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import chalk from 'chalk';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private readonly logger = morgan((tokens, req, res) => {
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const status = tokens.status(req, res);
    const responseTime = tokens['response-time'](req, res);
    const contentLength = tokens.res(req, res, 'content-length');
    const remoteAddr = tokens['remote-addr'](req, res);

    const statusColor =
      Number(status) >= 500
        ? chalk.red
        : Number(status) >= 400
          ? chalk.yellow
          : Number(status) >= 300
            ? chalk.cyan
            : Number(status) >= 200
              ? chalk.green
              : chalk.gray;

    const methodColor = method === 'GET' ? chalk.blue : chalk.gray;

    return [
      chalk.white(remoteAddr),
      '-',
      methodColor(method),
      chalk.white(url),
      statusColor(status),
      chalk.white(`${responseTime}ms`),
      chalk.white(`- ${contentLength}`),
    ].join(' ');
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.logger(req, res, next);
  }
}
