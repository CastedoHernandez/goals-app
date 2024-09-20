import {useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import {StatusBar} from "expo-status-bar/build/StatusBar";

export default function App() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [goals, setGoals] = useState([]);

    function startAddGoalHandler() {
        setModalIsVisible(true);
    }

    function endAddGoalHandler() {
        setModalIsVisible(false);
    }

    function addGoalHandler(enteredGoal) {
        setGoals((currentGoals) => [
            ...goals,
            {text: enteredGoal, id: Math.random().toString()},
        ]);
        endAddGoalHandler()
    }

    function deleteGoalHandler(id) {
        console.log(id);
        setGoals(currentGoals => {
            return currentGoals.filter(goal => goal.id !== id);
        })
    }

    return (
        <>
            <StatusBar barStyle='default'/>
            <View style={styles.appContainer}>
                <Button title='Add new goal' color='#5e0acc' onPress={startAddGoalHandler}/>
                {modalIsVisible && <GoalInput
                    visible={modalIsVisible}
                    onAddGoal={addGoalHandler}
                    onCancel={endAddGoalHandler}
                />}
                <View style={styles.goalsContainer}>
                    <FlatList
                        data={goals}
                        renderItem={itemData => {
                            return <GoalItem
                                text={itemData.item.text}
                                id={itemData.item.id}
                                onDeleteItem={deleteGoalHandler}
                            />;
                        }}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16
    },
    goalsContainer: {
        flex: 4
    }
});
