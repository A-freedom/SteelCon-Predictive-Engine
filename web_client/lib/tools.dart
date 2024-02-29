String? inputChecker(value, double min, double max) {
  return null;
  if (value == null || value.isEmpty) {
    return 'Please enter a value';
  }
// Check if the input can be parsed to a double
  if (double.tryParse(value) == null) {
    return 'Please enter a valid number';
  }
// Check if the input is within the range
  double parsedValue = double.parse(value);
  if (parsedValue < min || parsedValue > max) {
    return 'Value must be between $min and $max';
  }
  return null;
}
