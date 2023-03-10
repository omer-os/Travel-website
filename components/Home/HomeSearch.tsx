"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import DateInput from "./components/DateInput";
import FromAndTo from "./components/FromAndTo";
import { FullPageCom } from "./FullPageComponent/FullPageCom";
import Passengers from "./components/Passengers";
import PassengersInput from "./components/PassengersInput";
import { TheDateComponent } from "./components/TheDateComponent";
import TripType from "./components/TripType";
import { LocaleType } from "@/app/i18n/locales2/localeType";

export default function HomeSearch({ lang }) {
  const [Loading, setLoading] = useState<true | false>(false);
  const [FlightPassengers, setFlightPassengers] = useState<{
    Adults: number;
    Children: number;
    Babies: number;
  }>({
    Adults: 1,
    Children: 0,
    Babies: 0,
  });
  const [FlightClass, setFlightClass] = useState<"economy" | "business">(
    "economy"
  );
  const [SelectedType, setSelectedType] = useState<1 | 0>(0);

  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");

  const handleSwap = () => {
    setFrom(To);
    setTo(From);
  };

  const [Texts, setTexts] = useState<null | LocaleType>(null);

  useEffect(() => {
    import(`@/app/i18n/locales2/${lang}/hometranslation.json`).then((data) => {
      setTexts(data);
    });
  }, [lang]);

  const [OneWayStartDate, setOneWayStartDate] = useState("");
  const [TwoWaysTripDate, setTwoWaysTripDate] = useState<any>([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [ShowFullPage, setShowFullPage] = useState<true | false>(false);
  const [ShowDatePicker, setShowDatePicker] = useState<true | false>(false);
  const [ShowPassengerComponent, setShowPassengerComponent] = useState<
    true | false
  >(false);

  return (
    <div className="p-4 relative -top-32">
      <TripType
        Texts={Texts}
        SelectedType={SelectedType}
        setSelectedType={setSelectedType}
      />
      <FromAndTo
        Texts={Texts}
        From={From}
        setShowFullPage={setShowFullPage}
        To={To}
      />
      <DateInput
        Texts={Texts}
        SelectedType={SelectedType}
        TwoWaysTripDate={TwoWaysTripDate}
        OneWayStartDate={OneWayStartDate}
        setShowDatePicker={setShowDatePicker}
      />
      <PassengersInput
        Texts={Texts}
        setShowPassengerComponent={setShowPassengerComponent}
        FlightPassengers={FlightPassengers}
      />
      <AnimatePresence>
        {ShowFullPage && (
          <FullPageCom
            Texts={Texts}
            setShowFullPage={setShowFullPage}
            From={From}
            To={To}
            setFrom={setFrom}
            setTo={setTo}
          />
        )}
        {ShowDatePicker && (
          <>
            <TheDateComponent
              Texts={Texts}
              setShowDatePicker={setShowDatePicker}
              SelectedType={SelectedType}
              TwoWaysTripDate={TwoWaysTripDate}
              setTwoWaysTripDate={setTwoWaysTripDate}
              OneWayStartDate={OneWayStartDate}
              setOneWayStartDate={setOneWayStartDate}
            />
          </>
        )}
        {ShowPassengerComponent && (
          <Passengers
            Texts={Texts}
            FlightClass={FlightClass}
            setFlightClass={setFlightClass}
            setFlightPassengers={setFlightPassengers}
            setShowPassengerComponent={setShowPassengerComponent}
          />
        )}{" "}
      </AnimatePresence>
      <Link
        href={`/${lang}/flights?from=${From}&to=${To}&adults=${
          FlightPassengers && FlightPassengers.Adults
        }&children=${FlightPassengers && FlightPassengers.Children}&babies=${
          FlightPassengers && FlightPassengers.Children
        }&tripclass=${FlightClass}&departure=${
          SelectedType === 0
            ? OneWayStartDate
            : getDate(TwoWaysTripDate[0].startDate) +
              "&returndate=" +
              getDate(TwoWaysTripDate[0].endDate)
        }`}
        onClick={() => setLoading(true)}
        className={`mt-5 text-center bg-blue-600 rounded-xl p-3 font-bold text-lg capitalize text-white active:scale-95 active:bg-blue-700 flex justify-center transition-all relative ${
          Loading && "bg-blue-800"
        }`}
      >
        {Loading ? (
          <div className="animate-spin">
            <ImSpinner2 />
          </div>
        ) : (
          // @ts-ignore
          Texts?.search
        )}
      </Link>
    </div>
  );
}

export const getDate = (Dat: string) => {
  let date = new Date(Dat);

  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  let formattedDate = year + "-" + month + "-" + day;
  return `${formattedDate}`;
};
