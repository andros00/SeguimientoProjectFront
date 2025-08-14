import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formal-start-general-info',
  templateUrl: './formal-start-general-info.component.html',
  styleUrls: ['./formal-start-general-info.component.scss']
})
export class FormalStartGeneralInfoComponent {
  form!: FormGroup;

  constructor(
    @Inject('projectCode') public projectCode: string,
    private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      internCode: ['', Validators.required],
      projectDuration: [0, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      approvalDate: [null, Validators.required],
      downloadApprovalDocument: [false, Validators.required],
      infoApprovalDocument: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    // Recalcular cuando cambie la fecha de inicio
    this.form.get('startDate')!.valueChanges.subscribe(() => this.calculateEndDate());

    // Recalcular cuando cambie la duración
    this.form.get('projectDuration')!.valueChanges.subscribe(() => this.calculateEndDate());
  }

  private calculateEndDate(): void {
    console.log('*ingrese*')
    const startDate: Date = this.form.get('startDate')!.value;
    console.log('*startDate*'+startDate)
    const duration: number = parseInt(this.form.get('projectDuration')!.value, 10);
    console.log('*duration*'+duration)

  if (startDate && !isNaN(duration) && duration > 0) {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);
    this.form.get('endDate')!.setValue(endDate, { emitEvent: false });
    console.log('endDate'+endDate)
  }
}

onStartDateChange(date: Date): void {
  console.log(date)
  this.form.get('startDate')!.setValue(date);
  this.calculateEndDate(); // haces el cálculo justo después de actualizar
}

}
