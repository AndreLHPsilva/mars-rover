"use client";

import {
  TypeControlRover,
  controlRoverSchema,
} from "@/schemas/controlRoverShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eraser, Send } from "lucide-react";
import PopoverComponent from "./Popover";
import { Info } from "lucide-react";
import { useContext } from "react";
import { RoverContext } from "@/context/RoverContext";

function Control() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TypeControlRover>({
    resolver: zodResolver(controlRoverSchema),
  });

  const { sendRover } = useContext(RoverContext);

  function clearInstruction(text: string) {
    return text.slice(0, -1);
  }

  async function onSubmit(dataForRequest: TypeControlRover) {
    await sendRover(dataForRequest)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-sm flex flex-col gap-5 min-w-80 max-w-96 border rounded shadow-md p-7"
    >
      <div className="flex gap-1 flex-col">
        <label
          className="font-semibold text-xs whitespace-nowrap flex gap-1 items-center"
          htmlFor="initialPosition"
        >
          Dimensões Plano{" "}
          <PopoverComponent
            contentButton={<Info size={14} />}
            contentPanel={
              <span className="text-gray-600 text-[10px] leading-tight max-w-80">
                Dimensões do plano cartesiano X e Y
              </span>
            }
          />
        </label>

        <div className="flex justify-evenly gap-2 divide-x">
          <div className="flex items-center gap-2">
            <label
              className="font-semibold text-xs whitespace-nowrap flex gap-1 items-center"
              htmlFor="sizeX"
            >
              Eixo X
            </label>
            <input
              {...register("planSize.sizeX")}
              id="sizeX"
              type="number"
              min={1}
              className="border border-zinc-200 rounded py-1 px-2 outline-none focus:shadow focus:shadow-zinc-200 focus:border-yellow-600 transition-all shadow-md max-w-20"
            />
          </div>
          <div className="flex items-center gap-2 pl-2">
            <label
              className="font-semibold text-xs whitespace-nowrap flex gap-1 items-center"
              htmlFor="sizeY"
            >
              Eixo Y
            </label>
            <input
              {...register("planSize.sizeY")}
              id="sizeY"
              type="number"
              min={1}
              className="border border-zinc-200 rounded py-1 px-2 outline-none focus:shadow focus:shadow-zinc-200 focus:border-yellow-600 transition-all shadow-md max-w-20"
            />
          </div>
        </div>

        {errors.planSize && errors.planSize.sizeX && (
          <span className="text-red-500 text-[.625rem] max-w-80">
            {String(errors.planSize.sizeX?.message)}
          </span>
        )}

        {errors.planSize && errors.planSize.sizeY && (
          <span className="text-red-500 text-[.625rem] max-w-80">
            {String(errors.planSize.sizeY?.message)}
          </span>
        )}
      </div>

      <div className="flex gap-1 flex-col">
        <label
          className="font-semibold text-xs whitespace-nowrap flex gap-1 items-center"
          htmlFor="initialPosition"
        >
          Posição incial{" "}
          <PopoverComponent
            contentButton={<Info size={14} />}
            contentPanel={
              <span className="text-gray-600 text-[10px] leading-tight max-w-80">
                Deve seguir padrão de 2 números para coordenadas X e Y e uma
                Letra para direcionamento ("N", "S", "E" ou "W")
              </span>
            }
          />
        </label>
        <input
          {...register("initialPosition")}
          id="initialPosition"
          placeholder="Ex: 00N"
          maxLength={3}
          minLength={3}
          className="border border-zinc-200 rounded py-1 px-2 outline-none focus:shadow focus:shadow-zinc-200 focus:border-yellow-600 transition-all shadow-md"
        />

        {errors.initialPosition && (
          <span className="text-red-500 text-[.625rem] max-w-80">
            {errors.initialPosition.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-semibold text-xs" htmlFor="password">
          Instruções:
        </label>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="py-1 px-2 text-xs rounded text-emerald-800 border border-emerald-800 shadow-md hover:opacity-90 transition-all hover:scale-95"
            onClick={() =>
              setValue("instruction", `${getValues("instruction")}L`)
            }
            type="button"
            title="Clique para instruir a girar para esquerda"
          >
            Girar Esquerda
          </button>
          <button
            className="py-1 px-2 text-xs rounded text-emerald-800 border border-emerald-800 shadow-md hover:opacity-90 transition-all hover:scale-95"
            onClick={() =>
              setValue("instruction", `${getValues("instruction")}M`)
            }
            title="Clique para instruir a mover para frente"
            type="button"
          >
            Mover
          </button>
          <button
            className="py-1 px-2 text-xs rounded text-emerald-800 border border-emerald-800 shadow-md hover:opacity-90 transition-all hover:scale-95"
            onClick={() =>
              setValue("instruction", `${getValues("instruction")}R`)
            }
            title="Clique para instruir a girar para direita"
            type="button"
          >
            Girar Direita
          </button>
          <button
            className="py-1 px-2 text-xs rounded text-emerald-800 border border-emerald-800 shadow-md hover:opacity-90 transition-all hover:scale-95 flex justify-center"
            onClick={() =>
              setValue(
                "instruction",
                clearInstruction(getValues("instruction"))
              )
            }
            title="Clique para apagar a última instrução"
            type="button"
          >
            <Eraser size={14} />
          </button>
        </div>

        <input
          {...register("instruction")}
          type="email"
          id="email"
          readOnly
          title="Selecione uma ação nos botões acima"
          className="w-full border border-zinc-200 rounded py-1 px-2 outline-none focus:shadow focus:shadow-zinc-200 focus:border-yellow-600 transition-all shadow-md cursor-not-allowed"
        />
        {errors.instruction && (
          <span className="text-red-500 text-[.625rem] max-w-80">
            {errors.instruction.message}
          </span>
        )}
      </div>
      <button
        className="w-full rounded bg-emerald-600 text-white uppercase font-bold text-xs py-1.5 hover:opacity-90 transition-all shadow-md flex items-center gap-1 justify-center"
        type="submit"
      >
        <Send size={16} />
        Enviar
      </button>
    </form>
  );
}

export default Control;
