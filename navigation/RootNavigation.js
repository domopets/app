import {StackNavigator} from "react-navigation"

import HomeScreen from "../screens/HomeScreen"
import AddDeviceScreen from "../screens/AddDeviceScreen"
import ChooseWifiScreen from "../screens/ChooseWifiScreen"
import ConnectWifiScreen from "../screens/ConnectWifiScreen"
import WaterDispenserScreen from "../screens/WaterDispenserScreen"
import LaserControllerScreen from "../screens/LaserControllerScreen"
import FoodDispenserScreen from "../screens/FoodDispenserScreen"
import LitterScreen from "../screens/LitterScreen"

export default StackNavigator({
  Home: {screen: HomeScreen},
  AddDevice: {screen: AddDeviceScreen},
  ChooseWifi: {screen: ChooseWifiScreen},
  ConnectWifi: {screen: ConnectWifiScreen},
  WaterDispenser: {screen: WaterDispenserScreen},
  Litter: {screen: LitterScreen},
  FoodDispenser: {screen: FoodDispenserScreen},
  LaserController: {screen: LaserControllerScreen},
})
