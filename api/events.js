export default async function handler(req, res) {
  const url = "https://calendar.google.com/calendar/ical/franco%40visualblasters.com/public/basic.ics";

  const response = await fetch(url);
  const text = await response.text();

  const events = text.split("BEGIN:VEVENT").slice(1).map(e => {
    const summary = (e.match(/SUMMARY:(.*)/) || [])[1];
    const date = (e.match(/DTSTART:(.*)/) || [])[1];

    return {
      title: summary,
      date: date
    };
  });

  res.status(200).json(events.slice(0, 5));
}
