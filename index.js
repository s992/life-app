import { AppRegistry, YellowBox } from 'react-native'

import App from './src/App'

YellowBox.ignoreWarnings(['Warning: isMounted'])
AppRegistry.registerComponent('Life', () => App)
