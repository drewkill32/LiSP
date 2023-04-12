import { useMemo } from "react";
import { Lineup } from "../api";

interface Performance {
  name: string;
  details: string;
  artistBioUrl: string;
  artistType: string;
  startTime: Date;
  endTime: Date;
}

interface PerformanceGroup {
  day: string;
  performances: Performance[];
}

interface Stage {
  id: number;
  name: string;
  grpPerformance: PerformanceGroup[];
}

export interface Venue {
  address: string;
  name: string;
  venueSlug: string;
  lat: number;
  lng: number;
  stages: Stage[];
}

export const useVenues = (data: Lineup[] | undefined) => {
  const venues = useMemo(() => {
    if (!data) {
      return [];
    }

    const groupedByVenueSlug = data.reduce((acc: Record<string, any>, curr) => {
      const venueAddress = curr.venueAddress;
      const match = curr.venue.match(/(.+) \(([^)]+)\)/);
      const [, venueName, stageName] = match || [null, curr.venue, curr.venue];

      if (!acc[venueAddress]) {
        acc[venueAddress] = {
          name: venueName,
          address: venueAddress,
          venueSlug: curr.venueSlug,
          lat: curr.lat,
          lng: curr.lng,
          stages: [],
        };
      }
      const performance = {
        id: curr.id,
        name: curr.name,
        details: curr.details,
        artistBioUrl: curr.artistBioUrl,
        artistType: curr.artistType,
        startTime: curr.startTime,
        endTime: curr.endTime,
      };

      const stage = acc[venueAddress].stages.find(
        (s: { name: string }) => s.name === stageName
      );
      if (!stage) {
        acc[venueAddress].stages.push({
          name: stageName,
          grpPerformance: [
            {
              day: curr.day,
              performances: [performance],
            },
          ],
        });
      } else {
        const performanceGroup = stage.grpPerformance.find(
          (g: { day: string }) => g.day === curr.day
        );
        if (!performanceGroup) {
          stage.grpPerformance.push({
            day: curr.day,
            performances: [performance],
          });
        } else {
          performanceGroup.performances.push(performance);
        }
      }

      return acc;
    }, {});

    const result = Object.values(groupedByVenueSlug) as Venue[];
    return result;
  }, [data]);
  return venues;
};
