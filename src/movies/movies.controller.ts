import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(`:id`)
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete(`:id`)
  remove(@Param('id') movieId: string): boolean {
    return this.moviesService.deleteOne(movieId);
  }

  @Put(`:id`)
  patch(@Param('id') movieId: string, @Body() updateData): string {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
