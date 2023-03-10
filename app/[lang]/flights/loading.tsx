import "../../../styles/loading.css";

import LoadingTicketCard from "@/components/flights/LoadingTicketCard";

export default function page() {
  return (
    <div className="flex flex-col gap-10 pt-24 md:px-4 px-2 pb-10">
      {[1, 2, 3, 4].map((i, index) => (
        <LoadingTicketCard key={i} />
      ))}
    </div>
  );
}
