import React from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'react-native-full-image-picker';
import NaviBar from 'react-native-pure-navigation-bar';

class Example extends React.Component {
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
            title: 'Album - Single',
            func: ImagePicker.getAlbum,
            options: {
            },
        },
        {
            title: 'Album - MaxSize 9',
            func: ImagePicker.getAlbum,
            options: {
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
                <NaviBar title={'Test'} leftElement={null} />
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