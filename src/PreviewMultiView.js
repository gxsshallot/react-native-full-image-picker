import React from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import NaviBar, { DEFAULT_NAVBAR_HEIGHT, getSafeAreaInset } from 'react-native-pure-navigation-bar';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images,
            index: 0,
        };
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this._onWindowChanged);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this._onWindowChanged);
    }

    render() {
        const title = '' + (this.state.index + 1) + '/' + this.state.images.length;
        const safeArea = getSafeAreaInset();
        const style = {
            paddingLeft: safeArea.left,
            paddingRight: safeArea.right,
            paddingBottom: safeArea.bottom,
            backgroundColor: 'black',
        };
        return (
            <View style={styles.view}>
                <StatusBar hidden={false} />
                <NaviBar
                    title={title}
                    onLeft={() => this._clickLeft(this.state.images)}
                    rightElement={this.props.deleteLabel}
                    onRight={this._clickDelete}
                />
                <ScrollView
                    style={[styles.scrollView, style]}
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

    _renderItem = ({uri: path}, index) => {
        const safeArea = getSafeAreaInset();
        const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
        const width = screenWidth - safeArea.left - safeArea.right;
        const height = screenHeight - safeArea.top - safeArea.bottom - DEFAULT_NAVBAR_HEIGHT;
        return (
            <View key={index} style={{width, height}}>
                <Image
                    resizeMode='contain'
                    style={{width, height}}
                    source={{uri: path}}
                />
            </View>
        );
    };

    _onScroll = ({nativeEvent: {contentOffset: {x}}}) => {
        const safeArea = getSafeAreaInset();
        const width = Dimensions.get('window').width - safeArea.left - safeArea.right;
        const index = Math.round(x / width);
        if (index < 0 || index >= this.state.images.length) {
            return;
        }
        if (index !== this.state.index) {
            this.setState({index});
        }
    };

    _clickLeft = (images) => {
        this.props.callback && this.props.callback(images);
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

    _onWindowChanged = () => {
        this.forceUpdate();
    };
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    safeView: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row',
    },
});