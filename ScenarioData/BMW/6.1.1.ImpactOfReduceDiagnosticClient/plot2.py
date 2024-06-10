import matplotlib.pyplot as plt
import numpy as np

# Data
x_labels = ["Longest APL", "NAP", "System Risk"]
y_baseline = [3, 8, 64.83]
y_no_hu = [3, 5, 44.6]
y_no_tcb = [3, 6, 43.17]
y_no_hu_tcb = [3, 2, 13.62]


x = np.arange(len(x_labels)) 
width = 0.18 

# Create figure and axis objects
fig, ax = plt.subplots(figsize=(8, 6))

bar1 = ax.bar(x - width * 1.5, y_baseline, width, label='Baseline', color='#91bfdb', edgecolor='#4575b4')
bar2 = ax.bar(x - width / 2, y_no_hu, width, label='No diagnostic client on HU', color='#fee090', edgecolor='#d73027')
bar3 = ax.bar(x + width / 2, y_no_tcb, width, label='No diagnostic client on TCB', color='#fc8d59', edgecolor='#d73027')
bar4 = ax.bar(x + width * 1.5, y_no_hu_tcb, width, label='No diagnostic client on HU and TCB', color='#a6d96a', edgecolor='#1a9850')

ax.set_xlabel('Metrics')
ax.set_ylabel('Values')
ax.set_title('Effect of Reducing Diagnostic Clients on HU and TCB')
ax.set_xticks(x)
ax.set_xticklabels(x_labels)
ax.legend()

# Add value labels on top of each bar
for bars in [bar1, bar2, bar3, bar4]:
    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height}',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 0.5),
                    textcoords="offset points",
                    ha='center', va='bottom')

# Display the plot
plt.tight_layout()
plt.show()
