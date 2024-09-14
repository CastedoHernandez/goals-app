import {useState} from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

export default function App() {

  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoal(enteredText);
  }

  function addGoalHandler() {
    setGoals((currentGoals) => [
        ...goals,
        { text: enteredGoal, id: Math.random().toString()},
    ]);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder='Yours goals' onChangeText={goalInputHandler}/>
        <Button title='Add Goal' onPress={addGoalHandler}/>
      </View>
      <View style={styles.goalsContainer}>
        <FlatList
          data={goals}
          renderItem={itemData => {
            return (
                <View style={styles.goalItem}>
                  <Text style={styles.goalText}>{itemData.item.text}</Text>
                </View>
            );
          }}
          keyExtractor={(item, index) => { return item.id; }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 4
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'gray',
  },
  goalText: {
    color: 'black'
  }
});
