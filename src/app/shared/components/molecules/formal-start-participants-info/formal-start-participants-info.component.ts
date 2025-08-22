import { Component, OnInit, Inject } from '@angular/core';
import {ParticipantService} from 'src/app/shared/services/project/participant/participant.service';
import {IProjectParticipantDTO} from 'src/app/core/interfaces/IPojectParticipantDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formal-start-participants-info',
  templateUrl: './formal-start-participants-info.component.html',
  styleUrls: ['./formal-start-participants-info.component.css'],
  imports: [CommonModule]
})
export class FormalStartParticipantsInfoComponent implements OnInit {

  participants: IProjectParticipantDTO[] = [];
  noParticipants = false;

  constructor(@Inject('projectCode') public projectCode: string, private participantService: ParticipantService) { }

  ngOnInit() {
    this.loadParticipants();
  }

    loadParticipants(): void {
    this.participantService.getParticipantsByProjectCode(this.projectCode).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.participants = data;
        } else {
          this.noParticipants = true;
        }
      },
      error: (err) => {
        console.error('Error fetching participants', err);
      }
    });
  }

}
