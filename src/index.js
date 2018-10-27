import React from 'react';
import RootSiblings from 'react-native-general-siblings';
import PageKeys from './PageKeys';
import PhotoModalPage from './PhotoModalPage';

/**
 * --OPTIONS--
 * maxSize?: number. Camera or Video.
 * sideType?: RNCamera.Constants.Type. Camera or Video.
 * flashMode?: RNCamera.Constants.FlashMode. Camera or Video.
 * callback: (data: any[]) => void. Donot use Alert.
 */

export const getCamera = (options) => showImagePicker(PageKeys.camera, {...options, isVideo: false});
export const getVideo = (options) => showImagePicker(PageKeys.camera, {...options, isVideo: true});
export const getAlbum = (options) => showImagePicker(PageKeys.album_list, options);

let sibling = null;

function showImagePicker(initialRouteName, options) {
    if (sibling) {
        return null;
    }
    sibling = new RootSiblings(
        <PhotoModalPage
            initialRouteName={initialRouteName}
            options={options}
            onDestroy={() => {
                sibling && sibling.destroy();
                sibling = null;
            }}
        />
    );
}