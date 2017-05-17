import HomeScreen from '../screens/HomeScreen'
import AddDeviceScreen from '../screens/AddDeviceScreen'

import {createRouter} from '@expo/ex-navigation'

const Router = createRouter(() => ({
  home: () => HomeScreen,
  addDevice: () => AddDeviceScreen,
}))

export default Router
