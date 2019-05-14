/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    SwipeableFlatList,
    TouchableHighlight
} from 'react-native';

type Props = {};
const CITY_NAMES = ['上海', '北京', '深圳', '广州', '成都', '杭州', '重庆', '武汉', '苏州', '天津', '南京', '西安', '郑州', '长沙', '沈阳', '青岛', '宁波', '东莞', '无锡']
export default class SwipeableFlatListDemo extends Component<Props> {
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

    slideMenu() {
        return (
            <View style={styles.quickContainer}>
                <TouchableHighlight
                    onPress={() => {
                        alert('确认删除？')
                    }}
                >
                    <View style={styles.quick}>
                        <Text style={styles.touchableHighlightText}>删除</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <SwipeableFlatList
                    data={this.state.dataArray}
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
                    renderQuickActions={()=>this.slideMenu()}
                    // 最大拉伸长度
                    maxSwipeDistance={100}
                    // 提示
                    bounceFirstRowOnMount={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: '#169',
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
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
    },

    touchableHighlightText: {
        color: 'white',
        fontSize: 16,
    },

    quick: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'flex-end',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 120,
        marginRight: 15,
    },

    quickContainer: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 15,
    },
});
