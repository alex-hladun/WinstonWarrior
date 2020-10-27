import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import { PlayContext } from '../../context/PlayContext'
import styles from '../../assets/styles/MenuStyles'

export function CourseSelect({ navigation }) {
  const playContext = React.useContext(PlayContext)
  // console.log('playContext in CourseSelect', playContext)
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
      id: 1,
      img: '../../assets/images/winston.jpg'
    },

  ]

  const courseItems = courseList.map((course, index) => {
    return (
      <TouchableOpacity key={`course${index}`} >
        <View style={styles.courseContainer} key={`coursse${index}`}>
          <View style={styles.row}>
            <Image style={styles.img} source={require('../../assets/images/winston.jpg')} />
            <View style={styles.column}>
              <Text style={styles.courseText}>
                {course.name}
              </Text>
              <View style={[styles.styledButton, styles.playButton]}>
                <Text onPress={() => handlePress(course.id)} style={[styles.buttonText]}>Play</Text>
              </View>
            </View>
          </View>
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