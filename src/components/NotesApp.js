import React from "react";
import { getInitialData } from "../utils";
import NotesBody from "./NotesBody";
import NotesHeader from "./NotesHeader";
import { nanoid } from "nanoid";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      keyword: "",
    };

    // Binding
    this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
    this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
    this.onArchivedEventHandler = this.onArchivedEventHandler.bind(this);
    this.addNoteHandler = this.addNoteHandler.bind(this);
  }

  onSearchEventHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });
  }

  onDeleteEventHandler(id) {
    const newNotes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes: newNotes });
  }

  onArchivedEventHandler(id) {
    const newNotes = this.state.notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: !note.archived,
        };
      }
      return note;
    });
    this.setState({ notes: newNotes });
  }

  addNoteHandler({ title, body }) {
    const id = `note-${nanoid(16)}`;
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id,
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false,
        },
      ],
    });
  }

  render() {
    return (
      <>
        <NotesHeader onSearch={this.onSearchEventHandler} />
        <NotesBody
          notes={this.state.notes}
          keyword={this.state.keyword}
          onDelete={this.onDeleteEventHandler}
          onArchived={this.onArchivedEventHandler}
          addNote={this.addNoteHandler}
        />
      </>
    );
  }
}

export default NotesApp;
