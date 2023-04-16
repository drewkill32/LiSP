export const createGoogleMapsUrl = (address: string, name: string) => {
  const encodedAddress = encodeURIComponent(address);
  const encodedLocationName = encodeURIComponent(name);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}+${encodedLocationName}`;
};

export const panToOffset = (
  map: google.maps.Map,
  markerPosition: google.maps.LatLng,
  xOffset: number,
  yOffset: number
) => {
  const projection = map.getProjection();
  if (!projection) return;

  var scale = Math.pow(2, map.getZoom()!);

  var pixelOffset = new google.maps.Point(
    xOffset / scale || 0,
    yOffset / scale || 0
  );
  const worldCoordinateCenter = projection.fromLatLngToPoint(markerPosition)!;

  const worldCoordinateNewCenter = new google.maps.Point(
    worldCoordinateCenter.x - pixelOffset.x,
    worldCoordinateCenter.y + pixelOffset.y
  );
  var newCenter = projection.fromPointToLatLng(worldCoordinateNewCenter)!;
  map.panTo(newCenter);
};
