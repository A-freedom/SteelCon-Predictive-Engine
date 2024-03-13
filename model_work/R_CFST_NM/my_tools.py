import pickle
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import tensorflow as tf
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import MinMaxScaler
from model_work.R_CFST_NM.prediction import predict_hand, predict_aisc


# Define custom metric function
def std_error_percentage(y_true, y_predictions):
    error_percentage = (y_true - y_predictions) / y_true * 100
    return tf.keras.backend.std(error_percentage)


def load_scaler(file_path='model_work/R_CFST_NM/my_model/data_scaler.pkl'):
    with open(file_path, 'rb') as file:
        return pickle.load(file)


def denormalize_data(x, scaler):
    x['NAN'] = 0
    return pd.DataFrame(scaler.inverse_transform(x), columns=x.columns)


def plot_predictions(y_true, y_predictions, label, marker, edgecolor, data_description):
    plt.scatter(y_true, y_predictions, marker=marker, facecolor='none', edgecolor=edgecolor, label=label, s=12, alpha=.85)
    evaluate_errors(y_true, y_predictions, data_description)



def evaluate_errors(y_true, y_predictions, data_description):
    errors = (y_predictions - y_true) / y_true * 100
    df_error = pd.DataFrame({"Error Statistics": errors})

    print(data_description)
    print(df_error.describe())

    r = np.corrcoef(y_true, y_predictions)[0, 1]
    print("R2   ", r)

    mae = np.mean(np.abs(y_predictions - y_true))
    print("Mean Absolute Error (MAE):", mae)

    root_mse_without_norm = np.sqrt(mean_squared_error(y_true, y_predictions))
    print("Root Mean Squared Error Without Normalization  ", root_mse_without_norm)

    scaler = MinMaxScaler()
    normalized_y = scaler.fit_transform(np.array(y_true).reshape(-1, 1)).ravel()
    normalized_y_predictions = scaler.fit_transform(np.array(y_predictions).reshape(-1, 1)).ravel()

    root_mse_with_norm = np.sqrt(mean_squared_error(normalized_y, normalized_y_predictions))
    print("Root Mean Squared Error With Normalization:", root_mse_with_norm)



def evaluate_and_plot(x_data, y_data, model, data_description):
    y_predictions_ann = model.predict(x_data)*0.75
    y_predictions_ann = y_predictions_ann.ravel()

    scaler = load_scaler()
    x_denormalized = denormalize_data(x_data, scaler)

    y_predictions_aisc = predict_aisc(x_denormalized)
    y_predictions_hand = predict_hand(x_denormalized)

    plt.figure()
    ax = plt.gca()

    ax.set_axisbelow(True)
    ax.grid(True, which='both', linestyle=':', linewidth=0.8, color='gray', alpha=0.9)
    ax.minorticks_on()
    ax.grid(True, which='minor', linestyle=':', linewidth=0.5, color='gray', alpha=0.2)

    plot_predictions(y_data, y_predictions_aisc, 'AISC calculation', '^', 'blue', 'AISC')
    plot_predictions(y_data, y_predictions_hand, 'Hand calculation', 'v', 'red', 'Hand')
    plot_predictions(y_data, y_predictions_ann, 'ANN Prediction', 'o', 'orange', 'ANN')

    ax.plot([0, 9000], [0, 9000], color='#2ec27eff', linestyle='-.', linewidth=1.5, label='45-degree Line', alpha=.85)

    ax.legend()

    ax.set_xlabel(data_description)
    ax.set_ylabel('Prediction')
    ax.set_title(data_description + " vs Predictions")

    ax.set_xlim(0, 9000)
    ax.set_ylim(0, 9000)
    plt.show()