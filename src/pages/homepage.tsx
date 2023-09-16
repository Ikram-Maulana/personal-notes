import NotesForm from "@/components/notes-form";
import NotesCard from "@/components/notes-card";
import AppLayout from "@/layout/app-layout";
import { useNotes } from "@/store/useNotes";
import { FC } from "react";

const Homepage: FC = () => {
  const [filteredActiveNotes, filteredArchivedNotes] = useNotes((state) => [
    state.filteredActiveNotes,
    state.filteredArchivedNotes,
  ]);

  return (
    <AppLayout>
      <section id="notesForm" className="container">
        <div className="flex flex-col max-w-lg gap-4 px-4 py-12 mx-auto sm:px-6">
          <h2 className="text-xl font-semibold tracking-tight scroll-m-20">
            Buat Catatan
          </h2>

          <NotesForm />
        </div>

        <div className="flex flex-col max-w-5xl gap-4 px-4 py-12 mx-auto sm:px-6">
          <h2 className="text-xl font-semibold tracking-tight scroll-m-20">
            Catatan Aktif
          </h2>

          {filteredActiveNotes.length !== 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredActiveNotes.map((note) => (
                <NotesCard key={`active-${note.id}`} notes={note} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Tidak ada catatan
            </p>
          )}
        </div>

        <div className="flex flex-col max-w-5xl gap-4 px-4 py-12 mx-auto sm:px-6">
          <h2 className="text-xl font-semibold tracking-tight scroll-m-20">
            Arsip
          </h2>

          {filteredArchivedNotes.length !== 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredArchivedNotes.map((note) => (
                <NotesCard key={`active-${note.id}`} notes={note} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Tidak ada catatan
            </p>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default Homepage;
