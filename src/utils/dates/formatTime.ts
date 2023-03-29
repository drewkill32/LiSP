export const formatTime = (date: Date) => {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = date.getMinutes();
  const ampm = hours24 < 12 ? "AM" : "PM";

  return `${hours12.toString()}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};
