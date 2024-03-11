# %%
import os

import tensorflow as tf

from data_preprocessor import DataPreprocessor

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
from my_tools import evaluate_and_plot

if __name__ == '__main__':
    data_preprocessor = DataPreprocessor()
    tf.random.set_seed(data_preprocessor.random_seed)
    loaded_model = tf.keras.models.load_model('model_work/R_CFST_NM/my_model/best_model.h5')

    X_train, X_test, y_train, y_test, X, y = data_preprocessor.get_training_and_testing_data()

    print('+++++ model evaluate +++++')
    # loaded_model.evaluate(X_test, y_test)

    # evaluate_and_plot(X_test, y_test, loaded_model, ' test data without factors')
    evaluate_and_plot(X, y, loaded_model, ' All data without factors')



# %%
