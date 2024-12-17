import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button'; 
import { MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule} from '@angular/material/core'; 
import {MomentDateModule} from '@angular/material-moment-adapter';

import { MatSnackBarModule} from '@angular/material/snack-bar';

import { MatIconModule} from '@angular/material/icon';

import { MatDialogModule} from '@angular/material/dialog';

import { MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
    BrowserAnimationsModule,  
    HttpClientModule,  
    FormsModule,  
    ReactiveFormsModule,     
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatTableDataSource
  ],
  providers: [],       
  bootstrap: [AppComponent] 
})
export class AppModule { }