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

* [CameraRoll](https://reactnative.cn/docs/cameraroll/)
* [react-native-camera](https://github.com/react-native-community/react-native-camera)
* [react-native-video](https://github.com/react-native-community/react-native-video)

并且设置它们，使得在iOS和Android下可用.

## 使用

首先在文件中导入:

```jsx
import * as ImagePicker from 'react-native-full-image-picker';
```

它有三个方法:

* `ImagePicker.getCamera(options)`: 拍照.
* `ImagePicker.getVideo(options)`: 录像.
* `ImagePicker.getAlbum(options)`: 从相册选择.

`options`是一个有如下属性的对象:

* `callback: (data: any[]) => void`: 返回照片或视频数组的回调方法. 不要在其中使用`Alert`.
* `maxSize?: number`: 照片数量的最大值. 在拍照或录像时生效.
* `sideType?: RNCamera.Constants.Type`: 相机摄像头的类型, 后置或前置. 在拍照或录像时生效.
* `flashMode?: RNCamera.Constants.FlashMode`: 闪光灯模式. 在拍照或录像时生效.

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