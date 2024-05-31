import pickle
import tensorflow as tf
import pandas as pd

from itertools import product

# Read the original DataFrame
df_original = pd.read_csv('DATA/AISC-R_HSS.csv')
# Filter the original DataFrame based on specific criteria
df_filtered = df_original[
    (df_original['b (mm)'].between(40, 360)) &
    (df_original['h (mm)'].between(40, 360)) &
    (df_original['t (mm)'].between(0.7, 15))
    ]

# Define possible values for fy and fc
fy_values = [240, 420, 600, 800]
fc_values = [30, 35, 40, 45, 50, 55, 60, 65, 75]
l_values = [2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500]

# Create all combinations of fy, fc, and L values
combinations = list(product(fy_values, fc_values, l_values))

# Repeat the filtered DataFrame for the number of combinations
df_repeated = pd.concat([df_filtered] * len(combinations), ignore_index=True)

# Add the fy, fc, and L combinations to the repeated DataFrame
df_repeated['fy (MPa)'] = [combo[0] for combo in combinations for _ in range(len(df_filtered))]
df_repeated['fc (MPa)'] = [combo[1] for combo in combinations for _ in range(len(df_filtered))]

# Add the L values to the repeated DataFrame
df_repeated['L (mm)'] = [combo[2] for combo in combinations for _ in range(len(df_filtered))]

# Load the trained model and scaler
loaded_model = tf.keras.models.load_model('R_CFST_NM/my_model/best_model.keras')
with open('R_CFST_NM/my_model/data_scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)


# Function to predict using the loaded model
def predict_ann(df):
    scaled_df = scaler.transform(df)
    return loaded_model.predict(scaled_df[:, :-1]) * 0.75


# Prepare the DataFrame for prediction
df_to_predict = df_repeated[['b (mm)', 'h (mm)', 't (mm)', 'L (mm)', 'fy (MPa)', 'fc (MPa)']].copy()

# Perform prediction and add results to the DataFrame
df_to_predict['N Test (kN)'] = 0
df_repeated['ΦP ANN (kN)'] = predict_ann(df_to_predict, )

df_repeated = df_repeated[df_repeated['ΦP ANN (kN)'] > 50]
df_repeated['ΦP ANN (kN)'] = df_repeated['ΦP ANN (kN)'].round().astype(int)
df_repeated = df_repeated.sort_values(by='W', ascending=True)
df_repeated = df_repeated.rename(columns={'W': 'W Kg/m'})
print(df_repeated)
df_repeated.to_csv('DATA/AISC-R_HSS-design-tables.csv', index=False)
