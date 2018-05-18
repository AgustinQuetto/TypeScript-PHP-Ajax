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
            return JSON.stringify({ patente: this._patente, marca: this._marca, precio: this._precio });
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
///<reference path='./auto.ts'/>
var Enlace;
(function (Enlace) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.Agregar = function (caso) {
            if (caso === void 0) { caso = 'agregar'; }
            var patente = document.getElementById('txtPatente').value;
            var marca = document.getElementById('cboMarca').value;
            var precio = Number(document.getElementById('txtPrecio').value);
            var auto = new Clases.Auto(patente, marca, precio);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var response = xmlhttp.responseText;
                    response = response === "" ? "failed" : response;
                    console.log(response);
                    if (response) {
                        console.log('TODO VA BIEN');
                    }
                    else {
                        console.log('TODO VA MAL');
                    }
                }
            };
            xmlhttp.open("POST", "backend/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=" + caso + "&cadenaJson=" + auto.toJson());
        };
        Manejadora.Mostrar = function () {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var response = xmlhttp.responseText;
                    response = response === "" ? "failed" : response;
                    if (response) {
                        var table_1 = '<table class="table"><thead><td>Marca</td><td>Precio</td><td>Patente</td><td>Herramientas</td></thead><tbody>';
                        console.log(response);
                        var responseJson = JSON.parse(response);
                        responseJson.forEach(function (element) {
                            var auto = new Clases.Auto(element.patente, element.marca, element.precio);
                            table_1 += "<tr><td>" + element.marca + "</td><td>" + element.patente + "</td><td>" + element.precio + "</td><td><input type=\"button\" value=\"Eliminar\" onClick=\"Enlace.Manejadora.Eliminar('" + encodeURI(auto.toJson()) + "')\" />&nbsp;<input type=\"button\" value=\"Modificar\"/></td></tr>";
                        });
                        table_1 += '</tbody></table>';
                        document.getElementById('divTabla').innerHTML = table_1;
                        console.log("Generado");
                    }
                    else {
                        console.log('TODO VA MAL');
                    }
                }
            };
            xmlhttp.open("POST", "backend/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");
        };
        Manejadora.Eliminar = function (paramJson) {
            var _this = this;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var response = xmlhttp.responseText;
                    response = response === "" ? "failed" : response;
                    console.log(response);
                    if (response) {
                        _this.Mostrar();
                        console.log('Eliminado');
                    }
                    else {
                        console.log('No eliminado');
                    }
                }
            };
            xmlhttp.open("POST", "backend/administrar.php", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            console.log(decodeURI(paramJson));
            xmlhttp.send("caso=eliminar&cadenaJson=" + decodeURI(paramJson));
        };
        Manejadora.Modificar = function () {
            this.Agregar('modificar');
        };
        return Manejadora;
    }());
    Enlace.Manejadora = Manejadora;
})(Enlace || (Enlace = {}));
