import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { HttpClientModule } from '@angular/common/http';

import { Empleado } from '../../Interfaces/empleado';
import { EmpleadoService } from '../../Services/empleado.service';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select'; 

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSelectModule
  ],
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [EmpleadoService, {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}]
})

export class DialogAddEditComponent {

  formEmpleado: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  
  constructor(
    //public dialogRef: MatDialogRef<DialogAddEditComponent>
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private empleadoService: EmpleadoService,
  ) {
    this.formEmpleado = this.fb.group({
      //id: [0],
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Genero: ['', Validators.required],
      EstadoCivil: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      Edad: [0, Validators.required],
      DPI: ['', Validators.required],
      NIT: ['', Validators.required],
      AfiliacionesIGSS: ['', Validators.required],
      AfiliacionesIRTRA: ['', Validators.required],
      Pasaporte: ['', Validators.required],
      Direccion: ['', Validators.required],
      SalarioBase: [0, Validators.required],
      Bonificaciones: [0, Validators.required],
      Descuentos: [0, Validators.required]
    });

    // this.empleadoService.getList().subscribe({
    //   next: (data) => {
        
    //   },error: (e) => {}
    // });
    
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }  

  addEditEmpleado() {
    console.log(this.formEmpleado);
    console.log(this.formEmpleado.value);
  }

}
