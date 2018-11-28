package com.velja.note.db;

import com.velja.note.model.Note;
import com.velja.note.model.Notebook;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "noteApp.db.recreate", havingValue = "true")
public class DbSeeder implements CommandLineRunner {
    private NotebookRepository notebookRepository;
    private NoteRepository noteRepository;

    public DbSeeder(NotebookRepository notebookRepository,
                    NoteRepository noteRepository) {
        this.notebookRepository = notebookRepository;
        this.noteRepository = noteRepository;
    }


    @Override
    public void run(String... args) {
        //Remove all existing entities
        this.notebookRepository.deleteAll();
        this.noteRepository.deleteAll();


       // Save a default notebook
        var defaultNotebook = new Notebook("Default");
        this.notebookRepository.save(defaultNotebook);

        var quotesNotebook = new Notebook("Quotes");
        this.notebookRepository.save(quotesNotebook);

       // Save the welcome note
       var note = new Note("Hello", "Welcome to NoteApp ", defaultNotebook);
        this.noteRepository.save(note);

       System.out.println("Initialized database");
    }
}
