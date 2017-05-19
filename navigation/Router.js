import HomeScreen from '../screens/HomeScreen'
import AddDeviceScreen from '../screens/AddDeviceScreen'
import ChooseWifiScreen from '../screens/ChooseWifiScreen'

import {createRouter} from '@expo/ex-navigation'

const Router = createRouter(() => ({
  home: () => HomeScreen,
  addDevice: () => AddDeviceScreen,
  chooseWifi: () => ChooseWifiScreen,
}))

export default Router
