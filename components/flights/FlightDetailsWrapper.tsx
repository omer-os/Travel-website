"use client";
import React, { useState } from "react";
import { ShowDetailsContext } from "./context";
import FlightDetails from "./FlightDetails";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { FlightSegment } from "../interface/Res";
import { FlightSegmentsEntity } from "../apiFunctions/ResponseTypes";
import { LocaleType } from "@/app/i18n/locales2/localeType";

type FlightDetailsWrapperProps = {
  children: React.ReactNode;
  flightSegments?: FlightSegmentsEntity[];
  texts: LocaleType | null;
  lang: string;
};

export default function FlightDetailsWrapper({
  children,
  flightSegments,
  texts,
  lang,
}: FlightDetailsWrapperProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <ShowDetailsContext.Provider value={{ showDetails, setShowDetails }}>
        {children}

        <div>
          <AnimatePresence>
            {showDetails && (
              <motion.div
                animate={{
                  scale: [0.8, 1],
                  opacity: [0, 1],
                }}
                exit={{
                  scale: [1, 0.8],
                  opacity: [1, 0],
                }}
                className="flex flex-col gap-3 py-2"
              >
                {flightSegments?.map((i, index) => (
                  <FlightDetails
                    flight={i.Flight}
                    FlightIndex={index}
                    key={index}
                    texts={texts}
                    lang={lang}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ShowDetailsContext.Provider>
    </>
  );
}
