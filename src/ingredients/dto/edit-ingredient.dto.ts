import { IsOptional, IsString } from 'class-validator';

export class EditIngredientDto {
  @IsString()
  @IsOptional()
  name?: string;
}
