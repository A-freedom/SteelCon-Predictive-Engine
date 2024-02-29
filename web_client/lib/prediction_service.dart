import 'dart:html';

import 'package:http/http.dart' as http;

class PredictionService {
  // The URL of the backend server that hosts the ANN model
  final String _baseUrl = '${window.location.href}predict';
  // A method that takes the input parameters and returns the predicted compressive strength
  Future<String> predict(
      double b, double h, double t, double l, double fy, double fc) async {
    var url = Uri.parse(_baseUrl);

    // Define the request body
    var requestBody = {
      'b': b.toString(),
      'h': h.toString(),
      't': t.toString(),
      'L': l.toString(),
      'fy': fy.toString(),
      'fc': fc.toString(),
    };

    // Make the POST request
    var response = await http.post(
      url,
      body: requestBody,
    );

    if (response.statusCode == 200) {
      return response.body;
    } else {
      return ('Error ${response.statusCode} .');
    }
  }
}
