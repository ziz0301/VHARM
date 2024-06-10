import matplotlib.pyplot as plt
import numpy as np

# Sample data
x_values = ["Baseline", "0-day vul in Browser", "0-day vul in Intel_Kn", "0-day vul in TiDra_Kn", "0-day vul in Qualcomm_Kn", "0-day vul in all node"]
y1 = [0, 0, 1, 0, 1, 1]
y2 = [0, 0, 1, 0, 1, 5]

# Create figure and axis objects
fig, ax = plt.subplots()

# Set the bar width
bar_width = 0.35

# Set the position of the bars on the x-axis
index = np.arange(len(x_values))

# Create the bars
bar1 = ax.bar(index, y1, bar_width, label='k-zero day safety')
bar2 = ax.bar(index + bar_width, y2, bar_width, label='Number of attack paths')

# Set the x and y axis labels
ax.set_xlabel('Distribution of zero-day vulnerabilities')
ax.set_ylabel('Values')

# Set the title of the plot
ax.set_title('Impact of Zero-day Vulnerabilities in the System Network')

# Set the x-axis ticks to be the names of the x_values
ax.set_xticks(index + bar_width / 2)
ax.set_xticklabels(x_values, rotation=45, ha="right")

# Add a legend
ax.legend()

# Display the plot
plt.tight_layout()
plt.show()
