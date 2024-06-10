import matplotlib.pyplot as plt

# data
x = ['Baseline','0.2','0.4','0.6','0.8', '1']
y1 = [64.83, 62.08, 59.33, 56.8,54.05, 51.3]
y2 = [64.83, 59.31, 53.79, 48.73, 43.21, 37.69]
y3 = [64.83, 58.72, 52.61, 47.00, 40.89, 34.78]

fig, ax = plt.subplots()


ax.plot(x, y1, linestyle='--', marker='o', label='Apply DM2')
ax.plot(x, y2, linestyle='-', marker='s', label='Apply DM3')
ax.plot(x, y3, linestyle='-.', marker='s', label='Apply DM2 and DM3')


ax.set_xlabel('Effectiveness of the Defense Method')
ax.set_ylabel('System Risk')

ax.set_title('Impact of system risk while apply compensating defence methods')

ax.legend(loc='best')
plt.show()
