import { databaseClose, databasePurge } from "../../src/database/connection";
import { databaseConnection } from "../../src/database/connection";
import supertest from "supertest";
import app from "../../src/app";
import { config } from "dotenv";


config();


const userExample = {
    firstName: "john",
    lastName: "doe",
    userName: "floki",
    email: "john@gmail.com",
    password: "12345678s",
    dob: "1995-10-10",
};


describe("Business CRUD suit", () => {


    const businessExample = {
        name: 'Business name',
        about: "It's never too late to start your career as a #software developer  , I've started learning #programming at 26 after I got my degree as a sports teacher, and got hired as a front-end developer at 27 with NO CS degree, and I am proud of it",
        state: "chlef",
        city: "tenes",
        phone: "0555123456",
        website: "https://aminelouni.com/",
        email: "del@gmail.com",
        googleMapsUrl: "https://www.google.com/maps/dir//orcloud/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x128fadae211261fd:0x75db15dec911d09d?sa=X&ved=2ahUKEwjXuMjk7tH1AhV3gv0HHbS5CJkQ9Rd6BAgtEAQ",
        domains: ['Restaurants']
    }



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

    test("it should create a business  successfully", async () => {

        //Create a user
        const { body } = await supertest(app)
            .post("/api/v1/users/auth/register")
            .send(userExample)

        await supertest(app)
            .post("/api/v1/business")
            .set("Authorization", `Bearer ${body.token}`)
            .send(businessExample)

            .then((response) => {
                // Check type and length
                console.log(response.body, 'response');
                expect(response.body).toEqual({
                    status: "success",
                    data: {
                        name: businessExample.name
                    },
                });
            });
    });

});
