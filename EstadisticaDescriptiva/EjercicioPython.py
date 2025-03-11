import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('./EstadisticaDescriptiva/housing.csv')

elementos = {'longitude', 'latitude', 'housing_median_age', 'total_rooms', 'total_bedrooms', 'population', 'households', 'median_income', 'median_house_value'}

#Medias

for i in elementos:
    media = df[i].mean()
    print('La media de ', i, 'es: \n', media)