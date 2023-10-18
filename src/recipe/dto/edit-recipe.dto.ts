import { IsOptional, IsString } from 'class-validator';

export class EditRecipeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  text?: string;
}
