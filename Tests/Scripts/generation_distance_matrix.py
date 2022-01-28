from random import randint

nr = 25
min = 5000
max = 50000
difference = 500
startNr = 5
endNr = 36

mat = []
for i in range(0, nr):
    a = []
    for j in range(0, nr):
        if i == j or j < i:
            a.append(0)
        else:
            a.append(randint(min, max))
    mat.append(a)

for i in range(0, nr):
    for j in range(0, i):
        mat[i][j] = randint(mat[j][i] - difference, mat[j][i] + difference)

print()
print(len(mat))
print()
print("[")
for i in range(0, len(mat)):
    print(mat[i], ",")
print("];")

