import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';
import { HttpClientModule } from '@angular/common/http';

import { Empleado } from '../../Interfaces/empleado';
import { EmpleadoService } from '../../Services/empleado.service';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

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
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule
  ],
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [EmpleadoService, provideNativeDateAdapter(), {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}]
})

export class DialogAddEditComponent implements OnInit {

  formEmpleado: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  
  constructor(
    //public dialogRef: MatDialogRef<DialogAddEditComponent>
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private empleadoService: EmpleadoService,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado | null
  ) {
    //console.log("Empleado recibido:", dataEmpleado);
    this.formEmpleado = this.fb.group({
      //id: [0],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      genero: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: [0, Validators.required],
      dpi: ['', Validators.required],
      nit: ['', Validators.required],
      afiliacionIGSS: ['', Validators.required],
      afiliacionIRTRA: ['', Validators.required],
      pasaporte: ['', Validators.required],
      direccion: ['', Validators.required],
      salarioBase: [0, Validators.required],
      bonificaciones: [0, Validators.required],
      descuentos: [0, Validators.required]
    });
    
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }  

  addEditEmpleado() {
    console.log(this.formEmpleado.value);

    const modelo: Empleado = {
      id: 0,
      nombres: this.formEmpleado.value.nombres,
      apellidos: this.formEmpleado.value.apellidos,
      genero: this.formEmpleado.value.genero,
      estadoCivil: this.formEmpleado.value.estadoCivil,
      fechaNacimiento: moment (this.formEmpleado.value.fechaNacimiento).format('DD/MM/YYYY'),
      edad: this.formEmpleado.value.edad,
      dpi: this.formEmpleado.value.dpi,
      nit: this.formEmpleado.value.nit,
      afiliacionIGSS: this.formEmpleado.value.afiliacionIGSS,
      afiliacionIRTRA: this.formEmpleado.value.afiliacionIRTRA,
      pasaporte: this.formEmpleado.value.pasaporte,
      direccion: this.formEmpleado.value.direccion,
      salarioBase: this.formEmpleado.value.salarioBase,
      bonificaciones: this.formEmpleado.value.bonificaciones,
      descuentos: this.formEmpleado.value.descuentos
    }

    if(this.dataEmpleado == null){

      this.empleadoService.add(modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta('Empleado agregado correctamente', 'Cerrar');
          this.dialogoReferencia.close("creado");
        },
        error: (e) => {
          this.mostrarAlerta('Error al agregar empleado', 'Cerrar');
        }
      })

    }else{

      this.empleadoService.update(this.dataEmpleado.id, modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta('Empleado actualizado correctamente', 'Cerrar');
          this.dialogoReferencia.close("editado");
        },
        error: (e) => {
          this.mostrarAlerta('Error al actualizar empleado', 'Cerrar');
        }
      })

    }
  
  }

  ngOnInit(): void {

    //console.log("Datos recibidos en el diálogo:", this.dataEmpleado); 
    
    if(this.dataEmpleado){

      this.formEmpleado.patchValue({
        nombres: this.dataEmpleado.nombres,
        apellidos: this.dataEmpleado.apellidos,
        genero: this.dataEmpleado.genero,
        estadoCivil: this.dataEmpleado.estadoCivil,
        fechaNacimiento: this.dataEmpleado.fechaNacimiento ? moment(this.dataEmpleado.fechaNacimiento, 'YYYY-MM-DD').toDate() : null,
        edad: this.dataEmpleado.edad,
        dpi: this.dataEmpleado.dpi,
        nit: this.dataEmpleado.nit,
        afiliacionIGSS: this.dataEmpleado.afiliacionIGSS,
        afiliacionIRTRA: this.dataEmpleado.afiliacionIRTRA,
        pasaporte: this.dataEmpleado.pasaporte,
        direccion: this.dataEmpleado.direccion,
        salarioBase: this.dataEmpleado.salarioBase,
        bonificaciones: this.dataEmpleado.bonificaciones,
        descuentos: this.dataEmpleado.descuentos
      })

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }

}
