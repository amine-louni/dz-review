import { databaseClose } from "../../src/database/connection";
import { databaseConnection } from "../../src/database/connection";
import supertest from "supertest";
import app from "../../src/app";
import { config } from "dotenv";
import { Domain } from "../../src/entities/Domain";
import { User } from "../../src/entities/User";
import faker from 'faker'

config();

const userExample = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'LoremIpsum1993',
    dob: "1995-10-10"
};
const userExample2 = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'LoremIpsum1993',
    dob: "1995-10-10"
};
const userExample3 = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'LoremIpsum1993',
    dob: "1995-10-10"
};
const domainExample = {
    name: faker.company.companyName(),

};
const domainExampleInvalid = {
    random: "random",
};

describe("Domain CRUD suit", () => {

    beforeAll(async () => {
        await databaseConnection(process.env.DB_NAME_TEST).catch((e) =>
            console.error(e)
        );
    });

    afterAll(async () => {
        await databaseClose().catch((e) => console.error(e));
    });



    test("it should create a domain  successfully", async () => {

        //Create a user
        const { body } = await supertest(app)
            .post("/api/v1/users/auth/register")
            .send(userExample)

        await User.update({ uuid: body.data.uuid }, { role: 'admin' })

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
                        uuid: expect.any(String),
                        name: domainExample.name,
                        archived: false,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    },
                });
            });
    });

    test("it should return 422 when creating domain", async () => {
        //Create a user
        const { body } = await supertest(app)
            .post("/api/v1/users/auth/register")
            .send(userExample2)
        await User.update({ uuid: body.data.uuid }, { role: 'admin' })
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
            .send(userExample3)
        await User.update({ uuid: body.data.uuid }, { role: 'admin' })

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
                        name: domainExample.name,
                        uuid: expect.any(String),
                        archived: false,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),

                    },
                });
            });




    });

    test("it should read all domains  successfully", async () => {
        // create domain

        const testDomain = await Domain.create({
            "name": "test",
            "createdAt": "2022-01-24T13:03:14.699Z",
            "updatedAt": "2022-01-24T13:03:14.699Z"
        })

        await testDomain.save()
        await supertest(app)
            .get('/api/v1/domains')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    status: "success",
                    data: expect.arrayContaining([
                        {
                            "uuid": expect.any(String),
                            "name": expect.any(String),
                            "archived": expect.any(Boolean),
                            "createdAt": expect.any(String),
                            "updatedAt": expect.any(String),
                        }
                    ])
                });
            });




    });
});
