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
      const team1Min = Math.min(...team1.map((x) => x[i], 0));

      const team2Min = Math.min(...team2.map((x) => x[i], 0));

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

  return { rankingArray, carry };
};

export default generateMatchScoring;
