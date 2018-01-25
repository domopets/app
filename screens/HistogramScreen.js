import React, {Component} from "react"
import {View, Text} from "react-native"
import {connect} from "react-redux"
import {BarChart, AreaChart, XAxis, YAxis} from "react-native-svg-charts"
import {LinearGradient, Stop} from "react-native-svg"
import * as shape from "d3-shape"
import socket from "../socket"

const texts = {
  FOOD: {
    unique: "Votre chat a mangé {} g aujourd'hui.",
    week: "Par semaine",
    ten: "Quantité mangée",
  },
  WATER: {
    unique: "Votre chat a bu {} cL aujourd'hui.",
    week: "Par semaine",
    ten: "Quantités consommées",
  },
  LITTER: {
    unique: "Votre chat pèse {} g",
    week: "Fréquences de vôtre chat dans sa litière",
    ten: "Variation de son poids",
  },
}

const __fakeData__ = {
  unique: 4,
  week: [6, 7, 5, 3, 7, 9, 10],
  ten: [20, 35, 22, 16, 21, 32, 30, 29, 22, 12],
}

class HistogramScreen extends Component {
  static navigationOptions = {
    title: "Charts",
  }

  state = __fakeData__

  get id() {
    return this.props.navigation.state.params.id
  }

  get module() {
    return this.props.modules[this.id]
  }

  componentDidMount() {
    socket.emit("dispatch", {
      action: "histogram",
      id: this.id,
    })
    socket.on("histogram", data => console.log(data))
  }

  render() {
    const histogram = this.module.histogram || __fakeData__

    const barData = [
      {
        values: histogram.week,
      },
    ]
    return (
      <View>
        <Text style={{...textStyle}}>
          {texts[this.module.type].unique.replace(
            "{}",
            histogram.unique.toFixed(),
          )}
        </Text>
        <Text style={{...textStyle}}>
          {texts[this.module.type].week}
        </Text>
        <View style={{height: 200, flexDirection: "row", paddingLeft: 5}}>
          <YAxis
            dataPoints={histogram.week}
            formatLabel={(value, index) => value}
            contentInset={{top: 20, bottom: 20}}
            labelStyle={{color: "grey"}}
          />
          <BarChart
            data={barData}
            style={{flex: 1, marginLeft: 16}}
            contentInset={{top: 20, bottom: 20}}
            renderGradient={({id}) =>
              <LinearGradient id={id} x1="0%" y="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#037aff" stopOpacity={0.8} />
                <Stop offset="100%" stopColor="#037aff" stopOpacity={0.5} />
              </LinearGradient>}
          />
        </View>
        <XAxis
          values={["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]}
          formatLabel={(value, index) => value}
          chartType={XAxis.Type.BAR}
          labelStyle={{color: "grey"}}
          style={{marginLeft: 40}}
        />
        <Text style={{...textStyle}}>
          {texts[this.module.type].ten}
        </Text>
        <AreaChart
          style={{height: 200}}
          dataPoints={histogram.ten}
          contentInset={{top: 30, bottom: 30}}
          curve={shape.curveNatural}
          svg={{
            fill: "rgba(3, 122, 255, 0.2)",
            stroke: "rgb(3, 122, 255)",
          }}
        />
      </View>
    )
  }
}

const textStyle = {
  marginTop: 20,
  marginHorizontal: 10,
  fontSize: 20,
}

export default connect(state => ({modules: state}))(HistogramScreen)
