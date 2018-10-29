import React from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'react-native-full-image-picker';
import { InnerNaviBar } from 'react-native-pure-navigation-bar';

class Example extends React.PureComponent {
    options = [
        {
            title: 'Camera - Single',
            func: ImagePicker.getCamera,
            options: {
            },
        },
        {
            title: 'Camera - MaxSize 9',
            func: ImagePicker.getCamera,
            options: {
                maxSize: 9,
            },
        },
        {
            title: 'Image - Single',
            func: ImagePicker.getAlbum,
            options: {
            },
        },
        {
            title: 'Image - MaxSize 9',
            func: ImagePicker.getAlbum,
            options: {
                maxSize: 9,
            },
        },
        {
            title: 'Image - MaxSize 9 (AutoConvert)',
            func: ImagePicker.getAlbum,
            options: {
                autoConvertPath: true,
                maxSize: 9,
            },
        },
        {
            title: 'Video - MaxSize 9',
            func: ImagePicker.getAlbum,
            options: {
                assetType: 'Videos',
                maxSize: 9,
            },
        },
        {
            title: 'Video - MaxSize 9 (AutoConvert)',
            func: ImagePicker.getAlbum,
            options: {
                assetType: 'Videos',
                autoConvertPath: true,
                maxSize: 9,
            },
        },
        {
            title: 'All - MaxSize 9',
            func: ImagePicker.getAlbum,
            options: {
                assetType: 'All',
                maxSize: 9,
            },
        },
        {
            title: 'All - MaxSize 9 (AutoConvert)',
            func: ImagePicker.getAlbum,
            options: {
                assetType: 'All',
                autoConvertPath: true,
                maxSize: 9,
            },
        },
        {
            title: 'Video',
            func: ImagePicker.getVideo,
            options: {
            },
        },
    ];

    constructor(props) {
        super(props);
        this.state = {};
    }

    _callback = (dataArr) => {
        this.setState({dataArr});
    };

    _renderItem = ({title, func, options}, index) => {
        return (
            <TouchableOpacity
                key={index}
                style={styles.touch}
                onPress={() => func && func({...options, callback: this._callback})}
            >
                <Text style={styles.text}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <InnerNaviBar title={'Test'} leftElement={null} />
                <ScrollView style={styles.container}>
                    {this.options.map(this._renderItem)}
                    <Text numberOfLines={0} style={styles.ans}>
                        {JSON.stringify(this.state.dataArr)}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    touch: {
        minHeight: 44,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#e15151',
        borderRadius: 4,
        overflow: 'hidden',
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        paddingVertical: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white',
    },
    ans: {
        fontSize: 16,
        lineHeight: 24,
        paddingVertical: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'black',
    },
});

AppRegistry.registerComponent('test', () => Example);