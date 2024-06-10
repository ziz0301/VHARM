import matplotlib.pyplot as plt

# data
groups = ['Longest APL', 'NAP', 'System Risk']
baseline = [3, 8, 64.83]
intel_kernel = [2, 5, 38.98]
tidra_kernel = [2, 6, 46.82]
qualcomm_kernel = [3, 5, 38.24]

colors = ['#91bfdb', '#FFC34E', '#7FBA00', '#E600E6']
components = ['Baseline', 'HU-Intel', 'HU-Jacinto', 'TCB-Qualcomm']

x = range(len(groups))
width = 0.15

fig, ax = plt.subplots()

bar1 = ax.bar([i - 2*width for i in x], baseline, width,  color='#91bfdb', edgecolor='#4575b4', label=components[0])
bar2 = ax.bar([i - width for i in x],  intel_kernel, width, color='#fee090', edgecolor='#d73027', label=components[1])
bar3 = ax.bar(x, tidra_kernel, width, color='#fc8d59', edgecolor='#d73027', label=components[2])
bar4 = ax.bar([i + width for i in x], qualcomm_kernel, width, color='#a6d96a', edgecolor='#1a9850', label=components[3])

ax.set_xlabel('Metrics')
ax.set_ylabel('Values')
ax.set_title('Evaluation on pathching vulnerabilities on components')
ax.set_xticks(x)
ax.set_xticklabels(groups)

for bars in [bar1, bar2, bar3, bar4]:
    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height}',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 0.5),  # 3 points vertical offset
                    textcoords="offset points",
                    ha='center', va='bottom', rotation=45)


ax.legend()
plt.show()




