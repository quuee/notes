选择完图标加到购物车中，
下载代码
打开.zip包
将iconfont.ttf复制到项目中

```yaml

//flutter

flutter:
  uses-material-design: true
      - family: aliIconfont
      fonts:
        - asset: assets/fonts/iconfont.ttf
```

## 定义自己的icondata
```dart
import 'package:flutter/material.dart';

class AliIcons {
  ///mine
  static const IconData mine = IconData(
      0xe60d,
      fontFamily: 'aliIconfont',
      matchTextDirection: true
  );

  ///music
  static const IconData music = IconData(
      0xe60e,
      fontFamily: 'aliIconfont',
      matchTextDirection: true
  );
}
```
