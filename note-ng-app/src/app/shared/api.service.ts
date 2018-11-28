import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {Notebook} from "../notes/model/notebook";
import {Note} from "../notes/model/note";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  private BASE_URL = "http://localhost:8082/api";
  private GET_ALL_NOTEBOOKS_URL = `${this.BASE_URL}\\notebooks\\all`;
  private POST_FEEDBACK_URL = `${this.BASE_URL}\\feedback`;
  private SAVE_UPDATE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks\\`;
  private ALL_NOTES_URL = `${this.BASE_URL}\\notes\\all`;
  private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}\\notes\\byNotebook\\`;
  private SAVE_UPDATE_NOTE_URL =`${this.BASE_URL}\\notes`;
  private DELETE_NOTE_URL = `${this.BASE_URL}\\notes\\`;


  getAllNotebooks():Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.GET_ALL_NOTEBOOKS_URL);
  }

  postFeedback( feedback : FeedbackViewModel) : Observable<any> {
    return this.http.post(this.POST_FEEDBACK_URL,feedback);
  }

  postNotebook(notebook : Notebook) : Observable<Notebook> {
    return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK_URL,notebook);
  }

  deleteNotebook(id:string):Observable<any> {
    return this.http.delete(this.DELETE_NOTEBOOK_URL + id);
  }

  getAllNotes():Observable<Note[]> {
    return this.http.get<any>(this.ALL_NOTES_URL);
  }
  getAllNotesByNotebook(notebookId: string):Observable<Note[]> {
    return this.http.get<any>(this.NOTES_BY_NOTEBOOK_URL + notebookId);
  }
  saveNote(note: Note):Observable<Note> {
    return this.http.post<Note>(this.SAVE_UPDATE_NOTE_URL, note);
  }

  deleteNote(noteId: string): Observable<any> {
    return this.http.delete<any>(this.DELETE_NOTE_URL + noteId);
  }
}
