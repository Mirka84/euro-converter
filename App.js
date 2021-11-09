import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function App() {
  const [cur, setCur] = useState('unknown');
  const [amount, setAmount]=useState(''); 
  const [answer, setAnswer]=useState('');
  const [data, setData]=useState('');
  

  const [number]=[Number(amount)]; 
  const [rate]=[Number(cur)]; 

  React.useEffect(() => {
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=716e64d996de165921a792ede9880663`)
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
      setData(responseData.rates);  
      Object.keys(data);
    });   
  }, [])

  const convert = () => {

    setAnswer(number / rate);

    console.log(Object.keys(data));

  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:18}}>Add amount and select curency</Text>
      <TextInput style={{fontSize: 16, width: 200}} placeholder='amount' 
        onChangeText={text => setAmount(text)} 
        keyboardType="numeric"
        value={amount}/>
      <Picker
        selectedValue={data}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => {
            setData(itemValue)
        }}>
        <Picker.Item label="Select curency" value="" />
        <Picker.Item label={cur} value={cur} />
        {Object.keys((cur) => (<Picker.Item label={cur} value={cur} key={cur} />))}
      </Picker>
      <View style={styles.button}>
      <Button onPress={convert} title="Convert" />
      <Text> {answer} €</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {  
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
  }

});
