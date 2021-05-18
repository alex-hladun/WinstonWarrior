import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  Modal
} from "react-native";
import * as React from "react";
import styles from "../../assets/styles/StatStyles";
import { RoundCard } from "./RoundCard";
import XSymbol from "../../assets/svg/XSymbol";
import { AppContext } from "../../context/AppContext";
import { Theme } from "../../assets/styles/Theme";
import Carousel from "react-native-snap-carousel";
import { Alert } from "react-native";
import { deleteRound } from "../../db/dbSetup";

const { width } = Dimensions.get("window");

// Renders into list
export const RoundItem = ({
  round,
  handleRoundSelect,
  includedInHandicap,
  nineHoleRound,
  handleRoundDeleteAlert,
  handleRoundDelete
}) => {
  return (
    <TouchableOpacity
      onPress={() => handleRoundSelect(round.index)}
      onLongPress={() => handleRoundDeleteAlert(round)}
    >
      <View style={nineHoleRound ? styles.nineHoleRoundItem : styles.roundItem}>
        <View style={styles.roundLeft}>
          <Text style={styles.roundCourseName}>
            {round.item.course_name}
            {includedInHandicap && <Text> ✅</Text>}
          </Text>
          <Text style={styles.roundDate}>
            {round.item.end_date && round.item.end_date.slice(0, 10)}
          </Text>
        </View>
        <View style={styles.roundRight}>
          <Text style={styles.roundScoreText}>{round.item.total_score}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export function Rounds() {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;
  const roundHistory = appState.statState.roundHistory;
  const [roundView, setRoundView] = React.useState(false);
  const [round, setRound] = React.useState(null);
  const carRef = React.useRef(null);
  const handicapRounds = appState.statState.hcpRounds;

  const handleRoundDeleteAlert = (round) => {
    Alert.alert("Delete round?", "Round will be gone forever", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          console.log(`delete round ${round.item.round_id}`);
          handleRoundDelete(round.item.round_id);
        }
      }
    ]);
  };

  const handleRoundDelete = async (roundId) => {
    await deleteRound(roundId);
    appContext.value.loadInitialStats(1);
  };

  // Item rendered into flatlist
  const renderItem = (round) => {
    return (
      <RoundItem
        handleRoundSelect={handleRoundSelect}
        round={round}
        includedInHandicap={handicapRounds?.includes(round.item.round_id)}
        nineHoleRound={round.item.calculated_holes_played === 9}
        handleRoundDeleteAlert={handleRoundDeleteAlert}
        handleRoundDelete={handleRoundDelete}
      />
    );
  };

  // The component rendered into the carosuel
  const _renderItem = ({ item, index }) => {
    return <RoundCard handleRoundView={handleRoundView} item={item} />;
  };

  const handleRoundSelect = (roundIndex) => {
    setRound(roundIndex);
    setRoundView(!roundView);
  };
  const handleRoundView = () => {
    setRoundView(!roundView);
  };

  // The carosuel component rendered into the modal
  const _roundView = () => {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Theme.spinGreen1, paddingTop: 50 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Carousel
            layout={"stack"}
            ref={carRef}
            data={roundHistory}
            sliderWidth={100}
            enableMomentum={true}
            enableSnap={true}
            itemWidth={width}
            loop={false}
            firstItem={round}
            initialScrollIndex={7}
            renderItem={_renderItem}
            useScrollView={true}
          />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/Asset52.png")}
          style={styles.bgImage}
        />
        <View style={styles.homePageContainer}>
          <Modal animationType="slide" transparent={true} visible={roundView}>
            <View style={styles.xContainer}>
              <TouchableOpacity onPress={() => handleRoundView()}>
                <Text>
                  <XSymbol />
                </Text>
              </TouchableOpacity>
            </View>
            <_roundView />
          </Modal>

          <SafeAreaView>
            {roundHistory[0] ? (
              <FlatList
                data={roundHistory}
                renderItem={renderItem}
                inverted={true}
                keyExtractor={(item) => `${item.round_id}`}
              />
            ) : (
              <View style={styles.styledButton}>
                <Text>Play a full round to see your history.</Text>
              </View>
            )}
          </SafeAreaView>
        </View>
      </View>
    </>
  );
}
