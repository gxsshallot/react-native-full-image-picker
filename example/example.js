import React from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PickList, { PickListLabels } from 'react-native-picklist';
import NaviBar from 'react-native-pure-navigation-bar';

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.plainData = [
            {code: 1, name: '001'},
            {code: 2, name: '002'},
            {code: 3, name: '003'},
            {code: 4, name: '004'},
            {code: 5, name: '005'},
        ];
        this.treeData = [
            {code: 1, name: '101', subitems: [
                {code: 2, name: '002'},
                {code: 3, name: '103', subitems: []},
                {code: 4, name: '104', subitems: [
                    {code: 5, name: '005'},
                    {code: 6, name: '006'},
                ]},
            ]},
            {code: 7, name: '107', subitems: [
                {code: 8, name: '008'},
                {code: 9, name: '009'},
            ]},
            {code: 10, name: '010'},
            {code: 11, name: '011'},
        ];
        this.state = {
            language: 'en',
            isPickList: false,
            key: undefined,
            title: undefined,
            isPlainData: undefined,
            isMulti: undefined,
            directBackWhenSingle: undefined,
            showCount: undefined,
        };
    }

    componentDidMount() {
        this._setLanguage();
    }

    _setLanguage = () => {
        const isEn = this.state.language === 'en';
        PickListLabels.closeLabel = isEn ? 'Close' : '关闭';
        PickListLabels.selectAllLabel = isEn ? 'Select All' : '全选';
        PickListLabels.deselectAllLabel = isEn ? 'Deselect All' : '全不选';
        PickListLabels.searchPlaceholderLabel = isEn ? 'Search' : '搜索';
        PickListLabels.okLabel = isEn ? 'OK' : '确定';
        PickListLabels.chooseLabel = isEn ? 'Please choose' : '请选择';
    };

    _onFinish = (nodeArr) => {
        const key = 'selectedItems' + this.state.key;
        this.setState({
            [key]: nodeArr.map(node => node.getInfo()),
        });
    };

    _changeLanguage = () => {
        const language = this.state.language === 'en' ? 'zh' : 'en';
        this.setState({language}, () => this._setLanguage());
    };

    _renderPickList = () => {
        const key = 'selectedItems' + this.state.key;
        const data = this.state.isPlainData ? this.plainData : this.treeData;
        const selectedIds = (this.state[key] || []).map(item => item.code);
        return (
            <PickList
                data={data}
                title={this.state.title}
                firstTitleLine={'Test'}
                multilevel={!this.state.isPlainData}
                multiselect={this.state.isMulti}
                directBackWhenSingle={this.state.directBackWhenSingle}
                selectedIds={selectedIds}
                showCount={this.state.showCount}
                onFinish={this._onFinish}
                idKey={'code'}
                labelKey={'name'}
                childrenKey={'subitems'}
                onBack={() => this.setState({isPickList: false, key: undefined})}
                closeLabel={'Close'}
                selectAllLabel={'Select All'}
                deselectAllLabel={'Deselect All'}
            />
        );
    };

    _renderLanguageItem = () => {
        const isEn = this.state.language === 'en';
        const text = isEn ? 'To Chinese Language' : '转换为英语';
        return (
            <TouchableOpacity style={styles.touch} onPress={this._changeLanguage}>
                <Text style={styles.text}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    };

    _renderItem = (key, text, onClick) => {
        const innerKey = 'selectedItems' + key;
        if (this.state[innerKey] && this.state[innerKey].length > 0) {
            const names = this.state[innerKey].map(item => item.name);
            text = text + '\n' + names.join(',');
        }
        return (
            <TouchableOpacity style={styles.touch} onPress={onClick}>
                <Text style={styles.text}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    };

    _renderMenuView = () => {
        return (
            <View style={styles.container}>
                <NaviBar title={'Test'} leftElement={null} />
                {this._renderLanguageItem()}
                {this._renderItem('a', 'Plain Data + Single Select', () => {
                    this.setState({
                        key: 'a',
                        isPickList: true,
                        title: 'Plain Single',
                        isPlainData: true,
                        isMulti: false,
                        directBackWhenSingle: false,
                        showCount: false,
                    });
                })}
                {this._renderItem('b', 'Plain Data + Single Select + Direct Back', () => {
                    this.setState({
                        key: 'b',
                        isPickList: true,
                        title: 'Plain Single Back',
                        isPlainData: true,
                        isMulti: false,
                        directBackWhenSingle: true,
                        showCount: false,
                    });
                })}
                {this._renderItem('c', 'Plain Data + Multi Select', () => {
                    this.setState({
                        key: 'c',
                        isPickList: true,
                        title: 'Plain Multi',
                        isPlainData: true,
                        isMulti: true,
                        showCount: false,
                    });
                })}
                {this._renderItem('d', 'Tree Data + Single Select', () => {
                    this.setState({
                        key: 'd',
                        isPickList: true,
                        title: 'Tree Single',
                        isPlainData: false,
                        isMulti: false,
                        directBackWhenSingle: false,
                        showCount: false,
                    });
                })}
                {this._renderItem('e', 'Tree Data + Single Select + Direct Back', () => {
                    this.setState({
                        key: 'e',
                        isPickList: true,
                        title: 'Tree Single Back',
                        isPlainData: false,
                        isMulti: false,
                        directBackWhenSingle: true,
                        showCount: false,
                    });
                })}
                {this._renderItem('f', 'Tree Data + Multi Select', () => {
                    this.setState({
                        key: 'f',
                        isPickList: true,
                        title: 'Tree Multi',
                        isPlainData: false,
                        isMulti: true,
                        showCount: false,
                    });
                })}
                {this._renderItem('g', 'Tree Data + Multi Select + Count', () => {
                    this.setState({
                        key: 'g',
                        isPickList: true,
                        title: 'Tree Multi',
                        isPlainData: false,
                        isMulti: true,
                        showCount: true,
                    });
                })}
            </View>
        );
    };

    render() {
        return this.state.isPickList ? this._renderPickList() : this._renderMenuView();
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
});

AppRegistry.registerComponent('test', () => Example);