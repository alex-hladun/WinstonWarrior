export const handicapDiffCalc = (score, rtg, slope) => {
  return ((score - rtg) * 113 / slope)
}

const sumFront = obj => {
  let holeArray = Object.keys(obj).filter(a => a < 10)
  let sum = 0;
  for (const hole of holeArray) {
    if (obj[hole]) {
      sum += obj[hole]
    }
  }
  return sum
}

const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);


export const netHandicapDiffCalc = (scoreObj, userHandicap, rtg, slope, holeInfoObj) => {
console.log("🚀 ~ file: handicap.js ~ line 20 ~ netHandicapDiffCalc ~ scoreObj", scoreObj)
  console.log("🚀 ~ file: handicap.js ~ line 6 ~ netHandicapDiffCalc ~ holeInfoObj", holeInfoObj)


  let courseHandicap = userHandicap * (slope / 113) + (rtg - 72)
  let completedHoles = 0;
  let continueCounting = true;


  for (let i = 1; i <= 18; i++) {
    if (scoreObj[i] && continueCounting) {
      completedHoles = i
    } else {
      continueCounting = false;
    }
  }

  if (completedHoles === 18) {
    console.log('fully completed')
    return ((sumValues(scoreObj) - rtg) * 113 / slope)
    // calc
  } else if (completedHoles >= 14) {
    // Scale up to 18
    console.log('PARTIAL 18 HOLE SCORE CALC',((sumValues(scoreObj) - rtg) * 113 / slope))

    for (let i = completedHoles + 1; i <= 18; i++) {
      if (!scoreObj[i]) {
        scoreObj[i] = holeInfoObj[i].par + holeInfoObj[i].netStrokes
      }
    }
    return ((sumValues(scoreObj) - rtg) * 113 / slope)

  } else if (completedHoles >= 9) {
    console.log('9 HOLE SCORE CALC', ((sumFront(scoreObj) - rtg / 2) * 113 / slope / 2))
    return ((sumFront(scoreObj) - rtg / 2) * 113 / slope / 2)
  } else if (completedHoles >= 7) {
    for (let i = completedHoles + 1; i <= 9; i++) {
      if (!scoreObj[i]) {
        scoreObj[i] = holeInfoObj[i].par + holeInfoObj[i].netStrokes
      }
    }
    console.log('PARTIAL 9 HOLE SCORE CALC', ((sumFront(scoreObj) - rtg / 2) * 113 / slope / 2))
    return ((sumFront(scoreObj) - rtg / 2) * 113 / slope / 2)
  } else {
    return null
  }


}