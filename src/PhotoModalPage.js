import React from 'react';
import { Modal, BackHandler, InteractionManager, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PageKeys from './PageKeys';
import CameraView from './CameraView';
import AlbumListView from './AlbumListView';
import AlbumView from './AlbumView';
import PreviewMultiView from './PreviewMultiView';

export default class extends React.PureComponent {
    static defaultProps = {
        okLabel: 'OK',
        cancelLabel: 'Cancel',
        deleteLabel: 'Delete',
        useVideoLabel: 'Use Video',
        usePhotoLabel: 'Use Photo',
        previewLabel: 'Preview',
        choosePhotoTitle: 'Choose Photo',
        maxSizeChooseAlert: (number) => 'You can only choose ' + number + ' photos at most',
        maxSizeTakeAlert: (number) => 'You can only take ' + number + ' photos at most',
        supportedOrientations: ['portrait', 'landscape'],
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._clickBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._clickBack);
    }

    render() {
        const callback = (data) => {
            this.props.callback && this.props.callback(data);
            InteractionManager.runAfterInteractions(() => {
                this.props.onDestroy && this.props.onDestroy();
            });
        };
        const allscenes = {
            [PageKeys.camera]: CameraView,
            [PageKeys.album_list]: AlbumListView,
            [PageKeys.album_view]: AlbumView,
            [PageKeys.preview]: PreviewMultiView,
        };
        const withUnwrap = (WrappedComponent) => class extends React.PureComponent {
            render() {
                return (
                    <WrappedComponent
                        {...this.props.navigation.state.params}
                        navigation={this.props.navigation}
                    />
                );
            }
        }
        const scenes = Object.keys(allscenes)
            .reduce((prv, cur) => {
                prv[cur] = {
                    screen: withUnwrap(allscenes[cur]),
                    navigationOptions: {
                        gesturesEnabled: false,
                    }
                };
                return prv;
            }, {});
        const NavigationDoor = createStackNavigator(
            scenes,
            {
                initialRouteName: this.props.initialRouteName,
                initialRouteParams: {
                    ...this.props,
                    callback: callback,
                },
                headerMode: 'none',
            });
        return (
            <Modal
                animationType={'slide'}
                supportedOrientations={this.props.supportedOrientations}
            >
                <NavigationDoor />
            </Modal>
        );
    }

    _clickBack = () => {
        this.props.onDestroy && this.props.onDestroy();
        return true;
    };
}