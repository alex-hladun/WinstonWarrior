import {
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
import * as React from "react";
import { AppContext } from "../../context/AppContext";
import styles from "../../assets/styles/MenuStyles";
import { getCourseVersion } from "../../db/getCourseVersion";
import { versionedCourses } from "../../assets/courses/versionedCourses";
import { addHolesToCourse, createSingleCourse } from "../../db/dbSetup";
import { updateCourse } from "../../db/updateCourse";

export function CourseSelect({ navigation }) {
  const appContext = React.useContext(AppContext);

  const handlePress = async (course) => {
    AsyncStorage.setItem("course_id", `${course.id}`);
    appContext.dispatch({
      type: "set_course",
      name: course.name,
      data: course.id,
      rtg: course.rtg,
      slp: course.slp
    });

    const courseVersion = await getCourseVersion(course.id);
    console.log(
      "🚀 ~ file: CourseSelect.jsx ~ line 30 ~ handlePress ~ courseVersion",
      courseVersion
    );
    const recentVersion = versionedCourses[course.id].version;
    console.log(
      "🚀 ~ file: CourseSelect.jsx ~ line 32 ~ handlePress ~ recentVersion",
      recentVersion
    );

    try {
      if (courseVersion === undefined) {
        console.log("course does not exist, creating");
        await createSingleCourse(versionedCourses[course.id], course.id);
        await addHolesToCourse(versionedCourses[course.id], course.id);
      } else if (courseVersion < recentVersion) {
        console.log("course out of date, updating");
        await updateCourse(versionedCourses[course.id], course.id);
      } else {
        console.log("course in database is up to date");
      }
    } catch (err) {
      console.log("err updating or creating course");
    }

    appContext.value.loadInitialCourseData(course.id, 1);
    navigation.push("Add Players");
  };

  const courseList = [
    {
      name: "The Winston Golf Club",
      id: 1,
      img: require("../../assets/images/winston.jpg"),
      slp: 127,
      rtg: 71.8
    },
    {
      name: "The Glencoe: Forest",
      id: 2,
      img: require("../../assets/images/glencoe.png"),
      rtg: 71.8,
      slp: 127
    },
    {
      name: "Paradise Canyon",
      id: 3,
      img: require("../../assets/images/canyon.png"),
      rtg: 70.6,
      slp: 129
    },
    {
      name: "Blue Devil Golf Club",
      id: 4,
      img: require("../../assets/images/bluedevil.png"),
      rtg: 70.8,
      slp: 130
    },
    {
      name: "Kananaskis (Lorette)",
      id: 5,
      img: require("../../assets/images/kcountry.png"),
      rtg: 70.4,
      slp: 130
    },
  ];

  const courseItems = courseList.map((course, index) => {
    return (
      <TouchableOpacity key={`course${index}`}>
        <View style={styles.courseContainer} key={`coursse${index}`}>
          <View style={styles.row}>
            <Image style={styles.img} source={course.img} />
            <View style={styles.column}>
              <Text style={styles.courseText}>{course.name}</Text>
              <View style={[styles.styledButton, styles.playButton]}>
                <Text
                  onPress={() => handlePress(course)}
                  style={[styles.buttonText]}
                >
                  Play
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.background}>
      <Image
        source={require("../../assets/images/vectors/Asset54.png")}
        style={styles.bgImage}
      />
      <View style={styles.container}>{courseItems}</View>
    </View>
  );
}
