// main.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'analysesPage.dart';
import 'designPage.dart';
import 'filter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context)=>FilterManager())
      ],
      child: MaterialApp(
        title: 'ConSteel',
        theme: ThemeData.dark(useMaterial3: true), // Enable Material 3
        initialRoute: '/AnalysesPage',
        routes: {
          '/AnalysesPage': (context) => const AnalysesPage(),
          '/DesignPage': (context) => const DesignPage(),
        },
      ),
    );
  }
}
