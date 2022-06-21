import React from "react";
import NotesCategory from "./NotesCategory";
import NotesInput from "./NotesInput";

function NotesBody({ notes, keyword, onDelete, onArchived, addNote }) {
  return (
    <div className="note-app__body">
      <NotesInput addNote={addNote} />
      <h2>Catatan Aktif</h2>
      <NotesCategory
        notes={notes}
        archived={false}
        keyword={keyword}
        onDelete={onDelete}
        onArchived={onArchived}
      />
      <h2>Arsip</h2>
      <NotesCategory
        notes={notes}
        archived={true}
        keyword={keyword}
        onDelete={onDelete}
        onArchived={onArchived}
      />
    </div>
  );
}

export default NotesBody;
