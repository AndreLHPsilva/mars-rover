import request from "supertest";
import { app } from "../../server";

describe("SendRover Integration Test", () => {
  test("Should send a request for SendRover with success", async () => {
    const responseExpected = {
      data: {
        positions: [
          {
            direction: "N",
            x: 0,
            y: 0,
            is_first_position: true,
          },
          {
            direction: "N",
            x: 0,
            y: 1,
          },
          {
            direction: "N",
            x: 0,
            y: 2,
          },
          {
            direction: "E",
            x: 0,
            y: 2,
          },
          {
            direction: "E",
            x: 1,
            y: 2,
          },
          {
            direction: "E",
            x: 2,
            y: 2,
          },
          {
            direction: "N",
            x: 2,
            y: 2,
          },
          {
            direction: "N",
            x: 2,
            y: 3,
            is_last_position: true,
          },
        ],
        instruction: "MMRMMLM",
        initialPosition: {
          direction: "N",
          x: 0,
          y: 0,
          is_first_position: true,
        },
        planSize: {
          sizeX: 5,
          sizeY: 5,
        },
        lastPosition: {
          direction: "N",
          x: 2,
          y: 3,
          is_last_position: true,
        },
      },
      statusHTTP: 200,
      message: "Movimentação realizada com sucesso!",
    };

    await request(app)
      .post("/rover/send")
      .send({
        initialPosition: "00N",
        instruction: "MMRMMLM",
        planSize: {
          sizeX: 5,
          sizeY: 5,
        },
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(responseExpected);
        expect(response.body.data.lastPosition).toEqual(responseExpected.data.lastPosition);
        expect(response.body.data.positions).toHaveLength(8);
      });
  });
});
