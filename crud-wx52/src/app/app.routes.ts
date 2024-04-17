import { Routes } from '@angular/router';
import { StudentComponent } from './students/components/student/student.component';

export const routes: Routes = [
    //Redirecciona la ruta raiz ('') a la ruta '/student' usando el pathmatch 'full'
    //Se asegura a que se rederija cuando la ruta sea exactamente '' 
    {path: '', redirectTo: 'students', pathMatch: 'full'},
    //Asocia la ruta '/students' con el componente StudentComponent
    //Lo que significa que este componente se renderizara cuando la ruta sea '/students'
    {path: 'students', component: StudentComponent}

];
