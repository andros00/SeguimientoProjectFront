import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { FormalStartPagesComponent } from './pages/formal-start-pages/formal-start-pages.component';

const routes: Routes = [
  {
    path: 'seguimientoaproyectos',
    component: ProjectsListComponent
  },
  {
    path: 'seguimientoaproyectos/inicioformal/:id',
    component: FormalStartPagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
