import React, { Component } from 'react'
import Table from './Table';
import CanvasJSReact from '../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoint;
var total;
var datap = [
    { y: 1400, label: "Prospects" },
    { y: 1212, label: "Qualified Prospects" },
    { y: 1080, label: "Proposals" },
    { y: 665,  label: "Negotiation" },
    { y: 578, label: "Final Sales" }
];
const options = {
    animationEnabled: true,
    title:{
        text: "Top 5 departamentos infectados"
    },
    data: [{
        type: "funnel",
        toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
        indexLabelPlacement: "inside",
        indexLabel: "{label} ({percentage}%)",
        dataPoints: datap
    }]
}

export default class Funell extends Component {
    constructor(props) {
        super(props);
        this.peticion = this.peticion.bind(this);
        this.configuracionG_ = this.configuracionG_.bind(this);

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
            opciones:[],
            points:[]
        }
      }

    async peticion(){
        var peticion  = await fetch("http://35.222.55.115:8080/obtenerUsuarios")
        this.state.filtrado = await peticion.json();

    }
    
    async configuracionG_(){
        //hacemos la peticion
        var peticion  = await fetch("http://35.222.55.115:8080/Top5")
        this.state.points = await peticion.json();

        if(this.state.points.length > 0)
        {
            let initial =  datap.length
            for(let i = 0; i <= initial ; i++)
                datap.pop();

            for(let i = 0 ; i < 5; i++)
                datap.push({ y: this.state.points[i].valor, label: this.state.points[i].location });

            dataPoint = options.data[0].dataPoints;
            total = dataPoint[0].y;
            for(var i = 0; i < datap.length; i++) {
                if(i == 0) {
                    options.data[0].dataPoints[i].percentage = 100;
                } else {
                    options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
                }
            }
            this.chart.render();
        }
    }

    //ma
    async componentDidMount(){
        setInterval(this.peticion, 3000);
        setInterval(this.configuracionG_, 3000);
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
                  <div className="table-responsive">
                      <Table data={this.headerstable} ref={this.child1}/>
                  </div>
              </div>
            </div>

            <h1>Porcentajes  State </h1>
            <div className="card border-primary mb-3">
              <div className="card-body">
                <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
              </div>
            </div>
            </div>
        )
    }
}

