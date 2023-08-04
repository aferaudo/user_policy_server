let dotenv = require('dotenv').config()
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

/* Connecting to the database before each test. */
beforeEach(async () => {


    let mongodb = ""
    if(process.env.MONGODB_USER.length === 0 && process.env.MONGODB_PASSWORD.length === 0)
      mongodb = "mongodb://" + process.env.MONGODB_LOCATION + "/" + process.env.MONGODB_DB
    else
      mongodb = "mongodb://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_LOCATION + "/" + process.env.MONGODB_DB 
    await mongoose.connect(mongodb,
        {
            authSource:"admin"
        });
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

// testing if example file has been inserted
describe("GET /", () => {
    it("should return appliances.json", async () => {
      const res = await request(app).get("/appliances.json");
      expect(res.statusCode).toBe(200);
    });
});

describe("GET /appliances.p7s", () => {
    it("should return appliances.json signature", async () => {
      const res = await request(app).get("/appliances.p7s");
      expect(res.statusCode).toBe(200);
    });
});

describe("GET /", () => {
    it("should return all mudfile", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
    });
});

describe("GET /novalidfile.json", () => {
    it("should return 404 not available json file", async () => {
      const res = await request(app).get("/novalidfile.json");
      expect(res.statusCode).toBe(404);
    });
});

describe("GET /novalidfile.p7s", () => {
    it("should return 404 not available p7s file", async () => {
      const res = await request(app).get("/novalidfile.p7s");
      expect(res.statusCode).toBe(404);
    });
});
