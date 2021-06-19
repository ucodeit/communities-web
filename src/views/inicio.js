import React from 'react';
import { Form, Button } from '../components/basiccomponents';
import SweetAlert from 'react-bootstrap-sweetalert';
import { NavBar } from '../components/navbar';
import '../css/styles.css';

export default class Inicio extends React.Component {
	constructor(props) {
		super(props);
		this.onClickInicioSesion = this.onClickInicioSesion.bind(this);
		this.onClickRegistro = this.onClickRegistro.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onClickCancelPopUp = this.onClickCancelPopUp.bind(this);
		this.state =
		{
			loadRegistroFields: this.setLoadRegistroFields(),
			loadNavBarItems: this.setLoadInicioNavBarItems(),
			loadInicioSesionFields: this.setLoadInicioSesionFields(),
			flotante: null
		}
	}

	setLoadRegistroFields() {
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

	setLoadInicioSesionFields() {
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
						"colValue": 12
					}
				]
			]
		return campos;
	}

	setLoadInicioNavBarItems()
	{
		let navBarItems = [
			{
				"sectionStyle": "navbar-nav mr-auto",
				"sectionItems": [
					{
						"text": "inicio",
						"type": "link"
					},
					{
						"text": "Communities",
						"type": "link"
					},
					{
						"text": "Nosotros",
						"type": "link"
					},
					{
						"text": "Acerca de",
						"type": "link"
					}
				]
			},
			{
				"sectionStyle": "navbar-nav",
				"sectionItems": [
					{
						"type": "form",
						"formItems": [
							{
								"type": "button",
								"id": "btnIniciarSesion",
								"style": "btn-outline-secondary margin-right-15",
								"text": "Iniciar sesión",
								"onClick": this.onClickInicioSesion
							},
							{
								"type": "button",
								"id": "btnRegistro",
								"style": " btn-dark",
								"text": "Crear cuenta",
								"onClick": this.onClickRegistro
							}
						]
					}
				]
			}
		]
		return navBarItems;
	}

	onClick(event, obj) {
		console.log("Esto es una prueba");
		console.log("event: ");
		console.log(event);
		console.log("Obj: ");
		console.log(obj);
	}

	onClickCancelPopUp() {
		this.setState({ flotante: null })
	}

	onClickInicioSesion(event, obj) {
		this.setState({
			flotante: <SweetAlert
				title={"Inicio de sesión"}
				onCancel={this.onClickCancelPopUp}
				showConfirm={false}
				closeAnim={{ name: 'hideSweetAlert', duration: 300}}
				showCloseButton>
				<Form
					fields={this.state.loadInicioSesionFields}
					okButtonText={"Enviar"}
					okButtonType={"submit"}
					okButtonStyle={"btn-primary"}
					onSubmit={this.onClick}
				/>
				</SweetAlert>
		})
	}

	onClickRegistro(event, obj) {
		this.setState({
			flotante: <SweetAlert
				title={"Inicio de sesión"}
				onCancel={this.onClickCancelPopUp}
				showConfirm={false}
				closeAnim={{ name: 'hideSweetAlert', duration: 300 }}
				showCloseButton>
				<Form
					fields={this.state.loadRegistroFields}
					okButtonText={"Enviar"}
					okButtonType={"submit"}
					okButtonStyle={"btn-primary"}
					onSubmit={this.onClick}
				/>
			</SweetAlert>
		})
	}

	render() {
		return (
			<div>
				
				<NavBar
					navItems={this.state.loadNavBarItems}
					title={"Proyecto Communities"}
				/>
				<div className="container">
				
				</div>
				{this.state.flotante}
			</div>
		);

		/**/
	}
}