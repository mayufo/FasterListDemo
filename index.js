/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import FlatListDemo from './pages/FlatListDemo'
import SwipeableFlatListDemo from './pages/SwipeableFlatListDemo'
import SectionListDemo from './pages/SectionListDemo'

const AppRoot = createStackNavigator({
    App: {
        screen: App,
    },
    FlatListDemo: {
        screen: FlatListDemo,
        navigationOptions: {
            title: 'FlatListDemo'
        }
    },
    SwipeableFlatListDemo: {
        screen: SwipeableFlatListDemo,
        navigationOptions: {
            title: 'SwipeableFlatListDemo'
        }
    },
    SectionListDemo: {
        screen: SectionListDemo,
        navigationOptions: {
            title: 'SectionListDemo'
        }
    }
})

const AppContainer = createAppContainer(AppRoot)

AppRegistry.registerComponent(appName, () => AppContainer);
