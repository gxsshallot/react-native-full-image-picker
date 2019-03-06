# react-native-full-image-picker

[![npm version](https://img.shields.io/npm/v/react-native-full-image-picker.svg?style=flat)](https://www.npmjs.com/package/react-native-full-image-picker)
[![Build Status](https://travis-ci.org/gaoxiaosong/react-native-full-image-picker.svg?branch=master)](https://travis-ci.org/gaoxiaosong/react-native-full-image-picker)

[中文说明](https://www.jianshu.com/p/4f7296753013)

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

**NOTICE**: This library has no native code for iOS and Android. But you should also install native code of these libraries:

* [CameraRoll](https://facebook.github.io/react-native/docs/cameraroll): Used to get all photos in camera roll or photo library.
* [react-native-camera](https://github.com/react-native-community/react-native-camera): Used to show camera in view.
* [react-native-video](https://github.com/react-native-community/react-native-video): Used to preview the video.
* [react-native-fs](https://github.com/itinance/react-native-fs): Used to copy generated photo or video to a temporary place.

## Usage

First import in the file:

```jsx
import * as ImagePicker from 'react-native-full-image-picker';
```

It has three method:

* `ImagePicker.getCamera(options)`: Take photo from camera. (Camera Mode)
* `ImagePicker.getVideo(options)`: Video recording. (Video Mode)
* `ImagePicker.getAlbum(options)`: Select photo or video from photo library. (Photo Mode)

`options` is a object with these settings:

* `callback: (data: any[]) => void`: Callback method with photo or video array. `data` is an uri array of photo or video. Do not use `Alert` in this callback method.
* `maxSize?: number`: The maximum number of photo count. Valid in camera or photo library mode.
* `sideType?: RNCamera.Constants.Type`: Side of camera, back or front. Valid in camera or video.
* `pictureOptions?: RNCamera.PictureOptions`: The options of RNCamera.takePictureAsync(PictureOptions)
* `recordingOptions?: RNCamera.RecordingOptions`: The options of RNCamera.recordAsync(RecordingOptions)
* `flashMode?: RNCamera.Constants.FlashMode`: Flash mode. Valid in camera or video.

You can use [react-native-general-actionsheet](https://github.com/gaoxiaosong/react-native-general-actionsheet) to show `ActionSheet` by same API and UI with `ActionSheetIOS`.

## Change Default Property

You can import page and change `defaultProps` to modify settings globally:

```jsx
import * as ImagePicker from 'react-native-full-image-picker';

ImagePicker.XXX.defaultProps.yyy = ...;
```

The `XXX` is the export items of library. Following is the detail.

### PhotoModalPage

This is the outter navigator for all modes. You can change these properties of `defaultProps`:

| Name | Type | Description |
| :-: | :-: | :- |
| okLabel | string | OK button text |
| cancelLabel | string | Cancel button text |
| deleteLabel | string | Delete button text
| useVideoLabel | string | UseVideo button text |
| usePhotoLabel | string | UsePhoto button text |
| previewLabel | string | Preview button text |
| choosePhotoTitle | string | ChoosePhoto page title |
| maxSizeChooseAlert | (num: number) => string | Max size limit alert message when choosing photos |
| maxSizeTakeAlert | (num: number) => string | Max size limit alert message when taking photos from camera |
| supportedOrientations | string[] | Supported orientations. Default is landscape and portrait |

### CameraView

This is page for taking photos from camera or recording video. You can change these properties of `defaultProps`:

| Name | Type | Description |
| :-: | :-: | :- |
| maxSize | number | Default max number limit |
| sideType | RNCamera.Constants.Type | Camera side type. Default is `back` |
| flashMode | RNCamera.Constants.FlashMode | Flash mode. Default is `off` |

### AlbumListView

This is page for selecting photo from photo library. You can change these properties of `defaultProps`:

| Name | Type | Description |
| :-: | :-: | :- |
| maxSize | number | Default max number limit |
| autoConvertPath | boolean | Auto copy photo or not to convert file path to standard file path. Default is `false` |
| assetType | string | Asset type. Please see [CameraRoll Docs](https://facebook.github.io/react-native/docs/cameraroll) |
| groupTypes | string | Group type. Please see [CameraRoll Docs](https://facebook.github.io/react-native/docs/cameraroll) |