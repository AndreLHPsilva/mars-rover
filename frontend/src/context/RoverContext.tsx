'use client'
import { axiosInstance } from "@/config/axios";
import { SendReport } from "@/helpers/Notifications";
import { createContext, useState } from "react";

interface IPosition {
  direction: "N" | "S" | "E" | "W";
  x: number;
  y: number;
  is_first_position?: boolean;
  is_last_position?: boolean;
}

interface IResultRover {
  positions: IPosition[];
  instruction: string;
  initialPosition: IPosition;
  planSize: {
    sizeX: number;
    sizeY: number;
  };
  lastPosition: IPosition;
}

interface IRoverContext {
  resultSentRover: IResultRover | null;
  sendRover: (dataForRequest: ISendRover) => Promise<void>;
}

interface ISendRover {
  initialPosition: string;
  instruction: string;
  planSize: {
    sizeX: number;
    sizeY: number;
  };
}

const RoverContext = createContext<IRoverContext>({} as IRoverContext);

const RoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [resultSentRover, setResultSentRover] = useState(null);

  async function sendRover(dataForRequest: ISendRover) {
    try {
      const {
        data: { data },
      } = await axiosInstance.post("/rover/send", dataForRequest);

      setResultSentRover(data);
    } catch (error: any) {
      const {
        response: {
          data: { message },
        },
      } = error;

      SendReport({
        title: "Erro",
        type: "failure",
        text: message,
      });
    }
  }

  const valuesContext = {
    resultSentRover,
    sendRover,
  };

  return (
    <RoverContext.Provider value={valuesContext}>
      <>{children}</>
    </RoverContext.Provider>
  );
};

export { RoverContext, RoverProvider };
