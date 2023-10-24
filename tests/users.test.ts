import {expect} from 'chai';
import {ApiClient} from "../api/client";
import {faker} from "@faker-js/faker";


describe('Simple API/users', () => {
    it('should create new user', async () => {
        const client = await ApiClient.unauthorized()

        const name = faker.internet.userName();
        const username = faker.internet.userName();

        const user = await client.user.createUser({ name, username })

        expect(user.user).to.haveOwnProperty('id');
        expect(user.user).not.to.haveOwnProperty('password');
        expect(user).to.haveOwnProperty('accessToken');
        expect(user.user.name).to.be.equal(name);
        expect(user.user.username).to.be.equal(username);
    });

    it('should get all users', async () => {
        const client = await ApiClient.unauthorized()
        const users = await client.user.getAllUsers()


        expect(users).to.be.an('array')
        expect(users.length).to.be.greaterThan(0)
    });

    it('should get user by id', async () => {
        const client = await ApiClient.unauthorized()

        const name = faker.internet.userName();
        const username = faker.internet.userName();

        const user = await client.user.createUser({ name, username })
        const userId = user.user.id

        const userById = await client.user.getUserById(userId)

        expect(userById.id).to.be.equal(userId)
        expect(userById.name).to.be.equal(name)
        expect(userById.username).to.be.equal(username)
    });

});