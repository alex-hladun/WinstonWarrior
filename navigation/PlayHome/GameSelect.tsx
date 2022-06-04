import * as React from "react";
import { Image, Switch, Text, TouchableOpacity, View } from "react-native";
import styles from "../../assets/styles/MenuStyles";
import { AppContext } from "../../context/AppContext";

export function GameSelect({ navigation }) {
  const appContext = React.useContext(AppContext);
  const appState = appContext.value.state;

  const [teams, setTeams] = React.useState();

  React.useEffect(() => {
    const playerArray = [
      {
        name: appContext.value.state.appState.user_name,
        team: 1
      }
    ];

    if (appState.playState.player_2) {
      playerArray.push({
        name: appState.playState.player_2,
        team: 2
      });
    }
    if (appState.playState.player_3) {
      playerArray.push({
        name: appState.playState.player_3,
        team: 1
      });
    }
    if (appState.playState.player_4) {
      playerArray.push({
        name: appState.playState.player_4,
        team: 2
      });
    }
    setTeams(playerArray);
  }, []);

  const handleStart = async () => {
    // Dispatch teams
    console.log("team", teams);
    let team1Name = "";
    let team2Name = "";
    teams.forEach((player, index) => {
      appContext.dispatch({
        type: "SET_TEAM",
        playerNumber: index + 1,
        team: player.team,
        playerName: player.name
      });

      if (player.team === 1) {
        team1Name = team1Name.concat(
          team1Name.length < 1 ? player.name : ` / ${player.name}`
        );
      } else {
        team2Name = team2Name.concat(
          team2Name.length < 1 ? player.name : ` / ${player.name}`
        );
      }
    });
    console.log(
      "🚀 ~ file: GameSelect.tsx ~ line 80 ~ handleStart ~ team1Name",
      team1Name,
      team2Name
    );
    appContext.dispatch({
      type: "SET_TEAM_NAME",
      number: 1,
      name: team1Name
    });
    appContext.dispatch({
      type: "SET_TEAM_NAME",
      number: 2,
      name: team2Name
    });

    appContext.dispatch({
      type: "SET_GAME_SETTINGS",
      push: true
    });

    await appContext.dispatch({
      type: "set_view_mode",
      data: "play"
    });
  };

  const changeTeam = (index, value) => {
    if (!!teams) {
      const prevTeams = teams.slice();
      prevTeams[index].team = value ? 2 : 1;
      setTeams(prevTeams);
    }
  };

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require("../../assets/images/vectors/Asset34.png")}
          style={styles.bgImage}
        />
        <View style={styles.teamContainer}>
          {!!teams &&
            teams.map((player, index) => (
              <View style={styles.teamRow} key={player.name}>
                <Text style={styles.playerTeamText}>{player.name}</Text>
                <Switch
                  value={player.team === 2}
                  onValueChange={(value) => changeTeam(index, value)}
                />
                <Text style={styles.playerTeamText}>{player.team}</Text>
              </View>
            ))}

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => handleStart()}>
              <View style={[styles.startRoundButton, styles.startButton]}>
                <Text style={styles.buttonText}>Tee Off</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
