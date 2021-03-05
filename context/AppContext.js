import React, { useReducer, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  getClubs,
  getPct,
  load18HoleStats,
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
  loadShotHistoryData,
  loadShots,
  loadStats,
  loadTotalBirds,
  loadTotalPctHistory,
  loadTotalPuttHistory,
  loadTotalRounds,
  registerUser
} from "../db/dbSetup";
import produce from "immer";
import { loadHandicapFromArray } from "../hooks/useHandicapHistory";
import { loadHoleStatsForRefresh } from "../db/loadHoleStatsForRefresh";
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

      state.appState.auth_data = action.data;
      state.appState.user_name = action.data;
      state.appState.logged_in = true;
      state.appState.auth_message = "";

      break;
    case "authentication_done":
      console.log("In Authentication", action.data);
      console.log("In Authentication", action.token);
      AsyncStorage.setItem("authName", action.data);
      state.appState.auth_data = action.token;
      state.appState.user_name = action.data;
      state.appState.logged_in = true;
      state.appState.auth_message = "";
      break;

    case "log_out":
      state.appState.auth_data = null;
      state.appState.user_name = null;
      state.appState.logged_in = false;
      state.appState.auth_message = "";
      break;
    case "set_live_round":
      state.playState.liveRound = action.value;
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
      state.appState.clubList = action.data;
      break;
    case "set_course":
      state.playState.courseId = action.data;
      state.playState.p1_rtg = action.rtg;
      state.playState.p1_slp = action.slp;
      state.playState.courseName = action.name;
      break;

    case "set_view_mode":
      state.appState.viewMode = action.data;
      break;
    case "done_loading":
      state.appState.loading = false;
      break;
    case "done_initial_loading":
      state.appState.initialLoading = false;
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
    case "set_round_history_18_holes":
      state.statState.roundHistory18Holes = action.data;
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
    case "set_shot_history_data":
      state.statState.shotDataHistory = action.data;
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
    case "clear_all_scores":
      state.playState.p1score = initialState.playState.p1score;
      state.playState.p2score = initialState.playState.p2score;
      state.playState.player_2 = undefined;
      state.playState.p3score = initialState.playState.p3score;
      state.playState.player_3 = undefined;
      state.playState.p4score = initialState.playState.p4score;
      state.playState.player_4 = undefined;
      break;
    case "clear_p2_score":
      break;
    case "clear_p3_score":
      break;
    case "clear_p4_score":
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
    case "refresh_hole_stats":
      state.statState.courseData.holeStats[action.hole] = action.data;
  }
});

const initialState = {
  appState: {
    auth_data: {},
    viewMode: "menu",
    logged_in: false,
    loading: true,
    initialLoading: true,
    auth_message: "",
    round_id: undefined,
    user_name: undefined,
    clubList: []
  },
  statState: {
    totalInfo: {},
    totalRounds: undefined,
    bestScore: undefined,
    avgScore: undefined,
    shotData: [],
    shotDataHistory: {},
    roundHistory: [],
    roundHistory18Holes: [],
    puttHistory: [],
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
      holeStats: undefined
    }
  },
  playState: {
    courseId: undefined,
    courseName: null,
    holes: {},
    liveRound: false,
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
      18: null
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
      18: null
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
      18: null
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
      18: null
    }
  }
};
const AppContext = React.createContext(initialState);

function AppProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = ({ username, password }) => {
    // If I want to hook into signup
    dispatch({ type: "authentication_starting" });

    let login_data = {
      user_name: username,
      first_name: "Testing",
      last_name: "Something",
      email: "some@thing.com"
    };

    // THIS LOGS IN AND SETS HOME SCREEN MAIN SCREEN
    dispatch({
      type: "authentication_done",
      data: login_data
    });
  };

  const setHole = (holeNum, holeID) => {
    AsyncStorage.setItem("holeNum", JSON.stringify(holeNum));
    // Need to retrieve & set hole_id here
    dispatch({
      type: "set_hole_num",
      data: holeNum
    });
    dispatch({
      type: "set_hole_id",
      data: holeID
    });
  };

  const loadInitialStats = async (user_id) => {
    // Load all trend stats, shot stats, hcp stats, round history &
    // everything for app to function.

    // Loads all holes, shots, pars, grouped by for user
    const birdieCount = await loadTotalBirds(user_id);
    const totalBirds = {
      albatrosses: 0,
      eagles: 0,
      birdies: 0,
      pars: 0,
      bogies: 0,
      doubles: 0,
      triples: 0
    };

    birdieCount.forEach((hole) => {
      if (hole.total_shots - hole.hole_par === -1) {
        totalBirds.birdies++;
      } else if (hole.total_shots - hole.hole_par === 0) {
        totalBirds.pars++;
      } else if (hole.total_shots - hole.hole_par <= -3) {
        totalBirds.albatrosses++;
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

    // Count of rounds with end date.
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

    const clubs = await getClubs();
    // console.log("🚀 ~ file: AppContext.js ~ line 453 ~ loadInitialStats ~ clubs", clubs)

    dispatch({
      type: "set_club_list",
      data: clubs
    });

    let roundHistory = await loadStats(user_id);
    let roundHistory18Holes = await load18HoleStats(user_id);
    dispatch({ type: "set_round_history", data: roundHistory.reverse() });
    dispatch({
      type: "set_round_history_18_holes",
      data: roundHistory18Holes.reverse()
    });

    const sortedHistory = roundHistory
      .slice()
      .sort((a, b) => a.hcp_diff - b.hcp_diff);

    let count = 0;
    let hcpIndex = 0;
    sortedHistory.forEach((score) => {
      if (count < 8) {
        count += 1;
        hcpIndex += score.hcp_diff;
      }
    });
    const hcp = hcpIndex / count;
    dispatch({ type: "set_hcp", data: hcp });

    const totalpctHistoy = await loadTotalPctHistory(user_id);

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
        if (totalpctHistoy.girHit[i]) {
          return Math.round((totalpctHistoy.girHit[i] * 100) / hP, 0);
        } else {
          return 0;
        }
      })
      .reverse();

    dispatch({ type: "set_gir_history", data: girPctHistory });

    const scramblePctHistory = totalpctHistoy.totalHolesPlayed
      .map((hP, i) => {
        console.log("hp", hP);
        if (!totalpctHistoy.scrambleSuccess[i]) {
          // TODO: replae this by getting the scramble percents that are 0
          // Might need to compare lengths and see what the dealio is
          return 0;
        } else if (hP - totalpctHistoy.scrambleSuccess[i] <= 0) {
          return 100;
        } else {
          return Math.round(
            ((hP - totalpctHistoy.scrambleSuccess[i]) * 100) /
              (hP - totalpctHistoy.girHit[i]),
            0
          );
        }
      })
      .reverse();

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
      data: handicapHistoryArray.reverse()
    });

    await loadShotHistory(user_id);

    dispatch({ type: "done_initial_loading" });
  };

  const loadShotHistory = async (user_id) => {
    const shotData = await loadShots(user_id);
    dispatch({ type: "set_shot_data", data: shotData });

    const shotHistoryObj = {};
    const shotHistoryPromise = new Promise((resolve, reject) => {
      shotData.forEach(async (club, index) => {
        let clubShotStats = await loadShotHistoryData(1, club.id);
        shotHistoryObj[club.id] = {
          distanceHistory: [],
          effortHistory: [],
          dateHistory: [],
          name: club.name
        };

        clubShotStats.forEach((shot) => {
          shotHistoryObj[club.id].distanceHistory.push(shot.distance);
          shotHistoryObj[club.id].effortHistory.push(shot.effort.toFixed(0));
          shotHistoryObj[club.id].dateHistory.push(shot.date_time);
        });

        if (index === shotData.length - 1) {
          resolve();
        }
      });
    });
    await shotHistoryPromise;
    dispatch({ type: "set_shot_history_data", data: shotHistoryObj });
  };

  const loadInitialCourseData = async (course_id, user_id) => {
    // Load all hole info (par, handicap rtg, slope, rtg, etc and assign)
    // ALSO load all initial hole stats.
    const birdieCount = await loadBirds(course_id, user_id);
    let birdieObj = {};

    for (let i = 1; i <= 18; i++) {
      birdieObj[i] = {
        pars: 0,
        birdies: 0,
        eagles: 0,
        albatrosses: 0,
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
        scrambleHistory: [],
        girHistory: [],
        fwyHistory: [],
        penaltyHistory: [],
        lowScore: "NA",
        totalFairways: undefined,
        driverDirection: undefined,
        approachRtg: undefined,
        chipRtg: undefined,
        puttRtg: undefined,
        fairwaysHit: undefined,
        holePar: undefined
      };
    }

    birdieCount.forEach((hole) => {
      // console.log("scoreObj", hole);
      birdieObj[hole.hole_num].rounds++;
      birdieObj[hole.hole_num].holePar = hole.hole_par;

      if (hole.total_shots - hole.hole_par === -1) {
        birdieObj[hole.hole_num].birdies++;
      } else if (hole.total_shots - hole.hole_par === 0) {
        birdieObj[hole.hole_num].pars++;
      } else if (hole.total_shots - hole.hole_par === -2) {
        birdieObj[hole.hole_num].eagles++;
      } else if (hole.total_shots - hole.hole_par <= -3) {
        birdieObj[hole.hole_num].albatrosses++;
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

    const holeStats = await loadHoleStats(course_id, user_id);

    holeStats.forEach((hole) => {
      birdieObj[hole.hole_num]["avgShots"] = hole.avg_shots;
      birdieObj[hole.hole_num]["avgPutts"] = hole.avg_putts;
    });

    const holeHistory = await loadHoleHistory(course_id, user_id);

    holeHistory.forEach((hole) => {
      birdieObj[hole.hole_num].shotHistory.push(hole.total_shots);
      birdieObj[hole.hole_num].puttHistory.push(hole.total_putts);
      birdieObj[hole.hole_num].dateHistory.push(hole.date);
      birdieObj[hole.hole_num].scrambleHistory.push(hole.ud);
      birdieObj[hole.hole_num].girHistory.push(hole.gir);
      birdieObj[hole.hole_num].fwyHistory.push(hole.driver_direction);
      birdieObj[hole.hole_num].penaltyHistory.push(hole.penalty);
    });

    const lowHoleData = await loadLow(course_id, user_id);
    lowHoleData.forEach((hole) => {
      birdieObj[hole.hole_num].lowScore = hole.min_score;
    });

    const allFwData = await loadFairwayDataTotal(user_id, course_id);

    allFwData.forEach((hole) => {
      birdieObj[hole.hole_num].totalFairways = hole.total_fairways;
      birdieObj[hole.hole_num].driverDirection = hole.driver_direction;
      birdieObj[hole.hole_num].approachRtg = hole.approach_rtg;
      birdieObj[hole.hole_num].chipRtg = hole.chip_rtg;
      birdieObj[hole.hole_num].puttRtg = hole.putt_rtg;
    });

    const hitFwData = await loadFairwayData(user_id, course_id);
    hitFwData.forEach((hole) => {
      birdieObj[hole.hole_num].fairwaysHit = hole.total_fairways_hit;
    });

    dispatch({ type: "set_hole_stats", data: birdieObj });

    const courseInfo = await loadCourseInfo(course_id);
    const sortedCourseInfo = courseInfo.sort((a, b) => a.hcp_rtg - b.hcp_rtg);
    let courseHandicap = Math.round(
      state.statState.handicap * (state.playState.p1_slp / 113) +
        (state.playState.p1_rtg - 72)
    );

    let courseData = {};
    for (const obj of sortedCourseInfo) {
      let strokesToGive = 0;
      if (courseHandicap > 0) {
        strokesToGive = Math.ceil(courseHandicap / 18);
      }
      courseHandicap -= strokesToGive;

      courseData[obj.hole_num] = {
        par: obj.hole_par,
        id: obj.hole_id,
        userCourseHandicap: courseHandicap,
        netStrokes: strokesToGive,
        hcpRtg: obj.hcp_rtg,
        pinCoords: {
          latitude: parseFloat(obj.pin_lat),
          longitude: parseFloat(obj.pin_lng)
        },
        camera: {
          center: {
            latitude: parseFloat(obj.camera_lat),
            longitude: parseFloat(obj.camera_lng)
          },
          pitch: 0,
          heading: parseFloat(obj.camera_hdg),
          altitude: parseFloat(obj.camera_alt),
          zoom: parseFloat(obj.camera_zm)
        }
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

    dispatch({
      type: "set_hole_info",
      data: courseData
    });

    dispatch({
      type: "done_loading"
    });
  };

  const reloadHoleStats = async (courseID, holeNum) => {
    // Reload stats for a particular hole after score save.
    console.log(
      `Reloading stats sfor hole ${holeNum} for courseID ${courseID}`
    );
    const birdieObj = await loadHoleStatsForRefresh(courseID, holeNum, 1);
    dispatch({
      type: "refresh_hole_stats",
      data: birdieObj,
      hole: holeNum
    });
  };

  const refreshShotStats = async (user_id) => {
    loadShotHistory(user_id);
  };

  const doneRound = () => {
    dispatch({
      type: "set_round_id",
      data: null
    });

    dispatch({
      type: "set_user_2_name",
      data: null
    });
    dispatch({
      type: "set_user_2_round_id",
      data: null
    });
    dispatch({
      type: "set_user_3_name",
      data: null
    });
    dispatch({
      type: "set_user_3_round_id",
      data: null
    });
    dispatch({
      type: "set_user_4_name",
      data: null
    });
    dispatch({
      type: "set_user_4_round_id",
      data: null
    });
    dispatch({
      type: "set_view_mode",
      data: "menu"
    });
    dispatch({
      type: "set_hole_num",
      data: undefined
    });
    dispatch({
      type: "clear_all_scores"
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
    AsyncStorage.removeItem("liveRoundId");

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
      refreshShotStats
    };
  }, [state]);

  return (
    <AppContext.Provider value={{ value, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
