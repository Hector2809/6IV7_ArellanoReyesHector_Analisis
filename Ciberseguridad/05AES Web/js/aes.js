function cifrar(){
    var mensaje = document.getElementById("texto_a_cifrar").value.trim();
    var password = document.getElementById("clave").value.trim();

    if (mensaje === "" || password === "") {
        alert("Por favor, llena todos los campos.");
        return;
    }
    if (password.length != 16 && password.length != 24 && password.length != 32) {
        alert("La clave debe tener al menos 16, 24 o 32 caracteres.");
        return;
    }
    if (mensaje.length != 16 && mensaje.length != 24 && mensaje.length != 32){
        alert("El texto debe tener al menos 16, 24 o 32 caracteres.")
        return;
    }
    var cifrado = CryptoJS.AES.encrypt(mensaje, password);
    document.getElementById("texto_cifrado").textContent = "El texto cifrado es: " + cifrado;

    var blob = new Blob([cifrado], { type: "text/plain;charset=utf-8" });

    var enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "mensaje_cifrado.txt";

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

function descifrar(){
    var mensaje = document.getElementById("texto_a_descifrar").value.trim();
    var password = document.getElementById("clave").value.trim();

    if (mensaje === "" || password === "") {
        alert("Por favor, llena todos los campos.");
        return;
    }
    if (password.length != 16 && password.length != 24 && password.length != 32) {
        alert("La clave debe tener al menos 16, 24 o 32 caracteres.");
        return;
    }
    try{
        var descifrado = CryptoJS.AES.decrypt(mensaje, password);
        var textoFormateado = descifrado.toString(CryptoJS.enc.Utf8);
        if (!textoFormateado) {
            throw new Error("La clave es incorrecta o el texto no es válido.");
        }
        document.getElementById("texto_descifrado").textContent = "El texto descifrado sin formato es: " + descifrado;
        document.getElementById("texto_descifrado_formato").textContent = "El texto descifrado con formato es: " + descifrado.toString(CryptoJS.enc.Utf8);   
        }catch(e){
            alert("Asegúrate de que la clave y el mensaje sean correctos.");
        }
}