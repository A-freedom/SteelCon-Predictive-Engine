import numpy as np
from sklearn.neighbors import LocalOutlierFactor
from scipy.spatial.distance import cdist


def distance_filter(df):
    # Define a function to calculate the Euclidean distance between two 6-dimensional vectors

    # Define a threshold for the distance between 6-dimensional X values
    distance_threshold = 0.02  # Adjust this threshold based on your data and requirements

    # Extract the 6-dimensional X values from the DataFrame
    X = df.iloc[:, :7].values

    ary = cdist(X, X, metric='euclidean')

    return df[~np.tril(ary < distance_threshold, k=-1).any(1)]


def outlier_filter(df):
    # Assuming X_columns are the columns containing your features
    X = df.iloc[:, :7].values

    # Create an instance of the LOF algorithm
    lof = LocalOutlierFactor(n_neighbors=2)  # Adjust parameters as needed

    # Fit the LOF model to your data
    lof.fit(X)

    # Predict the outlier scores for each data point
    # Negative scores indicate outliers, with lower scores indicating higher outlier likelihood
    outlier_scores = lof.negative_outlier_factor_

    # Set a threshold for outlier scores
    threshold = -1.2  # Adjust as needed

    # Find indices of rows with outlier scores below the threshold
    outlier_indices = outlier_scores < threshold

    # Remove rows with outlier scores below the threshold from the DataFrame
    filtered_df = df[~outlier_indices]

    return filtered_df
