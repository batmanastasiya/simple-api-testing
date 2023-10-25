import {expect} from 'chai';
import {ApiClient} from "../api/client";
import {faker} from "@faker-js/faker";
import {defaultUser} from "../config/config";


describe('Simple API/users', () => {
    it('should create new user', async () => {
        const client = await ApiClient.unauthorized();
        const username = faker.internet.userName();
        const user = await client.user.createUser({ username })

        expect(user.user, 'User does not have an id property').to.haveOwnProperty('id');
        expect(user.user, 'User does not have a password property').not.to.haveOwnProperty('password');
        expect(user, 'User does not have an accessToken property').to.haveOwnProperty('accessToken');
        expect(user.user.username, 'Username dos not match username user was created with').to.be.equal(username);
    });

    it('should get all users', async () => {
        const client = await ApiClient.unauthorized()
        const users = await client.user.getAllUsers()

        expect(users).to.be.an('array')
        expect(users.length, 'There are no users').to.be.greaterThan(0)
    });

    it('should get user by id', async () => {
        const client = await ApiClient.unauthorized()
        const username = faker.internet.userName();
        const user = await client.user.createUser({ username })
        const userId = user.user.id
        const userById = await client.user.getUserById(userId)

        expect(userById.id, 'Got user with another id').to.be.equal(userId)
        expect(userById.username, 'Username dos not match username user was created with').to.be.equal(username)
    });

    it('should not register user with taken username', async () => {
        const client = await ApiClient.unauthorized();
        const user = await client.user.createUser({username: defaultUser.username});

        expect(user).to.haveOwnProperty('error');
        expect(user.error).to.be.equal('Conflict');
        expect(user.message).to.be.equal('User with given username already exists');

    });

});