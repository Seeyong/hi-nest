import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'This well return all movies!';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We're searching for a movie with a year: ${searchingYear}`;
  }

  @Get(`:id`)
  getOne(@Param('id') movieId: string): string {
    return `This will return ${movieId}th movie`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(`:id`)
  remove(@Param('id') movieId: string): string {
    return `This will remove ${movieId}th movie`;
  }

  @Put(`:id`)
  patch(@Param('id') movieId: string, @Body() updateData): string {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
