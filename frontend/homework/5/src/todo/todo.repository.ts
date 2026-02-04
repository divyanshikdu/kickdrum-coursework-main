import { Todo } from './models/todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export class TodoRepository {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findById(id: number): Todo | undefined {
    return this.todos.find((t) => t.id === id);
  }

  create(data: CreateTodoDto): Todo {
    const now = new Date();

    const todo: Todo = {
      id: this.idCounter++,
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    this.todos.push(todo);
    return todo;
  }

  updateById(id: number, data: UpdateTodoDto): Todo | undefined {
    const todo = this.findById(id);

    if (!todo) return undefined;

    if (data.title !== undefined) todo.title = data.title;
    if (data.description !== undefined) todo.description = data.description;
    if (data.completed !== undefined) todo.completed = data.completed;

    todo.updatedAt = new Date();

    return todo;
  }

  deleteById(id: number): boolean {
    const index = this.todos.findIndex((t) => t.id === id);

    if (index === -1) return false;

    this.todos.splice(index, 1);
    return true;
  }
}
