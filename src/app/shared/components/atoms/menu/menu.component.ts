import { Component, Input } from '@angular/core';
import { IMenuItem } from 'src/app/core/interfaces/IMenuItems';

@Component({
  selector: 'app-menu',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Dynamic menu button">
      <mat-icon>
        more_horiz
      </mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        *ngFor="let item of menuItems"
        [disabled]="item.disabled"
        (click)="item.action()"
      >
        <mat-icon>{{ item.icon }}</mat-icon>
        <span>{{ item.label }}</span>
      </button>
    </mat-menu>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() menuItems: IMenuItem[] = [];
}
