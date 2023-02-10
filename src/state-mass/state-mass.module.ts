import { Module } from '@nestjs/common';
import { StateMassController } from './state-mass.controller';
import { StateMassService } from './state-mass.service';

@Module({
  controllers: [StateMassController],
  providers: [StateMassService],
})
export class StateMassModule {}
