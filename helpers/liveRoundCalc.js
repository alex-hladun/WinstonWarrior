// given a play state, come up with a
// leaderboard, +/-, course, thru holes
// and roundId

export const liveRoundCalc = (playState, p1Name) => {
  const round = {
    contentType: "liveround",
    course: playState.courseName,
    thruHoles: 0,
    datetime: Date.now(),
    roundId: playState.liveRound,
    player1: {
      name: p1Name,
      score: 0,
      totalScore: 0
    },
    player2: {
      name: playState.player_2,
      score: 0,
      totalScore: 0
    },
    player3: {
      name: playState.player_3,
      score: 0,
      totalScore: 0
    },
    player4: {
      name: playState.player_4,
      score: 0,
      totalScore: 0
    }
  };
  let thru = 0;
  Object.keys(playState.p1score).forEach((hole) => {
    if (playState.p1score[hole]) {
      thru++;
      round.player1.score +=
        playState.p1score[hole] - playState.holeInfo[hole].par;
      round.player1.totalScore += playState.p1score[hole];
    }
    if (playState.p2score[hole]) {
      round.player2.score +=
        playState.p2score[hole] - playState.holeInfo[hole].par;
      round.player2.totalScore += playState.p2score[hole];
    }
    if (playState.p3score[hole]) {
      round.player3.score +=
        playState.p3score[hole] - playState.holeInfo[hole].par;
      round.player3.totalScore += playState.p3score[hole];
    }
    if (playState.p4score[hole]) {
      round.player4.score +=
        playState.p4score[hole] - playState.holeInfo[hole].par;
      round.player4.totalScore += playState.p4score[hole];
    }
  });
  round.thruHoles = thru;

  return round;
};
