import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('sholud be an Array', () => {
      const result: Movie[] = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('sholud return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2020,
        genres: ['test'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('sholud throw NotFoundException error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2020,
        genres: ['test'],
      });
      const beforeMovies: number = service.getAll().length;
      service.deleteOne(1);
      const afterDelete: number = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeMovies);
    });
    it('should throw NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('sholud create a movie', () => {
      const beforeCreate: number = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2020,
        genres: ['test'],
      });
      const afterCreate: number = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('sholud update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2020,
        genres: ['test'],
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw NotFoundException', () => {
      try {
        service.update(999, { title: 'Updated Test' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
