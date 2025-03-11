//obtener los datos a cifrar
const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado")

//Crear una funcion que se encarge del algoritmo del cifrado

function cifrado(){

    //Obtener el texto
    const textoIngresado = texto.value
    //obtener cada caracter de la cadena(la frase) y validar solo las letras
    textoCifrado.value =textoIngresado.split('').map( c => {
        let mayus = ( c === c.toUpperCase())? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);

        if(valorEntero >= 97 && valorEntero <= 122){
            //si son letras se cifran
            const valorDesplazamiento = parseInt(desplazamiento.value);
            if(valorEntero + valorDesplazamiento >122){
                valorEntero = 97 + (valorEntero - 122) + valorDesplazamiento - 1;
            }else{
                valorEntero = valorEntero + valorDesplazamiento;
            }
        }

        //Juntar todo
        let cifrado = String.fromCharCode(valorEntero)
            return mayus ? cifrado.toUpperCase() : cifrado;
        
    }).join('');
}

texto.addEventListener("keyup", cifrado);
desplazamiento.addEventListener("change", cifrado);