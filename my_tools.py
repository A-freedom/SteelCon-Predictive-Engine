import tensorflow as tf
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
# Define custom metric function
def std_ep(y_true, y_pred):
    error_percentage = (y_true - y_pred) / y_true *100
    return tf.keras.backend.std(error_percentage)

def evaluate_and_plot(X, y, model, data_descraiption):
    model.evaluate(X, y)
    y_pred = model.predict(X)
    y_pred = [i[0] for i in y_pred]
    errors = (y_pred-y)/y *100
    print(pd.DataFrame(errors).describe())

    min_val = min(np.min(y), np.min(y_pred))
    max_val = max(np.max(y), np.max(y_pred))
    plt.xlim(min_val, max_val)
    plt.ylim(min_val, max_val)

    plt.gca().set_aspect('equal', adjustable='box')
    plt.scatter(y, y_pred, marker='o', s=5)
    
    plt.xlabel(data_descraiption)
    plt.ylabel('preducation')
    plt.title(data_descraiption + " vs preducations")
    plt.show()