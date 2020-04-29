import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking
} from "react-native";

import MarqueeText from 'react-native-marquee';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: [],
      total_confirmed: "0",
      total_active: "0",
      total_deaths: "0",
      Andhra_total_confirmed: "0",
      Andhra_total_deaths: "0",
      Telanana_total_confirmed: "0",
      Telanana_total_deaths: "0",
      Hyderabad_total_confirmed: "0",
      Hyderabad_total_deaths: "0",
      Hyderabad_total_active: "0",
      Guntur_total_confirmed: "0",
      Guntur_total_active: "0",
      Guntur_total_deaths: "0",
      khammam_total_confirmed: "0",
      khammam_total_active: "0",
      khammam_total_deaths: "0",
      isLoading: "true",
      
      button_text: "Get World stats"
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
        // if (responseJson){
        //   console.log(responseJson.world_total.total_cases);
        //   console.log(responseJson.world_total.total_deaths);
        //   console.log(responseJson.world_total.new_deaths);
        //   console.log(responseJson.world_total.new_cases);
        // }
        this.setState({
            button_text: "Get India stats",
            country: "World",
            total_cases: responseJson.world_total.total_cases,
            total_deaths: responseJson.world_total.total_deaths,
            total_active: responseJson.world_total.active_cases

        });
      })
      .catch(err => {
        console.log(err);
      });
      
  }

  getIndiaStatsfromApi = () => {
    
    this.setState({
      country: "India",
      total_cases: "0",
      total_active: "0",
      total_deaths: "0",
      Andhra_total_confirmed: "0",
      Telanana_total_confirmed: "0",
      Hyderabad_total_confirmed: "0",
      Hyderabad_total_deaths: "0",
      Hyderabad_total_deaths: "0",
      Hyderabad_total_active: "0",
      Guntur_total_confirmed: "0",
      Guntur_total_active: "0",
      Guntur_total_deaths: "0",
      Andhra_total_deaths: "0",
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
          button_text: "Get World stats",
          isLoading: "false",
          total_cases: responseJson.total_values.confirmed,
          total_active: responseJson.total_values.active,
          total_deaths: responseJson.total_values.deaths,
          
          Telanana_total_confirmed: responseJson.state_wise["Telangana"].active,
          Telanana_total_deaths: responseJson.state_wise["Telangana"].deaths,
          Hyderabad_total_confirmed:
            responseJson.state_wise["Telangana"].district["Hyderabad"]
              .confirmed,
              Hyderabad_total_deaths: responseJson.state_wise["Telangana"].district["Hyderabad"].deceased,
              Hyderabad_total_active: responseJson.state_wise["Telangana"].district["Hyderabad"].active,
         Andhra_total_confirmed:
            responseJson.state_wise["Andhra Pradesh"].active,
            Andhra_total_deaths:
            responseJson.state_wise["Andhra Pradesh"].deaths,
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
        <Text style = {{fontSize:30,fontWeight:'bold'}}>Covid19 Tracker</Text>
          <Image
            style={{ height: 450, width: 450 }}
            source={require("./assets/activity_indicator2.gif")}
          />
          <Text style={{ fontSize: 25, marginTop: 20 }}>Loading....</Text>
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
            <TouchableOpacity
             onPress={ ()=> Linking.openURL('https://www.who.int/health-topics/coronavirus#tab=tab_1') }
             >
             <MarqueeText
          style={{textDecorationLine: 'underline', fontSize: 20,color:'white',marginTop:10 }}
          duration={5000}
          marqueeOnStart
          loop = 'true'
          marqueeDelay={2000}
          marqueeResetDelay={100}
        >
        Tap on this scrolling to know about Corona virus symptoms and precautions.
        
          
        </MarqueeText>
        <MarqueeText
        style={{ fontSize: 20,color:'red',marginTop:10 }}
          duration={12000}
          marqueeOnStart
          loop = 'true'
          marqueeDelay={2000}
          marqueeResetDelay={2000}>
        
            Have symptoms or doubts ? Helpline :+91-11-23978046 and Toll Free : 1075 ,
            (India only)
           
           
        </MarqueeText>
           
            </TouchableOpacity>
        
           
          </View>

          <View style={styles.india}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 40 }}>{this.state.country}</Text>
            </View>

            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 20, color: "white" }}>
                Confirmed: {this.state.total_cases}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "#32F0FF" }}>
                Active: {this.state.total_active}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "#E8290B" }}>
                Deaths: {this.state.total_deaths}{" "}
              </Text>
            </View>
            <View style = {{alignItems:'center',justifyContent:'center',marginTop:40}}>
              <TouchableOpacity
              onPress = {() => {
                
                if(this.state.button_text == "Get World stats")
                {
                  this.setState({button_text: "Loading world stats wait...."});
                  this.getWorldStatsfromApi();
                }
                else{
                 this.setState({button_text: "Get World stats"});
                  this.getIndiaStatsfromApi();
                }
                }}>
                <Text style = {{
                  fontSize:18,
                  borderWidth:1.5,
                  padding:8,
                  borderRadius:15,
                  borderColor:'white',
                  color:'#32F0FF'}}>
                  {this.state.button_text}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.andhra}>
          
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ color: "white", fontSize: 30 }}>
                Telugu States
              </Text>
            </View>

            <View style={{ marginLeft: 20, marginTop: 20 }}>
              
              <Text style={{ marginTop: 10, fontSize: 20, color: "white" }}>
                TS Confirmed: {this.state.Telanana_total_confirmed}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "white" }}>
                TS Deaths: {this.state.Telanana_total_deaths}{" "}
              </Text>
              
              <Text style={{ marginTop: 10, fontSize: 20, color: "white" }}>
                Hyderabad Confirmed: {this.state.Hyderabad_total_confirmed}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "#32F0FF" }}>
                Hyderabad active: {this.state.Hyderabad_total_active}{" "}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 20, color: "red" }}>
                Hyderabad Deaths: {this.state.Hyderabad_total_deaths}{" "}
              </Text>
              <Text style={{ marginTop:10,fontSize: 20, color: "white" }}>
                AP Confirmed: {this.state.Andhra_total_confirmed}{" "}
              </Text>
              <Text style={{marginTop:10, fontSize: 20, color: "white" }}>
                AP Deaths: {this.state.Andhra_total_deaths}{" "}
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
          <View style={{ height: 120,marginTop:10,alignItems:'center',justifyContent:'center' }}>
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
            <Text style = {{marginTop:20,color:'white',fontSize:10}}>
                Developed by Varun Kommuri,  © 2020.
              </Text>
              <Text style = {{marginTop:5,color:'white',fontSize:10}}>
               Stats information from multiple sources
              </Text>
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
