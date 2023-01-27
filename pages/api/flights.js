import flights from "./data.json";

export default (req, res) => {
  const {
    query: { from, to, departure, arrival, stops },
  } = req;
  let filteredData = flights;

  if (from) {
    filteredData = filteredData.filter((flight) => flight.from === from);
  }

  if (to) {
    filteredData = filteredData.filter((flight) => flight.to === to);
  }

  if (departure) {
    filteredData = filteredData.filter(
      (flight) => flight.departure.time === departure
    );
  }

  if (arrival) {
    filteredData = filteredData.filter(
      (flight) => flight.arrival.time === arrival
    );
  }

  if (stops) {
    filteredData = filteredData.filter((flight) => flight.stops === stops);
  }

  res.status(200).json(filteredData);
};
