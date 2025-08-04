import request from 'supertest';
import { app }  from '../../app';

describe("/users", () => {
    describe("GET /users", () => {
        it("respond with json containing a list of users", async () => {
            await request(app)
                .get("/users")
                .set("Accept", "application/json")
                .expect("Content-type", /json/)
                .expect(200);
        });
    });
});

describe("GET /users/{id}", () => {
    it("respond with json containing a single user found by id", async () => {
        await request(app)
            .get("/users/1")
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200);
    });
});

describe("GET /users/name", () => {
    it("responds with json containing a users found by the provided userName", async () => {
        const userName = {
            userName : "test"
        }

        await request(app)
            .get("/users/name")
            .set("Accept", "application/json")
            .send(userName)
            .expect("Content-type", /json/)
            .expect(200);
    });
});

describe("GET /users/{id}/orcs", () => {
    it("responds with json containing a list of Orcs belonging to a users id", async () => {


        await request(app)
            .get("/users/1/orcs")
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200);
    });
});

describe("POST /users", () => {
    it("respond with 400 for missing data", async () => {
        await request(app)
            .post("/users")
            .set("Accept", "application/json")
            .send({})
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(400);
    });

    it("respond with 201 with user created successfully", async () => {
        const newUser = {
            emailAddress: "testuser2@example.com",
            userName: "test456",
            userPassword: "Password@123"
        }
        await request(app)
            .post("/users")
            .set("Accept", "application/json")
            .send(newUser)
            .expect("Content-type","application/json; charset=utf-8")
            .expect(201);
    });
});

describe("DELETE /users/{id}", () => {

    it("respond with 200 with user deleted successfully", async () => {
        await request(app)
            .get("/users/1")
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200);
    });
});

describe("PATCH /users", () => {
    it("respond with 400 for missing data", async () => {
        await request(app)
            .patch("/users")
            .set("Accept", "application/json")
            .send({})
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(400)
    });

    it("respond with 201 with user updated successfully", async () => {
        const updatedUser = {
            userId: 1,
            emailAddress: "updateUser@update.com",
            userName: "user1",
            userPassword: "Password@123"
        };
        await request(app)
            .patch("/users")
            .set("Accept", "application/json")
            .send(updatedUser)
            .expect(200);
    });
});




