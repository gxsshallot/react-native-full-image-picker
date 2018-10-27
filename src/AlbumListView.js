import React from 'react';
import { CameraRoll, Image, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import NaviBar, { getSafeAreaInset } from 'react-native-pure-navigation-bar';
import PageKeys from './PageKeys';

export default class extends React.PureComponent {
    static defaultProps = {
        maxSize: 1,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedItems: [],
        };
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this._onWindowChanged);
        CameraRoll.getPhotos({
            first: 1000000,
            groupTypes: Platform.OS === 'ios' ? 'All' : undefined,
            assetType: 'Photos'
        }).then(result => {
            const arr = result.edges.map(item => item.node);
            if (arr.length === 0) {
                return;
            }
            const dict = arr.reduce((prv, cur) => {
                if (!prv[cur.group_name]) {
                    prv[cur.group_name] = [cur.image];
                } else {
                    prv[cur.group_name].push(cur.image);
                }
                return prv;
            }, {});
            const data = Object.keys(dict)
                .sort((a, b) => {
                    const rootIndex = 'Camera Roll';
                    if (a === rootIndex) {
                        return -1;
                    } else if (b === rootIndex) {
                        return 1;
                    } else {
                        return a < b ? -1 : 1;
                    }
                })
                .map(key => ({name: key, value: dict[key]}));
            this.setState({data});
        });
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this._onWindowChanged);
    }

    render() {
        const safeArea = getSafeAreaInset();
        const style = {
            paddingLeft: safeArea.left,
            paddingRight: safeArea.right,
            paddingBottom: safeArea.bottom,
        };
        return (
            <View style={styles.view}>
                <NaviBar
                    title={this.props.choosePhotoTitle}
                    leftElement={[]}
                    rightElement={this.props.cancelLabel}
                    onRight={this._clickCancel}
                />
                <FlatList
                    style={[styles.listView, style]}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.name}
                    extraData={this.state}
                />
            </View>
        );
    }

    _renderItem = ({item}) => {
        const itemUris = new Set(item.value.map(i => i.uri));
        const selectedItems = this.state.selectedItems
            .filter(i => itemUris.has(i.uri));
        const selectedCount = selectedItems.length;
        return (
            <TouchableOpacity onPress={this._clickRow.bind(this, item)}>
                <View style={styles.cell}>
                    <View style={styles.left}>
                        <Image
                            style={styles.image}
                            source={{uri: item.value[0].uri}}
                            resizeMode='cover'
                        />
                        <Text style={styles.text}>
                            {item.name + ' (' + item.value.length + ')'}
                        </Text>
                    </View>
                    <View style={styles.right}>
                        {selectedCount > 0 && (
                            <Text style={styles.selectedcount}>
                                {'' + selectedCount}
                            </Text>
                        )}
                        <Image
                            source={require('./images/arrow_right.png')}
                            style={styles.arrow}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    _onBackFromAlbum = (items) => {
        this.setState({selectedItems: [...items]});
    };

    _clickCancel = () => {
        this.props.callback && this.props.callback([]);
    };

    _clickRow = (item) => {
        this.props.navigation.navigate(PageKeys.album_view, {
            ...this.props,
            groupName: item.name,
            photos: item.value,
            selectedItems: this.state.selectedItems,
            onBack: this._onBackFromAlbum,
        });
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
    listView: {
        flex: 1,
    },
    cell: {
        height: 60,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        overflow: 'hidden',
        width: 44,
        height: 44,
    },
    text: {
        fontSize: 16,
        color: 'black',
        marginLeft: 10,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    selectedcount: {
        width: 18,
        height: 18,
        ...Platform.select({
            ios: {lineHeight: 18},
            android: {textAlignVertical: 'center'},
        }),
        fontSize: 11,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#e15151',
        borderRadius: 9,
        overflow: 'hidden',
    },
    arrow: {
        width: 13,
        height: 16,
        marginLeft: 10,
        marginRight: 0,
    },
});