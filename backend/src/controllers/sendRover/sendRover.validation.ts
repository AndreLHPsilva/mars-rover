import { z } from "zod";
import { ApiError } from "@errors/ApiError";

interface IData {
  initialPosition: string;
  instruction: string;
  planSize: {
    sizeX: number;
    sizeY: number;
  };
}

export default class SendRoverValidation {
  static validate(data: IData): IData {
    const createUserSchema = z.object({
      initialPosition: z
        .string({
          invalid_type_error: 'Posição inicial deve seguir padrão Ex: "00N"',
          required_error: "Posição inicial é obrigatória",
        })
        .toUpperCase()
        .regex(/^\d{2}[NSEW]$/, {
          message: 'A posição inicial deve seguir o formato Ex: "00N"',
        })
        .trim(),
      instruction: z
        .string({
          invalid_type_error: 'Instrução deve conter apenas "M", "L" ou "R"',
          required_error: "Instrução é obrigatória",
        })
        .toUpperCase()
        .regex(/^[MLR]+$/, {
          message: "As instruções devem conter apenas os caracteres M, L ou R.",
        })
        .trim(),
      planSize: z.object({
        sizeX: z
          .number({
            invalid_type_error: "O tamanho do eixo X deve ser um número",
            required_error: "Tamanho do eixo X é obrigatório",
          })
          .min(0, {
            message: "O tamanho do eixo X deve ser igual ou maior que 0",
          }),
        sizeY: z
          .number({
            invalid_type_error: "O tamanho do eixo Y deve ser um número",
            required_error: "Tamanho do eixo Y é obrigatório",
          })
          .min(0, {
            message: "O tamanho do eixo Y deve ser igual ou maior que 0",
          }),
      }),
    });

    const validatedeDate = createUserSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message);
    }

    return validatedeDate.data;
  }
}
