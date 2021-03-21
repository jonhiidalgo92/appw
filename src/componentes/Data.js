import React, { Component } from 'react'
import Table from "./Table";


let PersonasInfectadasT5 = [];

export default class extends Component {

    constructor() {
        super();

    }


    render() {
        return (
            <div>
                <div>
                    Listando datos Modulos
                </div>
            </div>

        )
    }

    getCurrentDate(){
        let separator = "/"
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
}
