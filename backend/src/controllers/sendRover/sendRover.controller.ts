import { Request, Response } from "express";
import SendRoverValidation from "./sendRover.validation";
import { sendRoverUseCase } from "@modules/useCases/sendRover";

export default class SendRoverController {
  async handler(req: Request, res: Response): Promise<any> {
    const data = SendRoverValidation.validate(
      req.body
    );

    const response = await sendRoverUseCase.execute(data);

    return res.returnApi({data: response, message: 'Movimentação realizada com sucesso!', statusHTTP: 200})
  }
}
