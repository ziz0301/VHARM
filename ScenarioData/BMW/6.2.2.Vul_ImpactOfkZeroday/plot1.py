import matplotlib.pyplot as plt

# Sample data
x_values = ["Baseline", "0-day vul in Browser", "0-day vul in Intel_Kn", "0-day vul in TiDra_Kn", "0-day vul in Qualcomm_Kn", "0-day vul in all node"]
y2 = [0, 0, 1, 0, 1, 5]

fig, ax = plt.subplots(figsize=(10, 6)) 


ax.plot(x_values, y2, 'bo', label='Number of attack paths', markersize=8)

for i, value in enumerate(y2):
    ax.text(i, value, str(value), fontsize=9, ha='right', va='bottom')

ax.set_xlabel('Distribution of zero-day vulnerabilities')
ax.set_ylabel('Number of attack paths')


ax.set_title('Impact of Zero-day Vulnerabilities on Attack Paths')


plt.xticks(rotation=45, ha="right")

ax.legend()

plt.tight_layout()
plt.show()
