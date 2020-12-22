import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import styles from '../../assets/styles/MenuStyles'
import { AppContext } from '../../context/AppContext'
import { PlayContext } from '../../context/PlayContext'
import { registerUser, createRound } from '../../db/dbSetup'
import AsyncStorage from '@react-native-community/async-storage';
// import { useLoadCourseInfoIntoState } from '../../hooks/useLoadCourseInfoIntoState';

export function PlayerAdd({ navigation }) {
  // const anything = useLoadCourseInfoIntoState()
  const playContext = React.useContext(PlayContext)
  const playState = playContext.value.state

  // console.log('playcontext in playerAdd', playContext.value.state)
  const appContext = React.useContext(AppContext)
  // console.log('appcontext in playerAdd', appContext.value.state)
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
    console.log('Starting Game!')


    const userRoundID = await createRound(playState.course_id, 1)

    if (playContext.value.state.player_2) {
      console.log('registering user 2')
      const uid = await registerUser(playContext.value.state.player_2)
      // Course ID always 1
      const u2roundid = await createRound(playState.course_id, uid)

      console.log('uid after register', uid)
      console.log('u2roundid after register', u2roundid)

      await appContext.dispatch({
        type: 'set_user_2_round_id',
        data: u2roundid
      })

      await AsyncStorage.setItem('u2roundid', `${u2roundid}`)
      await AsyncStorage.setItem('u2name', `${playContext.value.state.player_2}`)

      await appContext.dispatch({
        type: 'set_user_2_name',
        data: playContext.value.state.player_2
      })
    }

    if (playContext.value.state.player_3) {
      console.log('registering user 3')
      const uid = await registerUser(playContext.value.state.player_3)
      const u3roundid = await createRound(playState.course_id, uid)

      await appContext.dispatch({
        type: 'set_user_3_round_id',
        data: u3roundid
      })
      await AsyncStorage.setItem('u3roundid', `${u3roundid}`)
      await AsyncStorage.setItem('u3name', `${playContext.value.state.player_3}`)

      await appContext.dispatch({
        type: 'set_user_3_name',
        data: playContext.value.state.player_3
      })
    }

    if (playContext.value.state.player_4) {
      console.log('registering user 4')
      const uid = await registerUser(playContext.value.state.player_4)
      const u4roundid = await createRound(playState.course_id, uid)

      await AsyncStorage.setItem('u4roundid', `${u4roundid}`)
      await AsyncStorage.setItem('u4name', `${playContext.value.state.player_4}`)

      await appContext.dispatch({
        type: 'set_user_4_round_id',
        data: u4roundid
      })

      await appContext.dispatch({
        type: 'set_user_4_name',
        data: playContext.value.state.player_4
      })
    }

    await appContext.dispatch({
      type: 'set_round_id',
      data: userRoundID
    })
    await appContext.dispatch({
      type: 'set_hole_id',
      data: 1
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
    if (!playContext.value.state.player_2) {
      playContext.dispatch({
        type: `set_player_2`,
        data: `Player ${nameCount + 1}`
      })
    } else if (!playContext.value.state.player_3) {
      playContext.dispatch({
        type: `set_player_3`,
        data: `Player ${nameCount + 1}`
      })
    } else if (!playContext.value.state.player_4) {
      playContext.dispatch({
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
      playContext.dispatch({
        type: `remove_player_${num}`
      })

      setPlayerCount(playerCount - 1)
    }
  }

  const changePlayerName = (num, name) => {
    playContext.dispatch({
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
        {playContext.value.state.player_2 ? player(playContext.value.state.player_2, 2) : null}
        {playContext.value.state.player_3 ? player(playContext.value.state.player_3, 3) : null}
        {playContext.value.state.player_4 ? player(playContext.value.state.player_4, 4) : null}

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