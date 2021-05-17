export const handicapDiffCalc = (score, rtg, slope) => {
  return ((score - rtg) * 113) / slope;
};

const sumFront = (obj) => {
  let holeArray = Object.keys(obj).filter((a) => a < 10);
  let sum = 0;
  for (const hole of holeArray) {
    if (obj[hole]) {
      sum += obj[hole];
    }
  }
  return sum;
};
const sumBack = (obj) => {
  let holeArray = Object.keys(obj).filter((a) => a > 9);
  let sum = 0;
  for (const hole of holeArray) {
    if (obj[hole]) {
      sum += obj[hole];
    }
  }
  return sum;
};

const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);

export const calculatedHolesPlayed = (scoreObj) => {
  let completedHoles = 0;

  for (let i = 1; i <= 18; i++) {
    if (scoreObj[i]) {
      completedHoles++;
    }
  }
  return completedHoles;
};

export const playedFront = (scoreObj) => {
  let playedFront = true;
  for (let i = 1; i <= 9; i++) {
    if (!scoreObj[i]) {
      playedFront = false;
    }
  }
  return playedFront;
};
export const playedBack = (scoreObj) => {
  let playedBack = true;
  for (let i = 10; i <= 18; i++) {
    if (!scoreObj[i]) {
      playedBack = false;
    }
  }
  return playedBack;
};

export const netHandicapDiffCalc = (
  scoreObj,
  userHandicap,
  rtg,
  slope,
  holeInfoObj
) => {
  const completedHoles = calculatedHolesPlayed(scoreObj);

  if (completedHoles === 18) {
    return {
      netHcpDiff: ((sumValues(scoreObj) - rtg) * 113) / slope,
      holesPlayed: 18,
      calculatedHolesPlayed: 18,
      calculatedScore: sumValues(scoreObj)
    };
  } else if (completedHoles >= 14) {
    // Scale up to 18
    for (let i = 1; i <= 18; i++) {
      if (!scoreObj[i]) {
        console.log(
          `adding score for hole ${i}. ${holeInfoObj[i].par} (par) + ${holeInfoObj[i].netStrokes} strokes`
        );
        scoreObj[i] = holeInfoObj[i].par + holeInfoObj[i].netStrokes;
      }
    }
    console.log("Total score", sumValues(scoreObj));
    console.log(
      "PARTIAL 18 HOLE SCORE Handicap CALC",
      ((sumValues(scoreObj) - rtg) * 113) / slope
    );
    return {
      netHcpDiff: ((sumValues(scoreObj) - rtg) * 113) / slope,
      holesPlayed: completedHoles,
      calculatedHolesPlayed: 18,
      calculatedScore: sumValues(scoreObj)
    };
  } else if (completedHoles >= 9) {
    if (playedFront(scoreObj)) {
      return {
        netHcpDiff: ((sumFront(scoreObj) - rtg / 2) * 113) / slope / 2,
        holesPlayed: 9,
        calculatedHolesPlayed: 9,
        calculatedScore: sumFront(scoreObj)
      };
    } else if (playedBack(scoreObj)) {
      return {
        netHcpDiff: ((sumBack(scoreObj) - rtg / 2) * 113) / slope / 2,
        holesPlayed: 9,
        calculatedHolesPlayed: 9,
        calculatedScore: sumBack(scoreObj)
      };
    }
  } else if (completedHoles >= 7) {
    if (
      Object.keys(scoreObj).filter((hole) => scoreObj[hole]?.holeNum <= 9)
        .length >
      Object.keys(scoreObj).filter((hole) => scoreObj[hole]?.holeNum > 9).length
    ) {
      for (let i = 1; i <= 9; i++) {
        if (!scoreObj[i]) {
          scoreObj[i] = holeInfoObj[i].par + holeInfoObj[i].netStrokes;
        }
      }
      console.log(
        "Partial 9 hole (front) handicap calc",
        ((sumFront(scoreObj) - rtg / 2) * 113) / slope
      );
      return {
        netHcpDiff: ((sumFront(scoreObj) - rtg / 2) * 113) / slope / 2,
        holesPlayed: completedHoles,
        calculatedHolesPlayed: 9,
        calculatedScore: sumFront(scoreObj)
      };
    } else {
      for (let i = 10; i <= 18; i++) {
        if (!scoreObj[i]) {
          scoreObj[i] = holeInfoObj[i].par + holeInfoObj[i].netStrokes;
        }
      }
      console.log(
        "Partial 9 hole (back) handicap calc",
        ((sumBack(scoreObj) - rtg / 2) * 113) / slope
      );
      return {
        netHcpDiff: ((sumBack(scoreObj) - rtg / 2) * 113) / slope / 2,
        holesPlayed: completedHoles,
        calculatedHolesPlayed: 9,
        calculatedScore: sumBack(scoreObj)
      };
    }
  } else {
    console.log("not enough scores to post!!");
    return {
      netHcpDiff: null,
      holesPlayed: completedHoles,
      calculatedHolesPlayed: 0,
      calculatedScore: 0
    };
  }
};
