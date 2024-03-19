// analysesPage.dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:unnames/tools.dart';
import 'service.dart';

class AnalysesPage extends StatefulWidget {
  const AnalysesPage({super.key});

  @override
  _AnalysesPageState createState() => _AnalysesPageState();
}

class _AnalysesPageState extends State<AnalysesPage> {
  final _formKey = GlobalKey<FormState>();
  // final TextEditingController bController = TextEditingController(text: '200');
  // final TextEditingController hController = TextEditingController(text: '200');
  // final TextEditingController tController = TextEditingController(text: '5');
  // final TextEditingController lController = TextEditingController(text: '2000');
  // final TextEditingController fyController = TextEditingController(text: '400');
  // final TextEditingController fcController = TextEditingController(text: '30');

  final TextEditingController bController = TextEditingController();
  final TextEditingController hController = TextEditingController();
  final TextEditingController tController = TextEditingController();
  final TextEditingController lController = TextEditingController();
  final TextEditingController fyController = TextEditingController();
  final TextEditingController fcController = TextEditingController();
  Map<String, dynamic> predictionResult = {};

  @override
  Widget build(BuildContext context) {
    int _selectedIndex = 0;
    return Scaffold(
        appBar: AppBar(
          title: const Text('A N A L Y S E S'),
        ),
        body: Padding(
          padding: const EdgeInsets.all(20),
          child: Form(
            key: _formKey,
            child: ListView(
              children: [
                const Text(
                  'This is an Artificial Neural Network (ANN) developed by students at the University of Civil Engineering in Basra. It predicts the compressive strength of Rectangular Concrete-Filled Steel Tubes (R_CFST).',
                  // style: TextStyles.body1,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: bController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'b (mm)',
                    hintText: '40 < b < 360',
                  ),
                  validator: (value) => inputChecker(value, 40, 360),
                ),
                TextFormField(
                  controller: hController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'h (mm)',
                    hintText: '40 < h < 360',
                  ),
                  validator: (value) => inputChecker(value, 40, 360),
                ),
                TextFormField(
                  controller: tController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 't (mm)',
                    hintText: '0.7 < t < 15',
                  ),
                  validator: (value) => inputChecker(value, 0.7, 15),
                ),
                TextFormField(
                  controller: lController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'L (mm)',
                    hintText: '100 < L < 4500',
                  ),
                  validator: (value) => inputChecker(value, 100, 4500),
                ),
                TextFormField(
                  controller: fyController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'fy (MPa)',
                    hintText: '115 < fy < 835',
                  ),
                  validator: (value) => inputChecker(value, 115, 835),
                ),
                TextFormField(
                  controller: fcController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'fc (MPa)',
                    hintText: '10 < fc < 160',
                  ),
                  validator: (value) => inputChecker(value, 10, 160),
                ),
                const SizedBox(height: 30),
                FilledButton(
                    onPressed: () async {
                      if (_formKey.currentState!.validate()) {
                        double b = double.parse(bController.text);
                        double h = double.parse(hController.text);
                        double t = double.parse(tController.text);
                        double l = double.parse(lController.text);
                        double fy = double.parse(fyController.text);
                        double fc = double.parse(fcController.text);
                        PredictionService predictionService = PredictionService();
                        String result =
                        await predictionService.predictRHSS(b, h, t, l, fy, fc);
                        setState(() {
                          predictionResult = jsonDecode(result);
                        });
                      }
                    },
                    child: const Text('P R E D I C T')),
                const SizedBox(height: 20),
                // Conditionally render DataTable based on data availability
                if (predictionResult.isNotEmpty)
                  Center(
                    child: SizedBox(
                      width: double.infinity,
                      child: DataTable(
                        columns: const [
                          DataColumn(
                            label: Text(
                              'Method',
                            ),
                          ),
                          DataColumn(
                            label: Text(
                              'ΦPn',
                            ),
                          ),
                        ],
                        rows: resultRows(),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      bottomNavigationBar: My_GNAV(selectedIndex: _selectedIndex),



    );
  }

  List<DataRow> resultRows() {
    return predictionResult.entries.map((entry) {
      return DataRow(
        cells: [
          DataCell(Text(entry.key)),
          DataCell(Text('${entry.value} KN')),
        ],
      );
    }).toList();
  }
}
