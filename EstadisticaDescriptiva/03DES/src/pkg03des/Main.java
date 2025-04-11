package pkg03des;

//es para definir entradas y salidas del sistema para el manejo de archivos
import java.io.*;
//Calculo de subllaves
import java.security.*;
//definir algoritmo de cifrado
import javax.crypto.*;

//para el algoritmo
import javax.crypto.interfaces.*;
//definir el tamaño de la clave y subclaves
import javax.crypto.spec.*;

public class Main {

    public static void main(String[] args) throws Exception{
        
        //Crear un programa que lea un archivo de texto plano, se debe introducir una clave
        
        
        //debe cifrarlo y generar el archivo correspondiente
        
        //usaremos DES
        if(args.length != 1){
            mensajeAyuda();
            System.exit(1);
        }
        
        //paso 1 definir el algoritmo y su clave
        System.out.println("1.- Generar las claves DES");
        //para generar las claves usamos la clase KeyGenerator
        KeyGenerator generadorDES = KeyGenerator.getInstance("DES");
        
        System.out.println("");
        //debemos inicializar el tamaño de la clave
        generadorDES.init(56);//el tamaño de la clave es de 64 - 8 bits de paridad
        //el algoritmo envia error si no es exactamente de 56
        
        //hay dos opciones para definir la clave, manual o con la clase SecretKey
        //si es manual se ingresa por parte del usuario, se validsa que sean 8 caracteres
        //luego transformamos la clave en bits
        
        //Estas son las subclaves para las 16 rondas
        SecretKey clave = generadorDES.generateKey();
        
        System.out.println("La clave es: " + clave);
        
        //NO es posible distinguir los  bytes de un caracter si no esta cifrado
        mostrarBytes(clave.getEncoded());
        
        System.out.println("Clave codificada: " + clave.getEncoded());
        System.out.println("");
        
        /*
        El tipo de cifrado es DES, que es simetrico, lo que significa que la clave de cifrado es la misma para descrifrar.
        Hay que definir el modo de operacion del cifrado.
        El flujo es por bloques
        ECB
        si va a tener o no un relleno
        Debemos de aplicar un estandar para el relleno
        Este es el estandar de relleno PKCS5 y hay que programarlo
        */
        
        Cipher cifrador = Cipher.getInstance("DES/ECB/PKCS5Padding");
        
        //Vamos a crear el menu para cifrar y descifrar
        System.out.println("2.- Cifar un fichero con DES: " + args[0]
                + " dejamos el resultado en: " + args[0] + ".cifrado");
        
        //Tenemos que cargar el archivo y ejecutar el cifrado
        
        cifrador.init(Cipher.ENCRYPT_MODE, clave);
        
        //Aqui es importante recordar el modo
        //ECB no puede automatizar el flujo del bloque
        
        byte[] buffer = new byte[1000];
        //este arreglo sireve para guardar el resultado
        byte[] buffercifrado;
        
        //definir el archivo
        FileInputStream entrada = new FileInputStream(args[0]);
        FileOutputStream salida = new FileOutputStream(args[0] + ".cifrado");
        
        int bytesleidos = entrada.read(buffer, 0, 1000);
        
        while(bytesleidos != -1){
            buffercifrado = cifrador.update(buffer, 0, 1000);
            salida.write(buffercifrado);
            bytesleidos = entrada.read(buffer, 0, bytesleidos);
        }
        
        
        //construir la salida
        buffercifrado = cifrador.doFinal();
        //genero el archivo de salida
        salida.write(buffercifrado);
        
        entrada.close();
        salida.close();
        
        
        
        
        
        //Ahora el descifrado
        
        //Vamos a crear el menu para cifrar y descifrar
        System.out.println("3.- Descifar un fichero con DES: " + args[0]
                + " dejamos el resultado en: " + args[0] + " descifrado");
        
        //Tenemos que cargar el archivo y ejecutar el cifrado
        
        cifrador.init(Cipher.DECRYPT_MODE, clave);
        
        //Aqui es importante recordar el modo
        //ECB no puede automatizar el flujo del bloque
        
        
        //este arreglo sireve para guardar el resultado
        byte[] bufferdescifrado;
        
        //definir el archivo
        entrada = new FileInputStream(args[0] + ".cifrado");
        salida = new FileOutputStream(args[0] + ".descifrado");
        
        bytesleidos = entrada.read(buffer, 0, 1000);
        
        while(bytesleidos != -1){
            bufferdescifrado = cifrador.update(buffer, 0, 1000);
            salida.write(bufferdescifrado);
            bytesleidos = entrada.read(buffer, 0, bytesleidos);
        }
        
        
        //construir la salida
        bufferdescifrado = cifrador.doFinal();
        //genero el archivo de salida
        salida.write(bufferdescifrado);
        
        entrada.close();
        salida.close();
        
    }   
    
        private static void mostrarBytes(byte[] buffer){
            //Gracias a ECB solo tenemos que escribir el formato del tipo de buffer para el archivo
            System.out.write(buffer, 0, buffer.length);
        }
    
        private static void mensajeAyuda(){
            System.out.println("Ejemplo de un programa "
                    + "que sirve para cifrar y descifrar con DES");
            System.out.println("Favor de ingresar un archivo de "
                    + "texto plano, si no funciona osea .txt");
    }
}