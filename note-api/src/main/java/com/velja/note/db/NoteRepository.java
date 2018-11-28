package com.velja.note.db;

import com.velja.note.model.Note;
import com.velja.note.model.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NoteRepository extends JpaRepository<Note, UUID> {



    List<Note> findAllByNotebook(Notebook notebook);
}
