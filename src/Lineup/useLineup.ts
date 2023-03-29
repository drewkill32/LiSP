import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import { getLineup, Lineup } from "../api";

export const LineupContext = createContext<LineupData>({} as LineupData);

export const useLineup = (): LineupData => {
  return useContext(LineupContext)!;
};

export type FilterTypes =
  | undefined
  | {
      day: "Fri" | "Sat" | "Sun" | "All";
      star: true | undefined;
      artist: undefined | string;
    };

const sortByName = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const useLineupData = () => {
  const { data, error, isLoading } = useQuery<Lineup[], Error>({
    queryKey: ["lineup"],
    queryFn: getLineup,
  });
  const [filter, setFilter] = useState<FilterTypes>();

  let artists: string[] = [];
  if (data) {
    const sortedArtists = data?.map((l) => l.name).sort(sortByName);
    artists = [...new Set(sortedArtists)];
  }

  const sortLineup = (sortBy: "artist" | "time" | "venue") => {};

  const filteredData = useMemo(() => {
    if (data) {
      return data.filter((d) => {
        if (filter === undefined) {
          return true;
        }
        // TODO: support star
        if (filter.day === "All") {
          return true;
        }
        return d.day === filter.day;
      });
    } else {
      return [];
    }
  }, [data, filter]);

  return {
    isLoading: isLoading,
    error: error,
    lineup: filteredData,
    artists: artists,
    sortLineup,
    setFilter,
  };
};

export type LineupData = ReturnType<typeof useLineupData>;
