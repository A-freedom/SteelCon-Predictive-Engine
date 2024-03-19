// filter.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class FilterItem extends StatefulWidget {
  final Filter filter;
  final VoidCallback onDelete;

  const FilterItem({Key? key, required this.filter, required this.onDelete})
      : super(key: key);

  @override
  _FilterItemState createState() => _FilterItemState();
}

class _FilterItemState extends State<FilterItem> {
  late TextEditingController _valueController;
  late TextEditingController _lowerLimitController;
  late TextEditingController _upperLimitController;

  @override
  void initState() {
    super.initState();
    _valueController = TextEditingController();
    _lowerLimitController = TextEditingController();
    _upperLimitController = TextEditingController();

    // Initialize text controllers with current values
    if (widget.filter.selectedFilterType != 'Between') {
      _valueController.text = widget.filter.value.toString();
    } else {
      _lowerLimitController.text = widget.filter.lowerLimit.toString();
      _upperLimitController.text = widget.filter.upperLimit.toString();
    }
  }

  @override
  void dispose() {
    // Dispose text controllers when they are no longer needed
    _valueController.dispose();
    _lowerLimitController.dispose();
    _upperLimitController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const textSize = 12.0;
    final items = Provider.of<FilterManager>(context)
        .columns
        .where((column) => !Provider.of<FilterManager>(context)
            .filters
            .any((filter) => filter.selectedColumn == column))
        .toList()
      ..add(widget.filter.selectedColumn);

    return Container(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: [
          Expanded(
            flex: 1,
            child: DropdownButtonFormField<String>(
              value: widget.filter.selectedColumn,
              items: items.map<DropdownMenuItem<String>>((column) {
                return DropdownMenuItem<String>(
                  value: column,
                  child: Text(
                    column,
                    style: const TextStyle(fontSize: textSize),
                  ),
                );
              }).toList(),
              onChanged: (newValue) {
                setState(() {
                  widget.filter.selectedColumn = newValue!;
                });
              },
            ),
          ),
          Expanded(
            flex: 4,
            child: Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<String>(
                    decoration:const InputDecoration(labelStyle: TextStyle(fontSize: textSize)),
                    value: widget.filter.selectedFilterType,
                    onChanged: (newValue) {
                      setState(() {
                        widget.filter.selectedFilterType = newValue!;
                      });
                    },
                    items: ['More', 'Less', 'Equal', 'Between']
                        .map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(
                          value,
                          style: const TextStyle(fontSize: textSize),
                        ),
                      );
                    }).toList(),
                  ),
                ),
                if (widget.filter.selectedFilterType != 'Between')
                  Expanded(
                    child: TextField(
                      style: const TextStyle(fontSize: textSize),
                      controller: _valueController,
                      onChanged: (value) {
                        widget.filter.value = double.tryParse(value) ?? 0.0;
                      },
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelStyle: TextStyle(fontSize: textSize),
                        labelText: 'Value',
                      ),
                    ),
                  ),
                if (widget.filter.selectedFilterType == 'Between')
                  Expanded(
                    child: TextField(
                      style: const TextStyle(fontSize: textSize),
                      controller: _lowerLimitController,
                      onChanged: (value) {
                        widget.filter.lowerLimit =
                            double.tryParse(value) ?? 0.0;
                      },
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelStyle: TextStyle(fontSize: textSize),
                        labelText: 'Lower Limit',
                      ),
                    ),
                  ),
                if (widget.filter.selectedFilterType == 'Between')
                  const SizedBox(width: 8.0),
                if (widget.filter.selectedFilterType == 'Between')
                  Expanded(
                    child: TextField(
                      style: const TextStyle(fontSize: textSize),
                      controller: _upperLimitController,
                      onChanged: (value) {
                        widget.filter.upperLimit =
                            double.tryParse(value) ?? 0.0;
                      },
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelStyle: TextStyle(fontSize: textSize),
                        labelText: 'Upper Limit',
                      ),
                    ),
                  ),
                IconButton(
                  onPressed: widget.onDelete,
                  icon: const Icon(Icons.delete,size: 15,),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}

class Filter extends ChangeNotifier {
  String _selectedColumn;
  String _selectedFilterType = 'More';
  double _value = 0.0; // For Max, Min, and Equal filters
  double _lowerLimit = 0.0; // For Between filter
  double _upperLimit = 0.0; // For Between filter

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
  final List<Filter> _filters = [];

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
