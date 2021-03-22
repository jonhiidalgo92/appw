import React, {Component} from 'react'
import Table from "./Table1";
import {Bar, Pie} from 'react-chartjs-2'
import 'chart.piecelabel.js';


export default class Datos extends Component {
    constructor(props) {
        super(props);
        this.childPacientes1 =  React.createRef();
        this.table_Headers = ["Paciente","Edad","Ubicacion","Tipo","Estado"];
        this.updatePacientes= this.updatePacientes.bind(this);
        this.peticionIT= this.peticionIT.bind(this);
        this.peticionCE= this.peticionCE.bind(this);
        this.peticiones_Range = this.peticiones_Range.bind(this);

        this.state = {
            curTime : null
        }
        this.state1 ={
            respuesta:[],
            infectedtype:[],
            porcentajes:[],
            colores:[],
            data:[],
            opciones:[]
        }
        this.state2 ={
            respuesta:[],
            estado:[],
            porcentajes:[],
            colores:[],
            data:[],
            opciones: []
        }
        this.state3 ={
            respuesta: [],
            edad: [],
            cantidad: [],
            colores: [],
            data: [],
            opciones: [],
            type: 'bar'
        }
    }




    async peticionIT(){
        //hacemos la peticion
        await fetch("http://35.222.55.115:8080/type").then(res=>
        {
            res.json().then((result) => {
                this.state1.respuesta = JSON.parse(JSON.stringify(result))
                if (this.state1.respuesta.length > 0) {
                    var estadot = []
                    var porcentajet = []

                    this.state1.respuesta.forEach((elemento) => {
                        estadot.push(elemento.infectedtype);
                        porcentajet.push(elemento.porcent);
                    });

                    this.state1.infectedtype = estadot;
                    this.state1.porcentajes = porcentajet;
                    this.generarC_IT();
                    this.configuracionG_IT();
                }
            })
        })
    }

    //Generar Caracter de manera aleatoria
    generar_IT(){
        var Caracte= ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"]
        var numero = (Math.random()*15).toFixed(0);
        return Caracte[numero];
    }

    //concatena la cadena para que sea un formato de cadena hexadecimal
    colorHex_IT(){
        var color = "";
        for(var index=0;index<6;index++){
            color= color + this.generar_IT();
        }
        return "#"+color;
    }

    //generar colores
    generarC_IT(){
        var coloresf=[];
        for (var i = 0; i < this.state1.respuesta.length ; i++){
            coloresf.push(this.colorHex_IT());
        }
        this.state1.colores = coloresf;
        //this.setState({colores:coloresf});
        //console.log(this.state1.colores);
    }

    //configuramos la grafica
    configuracionG_IT(){
        const data= {
            labels: this.state1.infectedtype,
            datasets:[{
                data: this.state1.porcentajes,
                backgroundColor: this.state1.colores
            }]
        };

        const opciones={
            responsive:true,
            maintainAspectRatio: false,
            outlabels: {
                text: 'value'
            }
        }
        //almacenamos
        this.state1.data = data;
        this.state1.opciones= opciones;
        //this.setState({data: data, opciones: opciones});
    }

    async peticionCE(){
        await fetch("http://35.222.55.115:8080/state").then(res=>
        {
            res.json().then((result) => {
                this.state2.respuesta = JSON.parse(JSON.stringify(result))
                if (this.state2.respuesta.length > 0) {
                    var estadot = []
                    var porcentajet = []

                    this.state2.respuesta.forEach((elemento) => {
                        estadot.push(elemento.state);
                        porcentajet.push(elemento.porcent);
                    });

                    this.state2.estado = estadot;
                    this.state2.porcentajes = porcentajet;

                    this.generarC_CE();
                    this.configuracionG_CE();
                }
            })
        })

    }
    //Generar Caracter de manera aleatoria
    generar_CE(){
        var Caracte= ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"]
        var numero = (Math.random()*15).toFixed(0);
        return Caracte[numero];
    }

    //concatena la cadena para que sea un formato de cadena hexadecimal
    colorHex_CE(){
        var color = "";
        for(var index=0;index<6;index++){
            color= color + this.generar_CE();
        }
        return "#"+color;
    }

    //generar colores
    generarC_CE(){
        var coloresf=[];
        for (var i = 0; i < this.state2.respuesta.length ; i++){
            coloresf.push(this.colorHex_CE());
        }
        this.state2.colores = coloresf;
    }

    //configuramos la grafica
    configuracionG_CE(){
        const datat= {
            labels: this.state2.estado,
            datasets:[{
                data: this.state2.porcentajes,
                backgroundColor: this.state2.colores
            }]
        };
        const opcionest={
            responsive:true,
            maintainAspectRatio: false,
            pieceLabel: {
                render: 'value' //show values
            }
        }
        //almacenamos
        this.state2.data = datat;
        this.state2.opciones = opcionest;
    }

    generar_RE(){
        var Caracte= ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"]
        var numero = (Math.random()*15).toFixed(0);
        return Caracte[numero];
    }

    //concatena la cadena para que sea un formato de cadena hexadecimal
    colorHex_RE(){
        var color = "";
        for(var index=0;index<6;index++){
            color= color + this.generar_RE();
        }
        return "#"+color;
    }

    //generar colores
    generarC_RE(){
        var coloresf=[];
        for (var i = 0; i < this.state3.respuesta.length ; i++){
            coloresf.push(this.colorHex_RE());
        }
        this.state3.colores = coloresf;
    }

    async peticiones_Range()
    {
        await fetch('http://35.222.55.115:8080/Ages').then(res=>{
            res.json().then(result=>
            {
                let values = JSON.parse(JSON.stringify(result));
                if(values.length > 0) this.state3.respuesta = values;
                this.state3.edad = []
                this.state3.cantidad = []
                this.state3.respuesta.forEach(item=>
                {
                    this.state3.cantidad.push(item.count)
                    this.state3.edad.push(item.age)
                });
                var densityData = {
                    label: 'Edad de Pacientes',
                    data: this.state3.cantidad,
                    backgroundColor: this.state3.colores
                };
                this.state3.data = {
                    labels: this.state3.edad,
                    datasets: [densityData]
                };
                this.state3.opciones = {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 80,
                            fontColor: 'black'
                        }
                    }
                };
            })
        })
    }

    componentDidMount() {
        setInterval( () => {
            this.setState({
                curTime : new Date().toLocaleString()
            })
        },2000)
        setInterval(this.updatePacientes,2000);
        setInterval(this.peticionIT, 2000);
        setInterval(this.peticionCE, 2000);
        setInterval(this.peticiones_Range, 2000);
    }

    async updatePacientes() {

        await fetch('http://35.222.55.115:8080/top5/pacientes').then((res) => {
            res.json().then((result) => {
                let stringify = JSON.parse(JSON.stringify(result))
                this.childPacientes1.current.agregar_datos(stringify);
            })
        })
    }

    render() {
        return(

            <div className="container-fluid">
                <br/>
                <div className="row">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Modulos</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col col-lg-4 col-md-12 col-sm-12">
                        <div className="card border-primary mb-3" id="CEegiones">
                            <div className="card-header">
                                <h1>Integrantes</h1>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <span><strong>Jonathan Baudilio Hidalgo Perez</strong>&nbsp;&nbsp;</span><span className="badge badge-warning">Rabbitmq</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span><strong>Abner Abisai Hernández Vargas</strong>&nbsp;&nbsp;</span><span className="badge badge-primary">PubSub</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span><strong>Asunción Mariana Sic Sor</strong>&nbsp;&nbsp;</span><span className="badge badge-info">Grpc</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span><strong>José Orlando Wannan Escobar</strong>&nbsp;&nbsp;</span><span className="badge badge-success">NATS</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-footer text-right">
                                <strong><span className="badge badge-info">UNIVERSIDAD DE SAN CARLOS DE GUATEMALA</span></strong>
                                <br/>
                                <strong><span className="badge badge-info">SISTEMAS OPERATIVOS 1</span></strong>
                                <br/>
                                <strong><span className="badge badge-info">2021</span></strong>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-8 col-md-12 col-sm-12">
                        <div className="card border-primary mb-3" id="CEegiones">
                            <div className="card-header">
                                <h1>Casos Infectados por InfectedType </h1>
                            </div>
                            <div className="card-body">
                                <Pie data={this.state1.data} opciones={this.state1.opciones}/>
                            </div>
                            <div className="card-footer text-right">
                                <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-lg-6 col-md-6 col-sm-12">
                        <div className="card border-primary mb-3" id="top5Pacientes">
                            <div className="card-header">
                                <h1>Top 5 Ultimos Casos Registrados</h1>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <Table data={this.table_Headers} ref={this.childPacientes1}/>
                                </div>
                            </div>
                            <div className="card-footer text-right">
                                <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-12">
                        <div className="card border-primary mb-3" id="IT">
                            <div className="card-header">
                                <h1>Casos Infectados por State</h1>
                            </div>
                            <div className="card-body">
                                <Pie data={this.state2.data} opciones={this.state2.opciones}/>
                            </div>
                            <div className="card-footer text-right">
                                <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-lg-12 col-md-12 col-sm-12">
                        <div className="card border-primary mb-3" id="top5Pacientes">
                            <div className="card-header">
                                <h1>Rango de Edades (Pacientes)</h1>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <Bar data={this.state3.data} options={this.state3.opciones} />
                                </div>
                            </div>
                            <div className="card-footer text-right">
                                <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}
