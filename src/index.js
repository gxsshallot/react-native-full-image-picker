import React from 'react';
import RootSiblings from 'react-native-general-siblings';
import PhotoPageType from './PageTypes';
import PhotoModalPage from './PhotoModalPage';

/**
 * --OPTIONS--
 * maxSize?: number. Camera or Video.
 * sideType?: RNCamera.Constants.Type. Camera or Video.
 * flashMode?: RNCamera.Constants.FlashMode. Camera or Video.
 * callback: (data: any[]) => void. Donot use Alert.
 */

export const getCamera = (options) => showImagePicker(PhotoPageType.camera, options);
export const getVideo = (options) => showImagePicker(PhotoPageType.video, options);
export const getAlbum = (options) => showImagePicker(PhotoPageType.album, options);

let sibling = null;

function showImagePicker(type, options) {
    if (sibling) {
        return null;
    }
    sibling = new RootSiblings(
        <PhotoModalPage
            type={type}
            onDestroy={() => {
                sibling && sibling.destroy();
                sibling = null;
            }}
            {...options}
        />
    );
}