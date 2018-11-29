# react-native-full-image-picker

[![npm version](https://img.shields.io/npm/v/react-native-full-image-picker.svg?style=flat)](https://www.npmjs.com/package/react-native-full-image-picker)

It is a react native UI component including a camera view and an album selection view. You can take photos, take video recording or select photo from photo library.

It supports:

* Take photos by camera.
* Video recording.
* Select photos from photo library.
* Safe area for iPhone X.
* Portrait and Landscape mode.
* Multiple selection or capture mode.
* Preview after capture or video recording.
* Maximum count of photos.

## ScreenShots

<p float="left">

<img src="/resource/camera.gif" width="25%">

<img src="/resource/album.gif" width="25%">

</p>

Same UI on Android.

## Install

Install by Yarn:

```shell
yarn add react-native-full-image-picker
```

Install by NPM:

```shell
npm install --save react-native-full-image-picker
```

You should also install native code of these libraries:

* [CameraRoll](https://facebook.github.io/react-native/docs/cameraroll)
* [react-native-camera](https://github.com/react-native-community/react-native-camera)
* [react-native-video](https://github.com/react-native-community/react-native-video)
* [react-native-fs](https://github.com/itinance/react-native-fs)

## Usage

First import in the file:

```jsx
import * as ImagePicker from 'react-native-full-image-picker';
```

It has three method:

* `ImagePicker.getCamera(options)`: Take photo.
* `ImagePicker.getVideo(options)`: Video recording.
* `ImagePicker.getAlbum(options)`: Select from photo library.

`options` is a object with these settings:

* `callback: (data: any[]) => void`: Callback method with photo or video array. Do not use `Alert` in it.
* `maxSize?: number`: The maximum number of photo count. Valid in camera or video.
* `sideType?: RNCamera.Constants.Type`: Side of camera, back or front. Valid in camera or video.
* `flashMode?: RNCamera.Constants.FlashMode`: Flash mode. Valid in camera or video.

You can use [react-native-general-actionsheet](https://github.com/gaoxiaosong/react-native-general-actionsheet) to show `ActionSheet` by same API and UI with `ActionSheetIOS`.

## Change Label

You can import page and change `defaultProps` to modify labels globally:

```jsx
import * as ImagePicker from 'react-native-full-image-picker';

ImagePicker.XXXPage.defaultProps.xxx = yyy;
ImagePicker.XXXView.defaultProps.xxx = yyy;
```

The `XXXPage` or `XXXView` is the export items of library. And you can see source code to modify its `defaultProps` value.