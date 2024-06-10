import matplotlib.pyplot as plt

# data
x = ['Baseline','Browser','Intel Kernel','TiDra Kernel','Qualcomm Kernel']
y1 = [4, 3, 2, 3, 4]
y2 = [13, 8, 6, 9, 10]
y3 = [42.58, 36.57, 28.60, 38.62, 19.36]
# y4 = [129.15, 79.84, 49.97, 87.57, 92.07]

color1 = '#ED4617'
color2 = '#002F7B'
color3 = '#FFC34E'
# color4 = '#000000'

plt.bar(x, y1, width=0.15, align='center', color=color1, label='Longest APL')
plt.bar([i + 0.15 for i, _ in enumerate(x)], y2, width=0.15, align='center', color=color2, label='NAP')
plt.bar([i + 0.3 for i, _ in enumerate(x)], y3, width=0.15, align='center', color=color3, label='System Risk')
# plt.bar([i + 0.45 for i, _ in enumerate(x)], y3, width=0.15, align='center', color=color4, label='System Risk(sum)')


plt.xlabel('Patching vulnerabilites in components')

plt.title('Impact of system risk while patching vulnerabilities in components')

plt.legend(loc='best')

plt.show()
