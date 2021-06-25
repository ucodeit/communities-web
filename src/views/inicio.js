import React from 'react';
import { Form } from '../components/basiccomponents';
import SweetAlert from 'react-bootstrap-sweetalert';
import { NavBar } from '../components/navbar';
import { Chart } from 'react-google-charts';
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
						"colValue": 6
					},
					{
						"id": "tbCorreo",
						"tag": "TextBox",
						"placeholder": "correo@dominio.com",
						"text": "Correo electrónico",
						"typeDate": "email",
						"required": true,
						"maxLength": 20,
						"colValue": 6
					}
				],
				[
					{
						"id": "tbPassword",
						"tag": "TextBox",
						"placeholder": "Debe incluir al menos una letra mayuscula, número y caráter especial",
						"text": "Contraseña",
						"typeDate": "password",
						"required": true,
						"maxLength": 10,
						"colValue": 12
					}
				],
				[
					{
						"id": "tbPassword2",
						"tag": "TextBox",
						"placeholder": "",
						"text": "Repite tu contraseña",
						"typeDate": "password",
						"required": true,
						"maxLength": 10,
						"colValue": 12
					},
				],
				[
					{
						"id": "tbNombre",
						"tag": "TextBox",
						"placeholder": "Juanito",
						"text": "Nombre",
						"typeDate": "name",
						"required": true,
						"maxLength": 20,
						"colValue": 12

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
						"colValue": 12
					},
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
						"placeholder": "",
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
						"placeholder": "",
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
				title={"Crear tu cuenta"}
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
				<div className="row color-azul-claro padding-top-15">
					<div className="col-xs-12 col-md-6 banner-inicio-1">
						<h1>El lugar correcto para aumentar la productividad de tu equipo de trabajo y llevarlo a otro nivel</h1>
						<img src="http://consultoraambiental.mx//wp-content/uploads/2019/02/performance.png" className="size-img-productivity"/>
					</div>
					<div className="col-xs-12 col-md-6">
						<Chart
							chartType='Gantt'
							width={'100%'}
							height={'200px'}
							loader={<div>Loading chart</div>}
							data={[
								[
									{ type: 'string', label: 'ID Tarea' },
									{ type: 'string', label: 'Nombre Tarea' },
									{ type: 'string', label: 'Recurso' },
									{ type: 'date', label: 'Fecha Inicio' },
									{ type: 'date', label: 'Fecha Fin' },
									{ type: 'number', label: 'Duración' },
									{ type: 'number', label: 'Percentaje acompletado' },
									{ type: 'string', label: 'Dependencias' },
								],
								[
									'CrearRequerimientos',
									'Creación de oficios de requerimientos',
									'David',
									new Date(2021, 2, 20),
									new Date(2021, 2, 21),
									null,
									100,
									null,
								],
								[
									'EntregaRequerimientos',
									'Entrega de oficios de requerimientos',
									'David',
									new Date(2021, 2, 22),
									new Date(2021, 2, 23),
									null,
									100,
									null,
								],
								[
									'DiseñoLogosEvento',
									'Diseño de logos del evento',
									'Carlos',
									new Date(2021, 2, 22),
									new Date(2021, 2, 24),
									null,
									100,
									null,
								],
								[
									'ObtenerPonentes',
									'Obtener Ponentes',
									'Diana',
									new Date(2021, 2, 25),
									new Date(2021, 3, 15),
									null,
									57,
									null,
								],
								[
									'DifusionEvento',
									'Difusión del evento',
									'Karen',
									new Date(2021, 3, 16),
									new Date(2021, 4, 15),
									null,
									0,
									null,
								],
							]}
							options={{
								height: 200,
								backgroundColor: { fill: "#F5F5FF" },
								gantt: {
									innerGridHorizLine: {
										stroke: '#F5F5FF',
										strokeWidth: 1,
									},
									innerGridTrack: { fill: '#F5F5FF' },
									innerGridDarkTrack: { fill: '#F5F5FF' },
									trackHeight: 30,
									labelStyle: { fontName: "arial"}
								},
							}}
							chartLanguage={"es-419"}
						/>
					</div>
				</div>
				<div className="container">
					<div className="row margin-top-50">
						<div className="col-12 text-center">
							<h1>Tu mandas, tus activdades, tu equipo, tu decides como organizarlo todo</h1>
						</div>
					</div>
				</div>
				
				{this.state.flotante}
			</div>
		);

		/**/
	}
}