import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from './../app-routing.module';
import { TasksService } from './tasks.service.service';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    PaginationModule,
  ],
  declarations: [TasksComponent, TasksFormComponent],
  providers: [TasksService],
})
export class TasksModule {}
