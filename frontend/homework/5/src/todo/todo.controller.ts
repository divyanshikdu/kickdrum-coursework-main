import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './models/todo.model';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll(): Todo[] {
    return this.todoService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Todo {
    return this.todoService.getById(Number(id));
  }

  @Post()
  create(@Body() data: CreateTodoDto): Todo {
    return this.todoService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTodoDto): Todo {
    return this.todoService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.todoService.delete(Number(id));
    return { message: 'Todo deleted successfully' };
  }
}
