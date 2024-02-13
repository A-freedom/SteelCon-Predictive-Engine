from sklearn.linear_model import LinearRegression
import tensorflow as tf
import pandas as pd
import matplotlib.pyplot as plot
import numpy as np
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error


# Define custom metric function
def std_ep(y_true, y_predictions):
    error_percentage = (y_true - y_predictions) / y_true * 100
    return tf.keras.backend.std(error_percentage)


def evaluate_and_plot(X, y, model, data_description):
    # Predictions
    y_predictions = model.predict(X)
    y_predictions = [i[0] for i in y_predictions]

    # Linear regression

    reg = LinearRegression().fit(y.values.reshape(-1, 1), np.array(y))
    slope = reg.coef_[0]
    intercept = reg.intercept_
    # Plot the regression line
    plot.plot(y, slope * y + intercept, color='red', linestyle='-', linewidth=1.5)

    # Scatter plot
    plot.scatter(y, y_predictions, marker='o', s=5,)


    # Labels and title
    plot.xlabel(data_description)
    plot.ylabel('Prediction')
    plot.title(data_description + " vs Predictions")

    # Adjust plot limits
    min_val = min(np.min(y), np.min(y_predictions))
    max_val = max(np.max(y), np.max(y_predictions))
    plot.xlim(min_val, max_val)
    plot.ylim(min_val, max_val)
    plot.show()

    # Calculate errors
    errors = (y_predictions - y) / y * 100
    df_error = pd.DataFrame({"error statistics": errors})

    sns.kdeplot(df_error.sort_values("error statistics"), fill=True)
    plot.gca().set_title("error distrubation for" + data_description)
    plot.show()

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
