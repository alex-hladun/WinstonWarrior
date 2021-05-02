import * as React from "react";
import { Alert, Text } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Hole from "../components/Hole";
import { AppContext } from "../context/AppContext";
import NavigationPlay from "../navigation/PlayHome";
import { getScore, retrieveCourseInfo, selectHoles } from "../db/dbSetup";
import AsyncStorage from "@react-native-community/async-storage";
import { LoadingScreen } from "../components/LoadingScreen";
import { useFonts } from "expo-font";
export default function PlayScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 100,
        backgroundColor: "#white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3
      },
      headerTitle: () => {
        return <Text>Winstagram</Text>;
      }
    });
  }, [navigation]);

  const appContext = React.useContext(AppContext);
  const holeInfoLoaded = appContext.value?.state?.playState?.holeInfo?.["1"]
    .camera
    ? true
    : false;
  const appState = appContext.value.state;
  const [initialHole, setInitialHole] = React.useState(1);
  let [fontsLoaded] = useFonts({
    instaFont: require("../assets/fonts/instaFont.ttf"),
    nimbus: require("../assets/fonts/nimbus.ttf")
  });
  React.useEffect(() => {
    appContext.value.loadInitialStats(1);
  }, []);

  React.useEffect(() => {
    // selectHoles();
    let roundID;

    const checkExisting = async () => {
      try {
        roundID = await AsyncStorage.getItem("roundID");
        if (roundID) {
          Alert.alert(
            "Existing Round",
            "Would you like to return to your game?",
            [
              {
                text: "No",
                style: "cancel",
                onPress: () => {
                  appContext.value.doneRound();
                }
              },
              {
                text: "Yes",
                onPress: () => {
                  appContext.dispatch({
                    type: "set_round_id",
                    data: JSON.parse(roundID)
                  });

                  // setHole();
                  checkAndRestoreScores();
                }
              }
            ],
            { cancelable: false }
          );
        }
      } catch (e) {
        // No previus round
      }
    };
    checkExisting();
  }, []);

  const checkAndRestoreScores = async () => {
    const p1roundID = await AsyncStorage.getItem("roundID");
    const p2roundID = await AsyncStorage.getItem("u2roundid");
    const p3roundID = await AsyncStorage.getItem("u3roundid");
    const p4roundID = await AsyncStorage.getItem("u4roundid");
    const liveRoundId = await AsyncStorage.getItem("liveRoundId");
    const p1Score = await getScore(JSON.parse(p1roundID));

    const holeNum = await AsyncStorage.getItem("holeNum");
    setInitialHole(JSON.parse(holeNum));
    // SET hole id ad part of   SETHOLE
    await appContext.value.setHole(JSON.parse(holeNum));

    // Set course holeInfo

    const courseInfo = await retrieveCourseInfo(p1roundID);
    appContext.value.loadInitialCourseData(courseInfo.course_id, 1);

    appContext.dispatch({
      type: "set_course",
      name: courseInfo.name,
      data: courseInfo.course_id,
      rtg: courseInfo.rtg,
      slp: courseInfo.slp
    });

    if (liveRoundId) {
      appContext.dispatch({
        type: "set_live_round",
        value: JSON.parse(liveRoundId)
      });
    }

    let scoreObj = {};
    for (const score of p1Score) {
      scoreObj[score.hole_num] = score.total_shots;
    }
    appContext.dispatch({
      type: "restore_p1_score",
      data: scoreObj
    });

    // TODO: this can be refactored in a loop
    if (p2roundID) {
      const p2name = await AsyncStorage.getItem("u2name");
      let scoreObj2 = {};
      const p2Score = await getScore(JSON.parse(p2roundID));
      for (const score of p2Score) {
        scoreObj2[score.hole_num] = score.total_shots;
      }
      appContext.dispatch({
        type: "restore_p2_score",
        data: scoreObj2,
        name: p2name
      });

      appContext.dispatch({
        type: "set_user_2_round_id",
        data: p2roundID
      });
    }
    if (p3roundID) {
      const p3name = await AsyncStorage.getItem("u3name");
      let scoreObj3 = {};
      const p3Score = await getScore(JSON.parse(p3roundID));
      for (const score of p3Score) {
        scoreObj3[score.hole_num] = score.total_shots;
      }
      appContext.dispatch({
        type: "restore_p3_score",
        data: scoreObj3,
        name: p3name
      });

      appContext.dispatch({
        type: "set_user_3_round_id",
        data: p3roundID
      });
    }
    if (p4roundID) {
      const p4name = await AsyncStorage.getItem("u4name");
      let scoreObj4 = {};
      const p4Score = await getScore(JSON.parse(p4roundID));
      for (const score of p4Score) {
        scoreObj4[score.hole_num] = score.total_shots;
      }
      appContext.dispatch({
        type: "restore_p4_score",
        data: scoreObj4,
        name: p4name
      });

      appContext.dispatch({
        type: "set_user_4_round_id",
        data: p4roundID
      });
    }
    appContext.dispatch({
      type: "set_view_mode",
      data: "play"
    });
  };

  const [state, setState] = React.useState({
    location: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    },
    geocode: null,
    errorMessage: "",
    hole: 1
  });

  let locationUpdate;

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(
      Permissions.LOCATION,
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.NOTIFICATIONS
    );
    if (status !== "granted") {
      setState({
        ...state,
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1.0,
        timeInterval: 1000
      },
      (loc) => {
        setState({
          ...state,
          location: {
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude
          }
        });
      }
    );
  };

  React.useEffect(() => {
    getLocationAsync();
  }, [locationUpdate]);

  return appState.appState?.initialLoading && !fontsLoaded ? (
    <LoadingScreen />
  ) : appState.appState.viewMode === "play" ? (
    appState.appState.loading && !holeInfoLoaded ? (
      <LoadingScreen />
    ) : (
      <Hole location={state.location} initialHole={initialHole} />
    )
  ) : (
    <NavigationPlay />
  );
}
