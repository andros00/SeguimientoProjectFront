import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectIformalService } from 'src/app/shared/services/project/project-iformal/project-iformal.service';
import { IProjectIFormalDTO } from 'src/app/core/interfaces/IProjectIFormalDTO';

@Component({
  selector: 'app-formal-start-general-info',
  templateUrl: './formal-start-general-info.component.html',
  styleUrls: ['./formal-start-general-info.component.scss']
})
export class FormalStartGeneralInfoComponent {
  form!: FormGroup;

private  iProject?: IProjectIFormalDTO;

  constructor(
    private projectIformalService: ProjectIformalService,
    @Inject('projectCode') public projectCode: string,
    private fb: FormBuilder) {

  }

  private initializeForm(): void {
    this.form = this.fb.group({
      internCode: [''],
      projectDuration: [''],
      startDate: [''],
      endDate: [''],
      approvalDate: [''],
      downloadApprovalDocument: [''],
      infoApprovalDocument: [''],
    });
  }

  ngOnInit(): void {
    // Recalcular cuando cambie la fecha de inicio
    this.form.get('startDate')!.valueChanges.subscribe(() => this.calculateEndDate());

    // Recalcular cuando cambie la duración
    this.form.get('projectDuration')!.valueChanges.subscribe(() => this.calculateEndDate());

    this.initializeForm();
    this.getProjectInicioFormal();
  }

  private calculateEndDate(): void {
    console.log('*ingrese*')
    const startDate: Date = this.form.get('startDate')!.value;
    console.log('*startDate*' + startDate)
    const duration: number = parseInt(this.form.get('projectDuration')!.value, 10);
    console.log('*duration*' + duration)

    if (startDate && !isNaN(duration) && duration > 0) {
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + duration);
      this.form.get('endDate')!.setValue(endDate, { emitEvent: false });
      console.log('endDate' + endDate)
    }
  }

  onStartDateChange(date: Date): void {
    console.log(date)
    this.form.get('startDate')!.setValue(date);
    this.calculateEndDate(); // haces el cálculo justo después de actualizar
  }

  getProjectInicioFormal(): void {
    this.projectIformalService.getProjectIFormalByProjectCode(this.projectCode).subscribe({

      next: (data) => {
        this.iProject = data;
        this.form.patchValue({
          internCode: data.projectCode,
          projectDuration: data.projectDuration,
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null,
          approvalDate: data.approvalDate ? new Date(data.approvalDate) : null,
          downloadApprovalDocument: data.downloadApprovalDocument,
          infoApprovalDocument: data.infoApprovalDocument
        });
      },
      error: (err) => {
        if (err.status === 404) {
          console.error(`No se encontró un proyecto con el código ${this.projectCode}`);
        } else {
          console.error('Ocurrió un error inesperado');
        }
        this.iProject = undefined;
      }
    });


  }

}
