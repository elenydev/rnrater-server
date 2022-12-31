import request from 'supertest';
import express from "express";
import { User } from "@prisma/client";
import { createUser } from "../../../../controllers/user/post/createUser";
import {
  mockNext,
  mockRequest,
  mockResponse,
} from "../../../../mocks/controllerParams";
import { prismaMock } from "../../../../mocks/singleton";
import userRoutes from '../../../../routes/user';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes)

jest.mock("../../../../config/s3-bucket", () => ({
  uploadFile: jest.fn().mockResolvedValue({
  }),
}));

jest.mock("../../../../controllers/mailers", () => ({
  sendEmailAfterUserRegister: jest.fn()
}));


describe('Should test /post createUser controller', () => {

  it('Should succesfully create user', async () => {
    const mReq = mockRequest();
    const mRes = mockResponse();

    mReq.file = {} as any
    mReq.body.password = "123";

    prismaMock.user.create.mockResolvedValue({} as User)

    await createUser(mReq, mRes, mockNext())

    expect(mRes.status).toHaveBeenCalledWith(201);
    expect(mRes.send).toHaveBeenCalledWith({
      message: "User successfully created"
    })
  })

  it("Should return 400 if user won't provide avatar", async () => {
    const mReq = mockRequest();
    const mRes = mockResponse();

    mReq.body.password = "123";

    prismaMock.user.create.mockResolvedValue({} as User)

    await createUser(mReq, mRes, mockNext())

    expect(mRes.status).toHaveBeenCalledWith(422);
    expect(mRes.send).toHaveBeenCalledWith({
      message: "Avatar is required"
    })
  })

  it('Should return 422 if user with the same email is created already', async () => {
    const mReq = mockRequest();
    const mRes = mockResponse();

    mReq.body.password = "123";
    mReq.file = {} as any;

    prismaMock.user.findFirst.mockResolvedValue({} as User)

    await createUser(mReq, mRes, mockNext())

    expect(mRes.status).toHaveBeenCalledWith(422);
    expect(mRes.send).toHaveBeenCalledWith({
      message: "User already exist"
    })
  })
})

describe('/post createUser route', () => {
  it('Should return validation error if any of fields is not provided', async () => {
    const res = await request(app).post('/user/post/createUser').type("json").send({
      firstName: 'Damian'
    })

    expect(res.statusCode).toBe(422)

  })
})