import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
