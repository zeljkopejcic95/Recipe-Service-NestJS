import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/users/guard';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common/decorators/http';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateRecipeDto, EditRecipeDto } from './dto';
import { RecipeService } from './recipe.service';
import { GetUser } from 'src/users/decorator';

@UseGuards(JwtGuard)
@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  allRecipes(@GetUser('id') userId: number) {
    return this.recipeService.AllRecipes(userId);
  }

  @Get(':id')
  getRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
  ) {
    return this.recipeService.getRecipeById(userId, recipeId);
  }

  @Post()
  newRecipe(@GetUser('id') userId: number, @Body() dto: CreateRecipeDto) {
    return this.recipeService.newRecipe(userId, dto);
  }

  @Patch(':id')
  editRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() dto: EditRecipeDto,
  ) {
    return this.recipeService.editRecipeById(userId, recipeId, dto);
  }

  @Delete(':id')
  deleteRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
  ) {
    return this.recipeService.deleteRecipeById(userId, recipeId);
  }
}
