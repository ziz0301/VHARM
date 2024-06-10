import matplotlib.pyplot as plt

# Sample data
x_values = ["Baseline", "0-day vul in Browser", "0-day vul in Intel_Kn", "0-day vul in TiDra_Kn", "0-day vul in Qualcomm_Kn", "0-day vul in all node"]
y2 = [0, 0, 1, 0, 1, 5]

# Create figure and axis objects
fig, ax = plt.subplots(figsize=(10, 6))  # Adjust the figure size to reduce space between x values

# Create the dot plot with markers only
ax.plot(x_values, y2, 'bo', label='Number of attack paths', markersize=8)

# Add text annotations to show the value next to each dot
for i, value in enumerate(y2):
    ax.text(i, value, str(value), fontsize=9, ha='right', va='bottom')

# Set the x and y axis labels
ax.set_xlabel('Distribution of zero-day vulnerabilities')
ax.set_ylabel('Number of attack paths')

# Set the title of the plot
ax.set_title('Impact of Zero-day Vulnerabilities on Attack Paths')

# Rotate the x-axis labels for better readability
plt.xticks(rotation=45, ha="right")

# Add a legend
ax.legend()

# Display the plot
plt.tight_layout()
plt.show()
