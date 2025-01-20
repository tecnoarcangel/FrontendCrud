import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { Empleado } from '../../Interfaces/empleado';

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatFormFieldModule, 
        MatInputModule, 
  ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent implements OnInit {

   constructor(
      private dialogoReferencia: MatDialogRef<DialogDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado | null
    ){}

    ngOnInit(): void {
      
    }

    confirmar(){
      if(this.dataEmpleado){
        this.dialogoReferencia.close("eliminar");
      }
    }
}
