import pandas as pd

#Crear una función que se encarge de recibir un 
#diccionario de las notas de los estudiantes de analisis de datos que van a
#reprobar y obtener su min, max, media, y desviacion estandar

def estadisticas_notas(notas):
    notas = pd.Series(notas)
    estadistica = pd.Series([notas.min(), notas.max(), notas.mean(), notas.std()], index = ['Min','Max', 'Media', 'Desviación Estandar'])
    return estadistica

def aprobados(notas):
    notas = pd.Series(notas)
    return notas[notas >= 6].sort_values(ascending=False)    

notas = {'Juan': 10, 'Juanita': 7.5, 'Pedro': 9.8, 'Pancho': 5.7, 'Pollo': 8, 'Betin': 9.5}

print(estadisticas_notas(notas))
print(aprobados(notas))