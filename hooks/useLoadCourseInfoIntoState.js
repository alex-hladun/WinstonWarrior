import * as React from 'react';
import { AsyncStorage } from 'react-native'
import { loadCourseDetails, loadCourseInfo } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'
import { PlayContext } from '../context/PlayContext'
import { useHandicap } from './useHandicap'
import { AppContext } from '../context/AppContext';
export function useLoadCourseInfoIntoState(hcp) {
  const [holeInfo, setHoleInfo] = React.useState({})
  const statContext = React.useContext(StatContext)
  const playContext = React.useContext(PlayContext)
  const playState = playContext.value.state
  const appContext = React.useContext(AppContext)

  React.useEffect(() => {
    console.log('LOADING COURSEINFO INTO PLAYSTATE')

    const resetCourseInfo = async () => {
      const courseID = await AsyncStorage.getItem('course_id')
      // console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 17 ~ resetCourseInfo ~ courseID", courseID)
      const courseInfo = await loadCourseInfo(JSON.parse(courseID))
      const sortedCourseInfo = courseInfo.sort((a, b) => a.hcp_rtg - b.hcp_rtg)
      console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 29 ~ resetCourseInfo ~ hcp", hcp)
      let courseHandicap = Math.round(hcp * (playState.p1_slp / 113) + (playState.p1_rtg - 72))
      console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 25 ~ resetCourseInfo ~ courseHandicap", courseHandicap)

      let courseData = {}
      for (const obj of sortedCourseInfo) {

        let strokesToGive = 0;
        if (courseHandicap > 0) {
          strokesToGive = Math.ceil(courseHandicap / 18)
          console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 32 ~ resetCourseInfo ~ strokesToGive", strokesToGive)
        } 
        courseHandicap -= strokesToGive;
        console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 35 ~ resetCourseInfo ~ courseHandicap", courseHandicap)

        courseData[obj.hole_num] = {
          par: obj.hole_par,
          userCourseHandicap: courseHandicap,
          netStrokes: strokesToGive,
          hcpRtg: obj.hcp_rtg,
          pinCoords: {
            "latitude": parseFloat(obj.pin_lat),
            "longitude": parseFloat(obj.pin_lng)
          },
          camera: {
            center: {
              "latitude": parseFloat(obj.camera_lat),
              "longitude": parseFloat(obj.camera_lng),
            },
            pitch: 0,
            "heading": parseFloat(obj.camera_hdg),
            "altitude": parseFloat(obj.camera_alt),
            "zoom": parseFloat(obj.camera_zm),
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

    // if(hcp) {
      resetCourseInfo()
    // }
  }, [hcp])

return holeInfo
}


