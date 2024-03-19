// tools.dart
import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';

String? inputChecker(value, double min, double max) {
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

class My_GNAV extends StatelessWidget {
  final int selectedIndex;

  const My_GNAV({Key? key, required this.selectedIndex}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GNav(
      selectedIndex: selectedIndex,
      gap: 8,
      activeColor: Colors.white,
      iconSize: 24,
      padding: const EdgeInsets.fromLTRB(30, 30, 30, 30),
      tabs: [
        GButton(
          icon: Icons.calculate,
          text: 'Analyses',
          onPressed: () {
            if (selectedIndex != 0) {
              Navigator.pushReplacementNamed(context, '/AnalysesPage');
            }
          },
        ),
        GButton(
          icon: Icons.architecture,
          text: 'Design',
          onPressed: () {
            if (selectedIndex != 1) {
              Navigator.pushReplacementNamed(context, '/DesignPage');
            }
          },
        ),
      ],
    );
  }
}

