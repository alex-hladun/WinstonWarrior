import * as React from 'react';
import { AsyncStorage } from 'react-native'
import { loadCourseInfo } from '../db/dbSetup'
import { StatContext } from '../context/StatContext'
import { PlayContext } from '../context/PlayContext'
import { useHandicap } from './useHandicap'
export function useLoadCourseInfoIntoState() {
  const statContext = React.useContext(StatContext)
  const playContext = React.useContext(PlayContext)
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
          netStrokes: 0,
          hcpRtg: obj.hcp_rtg,
          pincoords: {
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

      playContext.dispatch({
        type: 'set_hole_info',
        data: courseData
      })
    }

    resetCourseInfo()
  }, [])


}


