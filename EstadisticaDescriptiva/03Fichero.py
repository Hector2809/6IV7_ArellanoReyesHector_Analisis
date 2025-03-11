import pandas as pd

#Hacer un ejemplo de carga de archivo y aplicar min, max, media y desviacion estandar

def cotizacion(fichero):
    df = pd.read_csv(fichero, sep=';', decimal=',', thousand='.', index_col=0)
    return pd.DataFrame([df.min(), df.max(), df.mean(), df.std()], index = ['Minimo', 'Maximo', 'Media', 'Desviación estandar'])

print(cotizacion('./EstadisticaDescriptica/cotizacion.csv'))