/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SectionList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';


type Props = {};
const CITY_NAMES = [
    {
        data: ['上海', '北京', '深圳', '广州'],
        title: '一线城市'
    },
    {
        data: ['杭州', '南京', '成都', '重庆'],
        title: '二线发达城市'
    },
    {
        data: ['佛山', '青岛', '长沙', '东莞', '西安', '苏州'],
        title: '二线中等'
    }]
export default class FlatListDemo extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES
        }
    }

    loadData(refreshing) {
        if (refreshing) {
            this.setState({
                isLoading: true
            })
        }

        setTimeout(() => {
            let dataArray = []
            if (refreshing) {
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i])
                }
            } else {
                dataArray = this.state.dataArray.concat(CITY_NAMES)
            }

            this.setState({
                dataArray: dataArray,
                isLoading: false
            })
        }, 2000)
    }

    _renderItem(data) {
        return (
            <View style={styles.item}>
                <Text>{data.item}</Text>
            </View>
        )
    }

    _renderSectionHeader ({section}) {
        return (<View style={styles.sectionHeader}>
            <Text>{section.title}</Text>
        </View>)
    }

    genIndicator() {
        return (<View>
            <ActivityIndicator
                size={'small'}
                color={'red'}
                animating={true}
            />
            <Text style={styles.loadMoreViewText}>正在加载更多...</Text>

        </View>)
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}
                    // refreshing={this.state.isLoading}
                    // onRefresh={() => {
                    //     this.loadData()
                    // }}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            colors={['red']}
                            tintColor={'red'}
                            titleColor={'pink'}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.loadData(true)
                            }}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={ () => {
                        this.loadData()
                    }}
                    // 指定分组标题
                    renderSectionHeader={(data) => this._renderSectionHeader(data)}
                    // 分割线
                    ItemSeparatorComponent={() => (<View style={styles.separator}/>)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    item: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    loadMoreViewText: {
        marginLeft: 14,
        fontSize: 12,
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionHeader: {
        height: 50,
        backgroundColor: '#93ebbe',
        alignItems:'center',
        justifyContent: 'center',

    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        flex: 1
    }
});
