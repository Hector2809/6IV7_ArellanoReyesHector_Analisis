import pandas as pd
import matplotlib.pyplot as plt
from tabulate import tabulate

#Sacar los datos del excel
df = pd.read_csv('./EstadisticaDescriptiva/housing.csv')

#Que es cada datos del excel (lo que segun yo son los encabezados)
elementos = ['longitude', 'latitude', 'housing_median_age', 'total_rooms', 'total_bedrooms', 'population', 'households', 'median_income', 'median_house_value']

#Hacer las distintas operaciones para cada "encabezado"
estadisticas = {
    "media": df[elementos].mean(),
    "mediana": df[elementos].median(),
    "moda": df[elementos].mode().iloc[0],
    "rango": df[elementos].max()- df[elementos].min(),
    "varianza": df[elementos].var(),
    "desviacion estandar": df[elementos].std()
}

#Esto es para sacar los datos de las operaciones y transformalos al DataFrame para que se vean bien chidoris en la tabla
dfEstadisticas = pd.DataFrame(estadisticas)

#LA TABLA, con un estilo que se me hizo bonito
print(tabulate(dfEstadisticas, headers='keys', tablefmt='rounded_grid'))


#GRAFICO (esas casas cuestan mucho 

#El total de la popularidad
df_sample = df.head(2000)

#El como se crea la grafica de barras
plt.figure(figsize=(10, 5))

# Graficar el median house value y el population
plt.bar(df_sample.index, df_sample['median_house_value'], label="Valor medio de la casa", color='green')
plt.bar(df_sample.index, df_sample['population'] * 10, label="popularidad", color='red')

#El promedio del median house value y su linea graficada
promedio_mhv = df['median_house_value'].mean()
plt.axhline(promedio_mhv, color='purple', linestyle='--', linewidth=2, label="Promedio del valor medio de la casa")

#Los datos de la grafica y su super nombre
plt.xlabel("Popularidad")
plt.ylabel("Valor medio de la casa")
plt.title("Grafico de el Valor Medio de la Casa VS la Popularidad,\ncon el promedio del Valor Medio de la Casa incluido")

# Mostrar el super gráfico
plt.show()