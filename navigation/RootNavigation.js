import {StackNavigator} from "react-navigation"

import HomeScreen from "../screens/HomeScreen"
import AddDeviceScreen from "../screens/AddDeviceScreen"

export default StackNavigator({
  Home: {screen: HomeScreen},
  AddDevice: {screen: AddDeviceScreen},
})
