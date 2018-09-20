# react-native-full-image-picker

[实际截图](resource/ScreenShot.md)

这是一个React Native的UI组件，包括一个相机视图和一个相册选择视图. 你可以拍照、录像或者从相册选择图片.

## 安装

使用Yarn安装:

```shell
yarn add react-native-full-image-picker
```

使用npm安装:

```shell
npm install --save react-native-full-image-picker
```

需要安装如下库:

* [CameraRoll](https://facebook.github.io/react-native/docs/cameraroll)
* [react-native-camera](https://github.com/react-native-community/react-native-camera)
* [react-native-video](https://github.com/react-native-community/react-native-video)

并且设置它们，使得在iOS和Android下可用.

## 使用

首先在文件中导入:

```jsx
import * as ImagePicker from 'react-native-full-image-picker';
```

## 样例工程

你可以使用如下步骤来打开样例工程：

1. `cd example`.
2. 使用`yarn`或`npm install`安装模块。
3. 运行`npm run bundle:ios`或`npm run bundle:android`打包。
4. 在一个单独的终端中运行`npm start`。
5. 使用`Xcode`或`Android Studio`打开`example/ios`或`example/android`中的工程。
6. 运行工程。

## 参考

请参照这个仓库的说明: [react-native-items](https://github.com/gaoxiaosong/react-native-items/blob/master/README-zh_CN.md).