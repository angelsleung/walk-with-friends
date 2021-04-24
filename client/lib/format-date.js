export default function formatDate(savedDate) {
  if (!savedDate) return;
  const parsedDate = Date.parse(savedDate);
  const dateString = new Date(parsedDate).toString();
  const [day, month, date, year, time] = dateString.split(' ');
  const [hour, min] = time.split(':');
  const amPm = hour < 12 ? 'am' : 'pm';
  const standardHour = hour > 12 ? hour % 12 : hour === '00' ? 12 : parseInt(hour);
  return `${day}, ${month} ${date}, ${year} @ ${standardHour}:${min} ${amPm}`;
}
