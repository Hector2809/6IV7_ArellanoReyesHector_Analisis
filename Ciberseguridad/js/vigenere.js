var vigenere = vigenere || (function(){
    var proceso = function(txt, clave, action){
        var abc = "abcdefghijklmnopqrstuvwxyz";
        var resultado = "";
        var indiceClave = 0;

        for (var i = 0; i < txt.length; i++) {
            var charTexto = txt[i].toLowerCase();
            if (abc.includes(charTexto)) {
                var desp = obindiceClave(clave[indiceClave % clave.length]);
                var pos = abc.indexOf(charTexto);
                if (action) {
                    pos = (pos + desp) % 26;
                } else {
                    pos = (pos - desp + 26) % 26;
                }
                resultado += abc[pos];
                indiceClave++;
            } else {
                resultado += charTexto;
            }
        }
        return resultado;
    }
    return{
        encode : function(txt, clave){
            return proceso(txt, clave, true);
        },
        decode : function(txt, clave){
            return proceso(txt, clave, false);
        }
    }
})();

function obindiceClave(reco){
    var abc = "abcdefghijklmnopqrstuvwxyz";
    return abc.indexOf(reco.toLowerCase());
}

function cifrar(){
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;
    if (texto === "" || clave === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }
    document.getElementById("respuesta").value = vigenere.encode(texto, clave);
}

function descifrar(){
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;
    if (texto === "" || clave === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }
    document.getElementById("respuesta").value = vigenere.decode(texto, clave);
}

function reiniciar(){
    document.getElementById("txt").value = "";
    document.getElementById("txtclave").value = "";
    document.getElementById("respuesta").value = "";
}
