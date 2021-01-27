import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import * as React from 'react';
import styles from '../../assets/styles/MenuStyles'
import { AppContext } from '../../context/AppContext'
import { registerUser, createRound } from '../../db/dbSetup'
import AsyncStorage from '@react-native-community/async-storage';

export function PlayerAdd({ navigation }) {
  const appContext = React.useContext(AppContext)
  const appState = appContext.value.state

  const [playerCount, setPlayerCount] = React.useState(1)
  const [nameCount, setNameCount] = React.useState(1)

  const player = ((player, index) => {
    if (typeof player === 'string') {
      return (
        <View style={styles.playerRow}>
          <TouchableOpacity key={`plr${index}`} onPress={() => removePlayer(index)}>
            <View style={styles.removePlayer}>
              <Text>
                -
  </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={`player1${index}`}>
            <View style={styles.player} key={`player2${index}`}>
              <TextInput style={styles.playerText} 
               autoFocus={index > 1 && true} 
               selectTextOnFocus={true}
               multiline={true}
               onChangeText={text => changePlayerName(index, text)}>
                {player}
              </TextInput>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  })
  const handleStart = async () => {
    const userRoundID = await createRound(appState.playState.courseId, 1)

    if (appState.playState.player_2) {
      console.log('registering user 2')
      const uid = await registerUser(appState.playState.player_2)
      // Course ID always 1
      const u2roundid = await createRound(appState.playState.courseId, uid)

      console.log('uid after register', uid)
      console.log('u2roundid after register', u2roundid)

      await appContext.dispatch({
        type: 'set_user_2_round_id',
        data: u2roundid
      })

      await AsyncStorage.setItem('u2roundid', `${u2roundid}`)
      await AsyncStorage.setItem('u2name', `${appState.playState.player_2}`)
    }

    if (appState.playState.player_3) {
      console.log('registering user 3')
      const uid = await registerUser(appState.playState.player_3)
      const u3roundid = await createRound(appState.playState.courseId, uid)

      await appContext.dispatch({
        type: 'set_user_3_round_id',
        data: u3roundid
      })
      await AsyncStorage.setItem('u3roundid', `${u3roundid}`)
      await AsyncStorage.setItem('u3name', `${appState.playState.player_3}`)
    }

    if (appState.playState.player_4) {
      console.log('registering user 4')
      const uid = await registerUser(appState.playState.player_4)
      const u4roundid = await createRound(appState.playState.courseId, uid)

      await AsyncStorage.setItem('u4roundid', `${u4roundid}`)
      await AsyncStorage.setItem('u4name', `${appState.playState.player_4}`)

      await appContext.dispatch({
        type: 'set_user_4_round_id',
        data: u4roundid
      })
    }

    await appContext.dispatch({
      type: 'set_round_id',
      data: userRoundID
    })
    
    await appContext.dispatch({
      type: 'set_hole_num',
      data: 1
    })
    
    const saveItems = [['roundID', `${userRoundID}`], ['holeNum', '1']]
    await AsyncStorage.multiSet(saveItems)
    
    await appContext.dispatch({
      type: 'set_view_mode',
      data: 'play'
    })
    // console.log(`saving roundID to async (${userRoundID}) and holeNum 1`)
  }


  const addPlayer = (num) => {
    if (!appState.playState.player_2) {
      appContext.dispatch({
        type: `set_player_2`,
        data: `Player ${nameCount + 1}`
      })
    } else if (!appState.playState.player_3) {
      appContext.dispatch({
        type: `set_player_3`,
        data: `Player ${nameCount + 1}`
      })
    } else if (!appState.playState.player_4) {
      appContext.dispatch({
        type: `set_player_4`,
        data: `Player ${nameCount + 1}`
      })
    }

    setPlayerCount(playerCount + 1)
    setNameCount(nameCount + 1)
  }

  const removePlayer = (num) => {
    console.log('removing player', num)
    if (num !== 1) {
      console.log('removing player', num)
      appContext.dispatch({
        type: `remove_player_${num}`
      })

      setPlayerCount(playerCount - 1)
    }
  }

  const changePlayerName = (num, name) => {
    appContext.dispatch({
      type: `set_player_${num}`,
      data: name
    })
  }

  return (
    <>
     <View style={styles.background}>
    <Image source={require('../../assets/images/vectors/Asset34.png')} style={styles.bgImage}/>
      <View style={styles.container}>
        {player(appContext.value.state.auth_data, 1)}
        {appState.playState.player_2 ? player(appState.playState.player_2, 2) : null}
        {appState.playState.player_3 ? player(appState.playState.player_3, 3) : null}
        {appState.playState.player_4 ? player(appState.playState.player_4, 4) : null}

        {playerCount < 4 &&
          <TouchableOpacity onPress={() => addPlayer(playerCount + 1)}>
            <View style={styles.addPlayer}>
              <Text style={styles.stroke}>
                +
</Text>

            </View>
          </TouchableOpacity>
        }

        <TouchableOpacity onPress={() => handleStart()}>
          <View style={[styles.startRoundButton, styles.startButton]}>
            <Text style={styles.buttonText}>
              Tee Off
</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
    </>
  );
}