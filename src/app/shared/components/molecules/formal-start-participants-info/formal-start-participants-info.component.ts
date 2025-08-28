import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ParticipantService } from 'src/app/shared/services/project/participant/participant.service';
import { IProjectParticipantDTO } from 'src/app/core/interfaces/IPojectParticipantDTO';
import { ParticipantRoleService } from 'src/app/shared/services/project/participant-role/participant-role.service';
import { IParticipantRoleDTO } from 'src/app/core/interfaces/IParticipantRoleDTO';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject('projectCode') public projectCode: string,
    private participantService: ParticipantService,
    private participantRole: ParticipantRoleService

  ) { }

  ngOnInit() {
    this.loadParticipants();
  }

  ngAfterViewInit() {
    this.participants.paginator = this.paginator;
  }

  loadParticipants(): void {
    this.participantService.getParticipantsByProjectCode(this.projectCode).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.participants.data = data;
          this.noParticipants = false;
          this.rolesParticipant(this.participants.data);

        } else {
          this.noParticipants = true;
          this.participants.data = [];
        }
      },
      error: (err) => {
        console.error('Error fetching participants', err);
      }
    });
  }

  get participantsNumber(): number {
    return this.participants.data.length;
  }

  private rolesParticipant(lista: IProjectParticipantDTO[]): void {
  console.log('****participantes***'+lista.length);
    lista.forEach(item => {
    this.participantRole.getParticipantRoleByid(item.projectParticipantRole).subscribe(role => {
      console.log('****rol*'+role.name);
      item.nameRol = role.name; // agregamos el campo dinámico
    });
  });
}

}
