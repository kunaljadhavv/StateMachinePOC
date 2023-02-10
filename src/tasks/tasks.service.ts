/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { includes, startCase } from 'lodash';
import { TaskEntity, TaskStatuses, TaskStatusTransition } from './task-interfaces';
const StateMachine = require('javascript-state-machine');

@Injectable()
export class TasksService {
  getCurrentStatus(): string {
    return this.task.status;
  }

  task: TaskEntity;
  private readonly statusSwitcher: typeof StateMachine;
  constructor() {

    this.task =  {
      status: TaskStatuses['New']
    };

    this.statusSwitcher = new StateMachine({
      init: 'New',
      transitions: [
        {
          name: 'toOpen',
          from: ['New', 'InProgress', 'Review', 'Done', 'NotApplicable'],
          to: TaskStatuses.Open,
        },
        {
          name: 'toInProgress',
          from: ['Open', 'OnHold'],
          to: TaskStatuses['In Progress'],
        },
        { name: 'toReview', from: 'InProgress', to: TaskStatuses.Review },
        {
          name: 'toDone',
          from: ['New', 'Open', 'InProgress', 'Review', 'NotApplicable', 'OnHold'],
          to: TaskStatuses.Done
        },
        {
          name: 'toNotApplicable',
          from: ['New', 'Open', 'InProgress', 'Review', 'Done', 'OnHold'],
          to: TaskStatuses['Not Applicable']
        },
        {
          name: 'toOnHold',
          from: ['New', 'Open', 'InProgress', 'Review', 'Done', 'NotApplicable'],
          to: TaskStatuses['On Hold']
        },
        { name: 'goto', from: '*', to: (state: any) => state }
      ],
      methods: {
        onToOpen: (lifecycle: any, task: TaskEntity) => {
          console.log('in use')
          task.status = lifecycle.to;
          return task;
        },
        onToInProgress: (lifecycle: any, task: TaskEntity) => {
          task.status = lifecycle.to;
          return task;
        },
        onToReview: (lifecycle: any, task: TaskEntity) => {
          task.status = lifecycle.to;
          return task;
        },
        onToDone: (lifecycle: any, task: TaskEntity) => {
          console.log('on to done called');
          task.status = lifecycle.to;
          return task;
        },
        onToNotApplicable: (lifecycle: any, task: TaskEntity) => {
          task.status = lifecycle.to;
          return task;
        },
        onToOnHold: (lifecycle: any, task: TaskEntity) => {
          task.status = lifecycle.to;
          return task;
        },
        onBeforeOpen:(lifecycle: any, task: TaskEntity)=>{
          console.log('its about to be open');
          return task;
        },
        onLeaveOpen:(lifecycle: any, task: TaskEntity)=>{
          console.log(lifecycle);
          console.log('on leave open called');
          return task;
        },
        onInvalidTransition: (transition: any, from: any) => {
          throw new Error(`Transition is not allowed from state '${startCase(from)}'`);
        },
      }
    });
  }
  
  getAvailableTransitions(): TaskStatusTransition[] {
    this.statusSwitcher.goto(this.task.status.replace(' ', ''));
    console.log(this.statusSwitcher.transitions());
    const availableStatuses = this.statusSwitcher.transitions()
      .filter((transition: string) => transition !== 'goto')
      .map((transition: string) => ({
        name: startCase(transition),
        status: startCase(transition.replace('to', ''))
      }));
    console.log(availableStatuses);
    return availableStatuses;
  }

  isTransitionAllowed(statusToSwitch: TaskStatuses) {
    this.statusSwitcher.goto(this.task.status.replace(' ', ''));
    const availableStatuses = this.statusSwitcher.transitions()
      .filter((transition: string) => transition !== 'goto')
      .map((transition: string) => startCase(transition.replace('to', '')));
    if (!includes(availableStatuses, statusToSwitch)) {
      throw new BadRequestException(`Transition is not allowed from state '${startCase(this.task.status)}' to '${startCase(statusToSwitch)}'`);
    } else {
      console.log('updated task from: ',this.task.status,' => ',statusToSwitch);
      this.task.status = statusToSwitch;
      console.log('task:',this.task);
    }
  }
}
