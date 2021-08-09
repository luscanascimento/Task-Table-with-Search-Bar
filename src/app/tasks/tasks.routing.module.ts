import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';

const tasksRoutes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      { path: 'id', component: TasksFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tasksRoutes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
