import {
  IsString,
  IsOptional,
  IsIn,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchReposDto {
  @ApiProperty({ description: 'Search keyword for repositories' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, {
    message: 'Search term must contain at least one non-whitespace character',
  })
  @MaxLength(128)
  search: string;

  @ApiProperty({
    required: false,
    description: 'Sort repositories by name',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc' | undefined;

  @ApiProperty({
    required: false,
    description: 'Ignore repositorie names containing the string',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  ignore?: string;
}
