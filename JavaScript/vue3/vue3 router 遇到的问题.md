## 遇到的问题

### 做动态路由时，页面出现嵌套

解决：包含子菜单的父级菜单不要构建component。

### 路由跳转时，地址栏重复追加，导致无法跳转

```javascript
// 前面要加 "/""
router.push('/'+menu.authUrl)
```
