/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
const StateMachine = require('javascript-state-machine');

@Injectable()
export class StateMassService {
  stateMachine: typeof StateMachine;
  constructor() {
    this.stateMachine = new StateMachine({
      init: 'solid',
      transitions: [
        { name: 'melt', from: 'solid', to: 'liquid' },
        { name: 'freeze', from: 'liquid', to: 'solid' },
        { name: 'vaporize', from: ['liquid','solid'], to: 'gas' },
        { name: 'condense', from: 'gas', to: 'liquid' }
      ],
      methods: {
        onMelt: function () {
          console.log('I melted');
        },
        onFreeze: function () {
          console.log('I froze');
        },
        onVaporize: function () {
          console.log('I vaporized');
        },
        onCondense: function () {
          console.log('I condensed');
        },
      }
    });
  }

  getCurrentState():string{
    return this.stateMachine.state;
  }

  getAvailableTransitions():string[]{
    return this.stateMachine.transitions()
  }

  updateState(transition:string):void{
    this.stateMachine[transition]();
  }
}
