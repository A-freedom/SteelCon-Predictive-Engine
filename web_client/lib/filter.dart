import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'service.dart';
import 'tools.dart';
import 'dataStructure.dart';

class FilterItem extends StatefulWidget {
  final Filter filter;
  final VoidCallback onDelete;

  const FilterItem({super.key, required this.filter, required this.onDelete});

  @override
  _FilterItemState createState() => _FilterItemState();
}

class _FilterItemState extends State<FilterItem> {
  late TextEditingController _valueController;
  late TextEditingController _lowerLimitController;
  late TextEditingController _upperLimitController;
  late GlobalKey<FormState> _formKey;

  @override
  void initState() {
    super.initState();
    _valueController = TextEditingController(text: widget.filter.value == 0 ? '' : widget.filter.value.toString());
    _lowerLimitController = TextEditingController(text: widget.filter.lowerLimit == 0 ? '' : widget.filter.lowerLimit.toString());
    _upperLimitController = TextEditingController(text: widget.filter.upperLimit == 0 ? '' : widget.filter.upperLimit.toString());
    _formKey = GlobalKey<FormState>();
  }

  @override
  void dispose() {
    _valueController.dispose();
    _lowerLimitController.dispose();
    _upperLimitController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Theme.of(context).textTheme.displayLarge!.color!),
      ),
      padding: const EdgeInsets.all(8.0),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildFilterDropdowns(),
            const SizedBox(height: 8.0),
            _buildFilterTextFields(),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterDropdowns() {
    final items = Provider.of<FilterManager>(context)
        .columns
        .where((column) => !Provider.of<FilterManager>(context)
        .filters
        .any((filter) => filter.selectedColumn == column))
        .toList()
      ..add(widget.filter.selectedColumn);

    return Row(
      children: [
        Expanded(
          flex: 4,
          child: DropdownButtonFormField<String>(
            value: widget.filter.selectedColumn,
            items: items.map<DropdownMenuItem<String>>((column) {
              return DropdownMenuItem<String>(
                value: column,
                child: Text(column),
              );
            }).toList(),
            onChanged: (newValue) {
              setState(() {
                widget.filter.selectedColumn = newValue!;
                _submit();
              });
            },
          ),
        ),
        const SizedBox(width: 8.0),
        Expanded(
          flex: 4,
          child: DropdownButtonFormField<String>(
            decoration: const InputDecoration(),
            value: widget.filter.selectedFilterType,
            onChanged: (newValue) {
              setState(() {
                widget.filter.selectedFilterType = newValue!;
                _submit();
              });
            },
            items: ['More', 'Less', 'Equal', 'Between']
                .map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),
        ),
        if (widget.filter.showDeleteButton)
          IconButton(
            onPressed: () {
              setState(() {
                widget.onDelete();
                _submit();
              });
            },
            icon: const Icon(
              Icons.delete,
              size: 15,
              color: Colors.redAccent,
            ),
          ),
      ],
    );
  }

  Widget _buildFilterTextFields() {
    if (widget.filter.selectedFilterType != 'Between') {
      return TextFormField(
        controller: _valueController,
        onEditingComplete: () {
          widget.filter.value = double.tryParse(_valueController.text) ?? 0.0;
          _submit();
        },
        onChanged: (value) {
          _formKey.currentState!.validate();
          widget.filter.value = double.tryParse(value) ?? 0.0;
        },
        keyboardType: TextInputType.number,
        decoration: InputDecoration(
          hintText: widget.filter.selectedFilterType != 'Equal'
              ? '${widget.filter.selectedColumn} is ${widget.filter.selectedFilterType} than ..?'
              : '${widget.filter.selectedColumn} is ${widget.filter.selectedFilterType} to ..?',
          labelText: 'Enter Value',
        ),
        validator: (value) => inputChecker(value, 0, double.infinity),
      );
    } else {
      return Row(
        children: [
          Expanded(
            flex: 4,
            child: TextFormField(
              controller: _lowerLimitController,
              onEditingComplete: () {
                widget.filter.lowerLimit = double.tryParse(_lowerLimitController.text) ?? 0.0;
                _submit();
              },
              onChanged: (value) {
                _formKey.currentState!.validate();
                widget.filter.lowerLimit = double.tryParse(value) ?? 0.0;
              },
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                hintText: '${widget.filter.selectedColumn} is more than ..?',
                labelText: 'Lower Limit',
              ),
              validator: (value) => inputChecker(value, 0, double.infinity),
            ),
          ),
          const SizedBox(width: 8.0),
          Expanded(
            flex: 4,
            child: TextFormField(
              controller: _upperLimitController,
              onEditingComplete: () {
                widget.filter.upperLimit = double.tryParse(_upperLimitController.text) ?? 0.0;
                _submit();
              },
              onChanged: (value) {
                _formKey.currentState!.validate();
                widget.filter.upperLimit = double.tryParse(value) ?? 0.0;
              },
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                hintText: '${widget.filter.selectedColumn} is less than ..?',
                labelText: 'Upper Limit',
              ),
              validator: (value) => inputChecker(value, 0, double.infinity),
            ),
          ),
        ],
      );
    }
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    if (!mounted) return; // Check if the widget is still mounted before calling setState
    Map<String, dynamic> jsonFilters = {};
    for (var filter in Provider.of<FilterManager>(context, listen: false).filters) {
      jsonFilters.addAll(filter.toJson());
    }
    PredictionService predictionService = PredictionService();
    String? result = await predictionService.designRHSS(jsonFilters);
    if (!mounted) return; // Check again after the asynchronous operation
    setState(() {
      if (result != null) {
        Provider.of<JsonManager>(context, listen: false).setJson(jsonDecode(result));
      }
    });
  }
}
