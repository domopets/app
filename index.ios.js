global.Buffer = require("buffer").Buffer
import React from "react"
import {AppRegistry} from "react-native"
import RootNavigation from "./navigation/RootNavigation"
import {Provider} from "react-redux"
import {createStore} from "redux"
import redux from "./redux"

import io from "socket.io-client"

const store = createStore(redux)

function moduleFound(module) {
  switch (module.type) {
    case "FOOD": {
      store.dispatch({
        type: "SET_MODULE",
        payload: {
          name: "Food Dispenser",
          icon: {
            type: "material-community",
            name: "silverware-variant",
          },
          component: "FoodDispenser",
          id: module.id,
        },
      })
      break
    }
    case "WATER": {
      store.dispatch({
        type: "SET_MODULE",
        payload: {
          name: "Water Dispenser",
          icon: {
            type: "simple-line-icon",
            name: "drop",
          },
          component: "WaterDispenser",
          id: module.id,
        },
      })
      break
    }
    case "LASER": {
      store.dispatch({
        type: "SET_MODULE",
        payload: {
          name: "Laser Control",
          icon: {
            type: "material-community",
            name: "silverware-variant",
          },
          component: "LaserController",
          id: module.id,
        },
      })
      break
    }
  }
}

const socket = io("http://192.168.1.11:3000", {
  transports: ["websocket"],
})
socket.on("connect", () => {
  socket.emit("type", "MOBILE")
})
socket.on("module", moduleFound)
socket.on("dispatch", data => {
  const module = store.getState()[data.id]
  switch (data.action) {
    case "measure":
      store.dispatch({
        type: "SET_MODULE",
        payload: {...module, weight: data.payload},
      })
      break
  }
})

const Root = () =>
  <Provider store={store}>
    <RootNavigation />
  </Provider>

AppRegistry.registerComponent("Domopets", () => Root)
