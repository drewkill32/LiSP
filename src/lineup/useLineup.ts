import { createContext, useContext, useMemo, useState } from "react";
import { Day, Lineup } from "../api";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { useLineupQuery } from "./useLineupQuery";
import { useVenues } from "./useVenue";

export const LineupContext = createContext<LineupData>({} as LineupData);

export type SortOption = "Time" | "Venue" | "Artist";

export const useLineup = (): LineupData => {
  return useContext(LineupContext)!;
};

export type LineupGroup = Record<string, Lineup[]>;

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
    let name = item.name[0].toUpperCase();
    if (!isNaN(Number(name))) {
      name = "#";
    }
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
      return data.sort((a, b) => {
        const venueComparison = a.venue.localeCompare(b.venue);
        if (venueComparison !== 0) {
          return venueComparison;
        }
        // Secondary sort by time
        return sortByStartDate(a, b);
      });
  }
};

type sortByStartDateProps = {
  startTime: Date;
};

const sortByStartDate = (a: sortByStartDateProps, b: sortByStartDateProps) => {
  return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
};

export const useLineupData = () => {
  const { data, error, isLoading } = useLineupQuery();

  const [search, setSearch] = useState("");
  const [prevFilters, setPrevFilters] = useState<{
    key: string;
    sort: SortOption;
    day: Day;
    filterStar: boolean;
  }>();

  const [day, setDay] = useLocalStorageState<Day | undefined>(
    "selectedDay",
    "Fri"
  );

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
      ?.map((l: Lineup) => l.name)
      .sort((a: string, b: string) => a.localeCompare(b));
    artists = [...new Set<string>(sortedArtists)];
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
      return {};
    }

    if (search.length > 0) {
      if (prevFilters?.key !== search) {
        setPrevFilters({
          key: search,
          day: day || "Fri",
          filterStar: filterStar,
          sort: sortOrder,
        });
      }

      const results = data
        .filter((d: Lineup) =>
          d.name.toUpperCase().includes(search.toUpperCase())
        )
        .sort(sortByStartDate);
      setDay(undefined);
      setFilterStar(false);
      setSortOrder("Time");
      return groupByDay(results);
    }
    if (prevFilters !== undefined) {
      const prevFiltersTemp = {
        ...prevFilters,
      };
      setDay(prevFiltersTemp.day);
      setSortOrder(prevFiltersTemp.sort);
      setFilterStar(prevFiltersTemp.filterStar);
      setPrevFilters(undefined);
    }

    const filtered = data.filter(
      (d: Lineup) => d.day === day && (filterStar === false || stared.has(d.id))
    );

    const sortedData = sortLineupData(sortOrder, filtered);

    return groupLineup(sortOrder, sortedData);
  }, [data, day, sortOrder, filterStar, stared, search]);

  const venues = useVenues(data);

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
    venues,
  };
};

export type LineupData = ReturnType<typeof useLineupData>;
