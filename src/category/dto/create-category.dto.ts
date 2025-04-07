import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category code',
    example: 'CAT001',
    minLength: 2,
    maxLength: 10,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  code: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Electronics',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
