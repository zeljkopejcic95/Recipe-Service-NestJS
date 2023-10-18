import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common/decorators/http';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { GetUser } from 'src/users/decorator';
import { JwtGuard } from 'src/users/guard';
import { EditIngredientDto } from './dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientsService } from './ingredients.service';

@UseGuards(JwtGuard)
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @Get()
  allIngredients(@GetUser('id') userId: number) {
    return this.ingredientsService.allIngredients(userId);
  }

  @Get(':id')
  getIngredientById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) ingredientId: number,
  ) {
    return this.ingredientsService.getIngredientById(userId, ingredientId);
  }

  @Post()
  newIngredient(
    @GetUser('id') userId: number,
    @Body() dto: CreateIngredientDto,
  ) {
    return this.ingredientsService.newIngredient(userId, dto);
  }

  @Patch(':id')
  editIngredientById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) ingredientId: number,
    @Body() dto: EditIngredientDto,
  ) {
    return this.ingredientsService.editIngredientById(
      userId,
      ingredientId,
      dto,
    );
  }

  @Delete(':id')
  deleteIngredientById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) ingredientId: number,
  ) {
    return this.ingredientsService.deleteIngredientById(userId, ingredientId);
  }
}
