"use strict";
///<reference path='./interface.ts'/>
var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio) {
            this._patente = patente;
            this._marca = marca;
            this._precio = precio;
        }
        Auto.prototype.GetPrecioConIva = function () {
            return this._precio * 1.21;
        };
        Auto.prototype.toJson = function () {
            return JSON.stringify({ _patente: this._patente, _marca: this._marca, _precio: this._precio });
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
