import matplotlib.pyplot as plt

# data
x = ["Baseline", "No HU tester", "No TU tester", "No HU and TU tester"]
y1 = [4, 4, 4, 4]
y2 = [13, 7, 11, 5]
y3 = [42.58, 27.17, 27.90, 12.50]
# y4 = [129.15, 97.84, 97.55, 125.25, 125.25, 87.57, 92.07, 92.07]

fig, ax = plt.subplots()


ax.plot(x, y1, linestyle='--', marker='o', label='Longest APL')
ax.plot(x, y2, linestyle='--', marker='s', label='NAP')
ax.plot(x, y3, linestyle='--', marker='^', label='System Risk')

plt.xlabel('Teleservice Tester Reduction')
plt.title('Impact of reduce Teleservice Tester in the system')

plt.legend(loc='best')
plt.show()
