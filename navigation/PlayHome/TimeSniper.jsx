import { View, Text, TouchableOpacity, Image } from "react-native";
import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AppContext } from "../../context/AppContext";
import styles from "../../assets/styles/MenuStyles";
import AsyncStorage from "@react-native-community/async-storage";
import { Switch } from "react-native";
import dayjs from "dayjs";
import { ActivityIndicator } from "react-native";
import { authenticatedAxios } from "../../helpers/authenticatedAxios";

export function TimeSniper({ navigation }) {
  const appContext = React.useContext(AppContext);
  const [saving, setSaving] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Save Times");

  const getSavedTimes = async () => {
    const savedTimes = await AsyncStorage.getItem("snipeTimes");
    console.log(
      "🚀 ~ file: TimeSniper.jsx ~ line 19 ~ getSavedTimes ~ savedTimes",
      savedTimes
    );
    const saveTimeObj = JSON.parse(savedTimes);
    if (Object.keys(savedTimes).length > 0) {
      setDayData(saveTimeObj);
    }
  };

  React.useEffect(() => {
    getSavedTimes();
  }, []);

  const [dayData, setDayData] = React.useState({
    Monday: {
      active: false,
      startValue: new Date(2000, 1, 1, 7),
      endValue: new Date(2000, 1, 1, 21)
    },
    Tuesday: {
      active: false,
      startValue: new Date(2000, 1, 1, 7),
      endValue: new Date(2000, 1, 1, 21)
    },
    Wednesday: {
      active: false,
      startValue: new Date(2000, 1, 1, 7),
      endValue: new Date(2000, 1, 1, 21)
    },
    Thursday: {
      active: false,
      startValue: new Date(2000, 1, 1, 7),
      endValue: new Date(2000, 1, 1, 21)
    },
    Friday: {
      active: false,
      startValue: new Date(2000, 1, 1, 7),
      endValue: new Date(2000, 1, 1, 21)
    },
    Saturday: {
      active: false,
      startValue: new Date(2000, 1, 1, 7),
      endValue: new Date(2000, 1, 1, 21)
    },
    Sunday: {
      active: false,
      startValue: new Date(2000, 1, 1, 7),
      endValue: new Date(2000, 1, 1, 21)
    }
  });

  const toggleDay = (day) => {
    setDayData({
      ...dayData,
      [day]: {
        ...dayData[day],
        active: !dayData[day].active
      }
    });
  };

  const setTime = (day, time, type) => {
    console.log(
      "🚀 ~ file: TimeSniper.jsx ~ line 82 ~ setTime ~ day, time, type",
      day,
      time,
      type
    );
    // if (type === "START") {
    //   if (dayData[day].endValue < time) {
    //     return;
    //   }
    //   setDayData({
    //     ...dayData,
    //     [day]: {
    //       ...dayData[day],
    //       startValue: time
    //     }
    //   });
    // }
    // if (type === "END") {
    //   if (dayData[day].startValue > time) {
    //     return;
    //   }
    //   setDayData({
    //     ...dayData,
    //     [day]: {
    //       ...dayData[day],
    //       endValue: time
    //     }
    //   });
    // }

    // console.log(dayjs(dayData.Monday.startValue).format("HH:mm"));
  };

  const saveTimes = async () => {
    setSaving(true);
    // try {
    //   await AsyncStorage.setItem("snipeTimes", JSON.stringify(dayData));
    //   // await authenticatedAxios("PUT", `${config.api2}notifications`, {
    //   //   notificationData: dayData
    //   // });
    //   setSaving(false);
    //   setButtonText("Saved!");
    // } catch (error) {
    //   console.log(
    //     "🚀 ~ file: TimeSniper.jsx ~ line 136 ~ saveTimes ~ error",
    //     error
    //   );
    //   setButtonText("Error!");
    // }
  };

  return (
    <View style={styles.background}>
      <Image
        source={require("../../assets/images/vectors/Asset54.png")}
        style={styles.bgImage}
      />
      <View style={styles.container}>
        {Object.keys(dayData).map((day) => {
          return (
            <View style={styles.dayRow} key={day}>
              <Text style={styles.dayName}>{day}</Text>
              <Switch
                value={dayData[day].active}
                onValueChange={() => toggleDay(day)}
              />

              {dayData[day].active && (
                <View style={styles.timePickerRow}>
                  <View style={styles.timePickerColumn}>
                    <Text>Start</Text>
                    <DateTimePicker
                      testID="Test"
                      mode="time"
                      style={styles.dateTimePicker}
                      value={dayData[day].startValue}
                      onChange={(event, selectedDate) =>
                        setTime(day, selectedDate, "START")
                      }
                    />
                  </View>
                  <View style={styles.timePickerColumn}>
                    <Text>End</Text>
                    <DateTimePicker
                      testID="Test"
                      mode="time"
                      style={styles.dateTimePicker}
                      value={dayData[day].endValue}
                      onChange={(event, selectedDate) =>
                        setTime(day, selectedDate, "END")
                      }
                    />
                  </View>
                </View>
              )}
            </View>
          );
        })}
        <TouchableOpacity onPress={() => saveTimes()}>
          <View style={[styles.styledButton, styles.playButton]}>
            {saving ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.buttonText}>{buttonText}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
