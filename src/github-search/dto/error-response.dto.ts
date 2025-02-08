import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: 'Internal server error' })
  message: string;

  @ApiProperty({ example: '2025-02-08T11:11:11.117Z' })
  timestamp: string;

  @ApiProperty({ example: '/?search=h&sort=desc' })
  path: string;
}
