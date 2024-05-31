# %%
import os
import tensorflow as tf

from data_preprocessor import DataPreprocessor

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
from my_tools import evaluate_and_plot

if __name__ == '__main__':
    data_preprocessor = DataPreprocessor()
    tf.random.set_seed(data_preprocessor.random_seed)
    loaded_model = tf.keras.models.load_model('R_CFST_NM/my_model/best_model.keras')

    X_train, X_test, y_train, y_test, X, y = data_preprocessor.get_training_and_testing_data()

    # plot testing ANN no factor
    evaluate_and_plot(X_test, y_test, loaded_model, 'Testing Data', factored=False, show_ANN=True)

    # plot training ANN no factor
    evaluate_and_plot(X_train, y_train, loaded_model, 'Training Data', factored=False, show_ANN=True)

    # plot testing AISC no factor
    evaluate_and_plot(X_test, y_test, loaded_model, 'Testing Data', factored=False, show_AISC=True)

    # plot testing AISC and ANN no factor
    evaluate_and_plot(X_test, y_test, loaded_model, 'Testing Data', factored=False, show_AISC=True,show_ANN=True)

    # plot all AISC no factor
    evaluate_and_plot(X, y, loaded_model, 'All Data', factored=False, show_AISC=True)

    # plot all AISC and ANN no factor
    evaluate_and_plot(X, y, loaded_model, 'All Data', factored=False, show_AISC=True,show_ANN=True)

    # # plot all ANN with factor
    evaluate_and_plot(X, y, loaded_model, 'All Data', factored=True, show_ANN=True)

    # plot all ANN and AISC with factor
    evaluate_and_plot(X, y, loaded_model, 'All Data', factored=True, show_ANN=True,show_AISC=True)

