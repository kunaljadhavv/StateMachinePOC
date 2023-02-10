import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StateMassModule } from './state-mass/state-mass.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [StateMassModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
