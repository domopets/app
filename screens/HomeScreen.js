import React, {Component} from "react"
import {StyleSheet, View, WebView, ScrollView, Dimensions} from "react-native"
import HTML from "react-native-render-html"
import glamorous, {Text} from "glamorous-native"
import {Icon} from "react-native-elements"
import CenteredView from "../components/CenteredView"
import {List, ListItem} from "react-native-elements"
import {connect} from "react-redux"

var styles = StyleSheet.create({
  backgroundVideo: {
    width: 400,
    height: 322,
  },
})

const AddButton = props =>
  <Icon
    name="ios-add"
    type="ionicon"
    color="white"
    size={30}
    containerStyle={{padding: 10}}
    {...props}
  />

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Domopets",
    headerBackTitle: "Back",
    headerStyle: {
      backgroundColor: "#81d580",
    },
    headerTintColor: "white",
    headerRight: <AddButton onPress={() => navigation.navigate("AddDevice")} />,
  })

  state = {
    modules: {},
  }

  render() {
    if (Object.keys(this.props.modules).length === 0) {
      return (
        <ScrollView>
          <Text>😢 You don't have any modules yet...</Text>
        </ScrollView>
      )
    }

    const {navigate} = this.props.navigation

    return (
      <List>
        {Object.values(this.props.modules).map(d => {
          return (
            <ListItem
              key={d.id}
              title={d.name}
              onPress={() => navigate(d.component, {id: d.id})}
            />
          )
        })}
      </List>
    )
  }
}

export default connect(state => ({modules: state}))(HomeScreen)
