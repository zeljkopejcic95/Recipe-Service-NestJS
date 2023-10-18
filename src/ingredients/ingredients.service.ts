import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditIngredientDto } from './dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async allIngredients(userId: number) {
    const ingredients = await this.prisma.ingredients.findMany({
      where: {
        userId,
      },
    });
    return ingredients;
  }

  async getIngredientById(userId: number, ingredientId: number) {
    const ingredient = await this.prisma.ingredients.findFirst({
      where: {
        id: ingredientId,
        userId,
      },
    });
    return ingredient;
  }

  async newIngredient(userId: number, dto: CreateIngredientDto) {
    const newIngredient = await this.prisma.ingredients.create({
      data: {
        userId,
        ...dto,
      },
    });
    return newIngredient;
  }

  async editIngredientById(
    userId: number,
    ingredientId: number,
    dto: EditIngredientDto,
  ) {
    const ingredient = await this.prisma.ingredients.findUnique({
      where: {
        id: ingredientId,
      },
    });

    if (!ingredient || ingredient.userId !== userId)
      throw new ForbiddenException('access denied');

    return this.prisma.ingredients.update({
      where: {
        id: ingredientId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteIngredientById(userId: number, ingredientId: number) {
    const ingredient = await this.prisma.ingredients.findUnique({
      where: {
        id: ingredientId,
      },
    });

    if (!ingredient || ingredient.userId !== userId)
      throw new ForbiddenException('access denied');

    return this.prisma.ingredients.delete({
      where: {
        id: ingredientId,
      },
    });
  }
}
