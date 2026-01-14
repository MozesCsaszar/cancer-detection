import { type ReactNode, useState } from "react";
import { initStatistics, type TrainModelResult } from "../../domain/aiModel";
import { TrainModelResultContext } from "../../domain/contexts";

function TrainContextProvider({
  children,
}: Readonly<{ children: ReactNode[] | ReactNode }>) {
  const [trainingResult, setTrainingResult] = useState<TrainModelResult | null>(
    null
  );

  const [statistics, setStatistics] = useState(initStatistics("categorical"));

  return (
    <TrainModelResultContext
      value={{
        trainingResult,
        setTrainingResult: (result) => setTrainingResult(result),
        statistics,
        setStatistics,
      }}
    >
      {children}
    </TrainModelResultContext>
  );
}

export default TrainContextProvider;
