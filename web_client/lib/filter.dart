// filter.dart
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
    _valueController = TextEditingController();
    _lowerLimitController = TextEditingController();
    _upperLimitController = TextEditingController();
    _formKey = GlobalKey<FormState>();
    // Initialize text controllers with current values
    // if (widget.filter.selectedFilterType != 'Between') {
    //   _valueController.text = widget.filter.value.toString();
    // } else {
    //   _lowerLimitController.text = widget.filter.lowerLimit.toString();
    //   _upperLimitController.text = widget.filter.upperLimit.toString();
    // }
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
    Future<void> update() async {
      if (!_formKey.currentState!.validate()) return;
      Map<String, dynamic> jsonFilters = {};
      for (var filter
          in Provider.of<FilterManager>(context, listen: false).filters) {
        jsonFilters.addAll(filter.toJson());
      }
      PredictionService predictionService = PredictionService();
      String? result = await predictionService.designRHSS(jsonFilters);
      setState(() {
        if (result != null) {
          Provider.of<JsonManager>(context, listen: false)
              .setJson(jsonDecode(result));
        }
      });
    }

    // const textSize = 12.0;
    final items = Provider.of<FilterManager>(context)
        .columns
        .where((column) => !Provider.of<FilterManager>(context)
            .filters
            .any((filter) => filter.selectedColumn == column))
        .toList()
      ..add(widget.filter.selectedColumn);

    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Theme.of(context).textTheme.displayLarge!.color!)
      ),
      padding: const EdgeInsets.all(8.0),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  flex: 4,
                  child: DropdownButtonFormField<String>(
                    value: widget.filter.selectedColumn,
                    items: items.map<DropdownMenuItem<String>>((column) {
                      return DropdownMenuItem<String>(
                        value: column,
                        child: Text(
                          column,
                          // style: const TextStyle(fontSize: textSize),
                        ),
                      );
                    }).toList(),
                    onChanged: (newValue) {
                      setState(() {
                        widget.filter.selectedColumn = newValue!;
                        update();
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
                        update();
                      });
                    },
                    items: ['More', 'Less', 'Equal', 'Between']
                        .map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(
                          value,
                        ),
                      );
                    }).toList(),
                  ),
                ),
                if (widget.filter.showDeleteButton)
                  IconButton(
                    onPressed: () {
                      setState(() {
                        widget.onDelete();
                        update();
                      });
                    },
                    icon: const Icon(
                      Icons.delete,
                      size: 15,
                      color: Colors.redAccent,
                    ),
                  ),
              ],
            ),
            if (widget.filter.selectedFilterType != 'Between')
              TextFormField(
                controller: _valueController,
                onEditingComplete: () {
                  widget.filter.value = double.tryParse(_valueController.text)!;
                  update();
                },
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Value',
                ),
                validator: (value) => inputChecker(value, 0, double.infinity),
              ),
            if (widget.filter.selectedFilterType == 'Between') ...[
              Row(
                children: [
                  Expanded(
                    flex: 4,
                    child: TextFormField(
                      controller: _lowerLimitController,
                      onEditingComplete: () {
                        widget.filter.lowerLimit =
                            double.tryParse(_lowerLimitController.text) ?? 0.0;
                        update();
                      },
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'Lower Limit',
                      ),
                      validator: (value) =>
                          inputChecker(value, 0, double.infinity),
                    ),
                  ),
                  const SizedBox(width: 8.0),
                  Expanded(
                    flex: 4,
                    child: TextFormField(
                      controller: _upperLimitController,
                      onEditingComplete: () {
                        widget.filter.upperLimit =
                            double.tryParse(_upperLimitController.text) ?? 0.0;
                        update();
                      },
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'Upper Limit',
                      ),
                      validator: (value) =>
                          inputChecker(value, 0, double.infinity),
                    ),
                  ),
                ],
              )
            ],
          ],
        ),
      ),
    );
  }
}
