import itertools
import math
import pandas as pd

points = {
    'A': (2, 3),
    'B': (5, 4),
    'C': (1, 1),
    'D': (6, 7),
    'E': (3, 5),
    'F': (8, 2),
    'G': (4, 6),
    'H': (2, 1),
}

# Las formulas de calculo de distancias
def euclidean(p1, p2):
    return math.sqrt((p2[0] - p1[0])**2 + (p2[1] - p1[1])**2)

def manhattan(p1, p2):
    return abs(p2[0] - p1[0]) + abs(p2[1] - p1[1])

def chebyshev(p1, p2):
    return max(abs(p2[0] - p1[0]), abs(p2[1] - p1[1]))

# Aqui calcula distancias
data = []
for (p1, c1), (p2, c2) in itertools.product(points.items(), repeat=2):
    data.append({
        "Punto 1": p1,
        "Punto 2": p2,
        "Euclidiana": euclidean(c1, c2),
        "Manhattan": manhattan(c1, c2),
        "Chebyshev": chebyshev(c1, c2),
    })

# Crear DataFrame
df = pd.DataFrame(data)

print("Distancias calculadas:")
print(df.head)

# Encontrar los pares con menor y mayor distancia para cada métrica (excluyendo los mismos puntos)
df_no_self = df[df["Punto 1"] != df["Punto 2"]]

for metric in ["Euclidiana", "Manhattan", "Chebyshev"]:
    min_row = df_no_self.loc[df_no_self[metric].idxmin()]
    max_row = df_no_self.loc[df_no_self[metric].idxmax()]
    print(f"\nMétrica: {metric}")
    print(f"Distancia mínima entre {min_row['Punto 1']} y {min_row['Punto 2']}: {min_row[metric]}")
    print(f"Distancia máxima entre {max_row['Punto 1']} y {max_row['Punto 2']}: {max_row[metric]}")