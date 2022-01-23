import { databaseClose, databasePurge } from "../../src/database/connection";
import { databaseConnection } from "../../src/database/connection";
import supertest from "supertest";
import app from "../../src/app";
import { config } from "dotenv";
config();

describe("Domain suit", () => {
    const domainExample = {
        name: "resturants",

    };

    const domainExampleInvalid = {
        random: "random",
    };

    beforeAll(async () => {
        await databaseConnection(process.env.DB_NAME_TEST).catch((e) =>
            console.error(e)
        );
    });

    afterAll(async () => {
        await databaseClose().catch((e) => console.error(e));
    });

    beforeEach(async () => {
        await databasePurge().catch((e) => console.error(e));
    });

    test("it should create a domain  successfully", async () => {
        await supertest(app)
            .post("/api/v1/domains")
            .send(domainExample)
            .expect(201)
            .then((response) => {
                // Check type and length
                expect(response.body).toEqual({
                    status: "success",
                    data: {
                        name: domainExample.name
                    },
                });
            });
    });


    test("it should return 422 ", async () => {
        await supertest(app)
            .post("/api/v1/domains")
            .send(domainExampleInvalid)
            .expect(422)
            .then((response) => {
                // Check type and length
                expect(response.body).toEqual({
                    statusCode: 422,
                    status: "fail",
                    isOperational: true,
                    code: "validation_failed",
                    errors: [
                        {
                            value: "",
                            msg: "name can not be empty!",
                            param: "name",
                            location: "body"
                        }
                    ],
                    stack: "Error: validation  error"

                });
            });
    });


});
