import 'package:flutter/material.dart';

class Fonts {
  static const String raleway = 'Raleway';
// etc
}

class TextStyles {
  static const TextStyle raleway = TextStyle(fontFamily: Fonts.raleway,fontSize: 15);
  static TextStyle buttonText1 = const TextStyle(fontWeight: FontWeight.bold, fontSize: 14);
  static TextStyle buttonText2 = const TextStyle(fontWeight: FontWeight.normal, fontSize: 11);
  static TextStyle h1 = const TextStyle(fontWeight: FontWeight.bold, fontSize: 22);
  static TextStyle h2 = const TextStyle(fontWeight: FontWeight.bold, fontSize: 16);
  static TextStyle result = const TextStyle(fontSize: 30.0, fontWeight: FontWeight.bold, color: Color(0xFF5E35B1),
  );
  static TextStyle body1 = raleway.copyWith(color: const Color(0xFF5E35B1));
// etc
}

class MyColors {
  static const Color primary = Color(0xFF42A5F5);
  static const Color secondary = Color(0xFFEF5350);
  static const Color background = Color(0xFFF5F5F5);
// etc
}

const kAppTitle = 'SteelCon Predictive Engine';