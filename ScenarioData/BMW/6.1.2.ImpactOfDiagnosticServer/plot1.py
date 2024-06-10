import matplotlib.pyplot as plt
import numpy as np

#Data
x = ["No AC", "Baseline", "30_KCAN", "30_PTCAN", "30_KCAN and 30 PTCAN"]
y1 = [3, 8, 90, 61, 150]
y2 = [22.94, 64.83, 667.5, 486.78, 1147.5]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(6, 4))

x_pos = np.arange(len(x))

ax1.bar(x_pos, y1, color='#a6d96a', edgecolor='#1a9850', width=0.5)
ax1.set_ylabel('Number of Attack Paths')
ax1.set_title('Number of Attack Paths')
ax1.set_xticks(x_pos)
ax1.set_xticklabels(x, rotation=45, ha="right", fontsize=6)
ax1.tick_params(axis='y', labelsize=6)

ax2.bar(x_pos, y2, color='#fee090', edgecolor='#d73027', width=0.5)
ax2.set_ylabel('System Risk')
ax2.set_title('System Risk')
ax2.set_xticks(x_pos)
ax2.set_xticklabels(x, rotation=45, ha="right", fontsize=6)
ax2.tick_params(axis='y', labelsize=6)

fig.text(0.5, 0.02, 'Distribution of Access Node on Different CAN BUS', ha='center', va='center')

plt.tight_layout(pad=1.0)

plt.show()
