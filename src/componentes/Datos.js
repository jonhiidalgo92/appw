import React, { Component } from 'react'
import Table from "./Table1";


let PersonasInfectadasT5 = [];

export default class Datos extends Component {
    constructor(props) {
        super(props);
        this.childPacientes =  React.createRef();
        this.table_Headers = ["Paciente","Edad","Ubicacion","Tipo","Estado"];
        this.updatePacientes= this.updatePacientes.bind(this);
        this.state = {
            curTime : null
        }
    }

    componentDidMount() {
        setInterval( () => {
            this.setState({
                curTime : new Date().toLocaleString()
            })
        },3000)
        setInterval(this.updatePacientes,3000);
    }

    updatePacientes(){

        fetch('http://localhost:5000/top5/pacientes').then((res)=>{
            res.json().then((result)=>{
                let stringify = JSON.parse(JSON.stringify(result))
                this.childPacientes.current.removeRow();
                this.childPacientes.current.agregar_datos(stringify);
            })
        })
    }

    getCurrentDate(){
        let separator = "/"
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let minute = newDate.getMinutes();
        let hour = newDate.getHours();
        let second = newDate.getSeconds();

        return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}   ${hour}:${minute}:${second}`
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-lg-6 col-md-6 col-sm-12">
                        <div className="card border-primary mb-3">
                            <div className="card-header">
                                <h1>Top 5 Ultimos Casos Registrados</h1>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <Table data={this.table_Headers} ref={this.childPacientes}/>
                                </div>
                            </div>
                            <div className="card-footer text-right">
                                <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-12">

                    </div>
                </div>
            </div>
        )
    }
}
