import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './todo.schema';
import { Model } from 'mongoose';
import { ITodoCreate, ITodoUpdate, ResponseStatus } from './types';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoRepository: Model<TodoDocument>,
  ) {}

  async createTodo(iTodoCreate: ITodoCreate): Promise<ResponseStatus> {
    let res: ResponseStatus;

    const create = await this.todoRepository.create(iTodoCreate);

    if (create) {
      const saved = await create.save();
    }
    res = {
      message: 'Todo created',
      statusCode: HttpStatus.CREATED,
    };
    return res;
  }

  async getTodos(): Promise<ResponseStatus> {
    let res: ResponseStatus;

    const todos = await this.todoRepository.find({});
    if (todos.length <= 0)
      throw new HttpException(
        'You dont have todo yet, please add one',
        HttpStatus.NOT_FOUND,
      );

    res = {
      message: 'Todo(s) retrieved',
      statusCode: HttpStatus.OK,
      data: todos,
    };
    return res;
  }

  async updateTodo(iUpdateTodo: ITodoUpdate): Promise<ResponseStatus> {
    let res: ResponseStatus;
    const update = await this.todoRepository.updateOne(
      { _id: iUpdateTodo.id },
      { $set: iUpdateTodo.payload },
      { new: true },
    );

    if (update.acknowledged) {
      res = {
        statusCode: HttpStatus.OK,
        message: 'Todo updated',
      };
      return res;
    } else {
      throw new HttpException(
        'Todo not found for update',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteTodo(id: string): Promise<ResponseStatus> {
    let res: ResponseStatus;

    const deleted = await this.todoRepository.deleteOne({ _id: id });
    if (!deleted)
      throw new HttpException(
        'Unable to delete this todo',
        HttpStatus.BAD_REQUEST,
      );

    res = {
      statusCode: HttpStatus.OK,
      message: 'Todo deleted',
    };
    return res;
  }
}
