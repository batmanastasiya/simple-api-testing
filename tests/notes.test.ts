import {describe} from "mocha";
import {expect} from "chai";
import {ApiClient} from "../api/client";
import {defaultUser} from "../config/config";

// TODO add negative tests

describe('Simple API/notes', () => {
    it('should create new note', async () => {
        const client = await ApiClient.loginAs(defaultUser);

        const note = await client.note.createNote({
            content: 'test'
        });

        expect(note).to.be.an('object');
        expect(note.content).to.be.equal('test');
    });

    it('should update note', async () => {
        const client = await ApiClient.loginAs(defaultUser);
        const note = await client.note.createNote({
            content: 'test'
        });

        const updatedNote = await client.note.updateNoteById(note.id, {
            content: 'updated'
        });

        expect(updatedNote).to.be.an('object');
        expect(updatedNote.id).to.be.equal(note.id);
        expect(updatedNote.content).to.be.equal('updated');
    });

    it('should get all notes', async () => {
        const client = await ApiClient.unauthorized();
        const notes = await client.note.getAllNotes();

        expect(notes).to.be.an('array');
        notes.forEach((note: any) => {
            expect(note).to.be.an('object');
            expect(note).to.haveOwnProperty('id');
            expect(note).to.haveOwnProperty('content');
            expect(note).to.haveOwnProperty('author');
        });
    });

    it('should get note by id', async () => {
        const client = await ApiClient.loginAs(defaultUser);
        const note = await client.note.createNote({
            content: 'testById'
        });
        const client2 = await ApiClient.unauthorized();
        const noteById = await client2.note.getNoteById(note.id);

        expect(noteById).to.be.an('object');
        expect(noteById.content).to.be.equal('testById');
        expect(noteById.id).to.be.equal(note.id);
    });

    it('should get notes by author id', async () => {
        const client = await ApiClient.loginAs(defaultUser);
        const note = await client.note.createNote({
            content: 'testByAuthorId'
        });
        const notesByAuthorId = await client.note.getNotesByAuthorId(note.author);

        expect(notesByAuthorId).to.be.an('array');
        notesByAuthorId.forEach((note: any) => {
            expect(note.author).to.be.equal(note.author);
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
            expect(note.id).not.to.be.equal(noteById.id);
        });
    });
});