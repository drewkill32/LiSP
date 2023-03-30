import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import { getLineup, Lineup } from "../api";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { Day } from "../utils";

export const LineupContext = createContext<LineupData>({} as LineupData);

export type SortOption = "Time" | "Venue" | "Artist";

export const useLineup = (): LineupData => {
  return useContext(LineupContext)!;
};

type LineupGroup = Record<string, Lineup[]>;

const groupByHour = (array: Lineup[]): LineupGroup => {
  const grouped: LineupGroup = {};

  array.forEach((item) => {
    const date = new Date(item.startTime);
    const hour = date.getHours();
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    const hourString = `${formattedHour}:00 ${ampm}`;

    if (!grouped[hourString]) {
      grouped[hourString] = [];
    }

    grouped[hourString].push(item);
  });

  return grouped;
};

const groupByName = (array: Lineup[]): LineupGroup => {
  const grouped: LineupGroup = {};

  array.forEach((item) => {
    const name = item.name[0].toUpperCase();

    if (!grouped[name]) {
      grouped[name] = [];
    }

    grouped[name].push(item);
  });

  return grouped;
};

const groupByDay = (array: Lineup[]): LineupGroup => {
  const grouped: LineupGroup = {};

  array.forEach((item) => {
    const name = item.day;

    if (!grouped[name]) {
      grouped[name] = [];
    }

    grouped[name].push(item);
  });

  return grouped;
};

const groupByVenue = (array: Lineup[]): LineupGroup => {
  const grouped: LineupGroup = {};

  array.forEach((item) => {
    const name = item.venue;

    if (!grouped[name]) {
      grouped[name] = [];
    }

    grouped[name].push(item);
  });

  return grouped;
};

const groupLineup = (sortOption: SortOption, lineups: Lineup[]) => {
  switch (sortOption) {
    case "Time":
      return groupByHour(lineups);
    case "Artist":
      return groupByName(lineups);
    case "Venue":
      return groupByVenue(lineups);
  }
};

const sortLineupData = (sortOrder: SortOption, data: Lineup[]) => {
  switch (sortOrder) {
    case "Time":
      return data.sort(sortByStartDate);
    case "Artist":
      return data.sort((a, b) => a.name.localeCompare(b.name));
    case "Venue":
      return data.sort((a, b) => a.venue.localeCompare(b.name));
  }
};

const sortByStartDate = (a: Lineup, b: Lineup) => {
  return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
};

export const useLineupData = () => {
  const { data, error, isLoading } = useQuery<Lineup[], Error>({
    queryKey: ["lineup"],
    queryFn: getLineup,
  });

  const [search, setSearch] = useState("");
  const [day, setDay] = useLocalStorageState<Day | null>("selectedDay", "Fri");
  const [stared, setStared] = useLocalStorageState<Set<number>>(
    "stared",
    new Set<number>(),
    (value) => {
      return [...value];
    },
    (value) => new Set<number>(value)
  );
  const [filterStar, setFilterStar] = useLocalStorageState("filterStar", false);
  const [sortOrder, setSortOrder] = useLocalStorageState<SortOption>(
    "sortOrder",
    "Time"
  );

  let artists: string[] = [];
  if (data) {
    const sortedArtists = data
      ?.map((l) => l.name)
      .sort((a, b) => a.localeCompare(b));
    artists = [...new Set(sortedArtists)];
  }

  const toggleStar = (id: number) => {
    setStared((prevChecked) => {
      const newChecked = new Set(prevChecked);
      if (prevChecked.has(id)) {
        newChecked.delete(id);
      } else {
        newChecked.add(id);
      }
      return newChecked;
    });
  };
  const isStared = (id: number) => {
    return stared.has(id);
  };

  const sortLineup = (sortBy: SortOption) => {
    setSortOrder(sortBy);
  };

  const filteredData = useMemo(() => {
    if (!data) {
      return { "No Results": [] as Lineup[] };
    }

    if (search.length > 0) {
      console.log(search);
      const results = data.filter((d) =>
        d.name.toUpperCase().includes(search.toUpperCase())
      );
      //.sort(sortByStartDate);
      console.log(results);
      setDay(null);
      return groupByDay(results);
    }

    const filtered = data.filter(
      (d) => d.day === day && (filterStar === false || stared.has(d.id))
    );

    const sortedData = sortLineupData(sortOrder, filtered);

    return groupLineup(sortOrder, sortedData);
  }, [data, day, sortOrder, filterStar, stared, search]);

  return {
    isLoading,
    error,
    search,
    setSearch: (v: string | null | undefined) => {
      setSearch(v?.trim() || "");
    },
    lineup: filteredData,
    artists,
    sortOrder,
    sortLineup,
    toggleStar,
    stared,
    filterStar,
    setFilterStar,
    day,
    setDay,
    isStared,
  };
};

export type LineupData = ReturnType<typeof useLineupData>;
