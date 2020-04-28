import React from "react";
import { StyleSheet, Text, View, Image,ScrollView } from "react-native";

export default class App extends React.Component {
  
        
    
  constructor(props) {
    getWorldStatsfromApi();
    super(props);
    this.state = {
      datasource: [],
      world_total_cases: "0",
      world_total_deaths: "0",
      world_today_cases: "0",
      world_today_deaths: "0"
      
    };
  }

  getWorldStatsfromApi = () => {
   
    fetch(
      "https://corona-virus-world-and-india-data.p.rapidapi.com/api",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
          "x-rapidapi-key": "8435f1e5c0msh85f8903b76ff0a7p14f40fjsn48a933c2b6d4"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson){
          console.log(responseJson.world_total.total_cases);
          console.log(responseJson.world_total.total_deaths);
          console.log(responseJson.world_total.new_deaths);
          console.log(responseJson.world_total.new_cases);
        }
        this.setState({
       
            world_total_cases: responseJson.world_total.total_cases,
            world_total_deaths: responseJson.world_total.total_deaths,
            world_today_cases: responseJson.world_total.new_cases,
            world_today_deaths: responseJson.world_total.new_deaths

        });
      })
      .catch(err => {
        console.log(err);
      });
      
  }
  render() {
    return (
     
      <View style = {styles.container}>
       <ScrollView >
        <View style={styles.image}>
          <Image
            style={styles.gif}
            source={{
              uri: "https://media.giphy.com/media/MCAFTO4btHOaiNRO1k/source.gif"
            }}
          />
        </View>
        <View style={styles.india}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 40 }}>World</Text>
          </View>

          <View style={{ marginLeft: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 20, color: "white" }}>
              Confirmed: {this.state.world_total_cases}
            </Text>
            <Text style={{ marginTop: 10, fontSize: 20, color: "white" }}>
              Deaths: {this.state.world_total_deaths}
            </Text>
            <Text style={{ marginTop: 10, fontSize: 20, color: "white" }}>
              Today's cases: {this.state.world_today_cases}
            </Text>
            <Text style={{ marginTop: 10, fontSize: 20, color: "white" }}>
              Today's deaths: {this.state.world_today_deaths}
            </Text>
          </View>
        </View>
        </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: "#001343"
    
  },
  gif: {
    height: 150,
    width: 150
  },
  image: {
  //  flex: 1,
    marginTop:80,
    marginBottom:30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001343"
  },
  india: {
   // flex: 1,
    // justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "red"
  },
  andhra: {
   //flex: 1,

    backgroundColor: "#001343"
  }
});
