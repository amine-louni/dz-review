import { databaseClose } from "../../src/database/connection";
import { databaseConnection } from "../../src/database/connection";
import supertest from "supertest";
import app from "../../src/app";
import { config } from "dotenv";
import faker from 'faker';
config();

describe("Authenctication", () => {
  const userExample = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'LoremIpsum1993',
    dob: "1995-10-10"
  };
  const userExampleLogin = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'LoremIpsum1993',
    dob: "1995-10-10"
  };

  const userExampleInvalid = {
    firstName: faker.name.firstName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'LoremIpsum1993',
    dob: "1995-10-10"
  };


  beforeAll(async () => {
    await databaseConnection(process.env.DB_NAME_TEST).catch((e) =>
      console.error(e)
    );
  });

  afterAll(async () => {
    await databaseClose().catch((e) => console.error(e));
  });



  test("it should register successfully", async () => {
    await supertest(app)
      .post("/api/v1/users/auth/register")
      .send(userExample)
      .expect(201)
      .then((response) => {
        // Check type and length

        expect(response.body).toEqual({
          status: "success",
          token: expect.any(String),
          data: {
            firstName: userExample.firstName,
            lastName: userExample.lastName,
            userName: userExample.userName,
            email: userExample.email,
            dob: userExample.dob,
            phoneNumber: null,
            bio: null,
            role: 'user',
            id_verified_at: null,
            uuid: expect.any(String),
            isActive: true,
            profilePictureUrl:
              "https://www.gravatar.com/avatar/?s=200&r=pg&d=mp",
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        });
      });
  });


  test("it should return 422  on register", async () => {
    await supertest(app)
      .post("/api/v1/users/auth/register")
      .send(userExampleInvalid)
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
              msg: "lastName can not be empty!",
              param: "lastName",
              location: "body"
            }
          ],
          stack: "Error: validation  error"

        });
      });
  });

  test("it should login successfully", async () => {
    await supertest(app)
      .post("/api/v1/users/auth/register")
      .send(userExampleLogin)
      .expect(201);

    await supertest(app)
      .post("/api/v1/users/auth/login")
      .send({
        email: userExampleLogin.email,
        password: userExampleLogin.password,
      })
      .expect(200)
      .then((response) => {

        expect(response.body).toEqual({
          status: "success",
          token: expect.any(String),
          data: {
            firstName: userExampleLogin.firstName,
            lastName: userExampleLogin.lastName,
            userName: userExampleLogin.userName,
            email: userExampleLogin.email,
            dob: userExampleLogin.dob,
            role: 'user',
            phoneNumber: null,
            bio: null,
            id_verified_at: null,
            uuid: expect.any(String),
            isActive: true,
            profilePictureUrl:
              "https://www.gravatar.com/avatar/?s=200&r=pg&d=mp",
          },
        });
      });
  });
});
