import matplotlib.pyplot as plt
import numpy as np

min = [88459, 174796, 250702, 328153, 385735]
max = [100654, 192939, 272525, 344871, 424432]

min_km = [x / 1000 for x in min]
max_km = [x / 1000 for x in max]

t = [50, 100, 150, 200, 250]

fig, ax = plt.subplots()
plt.grid(b=None)

ax.plot(t, min_km, 'g', label="Distanța minimă")
ax.plot(t, max_km, 'r', label="Distanța maximă")
ax.set(xlabel='Număr orașe', ylabel='Distanța (km)')

ax.grid()
leg = ax.legend();
ax.legend(loc='upper left', frameon=False)
plt.xticks(t)
plt.show()