import React from 'react';
import { Alert, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import NaviBar, { getSafeAreaInset } from 'react-native-pure-navigation-bar';
import PageKeys from './PageKeys';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [...this.props.selectedItems],
        };
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this._onWindowChanged);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this._onWindowChanged);
    }

    render() {
        const safeArea = getSafeAreaInset();
        const style = {
            paddingLeft: safeArea.left,
            paddingRight: safeArea.right,
        };
        return (
            <View style={styles.view}>
                <NaviBar
                    title={this.props.groupName}
                    onLeft={this._clickBack}
                    rightElement={'取消'}
                    onRight={this._onFinish.bind(this, [])}
                />
                <FlatList
                    key={this._column()}
                    style={[styles.list, style]}
                    renderItem={this._renderItem}
                    data={this.props.photos}
                    keyExtractor={item => item.uri}
                    numColumns={this._column()}
                    extraData={this.state}
                />
                {this._renderBottomView()}
            </View>
        );
    }

    _renderItem = ({item, index}) => {
        const safeArea = getSafeAreaInset();
        const edge = (Dimensions.get('window').width - safeArea.left - safeArea.right) / this._column() - 2;
        const isSelected = this.state.selectedItems.some(obj => obj.uri === item.uri);
        const backgroundColor = isSelected ? '#e15151' : 'transparent';
        const hasIcon = isSelected || this.state.selectedItems.length < this.props.maxSize;
        return (
            <TouchableOpacity onPress={this._clickCell.bind(this, item)}>
                <View style={{padding: 1}}>
                    <Image
                        key={index}
                        source={{uri: item.uri}}
                        style={{width: edge, height: edge, overflow: 'hidden'}}
                        resizeMode='cover'
                    />
                    {hasIcon && (
                        <View style={styles.selectView}>
                            <View style={[styles.selectIcon, {backgroundColor}]}>
                                {isSelected && (
                                    <Image
                                        source={require('./images/check_box.png')}
                                        style={styles.selectedIcon}
                                    />
                                )}
                            </View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    _renderBottomView = () => {
        const previewButton = this.state.selectedItems.length > 0 ? '预览' : '';
        const okButton = '确定 (' + this.state.selectedItems.length + '/' + this.props.maxSize + ')';
        const safeArea = getSafeAreaInset();
        return (
            <View style={[styles.bottom, {marginBottom: safeArea.bottom}]}>
                <TouchableOpacity onPress={this._clickPreview}>
                    <Text style={styles.previewButton}>
                        {previewButton}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._clickOk}>
                    <Text style={styles.okButton}>
                        {okButton}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    _onFinish = (data) => {
        this.props.callback && this.props.callback(data);
    };

    _onDeletePageFinish = (data) => {
        const selectedItems = this.state.selectedItems
            .filter(item => data.indexOf(item.uri) >= 0);
        this.setState({selectedItems});
    };

    _clickBack = () => {
        this.props.onBack && this.props.onBack(this.state.selectedItems);
    };

    _clickCell = (itemuri) => {
        const isSelected = this.state.selectedItems.some(item => item.uri === itemuri.uri);
        if (isSelected) {
            const selectedItems = this.state.selectedItems.filter(item => item.uri !== itemuri.uri);
            this.setState({
                selectedItems: [...selectedItems]
            });
        } else if (this.state.selectedItems.length >= this.props.maxSize) {
            Alert.alert('', '最大只能选择' + this.props.maxSize + '张照片');
        } else {
            this.setState({
                selectedItems: [...this.state.selectedItems, itemuri]
            });
        }
    };

    _clickPreview = () => {
        if (this.state.selectedItems.length > 0) {
            this.props.navigation.navigate(PageKeys.preview, {
                images: this.state.selectedItems.map(item => item.uri),
                callback: this._onDeletePageFinish,
            });
        }
    };

    _clickOk = () => {
        if (this.state.selectedItems.length > 0) {
            this._onFinish(this.state.selectedItems);
        }
    };

    _column = () => {
        const {width, height} = Dimensions.get('window');
        if (width < height) {
            return 3;
        } else {
            const safeArea = getSafeAreaInset();
            const edge = height * 1.0 / 3;
            return parseInt((width - safeArea.left - safeArea.right) / edge);
        }
    };

    _onWindowChanged = () => {
        this.forceUpdate();
    };
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'white',
    },
    safeView: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    selectView: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 30,
        height: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    selectIcon: {
        marginTop: 2,
        marginRight: 2,
        width: 20,
        height: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    selectedIcon: {
        width: 13,
        height: 13,
    },
    bottom: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#e6e6ea',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
    },
    previewButton: {
        marginLeft: 10,
        padding: 5,
        fontSize: 16,
        color: '#666666',
    },
    okButton: {
        marginRight: 15,
        paddingHorizontal: 15,
        height: 30,
        ...Platform.select({
            ios: {lineHeight: 30},
            android: {textAlignVertical: 'center'}
        }),
        borderRadius: 6,
        overflow: 'hidden',
        fontSize: 16,
        color: 'white',
        backgroundColor: '#e15151',
    },
});