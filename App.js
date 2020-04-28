import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      datasource : []
    }
  }

  getStatsfromApi = () => {
    fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
        "x-rapidapi-key": "8435f1e5c0msh85f8903b76ff0a7p14f40fjsn48a933c2b6d4"
      }
    })
      .then(response =>  response.json())
      .then(responseJson => {
        if(responseJson)
       console.log(responseJson.state_wise['Andhra Pradesh'].district['Guntur'].active);
        this.setState({datasource: responseJson.state_wise['Andhra Pradesh'].district['Guntur'].confirmed})
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getStatsfromApi();
  }

  render() {
    return (
      <View style = {{flex:1, justifyContent:'center',alignItems:'center'}}>
        <Text
        style = {{fontSize: 80, fontWeight:'bold'}}

        
        >{this.state.datasource}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
