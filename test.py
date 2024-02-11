def filter_list(list1, list2):
    # Create a set to store indices that need to be removed
    indices_to_remove = set()

    # Iterate through the first list
    for i in range(len(list1)):
        # Check if the index has already been marked for removal
        if i in indices_to_remove:
            continue

        # Get the value at the current index in the first list
        value = list1[i]

        # Find matching indices in both lists
        matching_indices_list1 = [j for j, x in enumerate(list1) if (x == value or x == list2[i]) and not (j == i)]

        # Mark matching indices for removal
        indices_to_remove.update(matching_indices_list1)

    # Remove marked indices from the first list
    filtered_list = [x for i, x in enumerate(list1) if i not in indices_to_remove]

    return filtered_list

# Example usage
list1 = [0, 0, 1, 3, 3, 6, 8, 8]
list2 = [3, 8, 6, 0, 8, 1, 0, 3]


filtered_list = filter_list(list1, list2)
print(filtered_list)
