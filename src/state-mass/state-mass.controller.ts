import { Body, Controller, Get, Put } from '@nestjs/common';
import { StateMassService } from './state-mass.service';

@Controller('state-mass')
export class StateMassController {
  constructor(private readonly stateMassService: StateMassService) {}

  //get current state
  //localhost:3000/state-mass/current-state
  @Get('/current-state')
  getCurrentState(): string {
    return this.stateMassService.getCurrentState();
  }

  /**
   * get next possible transitions
   * localhost:3000/state-mass/available-states
   */
  @Get('/available-states')
  getAvailableStates(): string[] {
    return this.stateMassService.getAvailableTransitions();
  }

  /**
   * transition to another state
   * localhost:3000/state-mass/transition
   * Body => { "transition" : "value" }
   */
  @Put('/transition')
  transition(@Body('transition') transition: string): void {
    return this.stateMassService.updateState(transition);
  }
}
