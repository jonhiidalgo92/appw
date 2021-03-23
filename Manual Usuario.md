# MANUAL DE USUARIO

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

## Desarrollo Tabla Dinamica
# Manual de Usuario
