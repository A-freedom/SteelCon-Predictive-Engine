#%%
import matplotlib.pyplot as plt
import pandas as pd
#%%
df = pd.read_csv('DATA/data_R_FCST.csv', header=0)

df = df[df['Ea (Gpa)'].notna()]
df = df[df['Ea (Gpa)'] >= 197]
df = df[df['Ea (Gpa)'] <= 210]
df = df[(df['t (mm)'] < 10) & (df['t (mm)'] > 2)]
df = df[(df['h (mm)'] / df['b (mm)'] < 1.5) &  (df['h (mm)'] / df['b (mm)'] > 0.8)]
df = df[df['L (mm)'] < 1000]
df = df[df['fc (MPa)'] < 100]
df = df[df['N Test (kN)'] < 8000]



#%%

#%%
plt.hist(df['N Test (kN)'] )
#%%
len(df)
# %%
