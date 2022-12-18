import {getUserAvatar} from "../../../../controllers/user/get/userAvatar";

describe('Should test get controllers', () => {
    it('Should return avatar for user', async() => {
        const mReq = { query: '1' } as any;
        const mRes = {} as any;
        const mNext = jest.fn();


        const userAvatar = await getUserAvatar(mReq, mRes, mNext);
        console.log(userAvatar)
        expect(userAvatar).toBe(true);
    })
})
