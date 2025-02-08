import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.error(`[${new Date().toISOString()}] Error: ${exception.message}`, {
      path: request.url,
      stack: exception.stack,
    });

    response.status(status).json({
      statusCode: status,
      message: status >= 500 ? 'Internal server error' : exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
