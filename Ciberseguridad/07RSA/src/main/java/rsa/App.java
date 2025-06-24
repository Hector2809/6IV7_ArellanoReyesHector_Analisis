package rsa;

import javax.swing.*;
import java.awt.*;

public class App extends JFrame {
    public App() {
        setTitle("RSA - Calculadora Educativa");
        setSize(400, 200);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new GridLayout(3, 1, 10, 10));

        JButton cifrarBtn = new JButton("Cifrar Número");
        JButton descifrarBtn = new JButton("Descifrar Número");

        cifrarBtn.addActionListener(e -> {
            new CifradoRSA(this).setVisible(true);
            this.setVisible(false);
        });

        descifrarBtn.addActionListener(e -> {
            new DescifradoRSA(this).setVisible(true);
            this.setVisible(false);
        });

        add(new JLabel("Selecciona una opción", SwingConstants.CENTER));
        add(cifrarBtn);
        add(descifrarBtn);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new App().setVisible(true);
        });
    }
}