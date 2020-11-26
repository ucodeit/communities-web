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
         valid: false,
         cssValid: ""
      }
   }

   onChange(event)
   {
      let value = event.target.value;
      let valid = true;
      let cssValid = "";
      if(this.props.required)
      {
         switch(this.props.typeDate)
         {
            case 'email':
               const emailRegExp = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/,"igm");
               valid = emailRegExp.test(value);
            break;
            case 'telephone':
               const telRegExp = new RegExp('[\\(]?[\\+]?(\\d{2})[\\)]?[\\s]?(\\d{10}|\\d{12})|\\d{10}');
               valid = telRegExp.test(value);
            break;
            case 'int':
               const intRegExp = new RegExp(/^\d*(\.\d{1})?\d{0,1}$/);
               valid = intRegExp.test(value);
            break;
            case 'float':
               const floagRegExp = new RegExp(/^([0-9])*$/);
               valid = floagRegExp.test(value);
            break;
            case 'name':
               const nameRegExp = new RegExp(/^([a-z ñáéíóú]{2,60})$/, "i");
               valid = nameRegExp.test(value);
            break;
            case 'password':
               const passwordRegExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'g');
               valid = passwordRegExp.test(value);
            break;
            case 'text':
               valid = true;
            break;
            default:
               valid = false;
            break;
         }

         if(valid)
         {
            cssValid = "is-valid";
         }
         else
         {
            cssValid = "is-invalid";
         }
      }

      let state = { value: value, valid:valid, cssValid:cssValid };
      this.setState(state);
      if(this.props.onChange)
      {
         this.props.onChange(this.props.id, state);
      }
   }
   
   render()
   {
      let inputType;
      switch(this.props.typeDate)
      {
         case 'email':
            inputType = "email";
         break;
         case 'telephone':
            inputType = "tel";
         break;
         case 'int':
            inputType = "number";
         break;
         case 'float':
            inputType = "number";
         break;
         case 'name':
            inputType = "text";
         break;
         case 'password':
            inputType = "password";
         break;
         case 'text':
            inputType = "text";
         break;
         default:
            inputType = "text";
         break;
      }
      let classNameDiv = "form-label-group " +  (this.props.className || "");
      let classNameTextBox = "form-control " + this.state.cssValid;
      return(
         <div className={classNameDiv}>
            <label htmlFor={this.props.id}>
               {this.props.text}
            </label>
            <input
               type={inputType}
               id={this.props.id} 
               onChange={this.onChange} 
               className={classNameTextBox} 
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