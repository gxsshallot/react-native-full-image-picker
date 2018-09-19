import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, View, Dimensions } from 'react-native';
import NaviBar, { TOTALBAR_HEIGHT } from 'react-native-pure-navigation-bar';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.data = props.navigation.state.params;
        this.state = {
            images: this.data.images,
            index: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.data = nextProps.navigation.state.params;
        this.setState({
            images: this.data.images,
            index: 0,
        });
    }

    _onScroll = (event) => {
        const screenWidth = Dimensions.get('window').width;
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(offsetX / screenWidth);
        if (index < 0 || index >= this.state.images.length) {
            return;
        }
        if (index !== this.state.index) {
            this.setState({index});
        }
    };

    _clickLeft = (images) => {
        this.data.callback && this.data.callback(images);
    };

    _clickDelete = () => {
        const newImages = [...this.state.images];
        newImages.splice(this.state.index, 1);
        if (newImages.length > 0) {
            const newIndex = this.state.index >= newImages.length ? newImages.length - 1 : this.state.index;
            this.setState({
                images: newImages,
                index: newIndex,
            });
        } else {
            this._clickLeft([]);
            this.props.navigation.goBack();
        }
    };

    _renderItem = (path, index) => {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height - TOTALBAR_HEIGHT - getBottomSpace();
        return (
            <View key={index} style={{width, height, backgroundColor: 'black'}}>
                <Image
                    resizeMode='contain'
                    style={[styles.image, {width, height}]}
                    source={{uri: path}}
                />
            </View>
        );
    };

    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height - getBottomSpace();
        const title = '' + (this.state.index + 1) + '/' + this.state.images.length;
        return (
            <View style={{width, height}}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"
                />
                <NaviBar
                    title={title}
                    onLeft={() => this._clickLeft(this.state.images)}
                    rightElement='删除'
                    onRight={this._clickDelete}
                    navigation={this.props.navigation}
                />
                <ScrollView
                    ref={v => this.scrollview = v}
                    style={styles.scrollview}
                    automaticallyAdjustContentInsets={false}
                    pagingEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this._onScroll}
                >
                    {this.state.images.map(this._renderItem)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    image: {
    },
});