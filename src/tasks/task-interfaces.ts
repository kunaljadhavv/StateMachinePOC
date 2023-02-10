/* eslint-disable prettier/prettier */
export enum TaskStatuses {
  New = 'New',
  Open = 'Open',
  'In Progress' = 'In Progress',
  Review = 'Review',
  Done = 'Done',
  'On Hold' = 'On Hold',
  'Not Applicable' = 'Not Applicable'
}

export interface TaskEntity {
  status: TaskStatuses;
}

export interface TaskStatusTransition {
  name: string;
  status: TaskStatuses;
}
