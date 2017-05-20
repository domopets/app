import HomeScreen from '../screens/HomeScreen'
import AddDeviceScreen from '../screens/AddDeviceScreen'
import ChooseWifiScreen from '../screens/ChooseWifiScreen'
import ConnectWifiScreen from '../screens/ConnectWifiScreen'

import {createRouter} from '@expo/ex-navigation'

const Router = createRouter(() => ({
  home: () => HomeScreen,
  addDevice: () => AddDeviceScreen,
  chooseWifi: () => ChooseWifiScreen,
  connectWifi: () => ConnectWifiScreen,
}))

export default Router
