import { User } from "@prisma/client";
import { getUserAvatar } from "../../../../controllers/user/get/userAvatar";
import {
  mockNext,
  mockRequest,
  mockResponse,
} from "../../../../mocks/controllerParams";
import { prismaMock } from "../../../../mocks/singleton";

jest.mock("../../../../config/s3-bucket", () => ({
  getFileReadStream: jest.fn().mockResolvedValue({
    pipe: jest.fn().mockResolvedValue(true),
  }),
}));

describe("Should test /get userAvatar controller with success s3 calls", () => {
  it("Should return avatar for user", async () => {
    const mReq = mockRequest();
    const mRes = mockResponse();

    prismaMock.user.findFirst.mockResolvedValue({} as User);

    await expect(getUserAvatar(mReq as any, mRes, mockNext())).resolves.toEqual(
      undefined
    );
  });

  it("Should return error if no user was found for which we want to retrieve avatar ", async () => {
    const mReq = mockRequest();
    const mRes = mockResponse();

    await getUserAvatar(mReq as any, mRes, mockNext());

    expect(mRes.status).toHaveBeenCalledWith(400);
    expect(mRes.send).toHaveBeenCalledWith({
      message: "We can't find a user, try again",
    });
  });
});

jest.mock("../../../../config/s3-bucket", () => ({
  getFileReadStream: jest.fn().mockRejectedValue({
    pipe: jest.fn().mockRejectedValue(false),
  }),
}));

describe("Should test /get userAvatar controller with failed s3 calls", () => {
  it("Should return error if the resource was not found ", async () => {
    const mReq = mockRequest();
    const mRes = mockResponse();

    prismaMock.user.findFirst.mockResolvedValue({} as User);

    await getUserAvatar(mReq as any, mRes, mockNext());

    expect(mRes.status).toHaveBeenCalledWith(400);
    expect(mRes.send).toHaveBeenCalledWith({
      message: "Could not find requested resource",
    });
  });
});
