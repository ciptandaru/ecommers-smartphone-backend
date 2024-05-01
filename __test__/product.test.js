const app = require("../app");
const request = require("supertest");
const {Sequelize} = require("../models");
const {generateToken} = require("../helper/jwt");
jest.setTimeout(2000);

describe("Customer Controller Test", () => {
  test("register success", async () => {
    const response = await request(app).post("/register").send({
      userName: "z",
      email: "z@z.com",
      password: "123123",
    });
    expect(response.status).toBe(201);
  });

  test("register empty email", async () => {
    const response = await request(app).post("/register").send({
      userName: "z",
      email: "",
      password: "123123",
    });
    expect(response.status).toBe(400);
  });

  test("register password empty", async () => {
    const response = await request(app).post("/register").send({
      userName: "z",
      email: "z@zz.com",
      password: "",
    });
    expect(response.status).toBe(400);
  });

  test("register email space", async () => {
    const response = await request(app).post("/register").send({
      userName: "z",
      email: " ",
      password: "123123",
    });
    expect(response.status).toBe(400);
  });

  test("register password space", async () => {
    const response = await request(app).post("/register").send({
      userName: "z",
      email: "z@zzz.com",
      password: " ",
    });
    expect(response.status).toBe(400);
  });

  test("register email should be Unique", async () => {
    const response = await request(app).post("/register").send({
      userName: "z",
      email: "z@z.com",
      password: "123123",
    });
    expect(response.status).toBe(400);
  });

  test("register invalid email format", async () => {
    const response = await request(app).post("/register").send({
      userName: "z",
      email: "z",
      password: "123123",
    });
    expect(response.status).toBe(400);
  });

  test("Login Success", async () => {
    const response = await request(app).post("/login").send({
      email: "z@z.com",
      password: "123123",
    });
    expect(response.status).toBe(200);
  });

  test("Login invalid password", async () => {
    const response = await request(app).post("/login").send({
      email: "z@z.com",
      password: "12312",
    });
    expect(response.status).toBe(401);
  });

  test("Login invalid email", async () => {
    const response = await request(app).post("/login").send({
      email: "z@domain.com",
      password: "123123",
    });
    expect(response.status).toBe(401);
  });

  test("get all Product Success", async () => {
    const response = await request(app).get("/product");
    expect(response.status).toBe(200);
  });

  test("get  Product Success", async () => {
    const response = await request(app).get("/product/?page=1&pageLimit=5");
    expect(response.status).toBe(200);
  });

  test("get different page Product Success", async () => {
    const response = await request(app).get("/product/?page=2&pageLimit=5");
    expect(response.status).toBe(200);
  });

  test("get filtered and  Product Success", async () => {
    const response = await request(app).get(
      "/product/?page=1&pageLimit=5&search=iphone"
    );
    expect(response.status).toBe(200);
  });

  test("get one Product Success", async () => {
    const id = 1;
    const response = await request(app).get(`/product/${id}`);
    expect(response.status).toBe(200);
  });

  test("get one Product failed", async () => {
    const id = 40;
    const response = await request(app).get(`/product/${id}`);
    expect(response.status).toBe(404);
  });
});

describe("Admin Controller Test", () => {
  test("Login Admin Success", async () => {
    const response = await request(app).post("/admin/login").send({
      email: "admin@gmail.com",
      password: "admin",
    });
    expect(response.status).toBe(200);
  });

  test("Register Admin Success", async () => {
    const fakeAccessToken = generateToken({
      id: 1,
      userName: "TestAdmin",
      admin: true,
    });

    const response = await request(app)
      .post("/admin/register")
      .set("access_token", fakeAccessToken)
      .send({
        userName: "TestAdmin",
        email: "testadmin@example.com",
        password: "123123",
      });
    expect(response.status).toBe(201);
  });

  test("Create Product Success", async () => {
    const fakeAccessToken = generateToken({
      id: 1,
      userName: "TestAdmin",
      admin: true,
    });

    const response = await request(app)
      .post("/admin/product")
      .set("access_token", fakeAccessToken)
      .send({
        name: "Test Product",
        description: "This is a test product",
        price: 100,
        image: "test.jpg",
        CategoryId: 1,
      });
    expect(response.status).toBe(201);
  });
});
