///<reference path='./auto.ts'/>

namespace Enlace {
    export class Manejadora {
        public static Agregar(caso='agregar') : void {
            let patente = (<HTMLInputElement>document.getElementById('txtPatente')).value
            let marca = (<HTMLInputElement>document.getElementById('cboMarca')).value
            let precio = Number((<HTMLInputElement>document.getElementById('txtPrecio')).value)

            const auto = new Clases.Auto(patente, marca, precio)
                
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest()
            
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    let response : string = xmlhttp.responseText
                    response = response === "" ? "failed" : response
                    console.log(response)
        
                    if (response) {
                        console.log('TODO VA BIEN')
                    } else {
                        console.log('TODO VA MAL')
                    }
                }
            }
            
            xmlhttp.open("POST", "backend/administrar.php", true)
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")
            xmlhttp.send("caso="+caso+"&cadenaJson="+auto.toJson())
        
        }

        public static Mostrar() : void {
                
            let xmlhttp : XMLHttpRequest = new XMLHttpRequest()
            
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    let response : string = xmlhttp.responseText
                    response = response === "" ? "failed" : response
                    if (response) {
                        let table : string = '<table class="table"><thead><td>Marca</td><td>Precio</td><td>Patente</td><td>Herramientas</td></thead><tbody>'
                        console.log(response)
                        let responseJson : any = JSON.parse(response)
                        responseJson.forEach((element : any) => {
                            const auto = new Clases.Auto(element.patente, element.marca, element.precio)
                            table += `<tr><td>${element.marca}</td><td>${element.patente}</td><td>${element.precio}</td><td><input type="button" value="Eliminar" onClick="Enlace.Manejadora.Eliminar('${encodeURI(auto.toJson())}')" />&nbsp;<input type="button" value="Modificar"/></td></tr>`
                        })
                        table+='</tbody></table>';
                        (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = table
                        console.log("Generado")
                    } else {
                        console.log('TODO VA MAL')
                    }
                }
            }
            xmlhttp.open("POST", "backend/administrar.php", true)
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")
            xmlhttp.send("caso=mostrar")
        }

        public static Eliminar(paramJson : string) : void {
                let xmlhttp : XMLHttpRequest = new XMLHttpRequest()
                
                xmlhttp.onreadystatechange = () => {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        let response : string = xmlhttp.responseText
                        response = response === "" ? "failed" : response
                        console.log(response)
            
                        if (response) {
                            this.Mostrar()
                            console.log('Eliminado')
                        } else {
                            console.log('No eliminado')
                        }
                    }
                }
                
                xmlhttp.open("POST", "backend/administrar.php", true)
                xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded")
                console.log(decodeURI(paramJson))
                xmlhttp.send("caso=eliminar&cadenaJson="+decodeURI(paramJson))
        }

        public static Modificar() {
            this.Agregar('modificar')
        }
    }
}