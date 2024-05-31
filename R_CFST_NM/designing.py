import pandas as pd

df = pd.read_csv('DATA/AISC-R_HSS-design-tables.csv')


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
