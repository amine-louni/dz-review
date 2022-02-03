import { databaseClose } from "../../src/database/connection";
import { databaseConnection } from "../../src/database/connection";
import supertest from "supertest";
import app from "../../src/app";
import { config } from "dotenv";
import faker from 'faker';
import { User } from "../../src/entities/User";

config();


const userExample = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'LoremIpsum1993',
    dob: "1995-10-10"
};
const userExampleForUpdate = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'LoremIpsum1993',
    dob: "1995-10-10"
};

const businessExample = {
    name: faker.company.companyName(),
    about: faker.lorem.paragraph(),
    state: "chlef",
    city: "tenes",
    phone: '0777777777',
    website: faker.internet.url(),
    email: faker.internet.email(),
    googleMapsUrl: "https://www.google.com/maps/dir//orcloud/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x128fadae211261fd:0x75db15dec911d09d?sa=X&ved=2ahUKEwjXuMjk7tH1AhV3gv0HHbS5CJkQ9Rd6BAgtEAQ",

};
const businessExampleForUpdate = {
    name: faker.company.companyName(),
    about: faker.lorem.paragraph(),
    state: "chlef",
    city: "tenes",
    phone: '0777777777',
    website: faker.internet.url(),
    email: faker.internet.email(),
    googleMapsUrl: "https://www.google.com/maps/dir//orcloud/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x128fadae211261fd:0x75db15dec911d09d?sa=X&ved=2ahUKEwjXuMjk7tH1AhV3gv0HHbS5CJkQ9Rd6BAgtEAQ",

};

describe("Business CRUD suit", () => {
    beforeAll(async () => {
        await databaseConnection(process.env.DB_NAME_TEST).catch((e) =>
            console.error(e)
        );
    });

    afterAll(async () => {
        await databaseClose().catch((e) => console.error(e));
    });



    test("it should create a business  successfully", async () => {

        //Create a user
        const { body } = await supertest(app)
            .post("/api/v1/users/auth/register")
            .send(userExample)
        //Make it admin
        await User.update({ uuid: body.data.uuid }, { role: 'admin' })

        //Create a domain with the admin user
        const { body: domainBody } = await supertest(app)
            .post("/api/v1/domains")
            .set("Authorization", `Bearer ${body.token}`)
            .send({ name: "only for test" })

        await supertest(app)
            .post("/api/v1/business")
            .set("Authorization", `Bearer ${body.token}`)
            .send({ ...businessExample, domains: [domainBody.data.uuid] })

            .then((response) => {
                console.log(response.body);
                expect(response.body).toEqual({
                    status: "success",
                    data: {
                        name: expect.any(String),
                        about: expect.any(String),
                        state: expect.any(String),
                        city: expect.any(String),
                        phone: expect.any(String),
                        website: expect.any(String),
                        email: expect.any(String),
                        googleMapsUrl: expect.any(String),
                        domains: expect.any(Array),
                        claimedByOwner: false,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        uuid: expect.any(String),
                        media: expect.any(Array),

                    },
                });
            });
    });


    test.only("it should update a business  successfully", async () => {

        //Create a user
        const { body } = await supertest(app)
            .post("/api/v1/users/auth/register")
            .send(userExampleForUpdate)
        //Make it admin
        await User.update(body.data.uuid as string, { role: 'admin' })

        //Create a domain with the admin user
        const { body: domainBody } = await supertest(app)
            .post("/api/v1/domains")
            .set("Authorization", `Bearer ${body.token}`)
            .send({ name: "only for test" })

        // Create a business
        const { body: businessBody } = await supertest(app)
            .post("/api/v1/business")
            .set("Authorization", `Bearer ${body.token}`)
            .send({ ...businessExampleForUpdate, domains: [domainBody.data.uuid] })

        // update it !
        await supertest(app)
            .patch(`/api/v1/business/${businessBody.uuid}`)
            .set("Authorization", `Bearer ${body.token}`)
            .send({ name: 'updated' })
            // .expect(201)
            .then((response) => {
                console.log(response.body);
                expect(response.body).toEqual({
                    status: "success",
                    data: {
                        name: 'updated',
                        about: expect.any(String),
                        state: expect.any(String),
                        city: expect.any(String),
                        phone: expect.any(String),
                        website: expect.any(String),
                        email: expect.any(String),
                        googleMapsUrl: expect.any(String),

                        claimedByOwner: false,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        uuid: expect.any(String),
                        media: expect.any(Array),

                    },
                });
            });
    });
});
