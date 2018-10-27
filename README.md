# react-native-full-image-picker

[![npm version](https://img.shields.io/npm/v/react-native-full-image-picker.svg?style=flat)](https://www.npmjs.com/package/react-native-full-image-picker)

It is a React-Native UI component including a camera view and an album selection view. You can take photos, take video recording or select photo from photo library.

## ScreenShots

### iPhone 6 Plus

<p float="left">

<img src="/resource/Home-i.png" width="22%">

<img src="/resource/Camera-Single-i.png" width="22%">

<img src="/resource/Camera-Multi-i.png" width="22%">

<img src="/resource/Preview-i.png" width="22%">

</p>

<p float="left">

<img src="/resource/Album-List-i.png" width="22%">

<img src="/resource/Album-Multi-i.png" width="22%">

<img src="/resource/Video-i.png" width="22%">

<img src="/resource/Video-Preview-i.png" width="22%">

</p>

### Android

<p float="left">

<img src="/resource/Home-A.jpg" width="22%">

<img src="/resource/Camera-Single-A.jpg" width="22%">

<img src="/resource/Camera-Multi-A.jpg" width="22%">

<img src="/resource/Preview-A.jpg" width="22%">

</p>

<p float="left">

<img src="/resource/Album-List-A.jpg" width="22%">

<img src="/resource/Album-Multi-A.jpg" width="22%">

<img src="/resource/Video-A.jpg" width="22%">

<img src="/resource/Video-Preview-A.jpg" width="22%">

</p>

## Install

Install by Yarn:

```shell
yarn add react-native-full-image-picker
```

Install by NPM:

```shell
npm install --save react-native-full-image-picker
```

You should install these libraries:

* [CameraRoll](https://facebook.github.io/react-native/docs/cameraroll)
* [react-native-camera](https://github.com/react-native-community/react-native-camera)
* [react-native-video](https://github.com/react-native-community/react-native-video)

And make them available in iOS and Android.

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

## Example Project

You can open the example project by following steps:

1. `cd example`.
1. Use `yarn` or `npm install` to install the modules.
1. Run `npm run bundle:ios` or `npm run bundle:android` to bundle the package.
1. Run `npm start` in a seperate terminal.
1. For iOS, you should run `pod install` in `ios` directory.
1. Run the project.