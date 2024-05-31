# %%
import pickle
import numpy as np
import pandas as pd
import tensorflow as tf


def predict_aisc(x, factored=False):
    x['bi (mm)'] = x['b (mm)'] - 2 * x['t (mm)']
    x['hi (mm)'] = x['h (mm)'] - 2 * x['t (mm)']
    x['Ag (mm)'] = x['b (mm)'] * x['h (mm)']
    x['Ac (mm)'] = x['bi (mm)'] * x['hi (mm)']
    x['As (mm)'] = x['Ag (mm)'] - x['Ac (mm)']

    x['Icy (mm^4)'] = x['hi (mm)'] * x['bi (mm)'] ** 3 / 12

    x['Isy (mm^4)'] = (x['b (mm)'] * x['h (mm)'] ** 3 - x['bi (mm)'] * x['hi (mm)'] ** 3) / 12

    x['C3'] = np.minimum(0.9, 0.6 + 2 * x['As (mm)'] / x['Ag (mm)'])
    x['EI_eff'] = 2E5 * x['Isy (mm^4)'] + x['C3'] * 4700 * np.sqrt(x['fc (MPa)']) * x['Icy (mm^4)']
    x['Pe (KN)'] = (np.pi ** 2 * x['EI_eff'] / (4 * x['L (mm)'] ** 2)) / 1E3

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

    if factored:
        x['Pno/Pe'] = x['Pno (KN)'] / x['Pe (KN)']
        x.loc[x['Pno/Pe'] <= 2.25, 'Pn (KN)'] = x['Pno (KN)'] * 0.658 ** x['Pno/Pe']
        x.loc[x['Pno/Pe'] > 2.25, 'Pn (KN)'] = 0.877 * x['Pe (KN)']
        return x['Pn (KN)'] * 0.75
    return x['Pno (KN)']


def predict_aci(x, factored=False):
    x['bi (mm)'] = x['b (mm)'] - 2 * x['t (mm)']
    x['hi (mm)'] = x['h (mm)'] - 2 * x['t (mm)']
    x['Ag (mm)'] = x['b (mm)'] * x['h (mm)']
    x['Ac (mm)'] = x['bi (mm)'] * x['hi (mm)']
    x['As (mm)'] = x['Ag (mm)'] - x['Ac (mm)']

    x['Icy (mm^4)'] = x['hi (mm)'] * x['bi (mm)'] ** 3 / 12

    x['Isy (mm^4)'] = (x['b (mm)'] * x['h (mm)'] ** 3 - x['bi (mm)'] * x['hi (mm)'] ** 3) / 12

    x['C3'] = np.minimum(0.9, 0.6 + 2 * x['As (mm)'] / x['Ag (mm)'])
    x['EI_eff'] = 2E5 * x['Isy (mm^4)'] + x['C3'] * 4700 * np.sqrt(x['fc (MPa)']) * x['Icy (mm^4)']
    x['Pe (KN)'] = (np.pi ** 2 * x['EI_eff'] / (4 * x['L (mm)'] ** 2)) / 1E3
    x['Pp (KN)'] = (x['fy (MPa)'] * x['As (mm)'] + 0.85 * x['fc (MPa)'] * x['Ac (mm)']) / 1E3
    x['P (KN)'] = np.maximum(x['Pe (KN)'], x['Pp (KN)'])
    if factored:
        return x['Pp (KN)']
    return x['Pp (KN)'] * 0.85 * 0.85


def predict_ann(df):
    loaded_model = tf.keras.models.load_model('R_CFST_NM/my_model/best_model.keras')
    with open('R_CFST_NM/my_model/data_scaler.pkl', 'rb') as f:
        scalar = pickle.load(f)

    scaled_df = scalar.transform(df)
    return loaded_model.predict(scaled_df[:, :-1])[0][0] * 0.75


def create_data_frame(b, h, t, L, fy, fc):
    df = pd.DataFrame({
        'b (mm)': [b], 'h (mm)': [h], 't (mm)': [t], 'L (mm)': [L], 'fy (MPa)': [fy], 'fc (MPa)': [fc],
        'N Test (kN)': [0]
    })
    # Check and swap values if 'b (mm)' is less than 'h (mm)'
    mask = df['b (mm)'] < df['h (mm)']
    df.loc[mask, ['b (mm)', 'h (mm)']] = df.loc[mask, ['h (mm)', 'b (mm)']].values
    return df
