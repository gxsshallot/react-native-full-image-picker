import React from 'react';
import { CameraRoll, Image, ListView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';
import PageKeys from './PageKeys';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.data = props.screenProps;
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: [],
            selectedItems: [],
        };
    }

    componentWillMount() {
        CameraRoll.getPhotos({
            first: 1000000,
            groupTypes: Platform.OS === 'ios' ? 'All' : undefined,
            assetType: 'Photos'
        }).then(result => {
            console.log(result);
            const arr = result.edges.map(item => item.node);
            if (arr.length === 0) {
                return;
            }
            const dict = [{}, ...arr].reduce((prv, cur) => {
                if (typeof prv[cur.group_name] === 'undefined') {
                    prv[cur.group_name] = [cur.image];
                } else {
                    prv[cur.group_name].push(cur.image);
                }
                return prv;
            });
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

    _onBackFromAlbum = (items) => {
        this.setState({selectedItems: [...items]});
    };

    _clickCancel = () => {
        this.data.callback && this.data.callback([]);
    };

    _clickRow = (item) => {
        this.props.navigation.navigate(PageKeys.album_view, {
            ...this.data,
            groupName: item.name,
            photos: item.value,
            selectedItems: this.state.selectedItems,
            onBack: this._onBackFromAlbum,
        });
    };

    _renderNaviBar = () => {
        return (
            <NaviBar
                leftElement={[]}
                rightElement={'取消'}
                onRight={this._clickCancel}
                title='选择照片'
            />
        );
    };

    _renderRow = (item) => {
        const selectedCount = item.value.filter(path => this.state.selectedItems.map(item => item.uri).indexOf(path.uri) >= 0).length;
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

    render() {
        return (
            <View style={styles.view}>
                {this._renderNaviBar()}
                <ListView
                    style={styles.listview}
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.ds.cloneWithRows(this.state.data)}
                    enableEmptySections={true}
                    renderRow={this._renderRow}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'white',
    },
    listview: {
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