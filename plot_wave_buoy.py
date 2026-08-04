# plot_wave_buoy.py
#
# Read the Honiara (Solomon Islands) wave buoy CSV, clean it, and plot
# significant wave height (Hs) and peak wave period (Tp) over time.
#
# Run with:
#     python plot_wave_buoy.py
#
# Requires: pandas, matplotlib
#     pip install pandas matplotlib

import pandas as pd
import matplotlib.pyplot as plt

# ---------------------------------------------------------------
# 1. Load the data
# ---------------------------------------------------------------
df = pd.read_csv("sample_wave_buoy.csv")

print("First few rows:")
print(df.head())
print()

# ---------------------------------------------------------------
# 2. Quick quality check
#    Buoys sometimes drop a reading (blank) or send an error value
#    such as 99.9 when the sensor fails. Both must be removed before
#    plotting, or the chart will be wrong.
# ---------------------------------------------------------------
print("Rows with a missing wave height:")
print(df[df["hs_m"].isna()])
print()

print("Rows with a suspicious wave height (over 10 m is not possible here):")
print(df[df["hs_m"] > 10])
print()

# Turn the 99.9 error values into "missing" so they are not plotted
df.loc[df["hs_m"] > 10, "hs_m"] = None

# ---------------------------------------------------------------
# 3. Sort by time so the line is drawn in the right order
# ---------------------------------------------------------------
df["timestamp"] = pd.to_datetime(df["timestamp"])
df = df.sort_values("timestamp")

station = df["station"].iloc[0]

# ---------------------------------------------------------------
# 4. Plot Hs and Tp
#    They use different units (metres vs seconds), so each gets its
#    own panel instead of being squeezed onto one y-axis.
# ---------------------------------------------------------------
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(9, 6), sharex=True)

# Top panel: significant wave height
ax1.plot(df["timestamp"], df["hs_m"], color="#2a78d6", linewidth=2, marker="o", markersize=4)
ax1.set_ylabel("Hs (m)")
ax1.set_title("Wave Height and Peak Period - " + station)

# Bottom panel: peak wave period
ax2.plot(df["timestamp"], df["tp_s"], color="#eb6834", linewidth=2, marker="o", markersize=4)
ax2.set_ylabel("Tp (s)")
ax2.set_xlabel("Time")

# Light gridlines so the data stands out
for ax in (ax1, ax2):
    ax.grid(True, color="#e1e0d9", linewidth=0.8)
    ax.set_axisbelow(True)

plt.xticks(rotation=45)
plt.tight_layout()

# ---------------------------------------------------------------
# 5. Save and show
# ---------------------------------------------------------------
plt.savefig("wave_buoy_plot.png", dpi=150)
print("Saved plot to wave_buoy_plot.png")
plt.show()
