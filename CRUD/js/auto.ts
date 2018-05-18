///<reference path='./interface.ts'/>

namespace Clases {
    export class Auto implements Interface.ITributable{
        protected _patente : string
        protected _marca : string
        protected _precio : number

        public constructor(patente : string, marca : string, precio : number) {
            this._patente = patente
            this._marca = marca
            this._precio = precio
        }

        public GetPrecioConIva() {
            return this._precio*1.21
        }

        public toJson() : string {
            return JSON.stringify({patente: this._patente, marca: this._marca, precio: this._precio})
        }
    }
}