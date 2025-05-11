### Base

```json
{
  // ===============================
  // 编辑器通用设置
  // ===============================
  "editor.tabSize": 2, // 设置缩进为 2 个空格（JS/TS/React/Vue 推荐）
  "editor.formatOnSave": true, // 保存时自动格式化代码
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always" // 保存时自动修复 ESLint 错误
  },
  "window.restoreWindows": "none",
  "editor.wordWrap": "on", // 自动换行，便于阅读长代码
  "editor.fontSize": 16, // 设置字体大小为 14px
  "editor.fontFamily": "Fira Code, Consolas, 'Courier New', monospace", // 使用等宽字体（推荐 Fira Code）
  "editor.fontLigatures": true, // 启用字体连字（需要支持连字的字体）
  // 快速跳转到定义时，优先使用工作区符号
  "editor.gotoLocation.multipleDefinitions": "goto",
  "editor.gotoLocation.multipleReferences": "goto",

  // 格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 默认使用Prettier格式化
  "prettier.bracketSameLine": false, // 将 JSX 标签的闭合括号放在新行
  "prettier.singleQuote": true, // 使用单引号而不是双引号
  "prettier.semi": false, // 不使用分号
  "prettier.trailingComma": "es5", // 在多行结构的最后一行添加尾随逗号

  // ===============================
  // 文件和工作区设置
  // ===============================
  "files.autoSave": "off", // 自动保存文件，延迟时间为默认值
  "files.trimTrailingWhitespace": true, // 保存时自动去除行尾多余的空格
  "files.insertFinalNewline": true, // 保存时在文件末尾插入一个空行
  "files.exclude": {
    "**/.git": true, // 隐藏 .git 文件夹
    "**/.DS_Store": true, // 隐藏 macOS 的 .DS_Store 文件
    "**/node_modules": true // 隐藏 node_modules 文件夹
  },
  "files.encoding": "utf8",
  // 在使用搜索功能时，将这些文件夹/文件排除在外
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/target": true,
    "**/logs": true
  },

  // 补全
  "editor.tabCompletion": "on",
  // 代码提示
  "editor.suggestSelection": "recentlyUsedByPrefix",

  // ===============================
  // TypeScript 和 JavaScript 设置
  // ===============================
  "typescript.updateImportsOnFileMove.enabled": "always", // 移动或重命名文件时更新导入路径
  "javascript.updateImportsOnFileMove.enabled": "always", // 同上，针对 JavaScript 文件
  // "typescript.preferences.importModuleSpecifier": "relative", // 使用相对路径导入模块
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true, // 在非空对象字面量的括号内添加空格
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true, // 同上，针对 JavaScript 文件
  // 禁用内置的 JavaScript 验证，改用 ESLint
  "javascript.validate.enable": false,

  // ===============================
  // React JSX TSX 设置
  // ===============================
  "emmet.includeLanguages": {
    "javascript": "javascriptreact", // 在 JavaScript 文件中启用 Emmet 对 JSX 的支持
    "typescript": "typescriptreact"
  },

  /**
   * vue
   */
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },

  /**
   * java
   */

  /**
   * python
   */

  /**
   * dart
   * flutter
   */

  // 优化终端体验
  "terminal.integrated.fontSize": 14, // 设置终端字体大小
  "terminal.integrated.fontFamily": "Consolas, 'Courier New', monospace" // 设置终端字体
}
```

## 插件

- Color Highlight

### JavaScript 和 TypeScript

- ESLint (dbaeumer.vscode-eslint)
  - 提供实时的 ESLint 检查和代码修复。
- Prettier - Code formatter (esbenp.prettier-vscode)
  - 统一代码格式化的工具，支持多种语言。
- Import Cost (wix.vscode-import-cost)
  - 显示每个模块的打包大小，帮助优化依赖。

### React 和 React Native

- Auto Rename Tag (formulahendry.auto-rename-tag)
  - 自动同步修改 HTML/XML 标签的开始和结束标签。
- ES7+ React/Redux/React-Native snippets (dsznajder.es7-react-js-snippets)
  - 提供 React、Redux 和 React Native 的代码片段，加速开发。
- React Native Tools (msjsdiag.vscode-react-native)
  - 提供 React Native 的调试和运行支持。

### Vue3

用官方的
