# %%
from data_preprocessor import DataPreprocessor

data_preprocessor = DataPreprocessor(denormalize_data=True)
df = data_preprocessor.df
import seaborn as sns
import matplotlib.pyplot as plt

# %%
dete_describe = df.describe()
# save file
dete_describe.to_csv('DATA/statics_analysis/describe_R_CFST_Me.csv')

# %%
# Calculate correlation matrix
corr_matrix = df.corr()

# Replace lower triangle values (including diagonal) with NaN
# corr_matrix = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))

# Drop rows and columns with NaN values
# corr_matrix = corr_matrix.dropna(axis=0, how='all').dropna(axis=1, how='all')

# save file
print(corr_matrix)
corr_matrix.to_csv('DATA/statics_analysis/corr_matrix.csv')

plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt=".4f", linewidths=0.5)
plt.title('Correlation Heatmap')
plt.show()
# %%
