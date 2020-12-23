import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import { PlayContext } from '../../context/PlayContext'
import styles from '../../assets/styles/MenuStyles'
import { loadCourseInfo } from '../../db/dbSetup';
import { useHandicap } from '../../hooks/useHandicap';

export function CourseSelect({ navigation }) {
  const hcp = useHandicap(1)
  const playContext = React.useContext(PlayContext)
  // console.log('playContext in CourseSelect', playContext)
  const handlePress = async (course) => {
    AsyncStorage.setItem('course_id', `${course.id}`)
    playContext.dispatch({
      type: 'set_course',
      data: course.id,
      rtg: course.rtg,
      slp: course.slp
    })

    navigation.push('Add Players')
  }


  const courseList = [
    {
      name: 'The Winston Golf Club',
      id: 1,
      img: require('../../assets/images/winston.jpg'),
      slp: 127,
      rtg: 71.8
    },
    {
      name: 'The Glencoe: Forest',
      id: 2,
      img: require('../../assets/images/glencoe.png'),
      rtg: 71.8,
      slp: 127
    },

  ]

  const courseItems = courseList.map((course, index) => {
    return (
      <TouchableOpacity key={`course${index}`} >
        <View style={styles.courseContainer} key={`coursse${index}`}>
          <View style={styles.row}>
            <Image style={styles.img} source={course.img} />
            <View style={styles.column}>
              <Text style={styles.courseText}>
                {course.name}
              </Text>
              <View style={[styles.styledButton, styles.playButton]}>
                <Text onPress={() => handlePress(course)} style={[styles.buttonText]}>Play</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  })

  return (
    <View style={styles.background}>
      <Image source={require('../../assets/images/vectors/Asset54.png')} style={styles.bgImage} />
      <View style={styles.container}>
        {courseItems}
      </View>
    </View>
  );
}