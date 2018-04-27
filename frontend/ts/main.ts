//CREO UNA INSTANCIA DE XMLHTTPREQUEST
let xhttp : XMLHttpRequest = new XMLHttpRequest();

function validar():void{

    let user : string = (<HTMLInputElement> document.getElementById('account')).value
    let password : string = (<HTMLInputElement> document.getElementById('password')).value
    
    if (user.length < 6) { 
        (<HTMLDivElement> document.getElementById("message")).innerHTML = "El usuario posee menos de 6 caracteres";
        console.log(user.length)
        return;
    }

    if (password.length < 6) { 
        (<HTMLDivElement> document.getElementById("message")).innerHTML = "La contraseña posee menos de 6 caracteres";
        return;
    }
    
    let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let response : string = xmlhttp.responseText;
            response = response === "" ? "failed" : response;
            console.log(response)

            if (response === 'ok') {
                (<HTMLDivElement> document.getElementById("message")).innerHTML = '<img src="./drib_nudes_1x.jpg"/>';
                document.body.style.backgroundColor = 'green';
            } else {
                document.body.style.backgroundColor = 'red';
            }
        }
    }
    
    xmlhttp.open("POST", "../backend/validar.php", true);
    xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xmlhttp.send("user="+user+"&password="+password);

}