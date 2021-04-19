const generateScoreArray = (stats) => {
  const scoreArr = [{ name: stats.player1.name, score: stats.player1.score }];
  if (stats.player2.name) {
    scoreArr.push({
      name: stats.player2.name,
      score: stats.player2.score
    });
  }
  if (stats.player3.name) {
    scoreArr.push({
      name: stats.player3.name,
      score: stats.player3.score
    });
  }
  if (stats.player4.name) {
    scoreArr.push({
      name: stats.player4.name,
      score: stats.player4.score
    });
  }

  const sortedArray = scoreArr.sort((a, b) =>
    a.score > b.score ? 1 : b.score > a.score ? -1 : 0
  );
  console.log(
    "🚀 ~ file: generateScoreArray.js ~ line 25 ~ generateScoreArray ~ sortedArray",
    sortedArray
  );

  sortedArray[0]["position"] = 1;
  let leadScore = sortedArray[0].score;
  let position = 1;

  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i].score === leadScore) {
      sortedArray[i]["position"] = position;
    } else {
      position = i + 1;
      leadScore = sortedArray[i].score;
      sortedArray[i]["position"] = position;
    }
  }
  console.log(
    "🚀 ~ file: generateScoreArray.js ~ line 25 ~ generateScoreArray ~ sortedArray",
    sortedArray
  );

  return sortedArray;
};

export default generateScoreArray;
