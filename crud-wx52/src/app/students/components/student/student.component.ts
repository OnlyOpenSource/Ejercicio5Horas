import { Component, OnInit, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [ MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    MatSort,
    MatFormField,
    FormsModule,ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {

  //Referencia al formulario en la plantilla para manejar el formulario de estudiante
  @ViewChild('studentForm', {static: false})
  studentForm!: NgForm;
  studentData!: Student; //Datos del estudiante para el formulario y manejo de datos


  //Fuente de datos para la tabla y las columnas a mostrar
  dataSource = new MatTableDataSource();
   displayedColumns: string[] = [ 'id', 'name', 'age', 'mobile', 'email', 'address'];

  //Referencia al paginador y al ordenador de la tabla
  @ViewChild (MatPaginator, {static:true}) 
  paginator!: MatPaginator;

  @ViewChild (MatSort)
  sort!: MatSort;

  isEditMode = false; //Variable para verificar si el modo de edición está activo o no

  
}
