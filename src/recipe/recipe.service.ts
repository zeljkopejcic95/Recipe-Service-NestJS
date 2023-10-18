import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto, EditRecipeDto } from './dto';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async AllRecipes(userId: number) {
    const recipes = await this.prisma.recipe.findMany({
      where: {
        userId,
      },
    });
    return recipes;
  }

  async getRecipeById(userId: number, recipeId: number) {
    const recipe = await this.prisma.recipe.findFirst({
      where: {
        id: recipeId,
        userId,
      },
    });
    return recipe;
  }

  async newRecipe(userId: number, dto: CreateRecipeDto) {
    const newRecipe = await this.prisma.recipe.create({
      data: {
        userId,
        ...dto,
      },
    });
    return newRecipe;
  }

  async editRecipeById(userId: number, recipeId: number, dto: EditRecipeDto) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe || recipe.userId !== userId)
      throw new ForbiddenException('access denied');

    return this.prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteRecipeById(userId: number, recipeId: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe || recipe.userId !== userId)
      throw new ForbiddenException('access denied');

    return this.prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });
  }
}
