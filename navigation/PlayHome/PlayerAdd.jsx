import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import styles from '../../assets/styles/MenuStyles'
import { AppContext } from '../../context/AppContext'
import { PlayContext } from '../../context/PlayContext'
import { registerUser, createRound } from '../../db/dbSetup'


export function PlayerAdd({ navigation }) {
  const playContext = React.useContext(PlayContext)

  console.log('playcontext in playerAdd', playContext.value.state)
  const appContext = React.useContext(AppContext)
  // console.log('appcontext in playerAdd', appContext.value.state.auth_data)

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
              <TextInput style={styles.playerText} onChangeText={text => changePlayerName(index, text)}>
                {player}
              </TextInput>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  })
  const handleStart = async() => {
    console.log('Starting Game!')

    if(playContext.value.state.player_2) {
      console.log('registering user')
      const uid = await registerUser(playContext.value.state.player_2)

      console.log('uid after register', uid)
    }
    
    appContext.dispatch({
      type: 'set_round_id',
      data: 1
    })
  }


  const addPlayer = (num) => {

    if(!playContext.value.state.player_2) {
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
      <View style={styles.container}>
        {player(appContext.value.state.auth_data, 1)}
        {playContext.value.state.player_2 ? player(playContext.value.state.player_2, 2) : null}
        {playContext.value.state.player_3 ? player(playContext.value.state.player_3, 3) : null}
        {playContext.value.state.player_4 ? player(playContext.value.state.player_4, 4) : null}

        {playerCount < 4 &&
          <TouchableOpacity onPress={() => addPlayer(playerCount + 1)}>
            <View style={styles.addPlayer}>
              <Text>
                +
</Text>

            </View>
          </TouchableOpacity>
        }

          <TouchableOpacity onPress={() => handleStart()}>
            <View style={styles.startRound}>
              <Text>
                Start Round
</Text>

            </View>
          </TouchableOpacity>
      </View>
    </>
  );
}