import matplotlib.pyplot as plt

# data
x = ['Baseline','v1','v2','v3','v4','v5','v6','v7']
y1 = [4, 3, 4, 4, 4, 3, 4, 4]
y2 = [13, 8, 13, 13, 13, 9, 10, 10]
y3 = [42.58, 36.57, 27.09, 40.68, 40.68, 38.62, 19.36, 19.36]
# y4 = [129.15, 97.84, 97.55, 125.25, 125.25, 87.57, 92.07, 92.07]

color1 = '#ED4617'
color2 = '#002F7B'
color3 = '#FFC34E'
# color4 = '#000000'

plt.bar(x, y1, width=0.25, align='center', color=color1, label='Longest APL')
plt.bar([i + 0.25 for i, _ in enumerate(x)], y2, width=0.25, align='center', color=color2, label='NAP')
plt.bar([i + 0.5 for i, _ in enumerate(x)], y3, width=0.25, align='center', color=color3, label='System Risk')
# plt.bar([i + 0.5 for i, _ in enumerate(x)], y4, width=0.25, align='center', color=color4, label='System Risk(sum)')

plt.xlabel('Patching vulnerabilites in components')

plt.title('Impact of system risk while patching vulnerabilities')

plt.legend(loc='best')
plt.show()
