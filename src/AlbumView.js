import React from 'react';
import { Alert, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import PageKeys from './PageKeys';

export default class extends React.Component {
    column = 3;

    constructor(props) {
        super(props);
        this.data = props.navigation.state.params;
        this.data.maxSize = typeof this.data.maxSize !== 'number' ? 1 : this.data.maxSize;
        this.state = {
            selectedItems: [...this.data.selectedItems],
        };
    }

    _onFinish = (data) => {
        this.data.callback && this.data.callback(data);
    };

    _onDeletePageFinish = (data) => {
        const selectedItems = this.state.selectedItems
            .filter(item => data.indexOf(item.uri) >= 0);
        this.setState({selectedItems});
    };

    _clickBack = () => {
        this.data.onBack && this.data.onBack(this.state.selectedItems);
    };

    _clickCell = (itemuri) => {
        const isSelected = this.state.selectedItems.some(item => item.uri === itemuri.uri);
        if (isSelected) {
            const selectedItems = this.state.selectedItems.filter(item => item.uri !== itemuri.uri);
            this.setState({
                selectedItems: [...selectedItems]
            });
        } else if (this.state.selectedItems.length >= this.data.maxSize) {
            Alert.alert('', '最大只能选择' + this.data.maxSize + '张照片');
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

    _renderNaviBar = () => {
        return (
            <NaviBar
                title={this.data.groupName}
                onLeft={this._clickBack}
                rightElement='取消'
                onRight={this._onFinish.bind(this, [])}
                navigation={this.props.navigation}
            />
        );
    };

    _renderItem = ({item, index}) => {
        const edge = Dimensions.get('window').width / this.column - 2;
        const isSelected = this.state.selectedItems.some(obj => obj.uri === item.uri);
        const backgroundColor = isSelected ? '#e15151' : 'transparent';
        const hasIcon = isSelected || this.state.selectedItems.length < this.data.maxSize;
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
                        <View style={styles.selectcontainer}>
                            <View style={[styles.selecticon, {backgroundColor}]}>
                                {isSelected && (
                                    <Image
                                        source={require('./images/check_box.png')}
                                        style={styles.selectedicon}
                                    />
                                )}
                            </View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    _renderListView = () => {
        return (
            <FlatList
                style={styles.list}
                renderItem={this._renderItem}
                data={this.data.photos}
                keyExtractor={item => item.uri}
                numColumns={this.column}
                extraData={this.state}
            />
        );
    };

    _renderBottomView = () => {
        const previewButton = this.state.selectedItems.length > 0 ? '预览' : '';
        const okButton = '确定 (' + this.state.selectedItems.length + '/' + this.data.maxSize + ')';
        return (
            <View style={styles.bottom}>
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

    render() {
        return (
            <View style={styles.view}>
                {this._renderNaviBar()}
                {this._renderListView()}
                {this._renderBottomView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: getBottomSpace(),
    },
    list: {
        flex: 1,
    },
    selecttouch: {
        position: 'absolute',
        top: 4,
        right: 4,
    },
    selectcontainer: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 30,
        height: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    selecticon: {
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
    selectedicon: {
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