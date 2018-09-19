import React from 'react';
import { Modal, BackHandler, InteractionManager } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PageKeys from './PageKeys';
import PhotoPageTypes from './PageTypes';
import CameraView from './CameraView';
import AlbumListView from './AlbumListView';
import AlbumView from './AlbumView';
import PreviewMultiView from './PreviewMultiView';

export default class extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._clickBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._clickBack);
    }

    _clickBack = () => {
        const {onDestroy} = this.props;
        onDestroy && onDestroy();
        return true;
    };

    render() {
        const {type, onDestroy, callback} = this.props;
        const allscenes = {};
        let initialRouteName;
        if (type === PhotoPageTypes.camera) {
            allscenes[PageKeys.camera] = CameraView;
            initialRouteName = PageKeys.camera;
        } else if (type === PhotoPageTypes.video) {
            allscenes[PageKeys.camera] = CameraView;
            initialRouteName = PageKeys.camera;
        } else if (type === PhotoPageTypes.album) {
            allscenes[PageKeys.album_list] = AlbumListView;
            allscenes[PageKeys.album_view] = AlbumView;
            initialRouteName = PageKeys.album_list;
        }
        allscenes[PageKeys.preview] = PreviewMultiView;
        const scenes = Object.keys(allscenes)
            .reduce((prv, cur) => {
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
        const cb = (data) => {
            callback && callback(data);
            InteractionManager.runAfterInteractions(() => {
                onDestroy && onDestroy();
            });
        };
        return (
            <Modal animationType={'slide'}>
                <NavigationDoor screenProps={{...this.props, callback: cb}} />
            </Modal>
        );
    }
}