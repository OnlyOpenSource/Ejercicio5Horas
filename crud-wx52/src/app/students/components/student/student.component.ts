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
import { HttpDataService } from '../../services/http-data.service';
import { HttpClientModule } from '@angular/common/http';
import cloneDeep from 'lodash/cloneDeep';
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
    MatInputModule,
    HttpClientModule //Modulo para realizar peticiones HTTP
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
   displayedColumns: string[] = [ 'id', 'name', 'age', 'mobile', 'email', 'address','actions'];

  //Referencia al paginador y al ordenador de la tabla
  @ViewChild (MatPaginator, {static:true}) 
  paginator!: MatPaginator;

  @ViewChild (MatSort)
  sort!: MatSort;

  isEditMode = false; //Variable para verificar si el modo de edición está activo o no

  //Inyecta el servicio httpDataService en el componente para interactuar con la API
  constructor(private httpDataService: HttpDataService) { 
    this.studentData = {} as Student; // Incializa studentData
  } 

  //Metodo de inicializacion que configura la paginacion, el ordenamiento y carga de datos
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllStudents();
  }

  getAllStudents(){
    this.httpDataService.getList()
    .subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  //Inicia la edicion de un elemento seleccionado y establece el formulario en modo edición
  editItem(element:any){
    this.studentData = cloneDeep(element);
    this.isEditMode = true;
  }

  //Cancela la edicion de un elemento y reinicia el estado del formulario
  cancelEdit(){
    this.isEditMode = false;
    this.studentForm.resetForm();
  }

  //Elimina un estudiante usando el servicio HTTP y actualiza la fuente de datos
  deleteItem(id: string){
    this.httpDataService.deleteItem(id)
    .subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => o.id!== id);
    });
  }

  //Agrega un nuevo estudiante utilizando el servicio HTTP
  addStudent(){
    let maxID: number = 0;
    maxID = this.dataSource.data.reduce((max:number, student:any) => student.id > max ? student.id : max, 0);
    this.studentData.id = (Number(maxID)+1).toString();
    this.httpDataService.createItem(this.studentData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }

  //Actualiza un estudiante utilizando el servicio HTTP
  updateStudent(){
    this.httpDataService.updateItem(this.studentData.id, this.studentData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if(o.id === response.id){
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit(){
    if(this.studentForm.form.valid){
      if(this.isEditMode){
        this.updateStudent();
      } else {
        this.addStudent();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid Data');
    }
  }
  
}
