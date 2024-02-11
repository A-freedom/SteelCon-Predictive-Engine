#%%
from my_data import *
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
import numpy as np

X_train, X_test, y_train, y_test, X, y = get_traing_and_testing_data()

loaded_model = tf.keras.models.load_model('my_model/best_model.h5')

y_predications = loaded_model.predict(X)

scaler = MinMaxScaler()
normailzed_y_test = np.ravel(scaler.fit_transform(np.ravel(y).reshape(-1, 1)))
normailzed_y_predications = np.ravel(scaler.fit_transform(np.ravel(y_predications).reshape(-1, 1)))

mse = mean_squared_error(normailzed_y_test, normailzed_y_predications)
print("Mean Squared Error:", mse)