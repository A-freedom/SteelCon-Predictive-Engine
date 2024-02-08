import numpy as np

def distance_filter(df):
    # Define a function to calculate the Euclidean distance between two 6-dimensional vectors
    def euclidean_distance(x1, x2):
        return np.sqrt(np.sum((x1 - x2) ** 2))

    # Define a threshold for the distance between 6-dimensional X values
    distance_threshold = 0.01  # Adjust this threshold based on your data and requirements

    # Extract the 6-dimensional X values from the DataFrame
    x_values = df.iloc[:, :6].values

    # Calculate pairwise distances using vectorized operations
    distances = np.sqrt(np.sum((x_values[:, np.newaxis] - x_values) ** 2, axis=-1))

    # Set the diagonal elements (distance to itself) to a large value to exclude them
    np.fill_diagonal(distances, np.inf)

    # Find rows where the distance between 6-dimensional X values is below the threshold
    close_rows = np.where((distances < distance_threshold) & (distances > 0))

    # Filter the data based on the distance threshold
    filtered_indices = np.setdiff1d(np.arange(len(df)), close_rows[0])
    filtered_df = df.iloc[filtered_indices]

    return filtered_df

# Now, filtered_df contains the DataFrame with rows removed where 6-dimensional X values are close
