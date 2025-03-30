import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('./EstadisticaDescriptiva/Tablas/housing.csv')

print(df.head())

print(df.tail())

#filas en especifico
print(df.iloc[7])

#mostar columna por su nombre
print(df["ocean_proximity"])

#obtener la media de la columna del total de cuartos
mediaCuartos = df["total_rooms"].mean()
print('Media de los cuartos: ', mediaCuartos)

#obtener mediana de la columna de popularidad
medianaPopularidad = df["population"].median()
print('Mediana de la popularidad: ', medianaPopularidad)

#obtener desviacion estandar de los años
std_age = df["housing_median_age"].std()
print("Desviación Estandar de los años: ", std_age)

#para poder filtrar
filtroOceano = df[df["ocean_proximity"] == "ISLAND"]
print('Filtro de proximidad del oceano: ', filtroOceano)

#crear un grafico de dipersion entre los registros de la proximidad del oceano vs los precios
plt.scatter(df["ocean_proximity"][:10], df["median_house_value"][:10])

#hay que definir a "x" y "y"
plt.xlabel('Proximidad')
plt.ylabel('Precio')

plt.title('Gráfico de dispersión de Proximidad al oceano vs el Precio')
plt.show()