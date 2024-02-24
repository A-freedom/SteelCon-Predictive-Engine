import 'package:flutter/material.dart';
import 'constants.dart';
import 'prediction_form.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: kAppTitle,
      theme: ThemeData.light(useMaterial3: true), // Enable Material 3
      home: const PredictionForm(),
    );
  }
}