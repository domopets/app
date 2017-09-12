global.Buffer = require("buffer").Buffer
import {AppRegistry} from "react-native"
import RootNavigation from "./navigation/RootNavigation"

AppRegistry.registerComponent("Domopets", () => RootNavigation)
