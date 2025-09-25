import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ParticipantService } from 'src/app/shared/services/project/participant/participant.service';
import { IProjectParticipantDTO } from 'src/app/core/interfaces/IPojectParticipantDTO';
import { ParticipantRoleService } from 'src/app/shared/services/project/participant-role/participant-role.service';
import { ParticipantGroupService } from 'src/app/shared/services/project/participant-group/participant-group.service';

@Component({
  selector: 'app-formal-start-participants-info',
  templateUrl: './formal-start-participants-info.component.html',
  styleUrls: ['./formal-start-participants-info.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class FormalStartParticipantsInfoComponent implements OnInit {
  displayedColumns: string[] = [
    'fullName',
    'rolParticipant',
    'group',
    'dedication',
    'dedicationPlan',
    'supportedProgramCode',
  ];

  participants = new MatTableDataSource<IProjectParticipantDTO>([]);
  noParticipants = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject('projectCode') public projectCode: string,
    private participantService: ParticipantService,
    private participantRoleService: ParticipantRoleService,
    private participantGroupService: ParticipantGroupService
  ) {}

  ngOnInit() {
    this.loadParticipants();
  }

  ngAfterViewInit() {
    this.participants.paginator = this.paginator;
  }

  loadParticipants(): void {
    this.participantService
      .getParticipantsByProjectCode(this.projectCode)
      .subscribe({
        next: (data) => {
          console.log('**data**'+data);
          if (data && data.length > 0) {

            // enriquecemos con rol y grupo
            this.enrichParticipants(data);
            this.noParticipants = false;

          } else {
            this.noParticipants = true;
            this.participants.data = [];
          }
        },
        error: (err) => {
          console.error('Error fetching participants', err);
        },
      });
  }

  get participantsNumber(): number {
    return this.participants.data.length;
  }

  /**
   * Enriquecer lista con rol y grupo
   */
  private enrichParticipants(lista: IProjectParticipantDTO[]): void {
    lista.forEach((item) => {
      // Rol
      if (item.projectParticipantRole) {
      this.participantRoleService
        .getParticipantRoleByid(item.projectParticipantRole)
        .subscribe({
          next: (role) => {
            item.nameRol = role.name;
            this.refreshTable(lista);
            console.log('**item.projectParticipantRole**'+item.projectParticipantRole);
          },
        });

      // Grupo
      this.participantGroupService
        .getParticipantGroupByid(item.group)
        .subscribe({
          next: (group) => {
            item.nameGroup = group.name;
            this.refreshTable(lista);
          },
        });
        };
    });

    // inicializamos la tabla
    this.participants.data = lista;
  }

  /**
   * Refresca la tabla con los cambios
   */
  private refreshTable(lista: IProjectParticipantDTO[]): void {
    this.participants.data = [...lista]; // importante clonar para disparar detección de cambios
  }
}
