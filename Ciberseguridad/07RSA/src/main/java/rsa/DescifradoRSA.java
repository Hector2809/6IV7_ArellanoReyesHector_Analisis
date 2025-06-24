package rsa;

import javax.swing.*;
import java.awt.*;
import java.math.BigInteger;

public class DescifradoRSA extends JFrame {
    private JTextField campoCifrado, campoD, campoN;
    private JTextArea campoResultado;
    private JFrame principal;

    public DescifradoRSA(JFrame principal) {
        this.principal = principal;

        setTitle("Descifrado RSA");
        setSize(500, 300);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        campoCifrado = new JTextField(10);
        campoD = new JTextField(10);
        campoN = new JTextField(10);
        campoResultado = new JTextArea();
        campoResultado.setEditable(false);

        JButton descifrarBtn = new JButton("Descifrar");
        descifrarBtn.addActionListener(e -> {
            try {
                BigInteger cifrado = new BigInteger(campoCifrado.getText());
                BigInteger d = new BigInteger(campoD.getText());
                BigInteger n = new BigInteger(campoN.getText());

                BigInteger resultado = cifrado.modPow(d, n);
                campoResultado.setText("Mensaje descifrado = " + resultado);
            } catch (Exception ex) {
                campoResultado.setText("Error: revisa los valores ingresados.");
            }
        });

        JButton volverBtn = new JButton("Volver");
        volverBtn.addActionListener(e -> {
            principal.setVisible(true);
            dispose();
        });

        JPanel inputPanel = new JPanel(new GridLayout(4, 2));
        inputPanel.add(new JLabel("Mensaje cifrado:"));
        inputPanel.add(campoCifrado);
        inputPanel.add(new JLabel("Clave privada d:"));
        inputPanel.add(campoD);
        inputPanel.add(new JLabel("n:"));
        inputPanel.add(campoN);
        inputPanel.add(descifrarBtn);
        inputPanel.add(volverBtn);

        add(inputPanel, BorderLayout.NORTH);
        add(new JScrollPane(campoResultado), BorderLayout.CENTER);
    }
}