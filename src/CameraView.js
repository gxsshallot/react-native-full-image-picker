import React from "react";
import { Alert, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { STATUSBAR_HEIGHT } from 'react-native-pure-navigation-bar';
import Video from 'react-native-video';
import PageKeys from './PageKeys';
import PhotoPageTypes from './PageTypes';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.data = props.screenProps;
        this.maxSize = this.data.maxSize === undefined ? 1 : this.data.maxSize;
        this.state = {
            data: [],
            isPreview: false,
            sidetype: RNCamera.Constants.Type.back,
            flashmode: RNCamera.Constants.FlashMode.auto,
            isRecording: false,
        };
    }

    _onFinish = (data) => {
        this.data.callback && this.data.callback(data.map(uri => ({uri})));
    };

    _onDeletePageFinish = (data) => {
        this.setState({
            data: [...data],
        });
    };

    _clickTakePicture = async () => {
        if (this.camera) {
            const {uri: path} = await this.camera.takePictureAsync({
                mirrorImage: this.state.sidetype === RNCamera.Constants.Type.front,
                fixOrientation: true,
                forceUpOrientation: true,
            });
            let newPath = path;
            if (Platform.OS === 'ios') {
                if (newPath.startsWith('file://')) {
                    newPath = newPath.substring(7);
                }
            }
            if (this.maxSize > 1) {
                if (this.state.data.length >= this.maxSize) {
                    Alert.alert('', '可拍摄照片已达到上限');
                } else {
                    this.setState({
                        data: [...this.state.data, newPath],
                    });
                }
            } else {
                this.setState({
                    data: [newPath],
                    isPreview: true,
                });
            }
        }
    };

    _clickRecordVideo = () => {
        if (this.camera) {
            if (this.state.isRecording) {
                this.camera.stopRecording();
            } else {
                this.setState({
                    isRecording: true,
                },this._startRecording);
            }
        }
    };

    _startRecording = async () => {
        try {
            const {uri: path} = await this.camera.recordAsync();
            let newPath = path;
            if (Platform.OS === 'ios') {
                if (newPath.startsWith('file://')) {
                    newPath = newPath.substring(7);
                }
            }
            this.setState({
                data: [newPath],
                isRecording: false,
                isPreview: true,
            });
        }
        catch (e) {
            Alert.alert('', e.message);
        }
    };

    _clickSwitchSide = () => {
        const target = this.state.sidetype === RNCamera.Constants.Type.back
            ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;
        this.setState({sidetype: target});
    };

    _clickFlashMode = () => {
        // TODO 闪光灯
    };

    _clickPreview = () => {
        this.props.navigation.navigate(PageKeys.preview, {
            images: this.state.data,
            callback: this._onDeletePageFinish,
        });
    };

    _clickCancel = () => {
        if (this.maxSize <= 1 && this.state.isPreview) {
            this.setState({
                data: [],
                isPreview: false,
            });
        } else {
            this._onFinish([]);
        }
    };

    _renderTopView = () => {
        return (
            <View style={styles.top}>
                <TouchableOpacity onPress={this._clickFlashMode} style={styles.flashview}>
                    <Image
                        style={styles.flashimage}
                        source={require('./images/flash_auto.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this._clickSwitchSide} style={styles.cameraview}>
                    <Image
                        style={styles.cameraimage}
                        source={require('./images/switch_camera.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    _renderPreviewButton = () => {
        const text = '' + this.state.data.length + '/' + this.maxSize;
        return (
            <TouchableOpacity onPress={this._clickPreview} style={styles.previewtouch}>
                <View style={styles.previewview}>
                    <Image
                        style={styles.previewimage}
                        source={{uri: this.state.data[this.state.data.length - 1]}}
                    />
                    <Text style={styles.previewtext}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    _renderCancelButton = () => {
        return (
            <TouchableOpacity onPress={this._clickCancel} style={styles.buttontouch}>
                <Text style={styles.buttontext}>
                    取消
                </Text>
            </TouchableOpacity>
        );
    };

    _renderOkButton = (text) => {
        return (
            <TouchableOpacity
                onPress={() => this._onFinish(this.state.data)}
                style={styles.buttontouch}
            >
                <Text style={styles.buttontext}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    };

    _renderTakePhotoButton = () => {
        const left = (Dimensions.get('window').width - 84) / 2;
        const {type} = this.data;
        const btnIcon = this.state.isRecording ?
            require('./images/video_recording.png') :
            require('./images/shutter.png');
        return (
            <TouchableOpacity
                onPress={type === PhotoPageTypes.video ? this._clickRecordVideo : this._clickTakePicture}
                style={[styles.takephotoview, {left}]}
            >
                <Image
                    style={styles.takephotoimage}
                    source={btnIcon}
                />
            </TouchableOpacity>
        );
    };

    _renderBottomView = () => {
        const {type} = this.data;
        const isMulti = this.maxSize > 1;
        const hasPhoto = this.state.data.length > 0;
        const inPreview = this.state.isPreview;
        const isRecording = this.state.isRecording;
        const previewBtnName = type === PhotoPageTypes.video ? '使用视频' : '使用照片';
        return (
            <View style={styles.bottom}>
                {isMulti && hasPhoto ? this._renderPreviewButton() : !isRecording && this._renderCancelButton()}
                {!inPreview && this._renderTakePhotoButton()}
                {isMulti ? hasPhoto && this._renderOkButton('确定') : inPreview && this._renderOkButton(previewBtnName)}
            </View>
        );
    };

    _renderPreviewView = () => {
        const {type} = this.data;
        const {width, height} = Dimensions.get('window');
        return (
            <View style={{width, height}}>
                {
                    type === PhotoPageTypes.video ?
                        <Video
                            source={{uri: this.state.data[0]}}
                            ref={(ref) => {
                                this.player = ref;
                            }}
                            style={{width, height}}
                        /> :
                        <Image
                            resizeMode='contain'
                            style={{width, height}}
                            source={{uri: this.state.data[0]}}
                        />
                }
            </View>
        );
    };

    render() {
        const {width, height} = Dimensions.get('window');
        return (
            <View style={[styles.container, {width, height}]}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                />
                {!this.state.isPreview ? (
                    <RNCamera
                        ref={cam => this.camera = cam}
                        type={this.state.sidetype}
                        flashMode={this.state.flashmode}
                        style={styles.preview}
                        fixOrientation={true}
                    />
                ) : this._renderPreviewView()}
                {this._renderTopView()}
                {this._renderBottomView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            android: {flex: 1},
        }),
        flexDirection: 'row',
    },
    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: STATUSBAR_HEIGHT,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flashview: {
        marginLeft: 5,
    },
    flashimage: {
        margin: 10,
        width: 27,
        height: 27,
    },
    cameraview: {
        marginRight: 5,
    },
    cameraimage: {
        margin: 10,
        width: 27,
        height: 27,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 84,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    takephotoview: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    takephotoimage: {
        width: 64,
        height: 64,
        margin: 10,
    },
    buttontouch: {
        marginLeft: 5,
        marginRight: 5,
    },
    buttontext: {
        margin: 10,
        height: 44,
        lineHeight: 44,
        fontSize: 16,
        color: 'white',
        backgroundColor: 'transparent',
    },
    previewtouch: {
        marginLeft: 15,
    },
    previewview: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 84,
    },
    previewimage: {
        width: 50,
        height: 50,
    },
    previewtext: {
        fontSize: 16,
        marginLeft: 10,
        color: 'white',
        backgroundColor: 'transparent',
    },
});