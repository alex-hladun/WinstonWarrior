import * as React from "react";
import { loadShotHistoryData } from "../db/dbSetup";
import { StatContext } from "../context/StatContext";

export function useShotHistory(user_id, club_id) {
  const statContext = React.useContext(StatContext);
  const [shotData, setShotData] = React.useState([]);

  React.useEffect(() => {
    const getShotData = async (user_id, club_id) => {
      const shotDataDb = await loadShotHistoryData(user_id, club_id);
      setShotData(shotDataDb);
    };

    getShotData(user_id, club_id);
  }, [statContext.value.state.clubDataUpdate]);

  return shotData;
}
