import { databaseClose, databasePurge } from "../../src/database/connection";
import { databaseConnection } from "../../src/database/connection";
import supertest from "supertest";
import app from "../../src/app";
import { config } from "dotenv";
import { Domain } from "../../src/entities/Domain";

config();


const userExample = {
    firstName: "john",
    lastName: "doe",
    userName: "floki",
    email: "john@gmail.com",
    password: "12345678s",
    dob: "1995-10-10",
};


describe("Domain CRUD suit", () => {
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

        //Create a user
        const { body } = await supertest(app)
            .post("/api/v1/users/auth/register")
            .send(userExample)


        await supertest(app)
            .post("/api/v1/domains")
            .set("Authorization", `Bearer ${body.token}`)
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


    test("it should return 422 when creating domain", async () => {
        //Create a user
        const { body } = await supertest(app)
            .post("/api/v1/users/auth/register")
            .send(userExample)

        await supertest(app)
            .post("/api/v1/domains")
            .set("Authorization", `Bearer ${body.token}`)
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




    test("it should update a domain  successfully", async () => {
        // user created
        const { body } = await supertest(app)
            .post("/api/v1/users/auth/register")
            .send(userExample)

        // domain created
        const domianCreated = await Domain.create(domainExample)
        await supertest(app)
            .patch(`/api/v1/domains/${domianCreated.uuid}`)
            .set("Authorization", `Bearer ${body.token}`)
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
});
