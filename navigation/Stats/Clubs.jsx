import { View, Text, TouchableOpacity,SafeAreaView, FlatList, Image, Modal, ImageBackground} from 'react-native';
import * as React from 'react';
import * as Linking from 'expo-linking';
import GolfLogo from '../../assets/svg/GolfLogo'
import styles from '../../assets/styles/StatStyles'
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { StatContext } from '../../context/StatContext'
import { Theme } from '../../assets/styles/Theme'
const { width } = Dimensions.get('window');

export function Clubs({ navigation }) {
  const statContext = React.useContext(StatContext)
  const statState = statContext.value.state
const shotData = statState.shotData
// console.log('87SHOT DATAAA', shotData)

  const [clubView, setClubView] = React.useState(false)
  const carRef = React.useRef(null)

  const handlePress = () => {
    navigation.push('Hole')
  }

  const handleClubView = () => {
    setClubView(!clubView)
  }

  const [index, setIndex] = React.useState(0)

  const dataa = shotData

  const _renderItem = ({item, index}) => {
    return (
        <View style={{width: width -100, margin: 25, height: 500, borderRadius: 50, backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
        //  borderColor: 'black', borderWidth: 2, borderStyle: 'solid'
         }}>
            <Text style={{color: 'black'}} onPress={() => handleClubView()}>{ item.name }</Text>
            <Text style={{color: 'black'}} onPress={() => handleClubView()}> Max -  {item.max }</Text>
            <Text style={{color: 'black'}} onPress={() => handleClubView()}>Avg -  {item.avg }</Text>
            <Text style={{color: 'black'}} onPress={() => handleClubView()}> Shots - {item.count }</Text>
        </View>
    );
}

const _clubView = () => {
  return(
<SafeAreaView style={{flex: 1, backgroundColor:Theme.spinGreen1, paddingTop: 50,  }}>
<View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
          <Carousel
                  layout={"stack"}
                  ref={carRef}
                  data={dataa}
                  sliderWidth={100}
                  enableMomentum={true}
                  enableSnap={true}
                  itemWidth={width}
                  loop={true}
                  // index={index}
                  renderItem={_renderItem}
                  // onSnapToItem = { indx => setIndex(indx) } 
                  />
            </View>
            </SafeAreaView>
  )
}

  return (
    <>
      <View style={styles.background}>
        <Image source={require('../../assets/images/vectors/Asset52.png')} style={styles.bgImage} />
        <View style={styles.homePageContainer}>

        <Modal animationType="slide" transparent={true} visible={clubView}>
<_clubView />
          </Modal>

          <View style={styles.chartContainer}>
            <Text onPress={() => handleClubView()}>Open Club list</Text>

          </View>


        </View>
      </View>
    </>
  );
}