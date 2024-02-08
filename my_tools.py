import tensorflow as tf
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

# Define custom metric function
def std_ep(y_true, y_pred):
    error_percentage = (y_true - y_pred) / y_true *100
    return tf.keras.backend.std(error_percentage)

import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

def evaluate_and_plot(X, y, model, data_description):    
    # Predictions
    y_pred = model.predict(X)
    y_pred = [i[0] for i in y_pred]
    
    # Linear regression
    # reg = LinearRegression().fit(y.reshape(-1, 1), y_pred)
    # slope = reg.coef_[0]
    # intercept = reg.intercept_

    # Scatter plot
    plt.scatter(y, y_pred, marker='o', s=5)
    
    # Plot the regression line
    # plt.plot(y, slope*y + intercept, color='red', linestyle='-', linewidth=1)

    # Equation of the line
    # equation = f'y = {slope:.2f}x + {intercept:.2f}'
    # plt.text(0.5, 0.1, equation, fontsize=12, transform=plt.gca().transAxes)
    
    # Labels and title
    plt.xlabel(data_description)
    plt.ylabel('Prediction')
    plt.title(data_description + " vs Predictions")
    
    # Adjust plot limits
    min_val = min(np.min(y), np.min(y_pred))
    max_val = max(np.max(y), np.max(y_pred))
    plt.xlim(min_val, max_val)
    plt.ylim(min_val, max_val)
    plt.show()
    
    # Calculate errors
    errors = (y_pred - y) / y * 100
    df_error = pd.DataFrame({"error statistics":errors})
    print(df_error.describe())
    # Calculate the Pearson correlation coefficient
    r = np.corrcoef(y, y_pred)[0, 1]
    print("Pearson correlation coefficient (r):", r)
    sns.kdeplot(df_error.sort_values("error statistics"), shade=True)
    plt.gca().set_title("error distrubation for"+data_description)
    plt.show()
    
