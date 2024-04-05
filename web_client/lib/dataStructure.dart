  import 'package:flutter/cupertino.dart';

  class Filter extends ChangeNotifier {
    String _selectedColumn;
    String _selectedFilterType = 'More';
    double _value = 0.0; // For Max, Min, and Equal filters
    double _lowerLimit = 0.0; // For Between filter
    double _upperLimit = 0.0;

    var showDeleteButton = true; // For Between filter

    Filter({required String selectedColumn}) : _selectedColumn = selectedColumn;

    String get selectedColumn => _selectedColumn;

    set selectedColumn(String value) {
      _selectedColumn = value;
      notifyListeners();
    }

    String get selectedFilterType => _selectedFilterType;

    set selectedFilterType(String value) {
      _selectedFilterType = value;
      notifyListeners();
    }

    double get value => _value;

    set value(double newValue) {
      _value = newValue;
      notifyListeners();
    }

    double get lowerLimit => _lowerLimit;

    set lowerLimit(double newValue) {
      _lowerLimit = newValue;
      notifyListeners();
    }

    double get upperLimit => _upperLimit;

    set upperLimit(double newValue) {
      _upperLimit = newValue;
      notifyListeners();
    }

    Map<String, dynamic> toJson() {
      if (_selectedFilterType == 'Between') {
        return {
          _selectedColumn: {
            'condition': 'between',
            'min': _lowerLimit.toString(),
            'max': _upperLimit.toString(),
          }
        };
      } else if (_selectedFilterType == 'Equal') {
        return {
          _selectedColumn: {
            'condition': 'between',
            'min': (value * 0.98).toString(),
            'max': (value * 1.02).toString(),
          }
        };
      } else {
        return {
          _selectedColumn: {
            'condition': _selectedFilterType.toLowerCase(),
            'value': _value.toString(),
          }
        };
      }
    }
  }

  class FilterManager extends ChangeNotifier {
    final List<String> columns = [
      'W Kg/m',
      'L (mm)',
      'ΦP ANN (kN)',
      'h (mm)',
      'b (mm)',
      't (mm)',
      'fy (MPa)',
      'fc (MPa)',
    ];
    final List<Filter> _filters = [
      Filter(selectedColumn: 'L (mm)')..showDeleteButton = false,
      Filter(selectedColumn: 'ΦP ANN (kN)')..showDeleteButton = false
    ];

    List<Filter> get filters => _filters;

    void addFilter(Filter filter) {
      _filters.add(filter);
      notifyListeners();
    }

    void removeAt(int index) {
      _filters.removeAt(index);
      notifyListeners();
    }
  }

  class JsonManager extends ChangeNotifier {
    var _json = [];
    List get getJson => _json;
    void setJson(List json) {
      _json = json;
      notifyListeners();
    }
  }
