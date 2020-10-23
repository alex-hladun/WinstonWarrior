import { View, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import { PlayContext } from '../../context/PlayContext'
import styles from '../../assets/styles/MenuStyles'

export function CourseSelect({ navigation }) {
  const playContext = React.useContext(PlayContext)


  console.log('playContext in CourseSelect', playContext)
  const handlePress = (courseID) => {

    playContext.dispatch({
      type: 'set_course',
      data: courseID
    })
    console.log('going to player list')
    navigation.push('Add Players')
  }


  const courseList = [
    {
      name: 'The Winston Golf Club',
      id: 1
    },
    { name: 'Trickle Creek',
  id: 2}
  ]

  const courseItems = courseList.map((course, index) => {
    return (
      <TouchableOpacity key={`course${index}`} onPress={() => handlePress(course.id)}>
        <View style={styles.courseContainer} key={`coursse${index}`}>
          <Text style={styles.courseText}>
            {course.name}
        </Text>
        </View>
      </TouchableOpacity>
    )
  })

  return (
    <View style={styles.container}>
      {courseItems}
    </View>
  );
}