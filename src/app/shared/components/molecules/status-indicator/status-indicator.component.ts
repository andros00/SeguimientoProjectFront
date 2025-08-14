import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-indicator',
  template: `
    <div class='container'>
      <p>
        Proyectos encontrados: <strong> {{ projectsNumber }} </strong>
      </p>
      <app-status [statuses]="[
        { label: 'No aplica', icon: 'warning', iconClass: 'danger' },
        { label: 'Aplica', icon: 'check', iconClass: 'success' }
      ]" />
    </div>
  `,
  styleUrls: ['./status-indicator.component.scss']
})
export class StatusIndicatorComponent { 
  @Input() projectsNumber: number = 0;
}
