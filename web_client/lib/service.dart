// service.dart
import 'dart:convert';
import 'dart:html';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class PredictionService {
  // The URL of the backend server that hosts the ANN model
  final String _baseUrlPredict = '${getUrl()}/predict_R_CFST';
  final String _baseUrlDesign = '${getUrl()}/design_R_CFST';
  // final String _baseUrlPredict = 'http://127.0.0.1:8080/predict_R_CFST';
  // final String _baseUrlDesign = 'http://127.0.0.1:8080/design_R_CFST';

  // A method that takes the input parameters and returns the predicted compressive strength
  Future<String> predictRHSS(
      double b, double h, double t, double l, double fy, double fc) async {
    var url = Uri.parse(_baseUrlPredict);

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
      return response.body.replaceAll("'", '"');
    } else {
      return ('Error ${response.statusCode}.');
    }
  }


  Future<String?> designRHSS(Map<String, dynamic> jsonFilters) async {
    print(_baseUrlDesign);
    // Convert jsonFilters to JSON string
    String jsonString = jsonEncode(jsonFilters);

    // Send a POST request with JSON body
    http.Response response = await http.post(
      Uri.parse(_baseUrlDesign),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonString,
    );

    // Check response status code
    if (response.statusCode == 200) {
      return response.body;
    } else {
      if (kDebugMode) {
        print('Failed to send request: ${response.statusCode}');
      }
      return null;
    }
  }

}



String getUrl() {
  Uri uri = Uri.parse(window.location.href);

  // Extracting scheme, host, and port
  String scheme = uri.scheme;
  String host = uri.host;
  int port = uri.port;

  // Constructing the output URL
  String outputUrl = "$scheme://$host";
  outputUrl += ":$port";

  return outputUrl;
}
