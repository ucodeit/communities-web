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
         ],
         [
            {
               "id": "tbTelefono",
               "tag": "TextBox",
               "placeholder": "5565125698",
               "text": "Número celular",
               "typeDate": "telephone",
               "required": true,
               "maxLength": 20,
               "colValue": 3
            },
            {
               "id": "tbNumeroEntero",
               "tag": "TextBox",
               "placeholder": "12",
               "text": "Número entero",
               "typeDate": "int",
               "required": true,
               "maxLength": 20,
               "colValue": 3
            },
            {
               "id": "tbNumeroFlotante",
               "tag": "TextBox",
               "placeholder": "12.34",
               "text": "Número flotante",
               "typeDate": "float",
               "required": true,
               "maxLength": 20,
               "colValue": 3
            },
            {
               "id": "tbCorreo",
               "tag": "TextBox",
               "placeholder": "correo@dominio.com",
               "text": "Correo electrónico",
               "typeDate": "email",
               "required": true,
               "maxLength": 20,
               "colValue": 3
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