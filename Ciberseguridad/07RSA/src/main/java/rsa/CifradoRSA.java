package rsa;

import javax.swing.*;
import java.awt.*;
import java.math.BigInteger;

public class CifradoRSA extends JFrame {
    private RSAAlgoritmo rsa;
    private JTextField campoNumero;
    private JTextArea campoSalida;
    private JFrame principal;

    public CifradoRSA(JFrame principal) {
        this.principal = principal;
        rsa = new RSAAlgoritmo(3);
    rsa.generarPrimos();
    rsa.generarClaves();


        setTitle("Cifrado RSA");
        setSize(500, 400);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        campoNumero = new JTextField(10);
        campoSalida = new JTextArea();
        campoSalida.setEditable(false);

        JButton cifrarBtn = new JButton("Cifrar");
        cifrarBtn.addActionListener(e -> {
            try {
                BigInteger num = new BigInteger(campoNumero.getText());
                BigInteger cifrado = rsa.cifrar(num);
                campoSalida.setText(
                        "p = " + rsa.p + "\n" +
                        "q = " + rsa.q + "\n" +
                        "n = " + rsa.n + "\n" +
                        "fi = " + rsa.fi + "\n" +
                        "e = " + rsa.e + "\n" +
                        "d = " + rsa.d + "\n\n" +
                        "Mensaje cifrado = " + cifrado
                );
            } catch (Exception ex) {
                campoSalida.setText("Error: ingresa un número válido.");
            }
        });

        JButton volverBtn = new JButton("Volver");
        volverBtn.addActionListener(e -> {
            principal.setVisible(true);
            dispose();
        });

        JPanel panelTop = new JPanel();
        panelTop.add(new JLabel("Número a cifrar (máx 3 dígitos):"));
        panelTop.add(campoNumero);
        panelTop.add(cifrarBtn);

        JPanel panelBotones = new JPanel();
        panelBotones.add(volverBtn);

        add(panelTop, BorderLayout.NORTH);
        add(new JScrollPane(campoSalida), BorderLayout.CENTER);
        add(panelBotones, BorderLayout.SOUTH);
    }
}
