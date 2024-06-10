import matplotlib.pyplot as plt

# data
x = ["No AC", "Baseline", "30_KCAN", "30_PTCAN", "30_KCAN and PTCAN"]
y1 = [3, 13, 150, 92, 240]
y2 = [10.76, 42.58, 445.5, 388.46, 831.75]

color1 = '#ED4617'
color2 = '#002F7B'

fig, ax1 = plt.subplots()


ax1.set_xlabel('Distribution of access node on different CAN BUS', wrap=True)
ax1.set_ylabel('Number of Attack Paths', color=color1)
ax1.plot(x, y1, color=color1, linestyle='--', marker='o', label='Attack Paths')
ax1.tick_params(axis='y', labelcolor=color1)


ax2 = ax1.twinx()

ax2.set_ylabel('System Risk', color=color2)
ax2.plot(x, y2, color=color2, linestyle='--', marker='s', label='System Risk')
ax2.tick_params(axis='y', labelcolor=color2)


fig.suptitle('Impact of Access Node on System Security')
ax1.legend(loc='upper left')
ax2.legend(loc='upper right')

plt.show()
