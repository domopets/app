import React, {Component} from "react"
import glamorous, {View} from "glamorous-native"
import {Button, CheckBox} from "react-native-elements"
import DateTimePicker from "react-native-modal-datetime-picker"
import io from "socket.io-client"
import {connect} from "react-redux"
import socket from "../socket"

const MainView = glamorous.view({
  flex: 1,
  justifyContent: "space-around",
})
const WeightText = glamorous.text({
  fontSize: 60,
  textAlign: "center",
})

class WaterDispenser extends Component {
  static navigationOptions = {
    title: "Water Dispenser",
  }

  get id() {
    return this.props.navigation.state.params.id
  }

  get weight() {
    const weight = this.props.modules[this.id].weight
    return weight < 0 ? 0 : weight
  }

  state = {
    isDateTimePickerVisible: false,
  }

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true})

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false})

  _handleDatePicked = date => {
    socket.emit("dispatch", {
      action: "schedule",
      id: this.id,
      payload: {
        h: date.getHours(),
        m: date.getMinutes(),
      },
    })
    this._hideDateTimePicker()
  }

  tare() {
    socket.emit("dispatch", {
      action: "tare",
      id: this.id,
    })
  }

  dispenseWater() {
    socket.emit("dispatch", {
      action: "dispenseWater",
      id: this.id,
    })
  }

  render() {
    return (
      <MainView>
        <WeightText>
          {this.weight} g
        </WeightText>
        <View>
          <Button
            title="Dispense Water"
            backgroundColor="#325f96"
            borderRadius={50}
            buttonStyle={{marginBottom: 30}}
            onPress={() => this.dispenseWater()}
          />
          <Button
            title="Tare"
            borderRadius={50}
            onPress={() => this.tare()}
            buttonStyle={{marginBottom: 30}}
          />
          <CheckBox
            title="AutoFeed"
            checked={this.state.checked}
            containerStyle={{
              backgroundColor: "transparent",
            }}
            backgroundColor="transparent"
            onPress={() => {
              if (this.state.checked) {
                socket.emit("dispatch", {
                  action: "unschedule",
                  id: this.id,
                })
              }
              this.setState({checked: !this.state.checked})
            }}
          />
          <Button
            title="Schedule"
            backgroundColor="#81d580"
            borderRadius={50}
            onPress={() => this._showDateTimePicker()}
            disabled={!this.state.checked}
          />
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="time"
          is24Hour={true}
        />
      </MainView>
    )
  }
}

export default connect(state => ({modules: state}))(WaterDispenser)
