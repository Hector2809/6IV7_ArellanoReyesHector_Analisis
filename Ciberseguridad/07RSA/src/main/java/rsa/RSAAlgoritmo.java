package rsa;

import java.math.BigInteger;
import java.util.*;

public class RSAAlgoritmo {
    int tamPrimo;
    BigInteger n, p, q;
    BigInteger fi;
    BigInteger e, d;

    // Constructor con valor fijo de tamaño (3 dígitos)
    public RSAAlgoritmo(int tamPrimo) {
        this.tamPrimo = tamPrimo;
    }

    // Método para generar primos pequeños
    public void generarPrimos() {
        // Lista de primos de 3 dígitos
        int[] primos = {101, 103, 107, 109, 113, 127, 131, 137, 139};
        Random rand = new Random();

        // Selección aleatoria de p y q distintos
        p = BigInteger.valueOf(primos[rand.nextInt(primos.length)]);
        do {
            q = BigInteger.valueOf(primos[rand.nextInt(primos.length)]);
        } while (q.compareTo(p) == 0);
    }

    // Método para generar claves: n, fi, e, d
    public void generarClaves() {
        n = p.multiply(q);
        fi = p.subtract(BigInteger.ONE).multiply(q.subtract(BigInteger.ONE));

        // Generar e tal que 1 < e < fi y mcd(e, fi) = 1
        e = new BigInteger("3");
        while (e.compareTo(fi) < 0 && !e.gcd(fi).equals(BigInteger.ONE)) {
            e = e.add(BigInteger.TWO);
        }

        // Calcular d = inversa de e módulo fi
        d = e.modInverse(fi);
    }

    // Método para cifrar un número individual
    public BigInteger cifrar(BigInteger mensaje) {
        return mensaje.modPow(e, n);
    }

    // Método para descifrar un número individual
    public BigInteger descifrar(BigInteger cifrado, BigInteger d, BigInteger n) {
        return cifrado.modPow(d, n);
    }
}