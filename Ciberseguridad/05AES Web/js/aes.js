function cifrar(){
    var mensaje = document.getElementById("texto_a_cifrar").value;
    var password = document.getElementById("clave").value;

    var cifrado = CryptoJS.AES.encrypt(mensaje, password);

    document.getElementById("texto_cifrado").textContent = "El texto cifrado es: " + cifrado;
}

function descifrar(){
    var mensaje = document.getElementById("texto_a_descifrar").value;
    var password = document.getElementById("clave").value;

    var descifrado = CryptoJS.AES.decrypt(mensaje, password);

    document.getElementById("texto_descifrado").textContent = "El texto descifrado sin formato es: " + descifrado;
    document.getElementById("texto_descifrado_formato").textContent = "El texto descifrado con formato es: " + descifrado.toString(CryptoJS.enc.Utf8);
}