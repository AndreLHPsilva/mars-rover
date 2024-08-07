import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "express-async-errors";
import { routes } from "./routes";

import cors from "cors";
import { IReturnApi } from "@helpers/returnApi";
import { ExpressMiddleware } from "@middlewares/ExpressMiddleware";

export const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.returnApi = (data: IReturnApi): Response => {
    const returnData = {
      data: data.data ?? null,
      statusHTTP: data.statusHTTP ?? 200,
      message: data.message ?? "",
    };

    return res.status(returnData.statusHTTP).json(returnData);
  };
  next();
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(routes);

app.use(ExpressMiddleware.handleErrors);

app.use(function (req, res, next) {
  res.returnApi({ statusHTTP: 404, message: "Rota não encontrada" });
});

app.listen(process.env.PORT ?? 3001, () => {
  console.log(`Server is running in the port ${process.env.PORT ?? 3001}`);
});
