import React, { useReducer, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  getPct,
  loadAvgPutts,
  loadAvgScore,
  loadBestScore,
  loadBirds,
  loadCourseDetails,
  loadCourseInfo,
  loadFairwayData,
  loadFairwayDataTotal,
  loadGirPct,
  loadHcpDiffStats,
  loadHoleHistory,
  loadHoleStats,
  loadLow,
  loadScramblePct,
  loadShots,
  loadStats,
  loadTotalBirds,
  loadTotalPctHistory,
  loadTotalPuttHistory,
  loadTotalRounds,
  registerUser,
} from "../db/dbSetup";
import produce from "immer";
import { loadHandicapFromArray } from "../hooks/useHandicapHistory";
// import {register}
const reducer = produce((state, action) => {
  switch (action.type) {
    case "authentication_starting":
      state.auth_data = {};
      state.logged_in = false;
      break;
    case "signed_up":
      AsyncStorage.setItem("authName", action.data);
      registerUser(action.data);

      state.auth_data = action.data;
      state.user_name = action.data;
      state.logged_in = true;
      state.auth_message = "";

      break;
    case "authentication_done":
      state.auth_data = action.data;
      state.user_name = action.data;
      state.logged_in = true;
      state.auth_message = "";
      break;

    case "log_out":
      state.auth_data = null;
      state.user_name = null;
      state.logged_in = false;
      state.auth_message = "";
      break;

    case "set_round_id":
      state.playState.roundId = action.data;
      break;

    case "set_user_2_round_id":
      state.playState.player_2_rd_id = action.data;
      break;

    case "set_player_2":
      state.playState.player_2 = action.data;
      break;
    case "remove_player_2":
      state.playState.player_2 = undefined;
      break;
    case "set_user_3_round_id":
      state.playState.player_3_rd_id = action.data;
      break;

    case "set_player_3":
      state.playState.player_3 = action.data;
      break;
    case "remove_player_3":
      state.playState.player_3 = undefined;
      break;

    case "set_user_4_round_id":
      state.player_4_rd_id = action.data;
      break;
    case "set_player_4":
      state.playState.player_4 = action.data;
      break;
    case "remove_player_4":
      state.playState.player_4 = undefined;
      break;
    case "set_hole_id":
      state.playState.hole_id = action.data;
      break;
    case "set_hole_num":
      state.playState.hole_num = action.data;
      break;
    case "set_club_list":
      state.statState.clubList = action.data;
      break;
    case "set_course":
      state.playState.courseId = action.data;
      state.playState.p1_rtg = action.rtg;
      state.playState.p1_slp = action.slp;
      break;

    case "set_view_mode":
      state.appState.viewMode = action.data;
      break;
    case "done_loading":
      state.appState.loading = false;
      break;

    case "set_total_birds":
      state.statState.birdieObj = action.data;
      break;
    case "set_hole_stats":
      state.statState.courseData.holeStats = action.data;
      break;
    case "set_gir_pct":
      state.statState.girData.girPct = action.data;
      break;
    case "set_gir_history":
      state.statState.girData.girHistory = action.data;
      break;
    case "set_fwy_pct":
      state.statState.fwyData.fwyPct = action.data;
      break;
    case "set_fwy_history":
      state.statState.fwyData.fwyHistory = action.data;
      break;
    case "set_scr_pct":
      state.statState.scrData.scrPct = action.data;
      break;
    case "set_scr_history":
      state.statState.scrData.scrHistory = action.data;
      break;

    case "set_total_rounds":
      state.statState.totalRounds = action.data;
      break;
    case "set_avg_score":
      state.statState.avgScore = action.data;
      break;
    case "set_avg_putts":
      state.statState.avgPutts = action.data;
      break;
    case "set_best_score":
      state.statState.bestScore = action.data;
      break;
    case "set_hcp":
      state.statState.hcp = action.data;
      break;
    case "set_round_history":
      state.statState.roundHistory = action.data;
      break;
    case "set_total_putt_history":
      state.statState.puttHistory = action.data;
      break;
    case "set_handicap_rounds":
      state.statState.hcpRounds = action.data;
      break;
    case "set_handicap_history":
      state.statState.hcpHistory = action.data;
      break;
    case "set_shot_data":
      state.statState.shotData = action.data;
      break;
    case "set_hole_info":
      state.playState.holeInfo = action.data;
      break;
    case "set_course_info":
      state.playState.courseInfo = action.data;
      break;
    case "set_p1_score":
      state.playState.p1score[action.hole] = action.score;
      break;
    case "set_p2_score":
      state.playState.p2score[action.hole] = action.score;
      break;
    case "set_p3_score":
      state.playState.p3score[action.hole] = action.score;
      break;
    case "set_p4_score":
      state.playState.p4score[action.hole] = action.score;
      break;
    case "clear_p1_score":
      state.playState.p1score = initialState.playState.p1score;
      break;
    case "clear_p2_score":
      p2score = initialState.playState.p2score;
      state.playState.player_2 = undefined;
      break;
    case "clear_p3_score":
      state.playState.p3score = initialState.playState.p3score;
      state.playState.player_3 = undefined;
      break;
    case "clear_p4_score":
      state.playState.p4score = initialState.playState.p4score;
      state.playState.player_4 = undefined;
      break;
    case "restore_p1_score":
      state.playState.p1score = action.data;
      break;
    case "restore_p2_score":
      state.playState.p2score = action.data;
      state.playState.player_2 = action.name;
      break;
    case "restore_p3_score":
      state.playState.p3score = action.data;
      state.playState.player_3 = action.name;
      break;
    case "restore_p4_score":
      state.playState.p4score = action.data;
      state.playState.player_4 = action.name;
      break;
  }
});

const initialState = {
  appState: {
    auth_data: {},
    viewMode: "menu",
    logged_in: false,
    loading: true,
    auth_message: "",
    round_id: undefined,
    user_name: undefined,
    clubList: [],
  },
  statState: {
    totalInfo: {},
    totalRounds: undefined,
    bestScore: undefined,
    avgScore: undefined,
    clubList: [],
    shotData: [],
    roundHistory: [],
    puttHistory: [],
    // holeHistory: {},
    birdieObj: undefined,
    fwyData: { fwyPct: undefined, fwyHistory: [] },
    girData: { girPct: undefined, girHistory: [] },
    scrData: { scrPct: undefined, scrHistory: [] },
    hcp: undefined,
    hcpHistory: [],
    hcpRounds: [],
    courseData: {
      name: "",
      courseId: "",
      course_slp: undefined,
      course_rtg: undefined,
      holeStats: undefined,
    },
  },
  playState: {
    courseId: undefined,
    holes: {},
    hole_num: undefined,
    holeInfo: undefined,
    roundId: undefined,
    hole_id: undefined,
    p1_rtg: undefined,
    p1_slp: undefined,
    p2_rtg: undefined,
    p2_slp: undefined,
    p3_rtg: undefined,
    p3_slp: undefined,
    p4_rtg: undefined,
    p4_slp: undefined,
    player_2: undefined,
    player_3: undefined,
    player_4: undefined,
    player_2_rd_id: undefined,
    player_3_rd_id: undefined,
    player_4_rd_id: undefined,
    player_2_hcp: undefined,
    player_3_hcp: undefined,
    player_4_hcp: undefined,
    p1score: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
    },
    p2score: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
    },
    p3score: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
    },
    p4score: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
    },
  },
};
const AppContext = React.createContext(initialState);

function AppProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = ({ username, password }) => {
    dispatch({ type: "authentication_starting" });

    let login_data = {
      user_name: username,
      first_name: "Testing",
      last_name: "Something",
      email: "some@thing.com",
    };

    // THIS LOGS IN AND SETS HOME SCREEN MAIN SCREEN
    dispatch({
      type: "authentication_done",
      data: login_data,
    });
  };

  const setHole = (holeNum) => {
    AsyncStorage.setItem("holeNum", JSON.stringify(holeNum));
    // Need to retrieve & set hole_id here
    console.log("setting HOLE in async to ", holeNum);
    dispatch({
      type: "set_hole_num",
      data: holeNum,
    });
  };

  const loadInitialStats = async (user_id) => {
    // Load all trend stats, shot stats, hcp stats, round history &
    // everything for app to function.
    let birdiecount;
    birdieCount = await loadTotalBirds(user_id);
    const totalBirds = {
      eagles: 0,
      birdies: 0,
      pars: 0,
      bogies: 0,
      doubles: 0,
      triples: 0,
    };

    birdieCount.forEach((hole) => {
      if (hole.total_shots - hole.hole_par === -1) {
        totalBirds.birdies++;
      } else if (hole.total_shots - hole.hole_par === 0) {
        totalBirds.pars++;
      } else if (hole.total_shots - hole.hole_par === -2) {
        totalBirds.eagles++;
      } else if (hole.total_shots - hole.hole_par === 1) {
        totalBirds.bogies++;
      } else if (hole.total_shots - hole.hole_par === 2) {
        totalBirds.doubles++;
      } else {
        totalBirds.triples++;
      }
    });

    dispatch({ type: "set_total_birds", data: totalBirds });

    const totalRounds = await loadTotalRounds(1);
    dispatch({ type: "set_total_rounds", data: totalRounds });

    const girPct = await loadGirPct(1);
    dispatch({ type: "set_gir_pct", data: girPct });
    const scramblePct = await loadScramblePct(1);
    dispatch({ type: "set_scr_pct", data: scramblePct });

    const avgScore = await loadAvgScore(1);
    dispatch({ type: "set_avg_score", data: avgScore });

    const bestScore = await loadBestScore(1);
    dispatch({ type: "set_best_score", data: bestScore });

    const avgPutts = await loadAvgPutts(1);
    dispatch({ type: "set_avg_putts", data: avgPutts });
    const fwyPct = await getPct(1);
    dispatch({ type: "set_fwy_pct", data: fwyPct });


    let roundHistory = await loadStats(user_id);
    dispatch({ type: "set_round_history", data: roundHistory.reverse() });
    console.log('YYYYYYYYYYY')
    // console.log("🚀 ~ file: AppContext.js ~ line 449 ~ loadInitialStats ~ roundHistory", roundHistory)

    const sortedHistory = roundHistory.slice().sort((a, b) => a.hcp_diff - b.hcp_diff);
    console.log('XXXXXXXXXXXXXX')


    let count = 0;
    let hcpIndex = 0;
    sortedHistory.forEach((score) => {
      if (count < 8) {
        count += 1;
        hcpIndex += score.hcp_diff;
      }
    });
    // console.log("🚀 ~ file: AppContext.js ~ line 364 ~ loadInitialStats ~ sortedHistory", sortedHistory)
    const hcp = hcpIndex / count;
    dispatch({ type: "set_hcp", data: hcp });

    const totalpctHistoy = await loadTotalPctHistory(user_id);
    // console.log("🚀 ~ file: useTotalPctHistory.js ~ line 13 ~ getPctHistory ~ totalpctHistoy", totalpctHistoy)

    const fwyPctHistory = totalpctHistoy.totalHolesPlayed
      .map((hP, i) => {
        if (totalpctHistoy.fwyHit[i]) {
          return Math.round((totalpctHistoy.fwyHit[i] * 100) / hP, 0);
        } else {
          return 0;
        }
      })
      .reverse();
    dispatch({ type: "set_fwy_history", data: fwyPctHistory });

    const girPctHistory = totalpctHistoy.totalHolesPlayed
      .map((hP, i) => {
        return Math.round((totalpctHistoy.girHit[i] * 100) / hP, 0);
      })
      .reverse();
    dispatch({ type: "set_gir_history", data: girPctHistory });

    const scramblePctHistory = totalpctHistoy.totalHolesPlayed
      .map((hP, i) => {
        // console.log("🚀 ~ file: useTotalPctHistory.js ~ line 27 ~ scramblePct:totalpctHistoy.totalHolesPlayed.map ~ hP", hP)
        if (!totalpctHistoy.scrambleSuccess[i]) {
          // TODO: replae this by getting the scramble percents that are 0
          return 0;
        } else if (hP - totalpctHistoy.girHit[i] <= 0) {
          return 0;
        } else {
          // console.log("🚀 ~ file: useTotalPctHistory.js ~ line 33 ~ scramblePct:totalpctHistoy.totalHolesPlayed.map ~ totalpctHistoy.scrambleSuccess[i]", totalpctHistoy.scrambleSuccess[i])
          // console.log("🚀 ~ file: useTotalPctHistory.js ~ line 34 ~ scramblePct:totalpctHistoy.totalHolesPlayed.map ~ hP", hP)
          // console.log("🚀 ~ file: useTotalPctHistory.js ~ line 35 ~ scramblePct:totalpctHistoy.totalHolesPlayed.map ~ totalpctHistoy.girHit[i]", totalpctHistoy.girHit[i])
          // console.log(Math.round((totalpctHistoy.scrambleSuccess[i] * 100) / (hP - totalpctHistoy.girHit[i]), 0))
          return Math.round(
            (totalpctHistoy.scrambleSuccess[i] * 100) /
              (hP - totalpctHistoy.girHit[i]),
            0
          );
        }
      })
      .reverse();

    // console.log("🚀 ~ file: AppContext.js ~ line 447 ~ loadInitialStats ~ scramblePctHistory", scramblePctHistory)
    dispatch({ type: "set_scr_history", data: scramblePctHistory });

    const newPuttHistory = await loadTotalPuttHistory(user_id);
    const puttHistoryArray = newPuttHistory.map((puttObj) => {
      return puttObj.putts;
    });
    dispatch({ type: "set_total_putt_history", data: puttHistoryArray });

    const hcpRoundHistory = await loadHcpDiffStats(user_id);
    const handicapHistoryArray = [];
    const length = hcpRoundHistory.length;

    // Max points should be used for the graph
    let maxHcpPoints = 10;
    if (length < 10) {
      maxHcpPoints = length;
    }

    for (let i = 0; i < maxHcpPoints; i++) {
      handicapHistoryArray.push(
        loadHandicapFromArray(hcpRoundHistory.slice(i, i + 40)).handicap
      );
    }

    const handicapRounds = loadHandicapFromArray(hcpRoundHistory.slice(0, 40))
      .includedRounds;
    dispatch({ type: "set_handicap_rounds", data: handicapRounds });
    dispatch({
      type: "set_handicap_history",
      data: handicapHistoryArray.reverse(),
    });

    const shotData = await loadShots(user_id);
    dispatch({ type: "set_shot_data", data: shotData });
  };


  const loadInitialCourseData = async (course_id, user_id) => {
    // Load all hole info (par, handicap rtg, slope, rtg, etc and assign)
    // ALSO load all initial hole stats.
    let birdiecount;
    birdieCount = await loadBirds(course_id, user_id);
    console.log("🚀 ~ file: AppContext.js ~ line 748 ~ loadInitialCourseData ~ birdiecount", birdiecount)

    let birdieObj = {};

    for (let i = 1; i <= 18; i++) {
      birdieObj[i] = {
        pars: 0,
        birdies: 0,
        eagles: 0,
        bogies: 0,
        doubles: 0,
        triples: 0,
        rounds: 0,
        GIRs: 0,
        avgPutts: 0,
        avgShots: 0,
        scrambleChances: 0,
        scrambleSuccess: 0,
        shotHistory: [],
        puttHistory: [],
        dateHistory: [],
        lowScore: "NA",
        totalFairways: undefined,
        driverDirection: undefined,
        approachRtg: undefined,
        chipRtg: undefined,
        puttRtg: undefined,
        fairwaysHit: undefined,
      };
    }

    birdieCount.forEach((hole) => {
      // console.log('scoreObj', hole)
      birdieObj[hole.hole_num].rounds++;

      if (hole.total_shots - hole.hole_par === -1) {
        birdieObj[hole.hole_num].birdies++;
      } else if (hole.total_shots - hole.hole_par === 0) {
        birdieObj[hole.hole_num].pars++;
      } else if (hole.total_shots - hole.hole_par === -2) {
        birdieObj[hole.hole_num].eagles++;
      } else if (hole.total_shots - hole.hole_par === 1) {
        birdieObj[hole.hole_num].bogies++;
      } else if (hole.total_shots - hole.hole_par === 2) {
        birdieObj[hole.hole_num].doubles++;
      } else {
        birdieObj[hole.hole_num].triples++;
      }

      if (hole.total_shots - hole.total_putts + 2 <= hole.hole_par) {
        birdieObj[hole.hole_num].GIRs++;
      } else {
        birdieObj[hole.hole_num].scrambleChances++;

        if (hole.total_shots <= hole.hole_par) {
          birdieObj[hole.hole_num].scrambleSuccess++;
        }
      }
    });
    console.log("🚀 ~ file: AppContext.js ~ line 612 ~ loadInitialCourseData ~ birdiecount", birdiecount)

    const holeStats = await loadHoleStats(course_id, user_id);

    holeStats.forEach((hole) => {
      birdieObj[hole.hole_num]["avgShots"] = hole.avg_shots;
      birdieObj[hole.hole_num]["avgPutts"] = hole.avg_putts;
    });

    const holeHistory = await loadHoleHistory(course_id, user_id);
    // const holeHistoryObj = {}
    // for (let i = 1; i <= 18; i++) {
    //   holeHistoryObj[i] = { score: [], putts: [], date: []}
    // }

    holeHistory.forEach((hole) => {
      // console.log("TabOneScreen -> hole history", hole)
      birdieObj[hole.hole_num].shotHistory.push(hole.total_shots);
      birdieObj[hole.hole_num].puttHistory.push(hole.total_putts);
      birdieObj[hole.hole_num].dateHistory.push(hole.date);
    });

    const lowHoleData = await loadLow(course_id, user_id);
    console.log("🚀 ~ file: AppContext.js ~ line 635 ~ loadInitialCourseData ~ birdiecount", birdiecount)

    lowHoleData.forEach((hole) => {
      birdieObj[hole.hole_num].lowScore = hole.min_score;
    });

    const hitFwData = await loadFairwayData(user_id, course_id);
    const allFwData = await loadFairwayDataTotal(user_id, course_id);

    allFwData.forEach((hole) => {
      birdieObj[hole.hole_num].totalFairways = hole.total_fairways;
      birdieObj[hole.hole_num].driverDirection = hole.driver_direction;
      birdieObj[hole.hole_num].approachRtg = hole.approach_rtg;
      birdieObj[hole.hole_num].chipRtg = hole.chip_rtg;
      birdieObj[hole.hole_num].puttRtg = hole.putt_rtg;
    });

    hitFwData.forEach((hole) => {
      birdieObj[hole.hole_num].fairwaysHit = hole.total_fairways_hit;
    });

    console.log(
      // "🚀 ~ file: AppContext.js ~ line 667 ~ loadInitialCourseData ~ birdieObj",
      birdieObj
    );

    dispatch({ type: "set_hole_stats", data: birdieObj });

    //
    // console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 17 ~ resetCourseInfo ~ courseID", courseID)
    const courseInfo = await loadCourseInfo(course_id);
    const sortedCourseInfo = courseInfo.sort((a, b) => a.hcp_rtg - b.hcp_rtg);
    let courseHandicap = Math.round(
      state.statState.handicap * (state.playState.p1_slp / 113) + (state.playState.p1_rtg - 72)
    );

    // console.log('1adskjaslkjlLKSDAJLKASJDLK')
    let courseData = {};
    for (const obj of sortedCourseInfo) {
      let strokesToGive = 0;
      if (courseHandicap > 0) {
        strokesToGive = Math.ceil(courseHandicap / 18);
      }
      courseHandicap -= strokesToGive;

      courseData[obj.hole_num] = {
        par: obj.hole_par,
        userCourseHandicap: courseHandicap,
        netStrokes: strokesToGive,
        hcpRtg: obj.hcp_rtg,
        pinCoords: {
          latitude: parseFloat(obj.pin_lat),
          longitude: parseFloat(obj.pin_lng),
        },
        camera: {
          center: {
            latitude: parseFloat(obj.camera_lat),
            longitude: parseFloat(obj.camera_lng),
          },
          pitch: 0,
          heading: parseFloat(obj.camera_hdg),
          altitude: parseFloat(obj.camera_alt),
          zoom: parseFloat(obj.camera_zm),
        },
      };
    }

    while (courseHandicap > 0) {
      for (const obj of sortedCourseInfo) {
        if (courseHandicap > 0) {
          courseData[obj.hole_num].netStrokes++;
          courseHandicap--;
        }
      }
    }

    // console.log("🚀 ~ file: useLoadCourseInfoIntoState.js ~ line 60 ~ resetCourseInfo ~ courseData", courseData)
    const courseDetails = await loadCourseDetails(course_id);

    // playContext.dispatch({
    //   type: 'set_course_info',
    //   data: {
    //     courseID: courseDetails.course_id,
    //     courseName: courseDetails.course_name,
    //     blueRtg: courseDetails.blue_rtg,
    //     blueSlp: courseDetails.blue_slp,
    //     blackRtg: courseDetails.black_rtg,
    //     blackSlp: courseDetails.black_slp,
    //     blackBlueRtg: courseDetails.black_blue_rtg,
    //     blackBlueSlp: courseDetails.black_blue_slp,
    //     whiteRtg: courseDetails.white_rtg,
    //     whiteSlp: courseDetails.white_slp,
    //     whiteRedRtg: courseDetails.white_red_rtg,
    //     whiteRedSlp: courseDetails.white_red_slp,
    //     redRtg: courseDetails.red_rtg,
    //     redSlp: courseDetails.red_slp,
    //     blueWhiteRtg: courseDetails.blue_white_rtg,
    //     blueWhiteSlp: courseDetails.blue_white_slp,
    //   }
    // })

    dispatch({
      type: "set_hole_info",
      data: courseData,
    });
    console.log(
      "🚀 ~ file: AppContext.js ~ line 733 ~ loadInitialCourseData ~ courseData",
      courseData
    );

    dispatch({
      type: "done_loading",
    });

    //
  };

  const reloadHoleStats = async (holeNum) => {
    // Reload stats for a particular hole after score save.
  };

  const refreshShotStats = async (clubID) => {
    // Reload shot stats for a particular club.
  };

  const doneRound = () => {
    dispatch({
      type: "set_round_id",
      data: null,
    });

    dispatch({
      type: "set_user_2_name",
      data: null,
    });
    dispatch({
      type: "set_user_2_round_id",
      data: null,
    });
    dispatch({
      type: "set_user_3_name",
      data: null,
    });
    dispatch({
      type: "set_user_3_round_id",
      data: null,
    });
    dispatch({
      type: "set_user_4_name",
      data: null,
    });
    dispatch({
      type: "set_user_4_round_id",
      data: null,
    });
    dispatch({
      type: "set_view_mode",
      data: "menu",
    });
    dispatch({
      type: "set_hole_num",
      data: undefined,
    });

    AsyncStorage.removeItem("holeNum");
    AsyncStorage.removeItem("roundID");
    AsyncStorage.removeItem("u2roundid");
    AsyncStorage.removeItem("u2name");
    AsyncStorage.removeItem("u3roundid");
    AsyncStorage.removeItem("u3name");
    AsyncStorage.removeItem("u4roundid");
    AsyncStorage.removeItem("u4name");
    AsyncStorage.removeItem("course_id");

    console.log("all info cleared from AppContext");
  };

  const value = useMemo(() => {
    return {
      state,
      login,
      setHole,
      doneRound,
      loadInitialStats,
      loadInitialCourseData,
      reloadHoleStats,
      refreshShotStats,
    };
  }, [state]);

  return (
    <AppContext.Provider value={{ value, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
