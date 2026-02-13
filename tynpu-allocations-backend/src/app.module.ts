import { Module } from '@nestjs/common';
import { ConsultantModule } from './infrastructure/http/nest-modules/consultant.module';
import { ProjectModule } from './infrastructure/http/nest-modules/project.module';
import { AllocationModule } from './infrastructure/http/nest-modules/allocation.module';

@Module({
  imports: [
    ConsultantModule,
    ProjectModule,
    AllocationModule,
  ],
})
export class AppModule {}