import React from 'react';
import { Modal, BackHandler } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as Camera from './CameraView';
import * as AlbumList from './AlbumListView';
import * as Album from './AlbumView';
import * as Preview from './PreviewMultiView';

export class PhotoModalPage extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._clickBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._clickBack);
    }

    _clickBack = () => {
        return true;
    };

    render() {
        const allscenes = {};
        let initialRouteName;
        if (this.props.type === PhotoPageTypes.camera) {
            allscenes[Camera.key] = Camera.CameraView;
            initialRouteName = Camera.key;
        } else if (this.props.type === PhotoPageTypes.album) {
            allscenes[AlbumList.key] = AlbumList.AlbumListView;
            allscenes[Album.key] = Album.AlbumView;
            initialRouteName = AlbumList.key;
        }
        allscenes[Preview.key] = Preview.PreviewMultiView;
        const scenes = Object.keys(allscenes).reduce((prv, cur) => {
            prv[cur] = {
                screen: allscenes[cur],
                navigationOptions: {
                    gesturesEnabled: false,
                }
            };
            return prv;
        }, {});
        const NavigationDoor = createStackNavigator(
            scenes,
            {
                initialRouteName: initialRouteName,
                headerMode: 'none',
            });
        return (
            <Modal animationType={'slide'}>
                <NavigationDoor screenProps={this.props} />
            </Modal>
        );
    }
}

export const PhotoPageTypes = {
    camera: 'camera',
    album: 'album',
};