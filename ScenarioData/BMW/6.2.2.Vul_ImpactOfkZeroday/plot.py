import matplotlib.pyplot as plt
import numpy as np

# data
x_values = ["Baseline", "0-day vul in Browser", "0-day vul in Intel_Kn", "0-day vul in TiDra_Kn", "0-day vul in Qualcomm_Kn", "0-day vul in all node"]
y1 = [0, 0, 1, 0, 1, 1]
y2 = [0, 0, 1, 0, 1, 5]


fig, ax = plt.subplots()


bar_width = 0.35

index = np.arange(len(x_values))

bar1 = ax.bar(index, y1, bar_width, label='k-zero day safety')
bar2 = ax.bar(index + bar_width, y2, bar_width, label='Number of attack paths')

ax.set_xlabel('Distribution of zero-day vulnerabilities')
ax.set_ylabel('Values')

ax.set_title('Impact of Zero-day Vulnerabilities in the System Network')


ax.set_xticks(index + bar_width / 2)
ax.set_xticklabels(x_values, rotation=45, ha="right")


ax.legend()
plt.tight_layout()
plt.show()
