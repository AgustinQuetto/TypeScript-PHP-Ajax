//CREO UNA INSTANCIA DE XMLHTTPREQUEST
var xhttp = new XMLHttpRequest();
function validar() {
    var user = document.getElementById('account').value;
    var password = document.getElementById('password').value;
    if (user.length < 6) {
        document.getElementById("message").innerHTML = "El usuario posee menos de 6 caracteres";
        console.log(user.length);
        return;
    }
    if (password.length < 6) {
        document.getElementById("message").innerHTML = "La contraseña posee menos de 6 caracteres";
        return;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            response = response === "" ? "failed" : response;
            //(<HTMLDivElement> document.getElementById("message")).innerHTML = '<img src="./drib_nudes_1x.jpg"/>';
            console.log(response);
            if (response === 'ok') {
                document.body.style.backgroundColor = 'green';
            }
            else {
                document.body.style.backgroundColor = 'red';
            }
        }
    };
    xmlhttp.open("POST", "../backend/validar.php", true);
    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("user=" + user + "&password=" + password);
}
