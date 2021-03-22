import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2'
import 'chart.piecelabel.js';
import Table from './Table';


export default class Funell extends Component {
    constructor(props) {
        super(props);
        this.child1 = React.createRef();
        this.headerstable = ["name", "location", "age", "infectedtype", "state", "way"]
        this.genres = [
            { id: 1, genre: "All" },
            { id: 2, genre: "gRPC" },
            { id: 3, genre: "NATS" },
            { id: 4, genre: "Google" },
            { id: 5, genre: "RabbitMQ" }
        ]
        this.state = {
            filtrado:[],
            respuesta:[],
            estado:[],
            porcentajes:[],
            colores:[],
            data:[],
            opciones:[],
        }
      }

    async peticion(){
        var peticion  = await fetch("http://35.222.55.115:8080/obtenerUsuarios")
        this.state.filtrado = await peticion.json();
        //hacemos la peticion
        var peticion  = await fetch("http://35.222.55.115:8080/Top5")
        var respuestat = await peticion.json();

        //metemos la respuesta
        this.setState({respuesta: respuestat});

        var estadot=[]
        var porcentajet=[]

        this.state.respuesta.map((elemento)=>{
            estadot.push(elemento.location);
            porcentajet.push(elemento.total);
        });

        
        this.setState({estado: estadot, porcentajes: porcentajet});
        console.log(this.state.estado)
        console.log(this.state.porcentajes)

        console.log(respuestat)
    }
    
    //Generar Caracter de manera aleatoria
    generar_(){
        var Caracte= ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"]
        var numero = (Math.random()*15).toFixed(0);
        return Caracte[numero];
    }

    //concatena la cadena para que sea un formato de cadena hexadecimal
    colorHex_(){
        var color = "";
        for(var index=0;index<6;index++){
            color= color + this.generar_();
        }
        return "#"+color;
    }

    //generar colores
    generarC_(){
        var coloresf=[];
        for (var i = 0; i < this.state.respuesta.length ; i++){
            coloresf.push(this.colorHex_());
        }
        this.setState({colores:coloresf});
        console.log(this.state.colores);
    }

    //configuramos la grafica
    configuracionG_(){


        
        const data= {
            labels: this.state.estado,
            datasets:[{
                data: this.state.porcentajes,
                backgroundColor: this.state.colores
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
        this.setState({data: data, opciones: opciones});
    }

    //ma
    async componentDidMount(){
        await this.peticion();
        await this.generarC_();
        await this.configuracionG_();
    }
    //

    handleGenreSelect = genre => {
        try
        {
            this.child1.current.removeRow();
            //console.log(this.state.filtrado);
            switch(genre.target.selectedIndex)
            {
                case 0:
                    let aux = [];
                    this.state.filtrado.reverse().map((datar) => {
                        aux.push({
                        "name": datar.name,
                        "location": datar.location,
                        "age": datar.age,
                        "infectedtype": datar.infectedtype,
                        "state": datar.state,
                        "way": datar.way
                        })
                    })
                    this.child1.current.agregar_datos(aux);
                    break;
                case 1:
                    let aux1 = [];
                    this.state.filtrado.reverse().map((datar) => {
                        if(datar.way.toLowerCase() == "grpc")
                            aux1.push({
                                "name": datar.name,
                                "location": datar.location,
                                "age": datar.age,
                                "infectedtype": datar.infectedtype,
                                "state": datar.state,
                                "way": datar.way
                            })
                    })
                    this.child1.current.agregar_datos(aux1);
                    break;
                case 2:
                    let aux2 = [];
                    this.state.filtrado.reverse().map((datar) => {
                        if(datar.way.toLowerCase() == "nats")
                            aux2.push({
                                "name": datar.name,
                                "location": datar.location,
                                "age": datar.age,
                                "infectedtype": datar.infectedtype,
                                "state": datar.state,
                                "way": datar.way
                            })
                    })
                    this.child1.current.agregar_datos(aux2);
                    break;
                case 3:
                    let aux3 = [];
                    this.state.filtrado.reverse().map((datar) => {
                        if(datar.way.toLowerCase() == "google")
                            aux3.push({
                                "name": datar.name,
                                "location": datar.location,
                                "age": datar.age,
                                "infectedtype": datar.infectedtype,
                                "state": datar.state,
                                "way": datar.way
                            })
                    })
                    this.child1.current.agregar_datos(aux3);
                    break;
                case 4:
                    let aux4 = [];
                    this.state.filtrado.reverse().map((datar) => {
                        if(datar.way.toLowerCase() == "rabbitmq")
                            aux4.push({
                                "name": datar.name,
                                "location": datar.location,
                                "age": datar.age,
                                "infectedtype": datar.infectedtype,
                                "state": datar.state,
                                "way": datar.way
                            })
                    })
                    this.child1.current.agregar_datos(aux4);
                    break;
            }
        }catch
        {
            console.log("Conflicto")
        }
    }

    render() {
        return (

            <div className="App" style={{width:'100%',height:'500px'}}>

            <h1>Mensajeria</h1>

            <select className="custom-select" onChange={this.handleGenreSelect}>
                {this.genres.map(el => <option key={el.id}>{el.genre}</option>)}
            </select>
            
            <div className="card border-primary mb-3">
              <div className="card-body">
                <Table data={this.headerstable} ref={this.child1}/>
              </div>
            </div>

            <h1>Porcentajes  State </h1>

            <Pie data={this.state.data}/>
            </div>
        )
    }
}

