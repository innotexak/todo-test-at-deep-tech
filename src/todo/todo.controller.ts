import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ITodoCreate, ITodoUpdate, ResponseStatus } from './types';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  createTodo(@Body() iTodoCreate: ITodoCreate): Promise<ResponseStatus> {
    return this.todoService.createTodo(iTodoCreate);
  }

  @Get('todos')
  getAllTodos(): Promise<ResponseStatus> {
    return this.todoService.getTodos();
  }

  @Patch('update')
  editDoto(@Body() iUpdateTodo: ITodoUpdate): Promise<ResponseStatus> {
    return this.todoService.updateTodo(iUpdateTodo);
  }

  @Delete('delete')
  deleteTodo(@Query('todoId') todoId: string): Promise<ResponseStatus> {
    return this.todoService.deleteTodo(todoId);
  }
}
