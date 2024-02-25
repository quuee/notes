
```dart
import 'package:dio/dio.dart';
import 'package:flutter_chat/app/routes/app_pages.dart';
import 'package:flutter_chat/flavors/build_config.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart' as Getx;

class DioUtil {
  static final String baseUrl = BuildConfig.instance.config.baseUrl;

  //请求时间
  static const int connectTimeout = 30;
  //响应时间
  static const int receiveTimeout = 30;

  static const int sendTimeout = 30;

  late Dio _mDio;
  late BaseOptions options;

  static const String get = 'get';
  static const String post = 'post';
  static const String put = 'put';
  static const String patch = 'patch';
  static const String delete = 'delete';

  static final DioUtil _instance = DioUtil._();
  factory DioUtil() => _instance;

  static DioUtil get instance => DioUtil();

  DioUtil._() {
    /// 全局属性：请求前缀、连接超时时间、响应超时时间
    BaseOptions options = BaseOptions(
        baseUrl: baseUrl,
        connectTimeout: const Duration(seconds: connectTimeout),
        receiveTimeout: const Duration(seconds: receiveTimeout),
        sendTimeout: const Duration(seconds: sendTimeout),
        contentType: Headers.jsonContentType);

    _mDio = Dio(options);

    _mDio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (RequestOptions options, RequestInterceptorHandler handler) {
          // 如果你想完成请求并返回一些自定义数据，你可以使用 `handler.resolve(response)`。
          // 如果你想终止请求并触发一个错误，你可以使用 `handler.reject(error)`。

          String token = '';
          if (token != _mDio.options.headers['authorization']) {
            Map<String, dynamic> header = Map();
            header['Authorization'] = token;
            options.headers.addAll(header);
          }

          return handler.next(options);
        },
        onResponse: (Response response, ResponseInterceptorHandler handler) {
          // 如果你想终止请求并触发一个错误，你可以使用 `handler.reject(error)`。

          // 凭证过期
          if (response.data['code'] == 493) {
            // 可能多个请求 跳转多次
            Fluttertoast.showToast(msg: '登录已过期请重新登录');
            Getx.Get.offAllNamed(Routes.LOGIN);

            return;
          }

          return handler.next(response);
        },
        onError: (DioException e, ErrorInterceptorHandler handler) {
          // 如果你想完成请求并返回一些自定义数据，你可以使用 `handler.resolve(response)`。
          // _handleError(error);
          return handler.next(e);
        },
      ),
    );
    _mDio.interceptors.add(LogInterceptor(responseBody: true));
  }

  ///query参数是拼接到url问号后面的，data是在请求体里的，由于get方法没有请求体，所以只能接受query
  Future<Response<T>> request<T>(String url,
      {Map<String, dynamic>? params, dynamic data, Options? options}) async {
    Response<T> resp = await _mDio.request(url,
        data: data, //data是在请求体里的
        queryParameters: params, //query参数是拼接到url问号后面的
        options: options);
    return resp;
  }

  Future<void> download(
      {required String url,
      required String savePath,
      required onReceiveProgress,
      Options? options}) async {
    _mDio.download(url, savePath,
        onReceiveProgress: onReceiveProgress, options: options);
  }
}
```