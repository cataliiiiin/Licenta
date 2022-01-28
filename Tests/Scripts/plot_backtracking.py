import matplotlib.pyplot as plt
import numpy as np


first = [0.055, 0.106, 0.172, 0.494, 3.509, 34.813, 357.190, 4176.728, 52660.396, 845310.975, 11520506.861]
second = [0.049, 0.056, 0.125, 0.546, 3.506, 37.571, 356.884, 4318.340, 52909.071, 782836.116, 11520506.861]
third = [0.047, 0.036, 0.121, 0.517, 4.035, 36.783, 359.629, 4201.054, 53357.733, 780570.985, 11520506.861]

first_sec = [x / 1000 for x in first]
second_sec = [x / 1000 for x in second]
third_sec = [x / 1000 for x in third]

t = np.arange(5, 16)

fig, ax = plt.subplots()
plt.grid(b=None)

ax.plot(t, first_sec, 'g', label="1 - 10 km")
ax.plot(t, second_sec, 'r', label="5 - 50 km")
ax.plot(t, third_sec, 'b', label="10 - 100 km")

ax.set(xlabel='Număr orașe', ylabel='Timp de execuție (s)')
ax.grid()

leg = ax.legend();
ax.legend(loc='upper left', frameon=False)
plt.xticks(t)
plt.show()