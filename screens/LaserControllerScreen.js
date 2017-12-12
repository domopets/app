import React, {Component} from "react"
import { StyleSheet, WebView, ScrollView, Dimensions } from 'react-native';
import glamorous, {View} from "glamorous-native"
import {Button} from "react-native-elements"
import io from "socket.io-client"
import { Icon } from 'react-native-elements'

  var styles = StyleSheet.create({
  backgroundVideo: {
    width:400,
    height:322
  }
  })
const MainView = glamorous.view({
  flex: 1,
  justifyContent: "space-around",
})
const WeightText = glamorous.text({
  fontSize: 60,
  textAlign: "center",
})

export default class LaserControllerScreen extends Component {
  state = {
    angleHori: 0,
    angleVert: 0,
  }

  static navigationOptions = {
    title: "Laser Controller",
  }

  get url() {
    return this.props.navigation.state.params.url
  }

  moveRight(angle) {
    this.setState({angleHori: angle})
    this.socket.emit("moveRight", angle)
  }

  moveLeft(angle) {
    this.setState({angleHori: angle})
    this.socket.emit("moveLeft", angle)
  }

  moveUp(angle) {
    this.setState({angleVert: angle})
    this.socket.emit("moveUp", angle)
  }

  moveDown(angle) {
    this.setState({angleVert: angle})
    this.socket.emit("moveDown", angle)
  }

  componentWillMount() {
    this.socket = io(this.url)
    this.setState({angleHori: 90})
    this.setState({angleVert: 90})
    this.moveUp(90)
    this.moveRight(90)
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  formatHtml () {
    return ('<html><body><img src="' + "http://" + this.url.slice(0, -5) + ":8080/stream/video.mjpeg" + '" width="100%" style="background-color: black; min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>');
  }

  render() {
    return (
      <MainView>
        <WebView
          style={styles.backgroundVideo}
          automaticallyAdjustContentInsets={true}
          scalesPageToFit={true}
          startInLoadingState={false}
          contentInset={{top: 0, right: 0, left: 0, bottom: 0}}
          scrollEnabled={false}
          source={{html: this.formatHtml(), baseUrl: '/'}} />
      <View style={{alignItems: 'center'}}>
      <Icon
      type='font-awesome'
      name="chevron-up"
      onPress={() => this.moveUp(this.state.angleVert - 10)}
      />
      <View style={{paddingBottom: 15, paddingTop: 15, flexDirection: 'row'}}>
      <View style={{paddingRight: 50}}>
      <Icon
      type='font-awesome'
      name="chevron-left"
      onPress={() => this.moveLeft(this.state.angleHori - 10)}
      />
      </View>
      <Icon
      type='font-awesome'
      name="chevron-right"
      onPress={() => this.moveRight(this.state.angleHori + 10)}
      />
      </View>
      <Icon
      type='font-awesome'
      name="chevron-down"
      onPress={() => this.moveDown(this.state.angleVert + 10)}
      />
        </View>
      </MainView>
    )
  }
}
