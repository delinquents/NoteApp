import { Component, OnInit } from '@angular/core';
import {Notebook} from "./model/notebook";
import {Note} from "./model/note";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks : Notebook[]=[];
  notes : Note []= [];
  selectedNotebook: Notebook;
  searchText: string;

  constructor(private apiService : ApiService) { }



  ngOnInit() {
    this.getAllNotebook();
    this.getAllNotes();
  }


  getAllNotebook(){
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert("An error has occurred;")
      }
    );
  }

  createNotebook() {
    let newNotebook : Notebook = {
      name:'New notebook',
      id:null,
      nbOfNotes: 0
    }
    this.apiService.postNotebook(newNotebook).subscribe(
      res =>{
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err =>{
        alert("An error has occured while saving the notebook")
      }
    );
  }

    updateNotebook(updatedNotebook: Notebook) {
      this.apiService.postNotebook(updatedNotebook).subscribe(
        res =>{
        },
        err =>{
          alert("An error has occured while saving the notebook")
        }
      );
    }

  deleteNotebook(notebook: Notebook) {
    if(confirm("Are you sure you want to delete Notebook?")){
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res=>{
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook,1);
        },
        err => {
          alert("Could not delete notebook");
        }
      )
    }
  }

   getAllNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res ;
      },
      err => {
        alert("An error has occurred;")
      }
    );
  }

  deleteNote(note : Note) {

  if(confirm("Are u sure u want to delete this note?")) {
    this.apiService.deleteNote(note.id).subscribe(
      res=>{
        let indexOfNote = this.notes.indexOf(note);
        this.notes.splice(indexOfNote,1);
      },
      err=>{
        alert("An error has occurred  deleting the note. ")
      }
    );
  }


  }

  createNote(noteBookId: string) {
    let newNote: Note = {
      id:null,
      title:"New Note",
      text: "Write some text in here",
      lastModifiedOn: null,
      notebookId: noteBookId
    }
    this.apiService.saveNote(newNote).subscribe(
      res=>{
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {
        alert("An error occurred while saving the note");
      }
    )
  }
  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
   this.apiService.getAllNotesByNotebook(notebook.id).subscribe(
     res=>{
      this.notes = res;
     },
     error1 => {
       alert("Error occurred while selecting loading all notes")
     }
   )
    
  }

  updateNote(updateNote: Note) {
    this.apiService.saveNote(updateNote).subscribe(
    res=>{
    },
      err => {
        alert("An error occurred while updating the note");
      }
    );
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
