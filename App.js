import React, { Component, CreateContext } from 'react';
import {
  FlatList,
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Button,
  Image,
  Alert,
} from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Avatar, Input } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { numberWithCommas, getCurrentDate, del, save, load, update, summarylist, letterhandle, numberhandle} from './format';
import { FontAwesome } from "@expo/vector-icons";


function Income() {
  
  const [tsource, setSource] = useState();
  const [tamount, setAmount] = useState();
  const [tincome, setIncome] = useState();
  const [texpense, setExpense] = useState();
  const [sourcetexts, setStext] = useState([]);
  


  const onScreenLoad = () => {
    update(setStext)
    load(setStext, "i", setExpense, setIncome);
    
  };
  
  useEffect(() => {
    onScreenLoad();
  }, []);

  const inputtext = React.createRef();
  const inputnumber = React.createRef();

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.header1}>
      <Text style={styles.textHeader}>Pondo Expense Tracker</Text>
    </View>
      <ScrollView style={styles.maincontent}>
        <Text style={styles.h4}>ADD INCOME</Text>
        <Text style={styles.mtb}>Source</Text>
        <TextInput 
          ref={inputtext}
          placeholder="Enter Source..."
          style={styles.input}
          keyboardType="default"
          autoCapitalize='words'
          value={tsource}
          carethidden={true}
          contextMenuHidden={true}
          autoCorrect={false}
          autoCompleteType='off'
          onChangeText={(text) => letterhandle(text, setSource, inputtext, tsource)}
          maxLength={10}
        />
        <Text style={styles.mtb}>{`Amount`}</Text>
        <TextInput
          ref={inputnumber}
          placeholder="Enter Amount..."
          style={styles.input}
          keyboardType="numeric"
          carethidden={true}
          contextMenuHidden={true}
          autoCorrect={false}
          autoCompleteType='off'
          value={tamount}
          onChangeText={(text) => numberhandle(text, setAmount, inputnumber, tamount)}
          maxLength={7}
        /> 
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => {save(tsource, tamount, "i", setSource, setAmount); load(setStext, "i", setExpense, setIncome)                         }}>
          <Text style={styles.btnText}>Add Transaction</Text>
        </TouchableOpacity>

        <Text style={styles.h4}>History</Text>
        <FlatList 
          data={sourcetexts}
          renderItem={({item}) => 
          <View style={styles.lcontent}>
          <Text style={{width: '30%', backgroundColor: 'white', padding: 10,}}>
            {item.source}
          </Text>
          <Text style={{marginRight: 30}}>{item.date}</Text>
          <Text style={{width: '25%', backgroundColor: 'white'}}>{'\u20B1'}{numberWithCommas(Math.abs(+item.amount).toFixed(2))}</Text>
          <TouchableOpacity
            style={[styles.listItem, +item.amount < 0 ? styles.minus : styles.plus]}
          >
          <View style={styles.listItemView}>
            <View style={styles.viewWrapper}>
            <FontAwesome
              name="remove"
              size={20}
              color="firebrick"
              onPress={() =>
              Alert.alert(
                "Delete Transaction",
                "Are you sure you want to delete this transaction?",
                [
                  { text: "Yes", onPress: () => {del(item.id); load(setStext, "i", setExpense, setIncome) }},
                  { text: "No" },
                ]
              )
              } 
            />
            </View>
          </View>
          </TouchableOpacity>
          </View>
          }
        />  
      </ScrollView>
    </SafeAreaView>
  );
}

function Expense({ navigation }) {

  const [tsource, setSource] = useState();
  const [tamount, setAmount] = useState();
  const [tincome, setIncome] = useState();
  const [texpense, setExpense] = useState();
  const [sourcetexts, setStext] = useState([]);

  const inputtext = React.createRef();
  const inputnumber = React.createRef();

  const newTransaction = 
  {
    source: tsource,
    amount: tamount,
    date: getCurrentDate().current,
  };

  const isFocused = useIsFocused();

  React.useEffect(() => {
    load(setStext, "f", setExpense, setIncome);
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header1}>
      <Text style={styles.textHeader}>Pondo Expense Tracker</Text>
    </View>
      <ScrollView style={styles.long}>

        <View style={styles.container1}>
          <View style={[styles.box, styles.firstBox]}>
            <Text style={styles.h40}>BALANCE</Text>
            <Text style={styles.h40}>
              {'\u20B1'}
              {numberWithCommas((+tincome).toFixed(2))}
            </Text>

            <Text style={styles.money}></Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.h40}>Expenses</Text>
            <Text style={styles.h40}>
              {'\u20B1'}
              {numberWithCommas(Math.abs(+texpense).toFixed(2))}
            </Text>

            <Text style={styles.money}></Text>
          </View>
        </View>

        <Text style={styles.expenseText}>Add Expense</Text>
        <Text style={styles.mtb}>Source</Text>
        <TextInput
           ref={inputtext}
          placeholder="Enter Source..."
          style={styles.input}
          keyboardType="default"
          autoCapitalize='words'
          value={tsource}
          carethidden={true}
          contextMenuHidden={true}
          autoCorrect={false}
          autoCompleteType='off'
          onChangeText={(text) => letterhandle(text, setSource, inputtext, tsource)}
          maxLength={10}
        />
        <Text style={styles.mtb}>{`Amount`}</Text>
         <TextInput
          ref={inputnumber}
          placeholder="Enter Amount..."
          style={styles.input}
          keyboardType="numeric"
          carethidden={true}
          contextMenuHidden={true}
          autoCorrect={false}
          autoCompleteType='off'
          value={tamount}
          onChangeText={(text) => numberhandle(text, setAmount, inputnumber, tamount)}
          maxLength={7}
        /> 
       <TouchableOpacity 
          style={styles.btn} 
          onPress={() => {save(tsource, tamount, "f", setSource, setAmount); load(setStext, "f", setExpense, setIncome);                         }}>
          <Text style={styles.btnText}>Add Transaction</Text>
        </TouchableOpacity>
        
        <Text style={styles.h4}>History</Text>
        
        <FlatList 
          data={sourcetexts}
          renderItem={({item}) => 
          <View style={styles.lcontent}>
           <Text style={{width: '30%', backgroundColor: 'white', padding: 10,}}>
            {item.source}
          
          </Text>
          <Text style={{marginRight: 30}}>{item.date}</Text>
           <Text style={{width: '25%', backgroundColor: 'white'}}>{'\u20B1'}{numberWithCommas(Math.abs(+item.amount).toFixed(2))}</Text>
            <TouchableOpacity
      style={[styles.listItem, +item.amount < 0 ? styles.minus : styles.plus]}
    >
      <View style={styles.listItemView}>
        <View style={styles.viewWrapper}>
          <FontAwesome
            name="remove"
            size={20}
            color="firebrick"
            onPress={() =>
              Alert.alert(
                "Delete Transaction",
                "Are you sure you want to delete this transaction?",
                [
                  { text: "Yes", onPress: () => {del(item.id); load(setStext, "f", setExpense, setIncome) }},
                  { text: "No" },
                ]
              )
            }
          />
          
        </View>
        
      </View>
    </TouchableOpacity>
          </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Summary({ navigation }) {


  const [sourcetexts, setStext] = useState([]);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    summarylist(setStext)
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header1}>
      <Text style={styles.textHeader}>Pondo Expense Tracker</Text>
    </View>
      <ScrollView style={styles.summary}>
        <Text style={styles.summaryText}>SUMMARY</Text>
        <Text style={styles.summaryText}>HISTORY</Text>

        <View style={styles.container2}>
          <Text style={styles.welcome}>MONTH</Text>
          <Text style={styles.welcome}>EXPENSE</Text>
          <Text style={styles.welcome}>SAVINGS</Text>
        </View>

        <FlatList 
          data={sourcetexts}
          renderItem={({item}) => 
          <View style={styles.scontent}>
           <Text>
            {item.date}
           </Text>
           <Text>{'\u20B1'}{numberWithCommas((+item.monthexpense).toFixed(2))}</Text>
           <Text>
              {'\u20B1'}{numberWithCommas((+item.monthsavings).toFixed(2))}
              
            </Text>
            </View>
            }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  
  const [splash, setSplash] = useState(true);

  

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 4000);
  }, []);

  return splash ? 
  (
    <View style={styles.lov}>
      <Image style={styles.logo} source={require('./assets/icon.png')} />
    </View>) :
    (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Income') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Expense') {
              iconName = focused ? 'akar-icons:search' : 'ios-list';
            } else if (route.name === 'Summary') {
              iconName = focused ? 'ios-people' : 'ios-people';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#003049',
          inactiveTintColor: 'grey',
        }}>
        <Tab.Screen name="Income" component={Income} />
        <Tab.Screen name="Expense" component={Expense} />
        <Tab.Screen name="Summary" component={Summary} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#f0f0f2',
    //paddingTop: 0,
  },


  header1:{
    height: 100,
    alignSelf: "stretch",
    backgroundColor: "#003049",
    paddingTop:30,
    
  },
  header:{
    height: 60,
    alignSelf: 'stretch',
    padding: 22,
    backgroundColor: '#f0f0f2',
  },
  maincontent: {
    height: 60,
    alignSelf: 'stretch',
    padding: 22,
    backgroundColor: '#f0f0f2',
  },
   textHeader: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 23,
    marginTop: 10,
  },
 
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 23,
  },
 
 
  input: {
    borderRadius: 5,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 12,
    textTransform: "capitalize"
  },
  mtb: {
    marginTop: 10,
    marginBottom: 5,
  },
  btn: {
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#003049',
    padding: 9,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  h4: {
    fontSize: 20,
    color: '#003049',
    textTransform: 'uppercase',
    borderBottomColor: '#a9d6e5',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 40,
    fontWeight:'bold',
    alignSelf:"center",
  },
  expenseText:
  {
    fontSize: 20,
    color: '#003049',
    textTransform: 'uppercase',
    borderBottomColor: '#a9d6e5',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 40,
    fontWeight:'bold',
    alignSelf:"center",
  },
  h40: {
    fontSize: 25,
    color: '#003049',
    textTransform: 'uppercase',
    borderBottomColor: '#003049',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 35,
  },
  subTitle: {
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  container1: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    backgroundColor: 'white',
 
  },
  box: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
  firstBox: {
    borderRightColor: '#003049',
    borderRightWidth: 1,

  },
  money: {
    fontSize: 20,
    letterSpacing: 1,
    margin: 5,
  },
  container2: {
    height: 90,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    flex: 1,
    margin: 10,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#003049',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  summary: {
    padding: 22,
    backgroundColor: '#f0f0f2',
  },
  long: {
    backgroundColor: '#f0f0f2',
    paddingHorizontal: 10,
    marginTop: 10
  },
  summaryText:
  {
    fontSize: 20,
    color: '#003049',
    textTransform: 'uppercase',
    borderBottomColor: '#a9d6e5',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    fontWeight:'bold',
    alignSelf:"center",
  },
  lcontent: {
    flex:1, 
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: 'white',
  },
  scontent: {
    flex:1, 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-around", 
    marginVertical: 5,
    backgroundColor: 'white',
  },
  logo: {
    height: 200,
    width: 200,
    margin: '50%',
    alignSelf: "center",
    alignContent: "center"
  },
  splashlogo: {
    flex: 1,
    backgroundColor: 'white',
    //paddingTop: 0,
  },
});

export default App;
