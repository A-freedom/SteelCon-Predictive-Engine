# %%
import numpy as np

from data_preprocessor import DataPreprocessor
data_preprocessor = DataPreprocessor(denormalize_data=True)
x = data_preprocessor.df
x['bi (mm)'] = x['b (mm)'] - x['t (mm)']
x['hi (mm)'] = x['h (mm)'] - x['t (mm)']
x['Ag (mm)'] = x['b (mm)'] * x['h (mm)'] - 4 * x['t (mm)'] ** 2 * (4 - np.pi)
x['Ac (mm)'] = x['bi (mm)'] * x['hi (mm)'] - x['t (mm)'] ** 2 * (4 - np.pi)
x['As (mm)'] = x['Ag (mm)'] - x['Ac (mm)']

x['Icy (mm^4)'] = (x['h (mm)'] - 4 * x['t (mm)']) * x['bi (mm)'] ** 3 / 12 + \
                  x['t (mm)'] * (x['b (mm)'] - 4 * x['t (mm)']) ** 3 / 6 + \
                  ((9 * np.pi ** 2 - 64) * x['t (mm)'] ** 4) / (36 * np.pi) + \
                  np.pi * x['t (mm)'] ** 2 * ((x['b (mm)'] - 4 * x['t (mm)']) / 2 + 4 * x['t (mm)'] / (3 * np.pi)) ** 2

x['Isy (mm^4)'] = (x['b (mm)'] * x['h (mm)'] ** 3 - x['bi (mm)'] * x['hi (mm)'] ** 3) / 12

x['C3'] = np.minimum(0.9, 0.6 + 2 * x['As (mm)'] / x['Ag (mm)'])
x['EI_eff'] = 2E5 * x['Isy (mm^4)'] + x['C3'] * 4700 * np.sqrt(x['fc (MPa)']) * x['Icy (mm^4)']
x['Pe (KN)'] = (np.pi ** 2 * x['EI_eff'] / (4 * x['L (mm)'] ** 2))/1E3

x['h/t'] = x['h (mm)'] / x['t (mm)']
x['lamda p'] = 2.26 * np.sqrt(2E5 / x['fy (MPa)'])
x['lamda r'] = 3 * np.sqrt(2E5 / x['fy (MPa)'])
# x['lamda max'] = 5 * np.sqrt(2E5 / x['fy (MPa)'])

# Create conditions for classification
conditions = [
    (x['h/t'] < x['lamda p']),
    (x['h/t'] >= x['lamda p']) & (x['h/t'] <= x['lamda r']),
    (x['h/t'] > x['lamda r'])
]

# Create corresponding labels for classification
labels = ['compact', 'noncompact', 'slender']

# Add the 'classification' column based on conditions
x['classification'] = np.select(conditions, labels, default='')

x.loc[x['classification'] == 'compact', 'Pno (KN)'] = (x['fy (MPa)'] * x['As (mm)']
                                                       + 0.85 * x['fc (MPa)'] * x['Ac (mm)']) / 1E3

x.loc[x['classification'] == 'noncompact', 'Py (KN)'] = (x['fy (MPa)'] * x['As (mm)']
                                                         + 0.7 * x['fc (MPa)'] * x['Ac (mm)']) / 1E3

x.loc[x['classification'] == 'noncompact', 'Pp (KN)'] = (x['fy (MPa)'] * x['As (mm)']
                                                         + 0.85 * x['fc (MPa)'] * x['Ac (mm)']) / 1E3

x.loc[x['classification'] == 'noncompact', 'Pno (KN)'] = x['Pp (KN)'] - (x['Pp (KN)'] - x['Py (KN)']) * (
        x['h/t'] - x['lamda p']) ** 2 / (x['lamda r'] - x['lamda p']) ** 2

x.loc[x['classification'] == 'slender', 'Fcr (MPa)'] = 9 * 2E5 / (x['b (mm)'] / x['t (mm)']) ** 2

x.loc[x['classification'] == 'slender', 'Pno (KN)'] = (x['Fcr (MPa)'] * x['As (mm)']
                                                       + 0.7 * x['fc (MPa)'] * x['Ac (mm)']) / 1E3

x['Pno/Pe'] = x['Pno (KN)'] / x['Pe (KN)']
x.loc[x['Pno/Pe'] <= 2.25, 'Pn (KN)'] = x['Pno (KN)'] * 0.658 ** x['Pno/Pe']
x.loc[x['Pno/Pe'] > 2.25, 'Pn (KN)'] = 0.877 * x['Pe (KN)']
x.to_csv('DATA/3208 R_CFST_NM_AISC.csv')

import matplotlib.pyplot as plot
plot.scatter(x['N Test (kN)'], x['Pn (KN)']*0.75, marker='^', facecolor='none', edgecolor='blue',label='AISC Calculation Prediction', s=8)
plot.plot([0,9000], [0,9000], color='#2ec27eff', linestyle='-.', linewidth=1, label='45-degree Line')

plot.legend()
plot.xlim(0, 9000)
plot.ylim(0, 9000)
plot.show()
#%%