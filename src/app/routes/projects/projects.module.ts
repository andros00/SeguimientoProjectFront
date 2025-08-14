import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormalStartPagesComponent } from './pages/formal-start-pages/formal-start-pages.component';


@NgModule({
  declarations: [
    ProjectsListComponent,
    FormalStartPagesComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { }
