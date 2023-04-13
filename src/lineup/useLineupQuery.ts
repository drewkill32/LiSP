import { useQuery } from "@tanstack/react-query";
import { getLineup, Lineup } from "../api";

export const useLineupQuery = () => {
  return useQuery<Lineup[], Error>({
    queryKey: ["lineup"],
    queryFn: getLineup,
    staleTime: 1000 * 60,
    placeholderData: () => {
      var cachedValue = localStorage.getItem("lineups");
      if (cachedValue) {
        var l = JSON.parse(cachedValue) as Lineup[];
        return l.map((x) => ({
          ...x,
          startTime: new Date(x.startTime),
          endTime: new Date(x.endTime),
        }));
      }
      return [];
    },
    onSuccess: (result: Lineup[]) => {
      if (result) {
        localStorage.setItem("lineups", JSON.stringify(result));
      }
    },
  });
};
