import matplotlib.pyplot as plt

# data
metrics = ['NAP', 'APL', 'System Risk']
baseline = [8, 3, 64.83]
v1 = [8, 3, 62.13]
v2 = [8, 3, 62.13]
v3 = [8, 3, 55.98]
v5 = [8, 3, 50.04]
v6 = [8, 3, 50.04]

colors = ['#ED4617', '#002F7B', '#FFC34E', '#7FBA00', '#E600E6', '#9C27B0', '#FF5722', '#03A9F4']
components = ['Baseline', 'v1', 'v2', 'v3', 'v5', 'v6']

x = range(len(metrics))
width = 0.1

fig, ax = plt.subplots()

ax.bar([i - 2.5*width for i in x], baseline, width,color='#aeb6bf', edgecolor='#2c3e50', label=components[0])
ax.bar([i - 1.5*width for i in x], v1, width, color='#91bfdb', edgecolor='#4575b4', label=components[1])
ax.bar([i - 0.5*width for i in x], v2, width, color='#fee090', edgecolor='#d73027', label=components[2])
ax.bar([i + 0.5*width for i in x], v3, width, color='#fc8d59', edgecolor='#d73027', label=components[3])
ax.bar([i + 1.5*width for i in x], v5, width, color='#a6d96a', edgecolor='#1a9850', label=components[4])
ax.bar([i + 2.5*width for i in x], v6, width, color='#af7ac5', edgecolor='#5b2c6f', label=components[5])

ax.set_xlabel('Metrics')
ax.set_ylabel('Values')
ax.set_title('Evaluation of NAP, APL, and System Risk Across Vulnerabilities')
ax.set_xticks(x)
ax.set_xticklabels(metrics)

ax.legend()
plt.show()
