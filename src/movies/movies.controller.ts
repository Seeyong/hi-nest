import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'This well return all movies!';
  }

  @Get(`/:id`)
  getOne(@Param('id') movieId: string): string {
    return `This will return ${movieId}th movie`;
  }

  @Post()
  create(): string {
    return 'CREATE movies';
  }

  @Delete(`/:id`)
  remove(@Param('id') movieId: string): string {
    return `This will remove ${movieId}th movie`;
  }

  @Put(`/:id`)
  patch(@Param('id') movieId: string): string {
    return `This will update ${movieId}th movie`;
  }
}
