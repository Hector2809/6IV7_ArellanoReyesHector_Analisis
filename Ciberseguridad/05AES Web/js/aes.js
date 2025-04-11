var mensaje = "Habia una vez un huevo que era muy huevon, tanto que faltaba varios dias a la escuela";
var password = "qwertyuiqwertyui";

var cifrado = CryptoJS.AES.encrypt(mensaje, password);
var descifrado = CryptoJS.AES.decrypt(cifrado, password);

//Pa que se vea
document.getElementById("demo00").innerHTML = mensaje;
document.getElementById("demo01").innerHTML = cifrado;
document.getElementById("demo02").innerHTML = descifrado;
document.getElementById("demo03").innerHTML = descifrado.toString(CryptoJS.enc.Utf8);