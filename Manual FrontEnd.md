# Manual FrontEnd

Para el desarrollo de una gráfica necesitamos seguir los siguientes pasos:
1. Desacargar las librerias de [Canvas](https://canvasjs.com/react-charts/) para react luego incluirlas en nuestro proyecto
2. Importar la libreria donde vayamos a implementar la grafica.



## Desarrollo Gráfica de Pastel

* Se instalo la libreria charts

```
npm install chart.js --save

```

* importando las librerias a utilizar 

```
import {Pie} from 'react-chartjs-2'

```

* Declaracion del objeto estado de la grafica que pide de  parametro al renderizar, este se va llenar de datos que requiere la libreria para funcionar.   

```
    state ={
        respuesta:[],
        estado:[],
        porcentajes:[],
        colores:[],
        data:[],
        opciones:[]
    }

```


* tenemos un Metodo Asyncrono en el que se va a realizar la peticion como tambien se separan los datos de la respuesta en dos arreglos para poder utilizarlos adecuadamente a nuetras necesidades. 


```
    async peticion(){
        var peticion  = await fetch("http://35.222.55.115:8080/state")
        var respuestat = await peticion.json();

        this.setState({respuesta: respuestat});

        var estadot=[]
        var porcentajet=[]

        this.state.respuesta.map((elemento)=>{
            estadot.push(elemento.state);
            porcentajet.push(elemento.porcent);
        });

        this.setState({estado: estadot, porcentajes: porcentajet});
        console.log(this.state.estado)
        console.log(this.state.porcentajes)
        console.log(respuestat)
    }

```

* Metodo para generar Caracteres que serviran mas adelante para los colores y asi tener de manera aleatoria todos. por lo que tenemos de la funcion math en su metodo random para generar este de manera aleatoria y asi agarrar un caracter randomicamente, accediendo al arreglo deplarado.


```
    generar_(){
        var Caracte= ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"]
        var numero = (Math.random()*15).toFixed(0);
        return Caracte[numero];
    }

```


* Tenemos la configuracion de la grafica, la cual llenaremos los arreglos del objeto que bamos a insertarle ala libreria para generar la misma. 

```

    configuracionG_(){
        const datat= {
            labels: this.state.estado,
            datasets:[{
                data: this.state.porcentajes,
                backgroundColor: this.state.colores
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
        this.setState({data: datat, opciones: opcionest});
    }
```

podemos ver que temos un arreglo con las caracteristicas, que son las labels como el estado, las datasets como los datos en este caso son porcentajes  y los colores.

por otro lado tenemos a las opciones en las que colocamos que las graficas fueran responsivas, que el radio fuera dinamico, como tambien que se viera el dato al exterior.

luego lo almacenamos  y seteamos la data. 



* llamamos al metodo que nos va a ejecutar todo de manera consecutiva y asincronicamente.

```
    async componentDidMount(){
        await this.peticion();         //peticion al server de manera asincrona
        await this.generarC_();        //generacion de colores
        await this.configuracionG_();  //y que setee correctamente las configuraciones
    }

```


*  Tenemos al render el cual llama a nuestra libreria como un componente al que le insertamos los parametros del objeto que contiene nuestra informacion a procesar y luego a convertir en una grafica. 

```

    render() {
        return (
            <div className="App" style={{width:'90%',height:'500px'}}>
            <h1>Porcentajes  State </h1>
            <Pie data={this.state.data} opciones={this.state.opciones}/>
            </div>
        )
    }


```



## Desarrollo Gráfica de Barras

## Desarrollo Gráfica de Funnel
Para la implementacion de la gráfica funnel necesitamos definir sus parametros de configuracion:
 ```
  var dataPoint;  // variable la cual contendra un arreglo de la informacion a graficar
  var total;      // variable la cual almacenara el numero total de casos para los departamentos
  var datap = [
      { y: 1400, label: "Prospects" },
      { y: 1212, label: "Qualified Prospects" },
      { y: 1080, label: "Proposals" },
      { y: 665,  label: "Negotiation" },
      { y: 578, label: "Final Sales" }
  ];              // variable que almacena informacion inicial para la grafica
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
  }             /* constante en la cual definimos la configuracion de nuestra grafica, indicamos el tipo de grafica, 
                   definimos los campos a desplegar y por ultimo la data
                   en este caso la variable que usaremos para alimentarla. */
```

Ahora bien para que la grafica pueda ser refrescada en tiempo real es necesario agregar las funciones que obtienen la data y
modifican la grafica al método componentDidMount el cual se ejecuta justo después de que el componente haya 
sido montado en el DOM es necesario indicar que el metodo es asincrono ya que nuestras funciones para obtener
la data son asyncronas, ademas es importantae usar el método que llama a una función o ejecuta algún código 
después de intervalos de tiempo específicos, el cual especificamos a través del segundo parámetro, siendo 
el primer parametro nuestra funcion. En nuestro caso el metodo a usar es configuracionG_

```
    async componentDidMount(){
        setInterval(this.configuracionG_, 3000);
    }
```

El metodo que hayamos definido para actualizar la data aparte de cambiar los valores es necesario indicarle que 
el componente que creamos necesita ser renderizado esto para que pueda ser refrescado en nuestra pagina web.
```
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
```
Por ultimo necesario agregar nuestro componente y crear una referencia para hacer que el componente se refresque

```
  <CanvasJSChart options = {options}onRef={ref => this.chart = ref}/>
```

## Desarrollo Tabla Dinamica
