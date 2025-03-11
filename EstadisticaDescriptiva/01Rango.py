#vamos a rear un programa que pregunte al usuario por kas ventas de un rango de años 
# y muestre por pantalla una serie con los daros de las ventas indexadas por los años antes 
# y despues de aplicar un descuento del 10%

import pandas as pd

inicio = int(input('Introduce el año inicial de ventas: '))
fin = int(input('Introduce el año final de ventas: '))
ventas = {}
for i in range(inicio, fin+1):
    ventas[i] = float(input('Introduce las ventas del año ' + str(i) + ':'))

ventas = pd.Series(ventas)
print('ventas: \n', ventas)
print('Ventas con descuento\n', ventas*0.9)