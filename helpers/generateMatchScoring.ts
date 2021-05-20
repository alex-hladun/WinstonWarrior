import { a } from "@aws-amplify/ui";

const generateMatchScoring = (state: any) => {
  if (state?.gameState?.netScoring) {
    console.log("going net");
  }

  const team1: any[] = [];
  const team2: any[] = [];

  if (state.playState[`p1Team`] === 1) {
    team1.push(state.playState.p1score);
  } else if (state.playState[`p1Team`] === 2) {
    team2.push(state.playState.p2score);
  }

  for (let i = 2; i <= 4; i++) {
    if (state.playState[`player_${i}`]) {
      if (state.playState[`p${i}Team`] === 1) {
        team1.push(state.playState[`p${i}score`]);
      } else if (state.playState[`p${i}Team`] === 2) {
        team2.push(state.playState[`p${i}score`]);
      }
    }
  }

  let team1Score = 0;
  let team2Score = 0;
  let carry = 0;
  for (let i = 1; i <= 18; i++) {
    if (team1[0][i]) {
      console.log(
        "🚀 ~ file: ~ line 48 ~ generateMatchScoring ~ team2",
        team1,
        team2
      );
      const team1Min = Math.min(...team1.map((x) => x[i], 0));

      // team1.reduce((prev, current) => {
      //   console.log("prevvvv", prev[i]);
      //   return prev[i] < current[i] ? prev[i] : current[i];
      // });
      console.log(
        "🚀 ~ file: generateMatchScoring.ts ~ line 38 ~ generateMatchScoring ~ team1Max",
        team1Min
      );
      const team2Min = Math.min(...team2.map((x) => x[i], 0));

      console.log(
        "🚀 ~ file: generateMatchScoring.ts ~ line 40 ~ generateMatchScoring ~ team2Min",
        team2Min
      );
      if (team1Min < team2Min) {
        team1Score += carry + 1;
        carry = 0;
      } else if (team2Min < team1Min) {
        team2Score += carry + 1;
        carry = 0;
      } else if (state.gameState.push) {
        carry++;
      }
    }
  }
  console.log(
    "🚀 ~ file: generateMatchScoring.ts ~ line 4 ~ generateMatchScoring ~ state",
    state.playState.p1Team,
    state.playState.p2Team,
    state.playState.p3Team,
    state.playState.p4Team,
    state.gameState
  );

  const rankingArray = [
    {
      teamName: state.gameState.team1.name,
      score: team1Score,
      position: team1Score >= team2Score ? 1 : 2
    },
    {
      teamName: state.gameState.team2.name,
      score: team2Score,
      position: team2Score >= team1Score ? 1 : 2
    }
  ].sort((a, b) => a.position - b.position);
  console.log(
    "🚀 ~ file: generateMatchScoring.ts ~ line 70 ~ generateMatchScoring ~ rankingArray",
    rankingArray
  );
  console.log(
    "🚀 ~ file: generateMatchScoring.ts ~ line 77 ~ generateMatchScoring ~ carry",
    carry
  );

  return { rankingArray, carry };
};

export default generateMatchScoring;
