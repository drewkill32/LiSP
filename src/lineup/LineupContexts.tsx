import { LineupContext, useLineupData } from "./useLineup";

type LineupContextProviderProps = {
  children: React.ReactNode;
};

export const LineupProvider = ({ children }: LineupContextProviderProps) => {
  const lineup = useLineupData();

  return (
    <LineupContext.Provider value={lineup}>{children}</LineupContext.Provider>
  );
};
