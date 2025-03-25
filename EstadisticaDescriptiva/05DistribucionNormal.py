import numpy as np
import matplotlib.pyplot as plt

#Vamos a crear una semilla random
np.random.seed(0)

#Vamos a obtener los parametros que necesitamos para la distribucion normal
media = 0
desviacion_estandar1 = 1
desviacion_estandar2 = 2
desviacion_estandar3 = 3
num_muestras= 1000

#Generar la distribución
data1 = np.random.normal(media,desviacion_estandar1,num_muestras)
data2 = np.random.normal(media,desviacion_estandar2,num_muestras)
data3 = np.random.normal(media,desviacion_estandar3,num_muestras)

#Configurar el gráfico
plt.figure( figsize=(10,6) )

#Graficarlo como histograma
plt.hist(data1, bins=30, color='blue', density=True, label='Desviación Estandar: 1', alpha=0.5)
plt.hist(data2, bins=30, color='red', density=True, label='Desviación Estandar: 2', alpha=0.5)
plt.hist(data3, bins=30, color='green', density=True, label='Desviación Estandar: 3', alpha=0.5)

#Formato a la gráfica
plt.title('Comparacion de Distribuciones Estandár con una semilla random')
plt.xlabel('Valor')
plt.axhline(0, color='black', linewidth=0.5, ls='--')
plt.axvline(0, color='black', linewidth=0.5, ls='--')
plt.legend()
plt.grid()

plt.show()