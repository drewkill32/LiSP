import { LineupContext, useLineupData } from "./useLineup";

type LineupContextProviderProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const LineupProvider = ({
  children,
  fallback,
}: LineupContextProviderProps) => {
  const lineup = useLineupData();
  if (lineup.isLoading) {
    return <>{fallback}</>;
  }
  return (
    <LineupContext.Provider value={lineup}>{children}</LineupContext.Provider>
  );
};
