# Ejercicio5Horas

Para instalar angular 

npm install -g @angular/cli

Crear la carpeta del CRUD

ng new (Nombre de la carpeta)

Para añadir angular material

ng add @angular/material

Para crear el componente

OJO LOS COMPONENTES VAN EN LA CARPETA DE SU RESPECTIVO NOMBRE DE COMPONENTE
EXAMPLE
Para mi componente student debe de estar en:

src/app/students/components/student (Esta es la ruta)

ng g c components/student

Para crear el model o interface
Seguimos la misma ruta pero ahora crearemos una carpeta models

src/app/students/
ng g interface models/student --type=model

Para crear los servicios, seguimos en la misma ruta donde creamos el componente y la inteface

src/app/students/

ng g s services/http-data


*********************
Para instalar json server:
npm install -g json-server

Para desplegar el json server:
Se tiene que aplicar en la carpeta donde se encuentra el archivo .json
json-server --watch "nombreArchivo.json"
**********************

