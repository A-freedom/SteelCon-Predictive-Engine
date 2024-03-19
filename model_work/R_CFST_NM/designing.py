import pandas as pd

# Read CSV file into a Pandas DataFrame
df = pd.read_csv('DATA/AISC-R_HSS-design-tables.csv')


# Example criteria (replace with user input)
# criteria = {
#     'L (mm)': {'condition': 'equal', 'value': 3500},
#     'ΦP ANN (kN)': {'condition': 'between', 'min': 4000, 'max': 4500},
#     'h (mm)': {'condition': 'equal', 'value': 305},
# }

def get_design_tables(criteria):
    filtered_df = df.copy()
    for column, value in criteria.items():
        condition = value['condition']
        if condition == 'less':
            filtered_df = filtered_df[filtered_df[column] <= float(value['value'])]
        elif condition == 'more':
            filtered_df = filtered_df[filtered_df[column] >= float(value['value'])]
        elif condition == 'between':
            filtered_df = filtered_df[(filtered_df[column] >= float(value['min'])) & (filtered_df[column] <= float(value['max']))]
        elif condition == 'equal':
            filtered_df = filtered_df[filtered_df[column] == float(value['value'])]
    return filtered_df.head(30)
