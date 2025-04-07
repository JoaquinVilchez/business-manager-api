import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Category code',
    example: 'CAT001',
    minLength: 2,
    maxLength: 10,
    required: false,
  })
  @IsOptional()
  @ValidateIf((o: UpdateCategoryDto) => o.code !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  code?: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Electronics',
    minLength: 2,
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  @ValidateIf((o: UpdateCategoryDto) => o.name !== undefined)
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;
}
