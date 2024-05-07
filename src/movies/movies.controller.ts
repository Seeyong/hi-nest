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
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(`:id`)
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto): void {
    return this.moviesService.create(movieData);
  }

  @Delete(`:id`)
  remove(@Param('id') movieId: number): void {
    return this.moviesService.deleteOne(movieId);
  }

  @Put(`:id`)
  patch(@Param('id') movieId: number, @Body() updateData): void {
    return this.moviesService.update(movieId, updateData);
  }
}
