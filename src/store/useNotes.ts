import { getInitialData } from "@/utils";
import { nanoid } from "nanoid";
import { create } from "zustand";

type Notes = {
  activeNotes: {
    id: number | string;
    title: string;
    body: string;
    archived: boolean;
    createdAt: string;
  }[];
  filteredActiveNotes: {
    id: number | string;
    title: string;
    body: string;
    archived: boolean;
    createdAt: string;
  }[];
  archivedNotes: {
    id: number | string;
    title: string;
    body: string;
    archived: boolean;
    createdAt: string;
  }[];
  filteredArchivedNotes: {
    id: number | string;
    title: string;
    body: string;
    archived: boolean;
    createdAt: string;
  }[];
  addNote: (note: { title: string; body: string }) => void;
  deleteNote: (id: number | string) => void;
  archiveNote: (id: number | string) => void;
  searchNote: (keyword: string) => void;
};

export const useNotes = create<Notes>()((set) => ({
  activeNotes: getInitialData().filter((note) => !note.archived),
  filteredActiveNotes: getInitialData().filter((note) => !note.archived),
  archivedNotes: getInitialData().filter((note) => note.archived),
  filteredArchivedNotes: getInitialData().filter((note) => note.archived),
  addNote: (note) => {
    set((state) => {
      const newNote = {
        id: `note-${nanoid(16)}`,
        ...note,
        archived: false,
        createdAt: new Date().toISOString(),
      };
      const activeNotes = [...state.activeNotes, newNote];

      return {
        activeNotes,
        filteredActiveNotes: activeNotes,
      };
    });
  },
  deleteNote: (id) => {
    set((state) => {
      const activeNotes = state.activeNotes.filter((note) => note.id !== id);
      const archivedNotes = state.archivedNotes.filter(
        (note) => note.id !== id
      );

      return {
        activeNotes,
        filteredActiveNotes: activeNotes,
        archivedNotes,
        filteredArchivedNotes: archivedNotes,
      };
    });
  },
  archiveNote: (id) => {
    set((state) => {
      const activeNotes = state.activeNotes.filter((note) => note.id !== id);
      const archivedNotes = state.archivedNotes.filter(
        (note) => note.id !== id
      );
      const noteToArchive = state.activeNotes.find((note) => note.id === id);
      const noteToUnarchive = state.archivedNotes.find(
        (note) => note.id === id
      );
      if (noteToArchive) {
        noteToArchive.archived = true;
        archivedNotes.push(noteToArchive);
      }
      if (noteToUnarchive) {
        noteToUnarchive.archived = false;
        activeNotes.push(noteToUnarchive);
      }

      return {
        activeNotes,
        filteredActiveNotes: activeNotes,
        archivedNotes,
        filteredArchivedNotes: archivedNotes,
      };
    });
  },
  searchNote: (keyword) => {
    set((state) => {
      const filteredActiveNotes =
        keyword === ""
          ? state.activeNotes
          : state.activeNotes.filter((note) => {
              const noteTitle = note.title.toLowerCase();
              const noteBody = note.body.toLowerCase();
              const searchKeyword = keyword.toLowerCase();
              return (
                noteTitle.includes(searchKeyword) ||
                noteBody.includes(searchKeyword)
              );
            });
      const filteredArchivedNotes =
        keyword === ""
          ? state.archivedNotes
          : state.archivedNotes.filter((note) => {
              const noteTitle = note.title.toLowerCase();
              const noteBody = note.body.toLowerCase();
              const searchKeyword = keyword.toLowerCase();
              return (
                noteTitle.includes(searchKeyword) ||
                noteBody.includes(searchKeyword)
              );
            });

      return {
        filteredActiveNotes,
        filteredArchivedNotes,
      };
    });
  },
}));
