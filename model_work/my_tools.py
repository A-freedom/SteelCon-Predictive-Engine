import pickle

import matplotlib.pyplot as plot
import numpy as np
import pandas as pd
import seaborn as sns
import tensorflow as tf
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import MinMaxScaler


# Define custom metric function
def std_ep(y_true, y_predictions):
    error_percentage = (y_true - y_predictions) / y_true * 100
    return tf.keras.backend.std(error_percentage)


def evaluate_and_plot(X, y, model, data_description):
    # Predictions from ANN
    y_predictions_ann = model.predict(X)
    y_predictions_ann = [i[0] for i in y_predictions_ann]

    # Predictions hand calculations
    # denormalized X
    with open('model_work/my_model/data_scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    X['NAN'] = 0
    X = pd.DataFrame(scaler.inverse_transform(X), columns=X.columns)
    # As = 2t*(b+h)
    area_steel = 2 * X['t (mm)'] * (X['b (mm)'] + X['h (mm)'])
    # Ag = b * h
    area_gross = X['b (mm)'] * X['h (mm)']
    # Ac = Ag - As
    area_concrete = area_gross - area_steel
    # Pn = 0.85*Fc*Ac + Fy*Ay
    y_predictions_aci = 0.9 * (0.85 * X['fc (MPa)'] * area_concrete + X['fy (MPa)'] * area_steel) / 1000

    # plot hand calculations
    plot.scatter(y, y_predictions_aci, marker='^', facecolor='none', edgecolor='blue',
                 label='Hand Calculation Prediction')
    # plot ANN
    plot.scatter(y, y_predictions_ann, marker='o', facecolor='none', edgecolor='orange', label='ANN Prediction')
    # 45 degree line
    plot.plot(y, y, color='#2ec27eff', linestyle='-.', linewidth=1, label='45-degree Line')

    plot.legend()
    # Labels and title
    plot.xlabel(data_description)
    plot.ylabel('Prediction')
    plot.title(data_description + " vs Predictions")
    # Adjust plot limits
    # min_val = min(np.min(y), np.min(y))
    # max_val = max(np.max(y), np.max(y))
    plot.xlim(0, 9000)
    plot.ylim(0, 9000)
    plot.show()

    evaluate(y, y_predictions_ann, data_description)
    evaluate(y, y_predictions_aci, data_description + ' Hand calculations')


def evaluate(y, y_predictions, data_description):
    # Calculate errors
    errors = (np.array(y_predictions) - np.array(y)) / np.array(y) * 100
    df_error = pd.DataFrame({"error statistics": errors})

    sns.kdeplot(df_error.sort_values("error statistics"), fill=True)
    plot.gca().set_title("error distribution for" + data_description)
    plot.show()

    print(data_description)
    print(df_error.describe())
    # Calculate the Pearson correlation coefficient
    r = np.corrcoef(y, y_predictions)[0, 1]
    print("R2   ", r)
    # Calculate the mse without normalization
    mse_without_norm = mean_squared_error(y, y_predictions)
    print("Mean Squared Error without normalization  ", mse_without_norm)

    scaler = MinMaxScaler()
    normalized_y = np.ravel(scaler.fit_transform(np.ravel(y).reshape(-1, 1)))
    normalized_y_predications = np.ravel(scaler.fit_transform(np.ravel(y_predictions).reshape(-1, 1)))

    mse = mean_squared_error(normalized_y, normalized_y_predications)
    print("Mean Squared Error with normalization:", mse)
