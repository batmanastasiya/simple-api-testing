import {describe} from "mocha";
import {expect} from "chai";
import {ApiClient} from "../api/client";
import {anotherUser, defaultUser} from "../config/config";
import {faker} from "@faker-js/faker";

// TODO add negative tests

describe('Simple API/notes', () => {
    it('should create new note', async () => {
        const client = await ApiClient.loginAs(defaultUser);
        const content = faker.lorem.sentence();
        const note = await client.note.createNote({
            content: content
        });

        expect(note.content, 'Note content does not match the initial one').to.be.equal(content);
    });

    it('should update note', async () => {
        const client = await ApiClient.loginAs(defaultUser);
        const note = await client.note.createNote({
            content: 'test'
        });

        const updatedNote = await client.note.updateNoteById(note.id, {
            content: 'updated'
        });

        expect(updatedNote.id, 'Note id does not match initial note id').to.be.equal(note.id);
        expect(updatedNote.content, 'Updated content does not match the content note was updated with').to.be.equal('updated');
    });

    it('should get all notes', async () => {
        const client = await ApiClient.unauthorized();
        const notes = await client.note.getAllNotes();

        expect(notes).to.be.an('array');
        notes.forEach((note: any) => {
            expect(note, 'Note does not have id').to.haveOwnProperty('id');
            expect(note, 'Note does not have content').to.haveOwnProperty('content');
            expect(note, 'Note does not have author').to.haveOwnProperty('author');
        });
    });

    it('should get note by id', async () => {
        const client = await ApiClient.loginAs(defaultUser);
        const note = await client.note.createNote({
            content: 'testById'
        });
        const client2 = await ApiClient.unauthorized();
        const noteById = await client2.note.getNoteById(note.id);

        expect(noteById.content, 'Note content does not match the initial one').to.be.equal('testById');
        expect(noteById.id, 'Note id does not match initial note id').to.be.equal(note.id);
    });

    it('should get notes by author id', async () => {
        const client = await ApiClient.loginAs(defaultUser);
        const note = await client.note.createNote({
            content: 'testByAuthorId'
        });
        const notesByAuthorId = await client.note.getNotesByAuthorId(note.author);

        expect(notesByAuthorId).to.be.an('array');
        notesByAuthorId.forEach((el: any) => {
            expect(el.author, 'Author id does not match the requested one').to.be.equal(note.author);
        });
    });

    it('should delete note by id', async () => {
        const client = await ApiClient.loginAs(defaultUser);
        const note = await client.note.createNote({
            content: 'testDeleteById'
        });
        const noteById = await client.note.deleteNoteById(note.id);

        const allNotes = await client.note.getAllNotes();
        allNotes.forEach((note: any) => {
            expect(note.id, 'Note was not deleted').not.to.be.equal(noteById.id);
        });
    });

    it('should not delete note created by another user', async () => {
        const user1 = await ApiClient.loginAs(defaultUser);
        const note = await user1.note.createNote({
            content: 'test delete note by not owner'
        });

        const user2 = await ApiClient.loginAs(anotherUser);

        const noteById = await user2.note.deleteNoteById(note.id);

        expect(noteById).to.haveOwnProperty('error');
        expect(noteById.error).to.be.equal('Forbidden');
        expect(noteById.message).to.be.equal('You are not the author of this note.');
    });
});