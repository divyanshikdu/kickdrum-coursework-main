import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoNotFoundException } from './exceptions/todo-not-found.exception';
import { Todo } from './models/todo.model';

@Injectable()
export class TodoService {
  private readonly repo = new TodoRepository();

  getAll(): Todo[] {
    return this.repo.findAll();
  }

  getById(id: number): Todo {
    const todo = this.repo.findById(id);

    if (!todo) {
      throw new TodoNotFoundException(id);
    }

    return todo;
  }

  create(data: CreateTodoDto): Todo {
    return this.repo.create(data);
  }

  update(id: number, data: UpdateTodoDto): Todo {
    const updatedTodo = this.repo.updateById(id, data);

    if (!updatedTodo) {
      throw new TodoNotFoundException(id);
    }

    return updatedTodo;
  }

  delete(id: number): void {
    const deleted = this.repo.deleteById(id);

    if (!deleted) {
      throw new TodoNotFoundException(id);
    }
  }
}
