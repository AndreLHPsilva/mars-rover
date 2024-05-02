import { z } from "zod";

export const controlRoverSchema = z.object({
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
    sizeX: z.custom(
      (val) => {
        if (!val) return false;
        const parsed = Number(val);
        if (isNaN(parsed)) return false;
        if (parsed <= 0) return false;
        return parsed;
      },
      {
        message:
          "É obrigatorio informar Eixo X e deve ser um número maior que 0",
      }
    ).transform((val) => Number(val)),
    sizeY: z.custom(
      (val) => {
        if (!val) return false;
        const parsed = Number(val);
        if (isNaN(parsed)) return false;
        if (parsed <= 0) return false;
        return parsed;
      },
      {
        message:
          "É obrigatorio informar Eixo Y e deve ser um número maior que 0",
      }
    ).transform((val) => Number(val)),
  }),
});

export type TypeControlRover = z.infer<typeof controlRoverSchema>;
