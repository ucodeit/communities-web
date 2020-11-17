import React from 'react';
import { Form } from '../components/basiccomponents';

export default class Inicio extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         loadInicioFields: this.setLoadInicioFields(),
      }
   }

   setLoadInicioFields()
   {
      let campos =
      [
         [
            {
               "id": "tbUsername",
               "tag": "TextBox",
               "placeholder": "Usuario de prueba",
               "text": "Nombre de usuario",
               "typeDate": "text",
               "required": true,
               "maxLength": 7,
               "colValue": 12
            }
         ],
         [
            {
               "id": "tbPassword",
               "tag": "TextBox",
               "placeholder": "123ASD5.",
               "text": "Contraseña",
               "typeDate": "password",
               "required": true,
               "maxLength": 10,
               "colValue": 6
            },
            {
               "id": "tbNombre",
               "tag": "TextBox",
               "placeholder": "Juanito",
               "text": "Nombre",
               "typeDate": "name",
               "required": true,
               "maxLength": 20,
               "colValue": 6
   
            }
         ],
         [
            {
               "id": "tbApellidoPaterno",
               "tag": "TextBox",
               "placeholder": "Banana",
               "text": "Apellido paterno",
               "typeDate": "name",
               "required": true,
               "maxLength": 20,
               "colValue": 12
            }
         ],
         [
            {
               "id": "tbApellidoMaterno",
               "tag": "TextBox",
               "placeholder": "Bananero",
               "text": "Apellido paterno",
               "typeDate": "name",
               "required": true,
               "maxLength": 20,
               "colValue": 12
            }
         ]
      ]
      return campos;
   }
   
   onClick(event, obj)
   {
      console.log("Esto es una prueba");
      console.log("event: ");
      console.log(event);
      console.log("Obj: ");
      console.log(obj);
   }

   render()
   {
      return(
         <div className = "container">
            <Form 
               fields={this.state.loadInicioFields}
               okButtonText={"Enviar"}
               okButtonType={"submit"}
               okButtonStyle={"btn-primary"}
               onSubmit={this.onClick}
            />
         </div>
      );
   }
}