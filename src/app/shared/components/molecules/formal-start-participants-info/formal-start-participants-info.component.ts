import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ParticipantService } from 'src/app/shared/services/project/participant/participant.service';
import { IProjectParticipantDTO } from 'src/app/core/interfaces/IPojectParticipantDTO';

@Component({
  selector: 'app-formal-start-participants-info',
  templateUrl: './formal-start-participants-info.component.html',
  styleUrls: ['./formal-start-participants-info.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})

export class FormalStartParticipantsInfoComponent implements OnInit {
 displayedColumns: string[] = [
    'id',
    'project',
    'responsible',
    'fullName',
    'group',
    'dedicationMonths',
    'dedicationHours',
    'dedicationMonthsPlan',
    'dedicationHoursPlan',
    'supportedProgramCode',
    'academicProgPercentage',
  ];

  participants = new MatTableDataSource<IProjectParticipantDTO>([]);
  noParticipants = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject('projectCode') public projectCode: string,
    private participantService: ParticipantService
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

}
