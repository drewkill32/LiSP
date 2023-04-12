export const createGoogleMapsUrl = (address: string, name: string) => {
  const encodedAddress = encodeURIComponent(address);
  const encodedLocationName = encodeURIComponent(name);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}+${encodedLocationName}`;
};
