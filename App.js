import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import worldStats from "./assets/screens/worldStats";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: [],

      india_total_confirmed: "0",
      india_total_active: "0",
      india_total_deaths: "0",
      Andhra_total_confirmed: "0",
      Telanana_total_confirmed: "0",
      Hyderabad_total_confirmed: "0",
      Guntur_total_confirmed: "0",
      Guntur_total_active: "0",
      Guntur_total_deaths: "0"
    };
  }

  getIndiaStatsfromApi = () => {
    
    this.setState({
      india_total_confirmed: "0",
      india_total_active: "0",
      india_total_deaths: "0",
      Andhra_total_confirmed: "0",
      Telanana_total_confirmed: "0",
      Hyderabad_total_confirmed: "0",
      Guntur_total_confirmed: "0",
      Guntur_total_active: "0",
      Guntur_total_deaths: "0",
      isLoading: "true"
      
    });
   // console.log("hi");
    fetch(
      "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",
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
       // console.log("hello");
        this.setState({
          isLoading: "false",
          india_total_confirmed: responseJson.total_values.confirmed,
          india_total_active: responseJson.total_values.active,
          india_total_deaths: responseJson.total_values.deaths,
          Andhra_total_confirmed:
            responseJson.state_wise["Andhra Pradesh"].active,
          Telanana_total_confirmed: responseJson.state_wise["Telangana"].active,
          Hyderabad_total_confirmed:
            responseJson.state_wise["Telangana"].district["Hyderabad"]
              .confirmed,
          Guntur_total_confirmed:
            responseJson.state_wise["Andhra Pradesh"].district["Guntur"]
              .confirmed,
          Guntur_total_active:
            responseJson.state_wise["Andhra Pradesh"].district["Guntur"].active,
          Guntur_total_deaths:
            responseJson.state_wise["Andhra Pradesh"].district["Guntur"]
              .deceased
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getIndiaStatsfromApi();
    // setInterval(function(){this.getIndiaStatsfromApi()}, 10000);
  }
  /* onRefresh() {
    //Clear old data of the list
    //this.setState({ dataSource: [] });
    //Call the Service to get the latest data
    this.forceUpdate();

  } */

  render() {
    if (this.state.isLoading == "true") {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f6f7f9"
          }}
        >
          <Image
            style={{ height: 450, width: 450 }}
            source={require("./assets/activity_indicator.gif")}
          />
          <Text style={{ fontSize: 25, marginTop: 50 }}>Loading....</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.image}>
            <Image
              style={styles.gif}
              source={{
                uri:
                  "https://media.giphy.com/media/MCAFTO4btHOaiNRO1k/source.gif"
              }}
            />
            <Text style = {{color:'white'}}>Covid19</Text>

          </View>

          <View style={styles.india}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 40 }}>India</Text>
            </View>

            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 20, color: "white" }}>
                Confirmed: {this.state.india_total_confirmed}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "#32F0FF" }}>
                Active: {this.state.india_total_active}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "#E8290B" }}>
                Deaths: {this.state.india_total_deaths}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.andhra}>
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ color: "white", fontSize: 30 }}>
                Telugu States
              </Text>
            </View>

            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 20, color: "white" }}>
                AP Confirmed: {this.state.Andhra_total_confirmed}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "white" }}>
                TS Confirmed: {this.state.Telanana_total_confirmed}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "white" }}>
                Hyderabad Confirmed: {this.state.Hyderabad_total_confirmed}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "white" }}>
                Guntur Confirmed: {this.state.Guntur_total_confirmed}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "#32F0FF" }}>
                Guntur active: {this.state.Guntur_total_active}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "#E8290B" }}>
                Guntur deaths: {this.state.Guntur_total_deaths}{" "}
              </Text>
            </View>
          </View>
          <View style={{ height: 100,alignItems:'center',justifyContent:'center' }}>
            <TouchableOpacity
            onPress = {() => {
              
              
              this.getIndiaStatsfromApi()}}>
              <Text style = {{
                color:'#32F0FF',
                fontSize:15,
                borderWidth:1,
                borderColor:'white',
                padding:10,
                borderRadius:14
              }}>Refresh</Text>
            </TouchableOpacity>
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
    marginTop: 60,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001343"
  },
  india: {
    // flex: 1,
    // justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#001343"
  },
  andhra: {
    //flex: 1,

    backgroundColor: "#001343"
  }
});
