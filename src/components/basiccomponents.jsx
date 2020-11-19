import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

export class Button extends React.Component
{
   constructor(props)
   {
      super(props);
      this.onClick = this.onClick.bind(this);
   }

   onClick(event, object)
   {
      if(this.props.onClick)
      {
         this.props.onClick(event, object);
      }
   }

   render()
   {
      let type = "button";
      let className = "btn " + (this.props.style || "");
      if(this.props.hasOwnProperty("type") && this.props.type !== null)
      {
         type = this.props.type;
      }
      return(
         <button onClick={this.onClick} className={className} id={this.props.id} type={type}>
            {this.props.text}
         </button>
      )
   }
}

export class TextBox extends React.Component
{
   constructor(props)
   {
      super(props);
      this.autovalidate = false;
      this.textRegExp = null; 
      this.onChange = this.onChange.bind(this);
      this.state =
      {
         value: "",
         valid: false
      }
   }

   onChange(event)
   {
      let value = event.target.value;
      let valid = true;
      if(this.props.required)
      {
         valid = this.validator(this.props.typeDate, value);
      }

      let state = {value: value, valid:valid};
      this.setState(state);
      if(this.props.onChange)
      {
         this.props.onChange(this.props.id, state);
      }
   }

   validator(value)
   {
      return (!this.autovalidate) ? this.textRegExp.test(value) : true;
   }
   
   render()
   {
      let inputType;
      switch(this.props.typeDate)
      {
         case 'email':
            this.textRegExp = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
            inputType = "email";
         break;
         case 'telephone':
            this.textRegExp = new RegExp('[\\(]?[\\+]?(\\d{2})[\\)]?[\\s]?(\\d{10}|\\d{12})|\\d{10}');
            inputType = "tel";
         break;
         case 'int':
            this.textRegExp = /^\d*(\.\d{1})?\d{0,1}$/;
            inputType = "number";
         break;
         case 'float':
            this.textRegExp = /^([0-9])*$/;
            inputType = "number";
         break;
         case 'name':
            this.textRegExp = /^([a-z ñáéíóú]{2,60})$/i;
            inputType = "text";
         break;
         case 'password':
            this.textRegExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g);
            inputType = "password";
         break;
         case 'text':
            this.autovalidate = true;
            inputType = "text";
         break;
         default:
            this.autovalidate = false;
            inputType = "text";
         break;
      }
      let className = "form-label-group " +  (this.props.className || "");
      return(
         <div className={className}>
            <label htmlFor={this.props.id}>
               {this.props.text}
            </label>
            <input
               type={inputType}
               id={this.props.id} 
               onChange={this.onChange} 
               className="form-control" 
               value={this.state.value} 
               placeholder={this.props.placeholder} 
               minLength={this.props.minLength} 
               maxLength={this.props.maxLength}
               required={this.props.required}
            />
         </div>
      );
   }
}

export class Form extends React.Component
{
   constructor(props)
   {
      super(props)
      {
         this.onFieldChange = this.onFieldChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         let fields = {};
         this.props.fields.map(rowFilds=>
         {
            Object.keys(rowFilds || {}).map(key =>
            {
               let fieldName = rowFilds[key].id;
               fields = Object.assign({}, fields,
               {
                  [fieldName]:
                  {
                     value: (this.props.defaultValues !== undefined && this.props.defaultValues[fieldName] !== undefined) ? this.props.defaultValues[fieldName] : null, //cuando el campo no tiene ningun valor, esta vacio
                     valid: (this.props.defaultValues !== undefined && this.props.defaultValues[fieldName] !== undefined) ? true : (!rowFilds[key].required) //si es requerido, comienza como no valido pues esta vacio
                  }
               });
               return fields;
            });
            return fields;
         });
        
         this.state = //estado del formulario
         {
            valid: this.props.defaultValues !== undefined ? true:false, //comienza como no valido, pues no tiene valores introducidos hasta el momento
            fields: fields //campos del formulario
         }
      }
   }

   onFieldChange(id, state)
   {
      this.setState(
      {
         fields: Object.assign({}, this.state.fields, { [id]: state })
      });
      this.setValidForm(id, state);
   }

   setValidForm(id, state)
   {
      let tempValid = true;
      Object.keys(this.state.fields || {}).map(key =>
      {
         if(id === key)
         {
            if(state.valid === false)
            {
               tempValid = false;
            }
         }
         else if(this.state.fields[key].valid === false)
         {
            tempValid = false;
         }
         return tempValid;
      });
      this.setState({ valid: tempValid }, () => 
      {
         if(this.props.hasOwnProperty("onFieldChange"))
         {
            this.props.onFieldChange(id, state);
         }
      });
   }

   onSubmit(event)
   {
      event.preventDefault();
      if(this.state.valid === true)
      {
         this.props.onSubmit(event, this.state);
      }
      else
      {
         console.log(this.state);
         alert("Revise que todos los campos sean correctos");  
      }
   }


   renderFields(field)
   {
      let formField = null;
      let className = "form-group col-md-" + field.colValue;
      switch(field.tag)
      {
         case "TextBox":
            formField =  <TextBox
               text={field.text}
               placeholder={field.placeholder}
               required={field.required}
               id={field.id}
               key={field.id}
               typeDate={field.typeDate}
               onChange={this.onFieldChange}
            />
         break;
         default:
            formField = null;
         break;
      }

      return(
         <div className={className} key={"form-group-" + field.id}>
            {formField}
         </div>
      );

   }

   render()
   {
      
      const fields = this.props.fields.map((rows, index) =>
      {  
         let formFields = rows.map(field =>
         {
            return this.renderFields(field);
         });

         return (
            <div className="form-row" key={"form-row-" + index }>
               {formFields}
            </div>
         );
      });
      return(
         <form onSubmit={this.onSubmit}>
            {fields}
            <Button
               text={this.props.okButtonText}
               type={this.props.okButtonType}
               style={this.props.okButtonStyle}
            />
         </form>
      )
   }
}