import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ParticipantService } from 'src/app/shared/services/project/participant/participant.service';
import { IProjectParticipantDTO } from 'src/app/core/interfaces/IPojectParticipantDTO';
import { ParticipantRoleService } from 'src/app/shared/services/project/participant-role/participant-role.service';
import { IParticipantRoleDTO } from 'src/app/core/interfaces/IParticipantRoleDTO';
import { MatDivider } from '@angular/material/divider';
import { IParticipantGroupDTO } from 'src/app/core/interfaces/IParticipantGroupDTO';
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
    //'id',
    //'project',
    //'responsible',
    'fullName',
    'rolParticipant',
    'group',
    'dedication',       // ← combinado meses/horas
    'dedicationPlan',   // ← combinado meses/horas plan
    'supportedProgramCode',
    //'academicProgPercentage',
  ];

  participants = new MatTableDataSource<IProjectParticipantDTO>([]);
  noParticipants = false;
  private lista?: IProjectParticipantDTO[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject('projectCode') public projectCode: string,
    private participantService: ParticipantService,
    private participantRoleService: ParticipantRoleService,
    private participantGroupService: ParticipantGroupService

  ) { }

  ngOnInit() {
    this.loadParticipants();
  }

  ngAfterViewInit() {
    this.participants.paginator = this.paginator;
  }

  loadParticipants(): void {
    this.participantService.getParticipantsByProjectCode(this.projectCode).subscribe (data => {
       this.lista = data;
       this.rolesParticipant(this.lista);






      /* next: (data) => {
        if (data && data.length > 0) {
          this.lista = data;
          this.noParticipants = false;
          console.log('**data**'+data);

        } else {
          this.noParticipants = true;
          this.participants.data = [];
        }
      },
      error: (err) => {
        console.error('Error fetching participants', err);
      } */
    });

  }

  get participantsNumber(): number {
    return this.participants.data.length;
  }

  private rolesParticipant(lista: IProjectParticipantDTO[]): void {
   var rol = 0;
    lista.forEach(item => {
    console.log('**nombrerol**'+item.projectParticipantRole);
    rol = item.projectParticipantRole;
    console.log('**nombrerol**'+rol);
    this.participantRoleService.getParticipantRoleByid(rol).subscribe(role => {
      console.log('**rol*'+role.name);
      item.nameRol = role.name; // agregamos el campo dinámico
    });
  });
  }

  private groupParticipant(lista: IProjectParticipantDTO[]): void {
   lista.forEach(item => {
    console.log('**nombregrupo**'+item.group);
      this.participantGroupService.getParticipantGroupByid(item.group).subscribe(group => {
      console.log('**grupo*'+group.name);
      item.nameGroup = group.name; // agregamos el campo dinámico
    });
  });
  }




}
