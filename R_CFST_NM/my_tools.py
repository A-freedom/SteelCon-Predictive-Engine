import pickle
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_percentage_error
from sklearn.preprocessing import MinMaxScaler
from prediction import predict_aci, predict_aisc


# Define custom metric function
def std_error_percentage(y_true, y_predictions):
    error_percentage = (y_true - y_predictions) / y_true * 100
    return tf.keras.backend.std(error_percentage)


def load_scaler(file_path='R_CFST_NM/my_model/data_scaler.pkl'):
    with open(file_path, 'rb') as file:
        return pickle.load(file)


def denormalize_data(x, scaler):
    x['NAN'] = 0
    return pd.DataFrame(scaler.inverse_transform(x), columns=x.columns)


def plot_predictions(y_true, y_predictions, label, marker, edgecolor, data_description):
    y_true = np.array(y_true)
    y_predictions = np.array(y_predictions)
    evaluate_errors(y_true, y_predictions, data_description)

    M, B, r2 = get_liner_regression(y_true, y_predictions)
    plt.plot([B, 9000], [0, 9000 * M], color=edgecolor, linestyle='-.', linewidth=1.5,
             label=f'Best liner fit: y = {round(M, 4)}*x + {round(B, 4)}, R2 = {round(r2, 4)}',
             alpha=.85)

    plt.scatter(y_true, y_predictions, marker=marker, facecolor='none', edgecolor=edgecolor, label=label, s=30,
                alpha=.90)


def evaluate_errors(y_true, y_predictions, plot_name):
    errors = (y_predictions - y_true) / y_true * 100
    errors = np.abs(errors)
    df_error = pd.DataFrame({"Error Statistics": errors})

    print(plot_name)
    print(df_error.describe())

    r = np.corrcoef(y_true, y_predictions)[0, 1]
    print("R2   ", r)

    mape = mean_absolute_percentage_error(y_true, y_predictions)
    print("Mean Absolute Percentage Error (MAPE):", mape)

    mae = np.mean(np.abs(y_predictions - y_true))
    print("Mean Absolute Error (MAE):", mae, "KN")

    root_mse_without_norm = np.sqrt(mean_squared_error(y_true, y_predictions))
    print("Root Mean Squared Error normalized (RMSE):", root_mse_without_norm, "KN")

    scaler = MinMaxScaler()
    normalized_y = scaler.fit_transform(np.array(y_true).reshape(-1, 1)).ravel()
    normalized_y_predictions = scaler.fit_transform(np.array(y_predictions).reshape(-1, 1)).ravel()

    root_mse_with_norm = np.sqrt(mean_squared_error(normalized_y, normalized_y_predictions))
    print("Root Mean Squared Error (RMSE):", root_mse_with_norm)


def get_liner_regression(y_true, y_predictions):
    liner_fit = LinearRegression()
    liner_fit.fit(np.array(y_true).reshape(-1, 1), np.array(y_predictions).reshape(-1, 1))
    M = liner_fit.coef_[0][0]
    B = liner_fit.intercept_[0]
    r2 = np.corrcoef(np.array(y_true), np.array(y_predictions))[0, 1]
    return M, B, r2


def evaluate_and_plot(x_data, y_data, model, data_description, factored=False, show_ANN=False, show_AISC=False,
                      show_ACI=False):
    x_data = x_data.iloc[:, :6]  # TODO find why this function crashed when it get called mutable items
    print(f"+++++++++++++ {data_description} +++++++++++++")
    if factored:
        y_predictions_ann = model.predict(x_data) * 0.75
    else:
        y_predictions_ann = model.predict(x_data)

    y_predictions_ann = y_predictions_ann.ravel()

    scaler = load_scaler()
    x_denormalized = denormalize_data(x_data, scaler)

    y_predictions_aisc = predict_aisc(x_denormalized, factored=factored)
    y_predictions_aci = predict_aci(x_denormalized, factored=factored)

    plt.figure(figsize=(8, 8))
    ax = plt.gca()

    ax.set_axisbelow(True)
    ax.grid(True, which='both', linestyle=':', linewidth=0.8, color='gray', alpha=0.9)
    ax.minorticks_on()
    ax.grid(True, which='minor', linestyle=':', linewidth=0.5, color='gray', alpha=0.2)

    ax.plot([0, 9000], [0, 9000], color='#2ec27eff', linestyle='-', linewidth=1, label='Predication = Experimental',
            alpha=.75)

    if show_AISC:
        plot_predictions(y_data, y_predictions_aisc, 'AISC calculation', '^', 'blue', 'AISC')

    if show_ACI:
        plot_predictions(y_data, y_predictions_aci, 'Hand calculation', 'v', 'red', 'Hand')

    if show_ANN:
        plot_predictions(y_data, y_predictions_ann, 'ANN Prediction', 'o', 'orange', 'ANN')

    ax.legend()
    ax.set_xlabel("Experimental value (KN)")
    ax.set_ylabel('Predicted value (KN)')
    ax.set_title(data_description + " vs Predictions")
    ax.set_xlim(0, 9000)
    ax.set_ylim(0, 9000)
    plt.show()
