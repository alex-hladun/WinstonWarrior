import * as React from 'react';
import { AsyncStorage } from 'react-native'
import { loadCourseDetails, loadCourseInfo } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'
import { PlayContext } from '../context/PlayContext'
import { useHandicap } from './useHandicap'
import { AppContext } from '../context/AppContext';
export function useLoadCourseInfoIntoState() {
  const [holeInfo, setHoleInfo] = React.useState({})
  const statContext = React.useContext(StatContext)
  const playContext = React.useContext(PlayContext)
  const appContext = React.useContext(AppContext)
  const hcp = useHandicap(1)

  React.useEffect(() => {
    console.log('LOADING COURSEINFO INTO PLAYSTATE')

    const resetCourseInfo = async () => {
      const courseID = await AsyncStorage.getItem('course_id')
      // console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 17 ~ resetCourseInfo ~ courseID", courseID)
      const courseInfo = await loadCourseInfo(JSON.parse(courseID))
      const sortedCourseInfo = courseInfo.sort((a, b) => a.hcp_rtg - b.hcp_rtg)
      // console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 19 ~ resetCourseInfo ~ sortedCourseInfo", sortedCourseInfo)
      // TODO: Replace with acutal slope and rating
      let courseHandicap = Math.round(hcp * (127 / 113) + (71.8 - 72))

      let courseData = {}

      for (const obj of sortedCourseInfo) {
        courseData[obj.hole_num] = {
          par: obj.hole_par,
          userCourseHandicap: courseHandicap,
          netStrokes: 0,
          hcpRtg: obj.hcp_rtg,
          pinCoords: {
            "latitude": obj.pin_lat,
            "longitude": obj.pin_lng
          },
          camera: {
            center: {
              "latitude": obj.camera_lat,
              "longitude": obj.camera_lng,
            },
            pitch: 0,
            "heading": obj.camera_hdg,
            "altitude": obj.camera_alt,
            "zoom": obj.camera_zm,
          }
        }
      }

      while (courseHandicap > 0) {
        for (const obj of sortedCourseInfo) {
          if (courseHandicap > 0) {
            courseData[obj.hole_num].netStrokes++
            courseHandicap--
          }
        }
      }

      // console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 60 ~ resetCourseInfo ~ courseData", courseData)
      const courseDetails = await loadCourseDetails(JSON.parse(courseID))

      playContext.dispatch({
        type: 'set_course_info',
        data: {
          courseID: courseDetails.course_id,
          courseName: courseDetails.course_name,
          blueRtg: courseDetails.blue_rtg,
          blueSlp: courseDetails.blue_slp,
          blackRtg: courseDetails.black_rtg,
          blackSlp: courseDetails.black_slp,
          blackBlueRtg: courseDetails.black_blue_rtg,
          blackBlueSlp: courseDetails.black_blue_slp,
          whiteRtg: courseDetails.white_rtg,
          whiteSlp: courseDetails.white_slp,
          whiteRedRtg: courseDetails.white_red_rtg,
          whiteRedSlp: courseDetails.white_red_slp,
          redRtg: courseDetails.red_rtg,
          redSlp: courseDetails.red_slp,
          blueWhiteRtg: courseDetails.blue_white_rtg,
          blueWhiteSlp: courseDetails.blue_white_slp,
        }
      })

      playContext.dispatch({
        type: 'set_hole_info',
        data: courseData
      })

      setHoleInfo(courseData)

      appContext.dispatch({
        type: 'done_loading'
      })
    }

    resetCourseInfo()
  }, [])

return holeInfo
}


