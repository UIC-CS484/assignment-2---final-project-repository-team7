const app = require("../server");
const supertest = require("supertest");
const mongoose = require("mongoose");
const db = require("../db/sql")
describe("API test", () => {

  afterAll((done) => {
    db.close((err) => console.log(err))
  });

  test("POST /signup", async () => {
    await supertest(app)
      .post("/signup")
      .send({
        username: "diyin123",
        password: "12345",
        name: "diyin rocks",
      })
      .then((response) => {
        if (response.body.error) {
          expect(response.body.error).toBe("Username is taken, try logging in");
        } else {
          expect(response.body.username).toBe(user.username);
          expect(response.body.name).toBe(user.name);
        }
      });
  });

  test("POST /login", async () => {
    await supertest(app)
      .post("/login")
      .send({username: "a", password: "Password123!"})
      .expect(200)
      .then((response) => {
        // Check response  data
        if (response.body.error) {
          expect(response.body.error).toBe("Incorrect username or password");
        } else {
          expect(response.body.username).toBe(user.username);
          expect(response.body).toHaveProperty("name");
        }
      });
  });

  test("POST /login unauthorized", async () => {
    await supertest(app)
      .post("/login")
      .send({username: "incorrect_username", password: "incorrect_password"})
      .expect(401)
      .then((response) => {
          expect(response.body.error).toBe("Incorrect username or password");
      });
  });
});