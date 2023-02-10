/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatuses, TaskStatusTransition } from './task-interfaces';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Get current state
   * localhost:3000/tasks
   */
  @Get()
  getCurrentStatus(): string {
    return this.tasksService.getCurrentStatus();
  }

  /**
   * get next possible transitions
   * localhost:3000/tasks/available-transitions
   */
  @Get('/available-transitions')
  getAvailableTranistions(): TaskStatusTransition[] {
    return this.tasksService.getAvailableTransitions();
  }

  /**
   * transition to another state
   * localhost:3000/tasks/validate-transitions
   * Body => {"statusToSwitch": "On Hold"}
   */
  @Put('/validate-transitions')
  validateNextTransition(@Body('statusToSwitch') statusToSwitch: TaskStatuses) {
    return this.tasksService.isTransitionAllowed(statusToSwitch);
  }
}
