import {expect} from 'chai';
import {ApiClient} from "../api/client";
import {faker} from "@faker-js/faker";
import {defaultUser} from "../config/config";


describe('Simple API/users', () => {
    it('should create new user', async () => {
        const client = await ApiClient.unauthorized();
        const username = faker.internet.userName();
        const user = await client.user.createUser({ username })

        expect(user.user).to.haveOwnProperty('id');
        expect(user.user).not.to.haveOwnProperty('password');
        expect(user).to.haveOwnProperty('accessToken');
        // expect(user.user.name).to.be.equal(name);
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

        const username = faker.internet.userName();

        const user = await client.user.createUser({ username })
        const userId = user.user.id

        const userById = await client.user.getUserById(userId)

        expect(userById.id).to.be.equal(userId)
        expect(userById.username).to.be.equal(username)
    });

    it('should not register user with taken username', async () => {
        const client = await ApiClient.unauthorized();
        const user = await client.user.createUser({username: defaultUser.username});

        expect(user).to.haveOwnProperty('error');
        expect(user.error).to.be.equal('Conflict');
        expect(user.message).to.be.equal('User with given username already exists');

    });

});