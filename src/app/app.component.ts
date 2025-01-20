import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; 
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';

import { Empleado } from './Interfaces/empleado';
import { EmpleadoService } from './Services/empleado.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import {DialogDeleteComponent} from './Dialogs/dialog-delete/dialog-delete.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
      CommonModule, 
      MatTableModule, 
      MatPaginatorModule, 
      MatFormFieldModule, 
      MatInputModule,
      HttpClientModule,
      MatButtonModule, 
      MatDividerModule, 
      MatIconModule,
      MatDialogModule
    ],
    providers: [EmpleadoService]  
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nombres', 'apellidos', 'genero', 'estadoCivil','fechaNacimiento','edad','Acciones'];
  dataSource = new MatTableDataSource<Empleado>();

  constructor(
    private empleadoService:EmpleadoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ){
    
   }

   ngOnInit(): void {
      this.mostrarEmpleados();
   }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarEmpleados()  {
    this.empleadoService.getList().subscribe({
      next:(dataResponse) => {
        //console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },
      error:(e) => {}
    })
  }

  dialogoNuevoEmpleado() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      autoFocus: false,
      //height: '500px',
      width: '350px',
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarEmpleados();
      }
    })
  }

  dialogoEditarEmpleado(dataEmpleado:Empleado) {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      autoFocus: false,
      //height: '500px',
      width: '350px',
      data:dataEmpleado
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarEmpleados();
      }
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }  

  dialogoEliminarEmpleado(dataEmpleado:Empleado) {
    this.dialog.open(DialogDeleteComponent, {
      disableClose: true,
      autoFocus: false,
      data:dataEmpleado
    }).afterClosed().subscribe(resultado => {
      if (resultado === "eliminar") {
        this.empleadoService.delete(dataEmpleado.id).subscribe({
          next: (data) => {
            this.mostrarAlerta('Empleado eliminado correctamente', 'Cerrar');
            this.mostrarEmpleados();
          },
          error: (e) => {
            this.mostrarAlerta('Error al eliminar empleado', 'Cerrar');
          }
        })
      }
    })
  }

}