import {StackNavigator} from "react-navigation"

import HomeScreen from "../screens/HomeScreen"
import AddDeviceScreen from "../screens/AddDeviceScreen"
import ChooseWifiScreen from "../screens/ChooseWifiScreen"
import ConnectWifiScreen from "../screens/ConnectWifiScreen"
import WaterDispenserScreen from "../screens/WaterDispenserScreen"

export default StackNavigator({
  Home: {screen: HomeScreen},
  AddDevice: {screen: AddDeviceScreen},
  ChooseWifi: {screen: ChooseWifiScreen},
  ConnectWifi: {screen: ConnectWifiScreen},
  WaterDispenser: {screen: WaterDispenserScreen},
})
