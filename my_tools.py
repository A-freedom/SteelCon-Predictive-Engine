import tensorflow as tf
import pandas as pd
import matplotlib.pyplot as plot
import numpy as np
import seaborn as sns


# Define custom metric function
def std_ep(y_true, y_predictions):
    error_percentage = (y_true - y_predictions) / y_true * 100
    return tf.keras.backend.std(error_percentage)


def evaluate_and_plot(X, y, model, data_description):
    # Predictions
    y_predications = model.predict(X)
    y_predications = [i[0] for i in y_predications]

    # Linear regression
    # reg = LinearRegression().fit(y.reshape(-1, 1), y_predications)
    # slope = reg.coef_[0]
    # intercept = reg.intercept_

    # Scatter plot
    plot.scatter(y, y_predications, marker='o', s=5)

    # Plot the regression line
    # plt.plot(y, slope*y + intercept, color='red', linestyle='-', linewidth=1)

    # Equation of the line
    # equation = f'y = {slope:.2f}x + {intercept:.2f}'
    # plt.text(0.5, 0.1, equation, fontsize=12, transform=plt.gca().transAxes)

    # Labels and title
    plot.xlabel(data_description)
    plot.ylabel('Prediction')
    plot.title(data_description + " vs Predictions")

    # Adjust plot limits
    min_val = min(np.min(y), np.min(y_predications))
    max_val = max(np.max(y), np.max(y_predications))
    plot.xlim(min_val, max_val)
    plot.ylim(min_val, max_val)
    plot.show()

    # Calculate errors
    errors = (y_predications - y) / y * 100
    df_error = pd.DataFrame({"error statistics": errors})
    print(df_error.describe())
    # Calculate the Pearson correlation coefficient
    r = np.corrcoef(y, y_predications)[0, 1]
    print("Pearson correlation coefficient (r):", r)
    sns.kdeplot(df_error.sort_values("error statistics"), shade=True)
    plot.gca().set_title("error distrubation for" + data_description)
    plot.show()
