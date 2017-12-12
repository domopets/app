import React, {Component} from "react"
import { StyleSheet, View, WebView, ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import glamorous, {Text} from "glamorous-native"
import {Icon} from "react-native-elements"
import CenteredView from "../components/CenteredView"
import {List, ListItem} from "react-native-elements"
import Zeroconf from "react-native-zeroconf"
import WebRTC from 'react-native-webrtc';

  var styles = StyleSheet.create({
  backgroundVideo: {
    width:400,
    height:322
  }
  })

const zeroconf = new Zeroconf()

const AddButton = props =>
  <Icon name="ios-add" type="ionicon" color="white" size={30} {...props} />

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Domopets",
    headerBackTitle: "Back",
    headerStyle: {
      backgroundColor: "#81d580",
      paddingHorizontal: 10,
    },
    headerTintColor: "white",
    headerRight: <AddButton onPress={() => navigation.navigate("AddDevice")} />,
  })

  state = {
    devices: [],
  }

  serviceFound(service) {
    const {devices} = this.state
    console.log(service)
    switch (service.name) {
      case "DOMOPETS_FoodDispenser": {
        let url = service.txt.url
        this.setState({
          devices: [
            ...devices,
            {
              name: "Food Dispenser",
              icon: {
                type: "material-community",
                name: "silverware-variant",
              },
              component: "FoodDispenser",
              url,
            },
          ],
        })
        break
      }
      case "DOMOPETS_WaterDispenser": {
        let url = `${service.addresses[0]}:${service.port}`
        this.setState({
          devices: [
            ...devices,
            {
              name: "Water Dispenser",
              icon: {
                type: "simple-line-icon",
                name: "drop",
              },
              component: "WaterDispenser",
              url,
            },
          ],
        })
        break
      }
      case "DOMOPETS_LaserController": {
        let url = service.txt.url
        this.setState({
          devices: [
            ...devices,
            {
              name: "Laser Control",
              icon: {
                type: "material-community",
                name: "silverware-variant",
              },
              component: "LaserController",
              url,
            },
          ],
        })
        break
      }
    }
  }

  componentWillMount() {
    zeroconf.scan()
    zeroconf.on("resolved", this.serviceFound.bind(this))
  }
  
  componentWillUnmount() {
    zeroconf.stop()
  }

   formatHtml () {
    return ('<html><body><img src="' + "http://172.20.10.8:8080/stream/video.mjpeg" + '" width="100%" style="background-color: black; min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>');
  }

  render() {
    if (this.state.devices.length === 0) {
      return (
        <ScrollView>
         <Text>😢 You don't have any devices yet...</Text>
        
        </ScrollView>
      )
    }

    const {navigate} = this.props.navigation

    return (
      <List>
        {this.state.devices.map(d =>
          <ListItem
            key={d.name}
            title={d.name}
            leftIcon={d.icon}
            onPress={() => navigate(d.component, {url: d.url})}
          />,
        )}
      </List>
    )
  }
}
