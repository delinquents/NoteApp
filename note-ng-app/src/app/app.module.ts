import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotesComponent } from './notes/notes.component';
import { Router,RouterModule,Routes } from "@angular/router";
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { NoteComponent } from './notes/note/note.component';
import { NoteTextFilterPipe } from './shared/note-text-filter.pipe';

const appRoutes : Routes = [
    {
      path:'notes',
      component: NotesComponent
    },
    {
      path:'feedback',
      component: FeedbackComponent
    },
    {
      path:'',
      component: NotesComponent,
      pathMatch:'full'
    },
    {
      path:'**',
      component: NotFoundComponent
    }
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FeedbackComponent,
    NotFoundComponent,
    NotesComponent,
    NoteComponent,
    NoteTextFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
