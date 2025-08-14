import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectDataService } from 'src/app/shared/services/project/project-data/project-data.service';
import { Router } from '@angular/router';
import { IProject } from 'src/app/core/interfaces/IProject';
import { ProjectSelectionService } from 'src/app/shared/services/project/project-selection/project-selection.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  FORMAT_START_URL: string = 'tramitesadministrativos/seguimientoaproyectos/inicioformal';
  displayedColumns: string[] = ['code', 'project', 'state', 'calls', 'responsable', 'ip', 'projectType', 'actions'];
  projects = new MatTableDataSource<IProject[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get projectsNumber(): number {
    return this.projects.data.length;
  }

  constructor(
    private projectDataService: ProjectDataService,
    private router: Router,
    private projectSelectionService: ProjectSelectionService,
  ) { }

  ngAfterViewInit() {
    this.projects.paginator = this.paginator;
  }

  ngOnInit() {
    this.projectDataService.projects$.subscribe((projects) => {
      if (!projects) {
        this.projects.data = [];
        return;
      }

      this.projects.data = projects.map((project) => ({
        ...project,
        menuItems: [
          {
            icon: 'edit',
            label: 'Realizar inicio formal',
            action: () => this.navegateToFormalStart(project),
          },
          {
            icon: 'visibility',
            label: 'Ver detalles del proyecto',
            action: () => this.checkVoicemail(),
          },
        ],
      }));
    });
  }

  navegateToFormalStart(project: IProject) {
    this.projectSelectionService.selectProject(project);
    localStorage.setItem('selectedProject', JSON.stringify(project));
    this.router.navigate([this.FORMAT_START_URL, project.code]);
  }

  checkVoicemail() {
    console.log('Check voice mail clicked');
  }
}
