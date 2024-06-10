import matplotlib.pyplot as plt
import numpy as np

# Data
x_labels = ["Baseline", "No diagnostic client on HU", "No diagnostic client on TCB", "No diagnostic client on HU and TCB"]
y1 = [3, 3, 3, 3]       # Longest APL
y2 = [8, 5, 6, 2]     # NAP
y3 = [64.83, 44.6, 43.17, 13.62]  # System Risk


x = np.arange(len(x_labels))  
width = 0.18   


fig, ax = plt.subplots(figsize=(5, 5))

bar1 = ax.bar(x - width, y1, width, label='Longest APL', color='#2980b9', edgecolor='#154360')
bar2 = ax.bar(x, y2, width, label='NAP', color='#45b39d', edgecolor='#0b5345')
bar3 = ax.bar(x + width, y3, width, label='System Risk', color='#e67e22', edgecolor='#784212')


ax.set_ylabel('Metrics Values')
ax.set_title('Effect of Reducing Diagnostic Clients on HU and TCB')
ax.set_xticks(x)
ax.set_xticklabels(x_labels, rotation=45, ha='right')
ax.legend()

for bars in [bar1, bar2, bar3]:
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