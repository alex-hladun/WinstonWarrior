import { View, Text, TouchableOpacity, Image } from "react-native";
import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AppContext } from "../../context/AppContext";
import styles from "../../assets/styles/MenuStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Switch } from "react-native";
import { ActivityIndicator } from "react-native";
import { authenticatedAxios } from "../../helpers/authenticatedAxios";
import config from "../../settings.json";
import { TextInput } from "react-native";
const dayjs = require("dayjs");
const dayLookup = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

export function TimeSniper({ navigation }) {
  const [saving, setSaving] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Save Times");
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState(false);
  const [numPlayers, setNumPlayers] = React.useState("2");

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
  const getSavedTimes = async () => {
    const savedTimes = await AsyncStorage.getItem("snipeTimes");
    const saveTimeObj = JSON.parse(savedTimes);

    if (Object.keys(saveTimeObj).length > 0) {
      setDayData({
        Monday: {
          active: saveTimeObj.Monday.active,
          startValue: new Date(saveTimeObj.Monday.startValue),
          endValue: new Date(saveTimeObj.Monday.endValue)
        },
        Tuesday: {
          active: saveTimeObj.Tuesday.active,
          startValue: new Date(saveTimeObj.Tuesday.startValue),
          endValue: new Date(saveTimeObj.Tuesday.endValue)
        },
        Wednesday: {
          active: saveTimeObj.Wednesday.active,
          startValue: new Date(saveTimeObj.Wednesday.startValue),
          endValue: new Date(saveTimeObj.Wednesday.endValue)
        },
        Thursday: {
          active: saveTimeObj.Thursday.active,
          startValue: new Date(saveTimeObj.Thursday.startValue),
          endValue: new Date(saveTimeObj.Thursday.endValue)
        },
        Friday: {
          active: saveTimeObj.Friday.active,
          startValue: new Date(saveTimeObj.Friday.startValue),
          endValue: new Date(saveTimeObj.Friday.endValue)
        },
        Saturday: {
          active: saveTimeObj.Saturday.active,
          startValue: new Date(saveTimeObj.Saturday.startValue),
          endValue: new Date(saveTimeObj.Saturday.endValue)
        },
        Sunday: {
          active: saveTimeObj.Sunday.active,
          startValue: new Date(saveTimeObj.Sunday.startValue),
          endValue: new Date(saveTimeObj.Sunday.endValue)
        }
      });
    }
    setLoading(false);
  };

  const onNumPlayerChange = (val) => {
    if (Number(val) >= 0 && Number(val) < 5) {
      setNumPlayers(val);
    }
  };

  const getAndSetToken = async () => {
    const expoPushTokenString = await AsyncStorage.getItem("expoPushToken");
    const expoPushToken = JSON.parse(expoPushTokenString);

    if (!expoPushToken || expoPushToken === "error") {
      setError(true);
      return;
    } else {
      setToken(expoPushToken);
    }
  };

  React.useEffect(() => {
    getSavedTimes();
    getAndSetToken();
  }, []);

  const sortedDayData = React.useMemo(() => {
    let dayCode = dayjs(Date.now()).day();
    const sorted = [];
    for (let i = 0; i < 7; i++) {
      if (dayCode > 6) {
        dayCode = 0;
      }
      sorted.push({ ...dayData[dayLookup[dayCode]], day: dayLookup[dayCode] });
      dayCode++;
    }

    return sorted;
  }, [dayData]);

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
    if (type === "START") {
      if (dayData[day].endValue < time) {
        return;
      }
      setDayData({
        ...dayData,
        [day]: {
          ...dayData[day],
          startValue: time
        }
      });
    }
    if (type === "END") {
      if (dayData[day].startValue > time) {
        return;
      }
      setDayData({
        ...dayData,
        [day]: {
          ...dayData[day],
          endValue: time
        }
      });
    }
  };

  const saveTimes = async () => {
    const dayState = dayData;
    for (const day of Object.keys(dayData)) {
      dayState[day] = { ...dayState[day], numPlayers };
    }

    setSaving(true);
    try {
      await AsyncStorage.setItem("snipeTimes", JSON.stringify(dayData));
      await authenticatedAxios("PUT", `${config.api2}notifications`, {
        notificationData: dayState,
        expoPushToken: token
      });
      setSaving(false);
      setButtonText("Saved!");
    } catch (error) {
      console.log(
        "🚀 ~ file: TimeSniper.jsx ~ line 136 ~ saveTimes ~ error",
        error
      );
      setButtonText("Error!");
    }
  };

  return (
    <View style={styles.background}>
      <Image
        source={require("../../assets/images/vectors/Asset54.png")}
        style={styles.bgImage}
      />
      <View style={styles.container}>
        {error && (
          <Text>
            There was an error setting up notifications. Make sure you have push
            notifications turned on, and try re-starting the app.
          </Text>
        )}
        <View style={styles.numberOfPlayersContainer}>
          <TextInput
            keyboardType="numeric"
            onChangeText={(val) => onNumPlayerChange(val)}
            value={numPlayers}
            returnKeyType="done"
            maxLength={1}
            style={styles.numberPlayerTextInput}
          />
          <Text style={styles.playerText}>Players</Text>
        </View>
        {!error &&
          sortedDayData.map((day, dayIndex) => {
            return (
              <View style={styles.dayRow} key={day.day}>
                <Text style={styles.dayName}>{day.day}</Text>
                <Switch
                  value={day.active}
                  onValueChange={() => toggleDay(day.day)}
                />

                {day.active && !loading && (
                  <View style={styles.timePickerRow}>
                    <View style={styles.timePickerColumn}>
                      <Text>Start</Text>
                      <DateTimePicker
                        testID="Test"
                        mode="time"
                        style={styles.dateTimePicker}
                        value={day.startValue}
                        onChange={(event, selectedDate) =>
                          setTime(day.day, selectedDate, "START")
                        }
                      />
                    </View>
                    <View style={styles.timePickerColumn}>
                      <Text>End</Text>
                      <DateTimePicker
                        testID="Test"
                        mode="time"
                        style={styles.dateTimePicker}
                        value={day.endValue}
                        onChange={(event, selectedDate) =>
                          setTime(day.day, selectedDate, "END")
                        }
                      />
                    </View>
                  </View>
                )}
              </View>
            );
          })}

        {!error && (
          <TouchableOpacity onPress={() => saveTimes()}>
            <View style={[styles.styledButton, styles.playButton]}>
              {saving ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <Text style={styles.buttonText}>{buttonText}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
