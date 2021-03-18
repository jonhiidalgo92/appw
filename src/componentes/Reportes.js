import CanvasJSReact from '../canvasjs.react';
import Table from './Table';
import React, { Component } from 'react'; 
//import './App.css';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = [{x: 0, y: 0}];   //dataPoints.
var xVal = 1;
var dpsp = [
  { y: 25, label: "Used" },
  { y: 75, label: "Free" },
];   //dataPoints.

export default class Reportes extends Component {
    constructor(props) {
        super(props);
        this.updateChart = this.updateChart.bind(this);
        this.updateChart2 = this.updateChart2.bind(this);
        this.updateTable = this.updateTable.bind(this);
    
        this.child1 = React.createRef();
        this.child2 = React.createRef();
    
        this.text1 = "";
        this.text2 = "";
        this.text3 = "";
        this.text4 = "";
        this.ast_translate = "";
        this.ast_interprete = "";
        this.table_ram = ["PID", "Name", "Father PID", "Status"]
        this.datas = [
                {
                    type: "area",
                    xValueFormatString: "YYYY",
                    yValueFormatString: "#,##0.## Million",
                    dataPoints: [
              { x: new Date(2017, 0), y: 7.6}
            ]
                }
                ]
        this.state = {
          value: ''
        }
      }
    
        componentDidMount() {
            setInterval(this.updateChart, 3000);
            setInterval(this.updateChart2, 3000);
            setInterval(this.updateTable, 3000);
        }
      
        updateChart() {
        fetch('http://35.222.55.115:8080/ram').then((res)=>{
          res.json().then((result)=>{
            dps.push({x: xVal*3,y: result.uso});
            xVal++;
            if (dps.length >  10 ) {
              dps.shift();
            }
            this.chart.render();
            //this.setState({users:result})
          })
        })
    
    
        }
    
      updateChart2() {
        fetch('http://35.222.55.115:8080/ram').then((res)=>{
          res.json().then((result)=>{
            for(let i = 0; i <= dpsp.length ; i++)
            {
              dpsp.pop();
            }
            dpsp.push({ y: 100 - result.porcentaje, label: "Free" });
            dpsp.push({ y: result.porcentaje, label: "Used" });
            this.chart2.render();
            //this.setState({users:result})
          })
        })
        }
    
      updateTable(){
    
        fetch('http://35.222.55.115:8080/procesos').then((res)=>{
          res.json().then((result)=>{
            let stringify = JSON.parse(JSON.stringify(result))
            this.child1.current.removeRow();
            this.child1.current.agregar_datos(stringify);
            //this.chart2.render();
            //this.setState({users:result})
          })
        })
    
    
      }
    
      render () {
        const options_d = {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light1", // "light1", "dark1", "dark2"
                title:{
                    text: "RAM"
                },
                data: [{
                    type: "pie",
                    indexLabel: "{label}: {y}%",		
                    startAngle: -90,
                    dataPoints: dpsp
                }]
            }
    
        const options = {
          theme: "light1", // "light1", "dark1", "dark2"
                title :{
                    text: "Status Ram"
                },
                data: [{
                    type: "line",
                    dataPoints : dps
                }]
            }
    
        return (
          <div className="jumbotron">
            <h1 id="buttons">System Monitor</h1>
            <div className="card border-primary mb-3">
              <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="card-header">Uso de Memoria</div>
                  <div className="card-body">
                  <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
                  </div> 
                </div>
                <div className="col">
                <div className="card-header">Distribucion Ram</div>
                  <div className="card-body">
                  <CanvasJSChart options = {options_d} onRef={ref => this.chart2 = ref}/>
                  </div>
                </div>
              </div>
              </div>
            </div>
          
            <div className="card border-primary mb-3">
              <div className="card-body">
                <Table data={this.table_ram} ref={this.child1}/>
              </div>
            </div>
          </div>
        );
      }
}
