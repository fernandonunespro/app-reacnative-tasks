import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  FlatList } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'

import Task from './src/Task'

import api from './src/services/api'

export default function App(){

  async function consulta(){
    const response = await api.get('produtos')
    console.log(response)
  }

  const [task, setTask] = useState('');

  const [list, setList] = useState([])

  function handleAdd(){
    if(task === ''){
      return;
    }

    const dados = {
      key: Date.now(),
      item: task
    }

    setList(oldArray => [dados, ...oldArray]);

    setTask('')

  }

  function handleDelete(item){
    let filtroItem = list.filter((task) => {
      return (task.item !== item)
    })

    setList(filtroItem)
  }

  return(
    <View style={styles.container}> 
      <Text style={styles.title}>Medkan App for Tests</Text>

      <View style={styles.containerInput}>
        <TextInput placeholder='Enter the blood pressure' style={styles.input} value={task} onChangeText={ (text) => setTask(text) }/>

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name='plus' size={20} color='#fff'/>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={( item) => item.key}
        renderItem={ ({ item }) => <Task data={item} deleteItem={ () => handleDelete(item.item)} /> }
        style={styles.list}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#22272e',
    paddingTop: 28,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: 12,
  },
  containerInput:{
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  input:{
    width: '75%',
    backgroundColor: '#FBFBFB',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  buttonAdd:{
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  list:{
    flex:1,
    backgroundColor: '#FFF',
    paddingStart: '4%',
    paddingEnd: '4%'
  }
})