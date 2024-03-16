import pandas as pd

# Read CSV file into a Pandas DataFrame
df = pd.read_csv('DATA/AISC-R_HSS-design-tables.csv')
pd.set_option('display.max_columns', None)

# Function to filter DataFrame based on user input criteria
def filter_data(df, criteria):
    filtered_df = df.copy()
    for column, value in criteria.items():
        if value['condition'] == 'less':
            filtered_df = filtered_df[filtered_df[column] < value['value']]
        elif value['condition'] == 'more':
            filtered_df = filtered_df[filtered_df[column] > value['value']]
        elif value['condition'] == 'between':
            filtered_df = filtered_df[(filtered_df[column] >= value['min']) & (filtered_df[column] <= value['max'])]
        elif value['condition'] == 'equal':
            filtered_df = filtered_df[(filtered_df[column] == value['value'])]
    return filtered_df


# Example criteria (replace with user input)
criteria = {
    'L (mm)': {'condition': 'equal', 'value': 3500},
    'Pno ANN (kN)': {'condition': 'between', 'min': 4000, 'max': 4500},
    'h (mm)': {'condition': 'equal', 'value': 305},

}

# Filter the DataFrame based on criteria
filtered_df = filter_data(df, criteria)

# Display filtered results
print(filtered_df.head(6))
