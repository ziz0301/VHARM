import matplotlib.pyplot as plt

# data
x = ['Baseline','0.1','0.2','0.3','0.4','0.5','0.6','0.7','0.8','0.9','1']
y1 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
y2 = [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 0]
y3 = [42.58, 38.25, 33.84, 29.79, 25.38, 21.48, 16.92, 12.87, 8.46, 4.56, 0]

fig, ax = plt.subplots()

# Create three line plots with different line styles
ax.plot(x, y1, linestyle='--', marker='o', label='Shortest APL')
ax.plot(x, y2, linestyle='-', marker='s', label='NAP')
ax.plot(x, y3, linestyle='-.', marker='^', label='System Risk')

# Set the x and y axis labels
ax.set_xlabel('IDS accuracy rate')
# ax.set_ylabel('System risk')

# Set the title of the plot
ax.set_title('How accuracy rate of IDS affect the system security')

# Add a legend
ax.legend()

# Display the plot
plt.show()
