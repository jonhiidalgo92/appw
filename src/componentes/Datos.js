import React, {Component} from 'react'
import Table from "./Table1";
import {Pie} from 'react-chartjs-2'
import 'chart.piecelabel.js';


export default class Datos extends Component {
    constructor(props) {
        super(props);
        this.childPacientes1 =  React.createRef();
        this.table_Headers = ["Paciente","Edad","Ubicacion","Tipo","Estado"];
        this.updatePacientes= this.updatePacientes.bind(this);
        this.peticionfunnel= this.peticionfunnel.bind(this);
        this.peticionTopR= this.peticionTopR.bind(this);
        this.state = {
            curTime : null
        }
        this.state1 ={
            respuesta:[],
            estado:[],
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
            opciones:[]
        }
    }




    async peticionfunnel(){
        //hacemos la peticion
        await fetch("http://35.222.55.115:8080/Top5").then(res=>
        {
            res.json().then((result) => {
                this.state1.respuesta = JSON.parse(JSON.stringify(result))
                if (this.state1.respuesta.length > 0) {
                    var estadot = []
                    var porcentajet = []

                    this.state1.respuesta.forEach((elemento) => {
                        estadot.push(elemento.location);
                        porcentajet.push(elemento.total);
                    });

                    this.state1.estado = estadot;
                    this.state1.porcentajes = porcentajet;
                    this.generarC_funnel();
                    this.configuracionG_funnel();
                }
            })
        })
    }

    //Generar Caracter de manera aleatoria
    generar_funnel(){
        var Caracte= ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"]
        var numero = (Math.random()*15).toFixed(0);
        return Caracte[numero];
    }

    //concatena la cadena para que sea un formato de cadena hexadecimal
    colorHex_funnel(){
        var color = "";
        for(var index=0;index<6;index++){
            color= color + this.generar_funnel();
        }
        return "#"+color;
    }

    //generar colores
    generarC_funnel(){
        var coloresf=[];
        for (var i = 0; i < this.state1.respuesta.length ; i++){
            coloresf.push(this.colorHex_funnel());
        }
        this.state1.colores = coloresf;
        //this.setState({colores:coloresf});
        //console.log(this.state1.colores);
    }

    //configuramos la grafica
    configuracionG_funnel(){
        const data= {
            labels: this.state1.estado,
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

    async peticionTopR(){
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

                    this.generarC_TopR();
                    this.configuracionG_TopR();
                }
            })
        })

    }
    //Generar Caracter de manera aleatoria
    generar_TopR(){
        var Caracte= ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"]
        var numero = (Math.random()*15).toFixed(0);
        return Caracte[numero];
    }

    //concatena la cadena para que sea un formato de cadena hexadecimal
    colorHex_TopR(){
        var color = "";
        for(var index=0;index<6;index++){
            color= color + this.generar_TopR();
        }
        return "#"+color;
    }

    //generar colores
    generarC_TopR(){
        var coloresf=[];
        for (var i = 0; i < this.state2.respuesta.length ; i++){
            coloresf.push(this.colorHex_TopR());
        }
        this.state2.colores = coloresf;
    }

    //configuramos la grafica
    configuracionG_TopR(){
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

    componentDidMount() {
        setInterval( () => {
            this.setState({
                curTime : new Date().toLocaleString()
            })
        },2000)
        setInterval(this.updatePacientes,2000);
        setInterval(this.peticionfunnel, 2000);
        setInterval(this.peticionTopR, 2000);
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
                <div className="row">
                    <div className="col col-lg-4 col-md-4 col-sm-12">
                        <div className="card border-primary mb-3" id="topRegiones">
                            <div className="card-header">
                                <h1>Integrantes</h1>
                            </div>
                            <div className="card-body">

                            </div>
                            <div className="card-footer text-right">
                                <strong><span className="badge badge-info">UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - SISTEMAS OPERATIVOS 1 - 2021</span></strong>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-8 col-md-8 col-sm-12">
                        <div className="card border-primary mb-3" id="topRegiones">
                            <div className="card-header">
                                <h1>Porcentajes  State </h1>
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
                        <div className="card border-primary mb-3" id="funnel">
                            <div className="card-header">
                                <h1>Top Regiones </h1>
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
            </div>
        )
    }
}
