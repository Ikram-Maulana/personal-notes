import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useNotes } from "@/store/useNotes";
import { showFormattedDate } from "@/utils";
import { FC } from "react";

interface NotesCardProps {
  notes: {
    id: number | string;
    title: string;
    body: string;
    archived: boolean;
    createdAt: string;
  };
}

const NotesCard: FC<NotesCardProps> = ({ notes }) => {
  const [deleteNote, archiveNote] = useNotes((state) => [
    state.deleteNote,
    state.archiveNote,
  ]);
  const { toast } = useToast();

  async function deleteNoteHandler({ id }: { id: string | number }) {
    try {
      await deleteNote(id);

      toast({
        title: "Berhasil!",
        description: "Catatan berhasil dihapus",
      });
    } catch (error) {
      toast({
        title: "Gagal!",
        description: "Catatan gagal dihapus",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>{notes.title}</CardTitle>
        <CardDescription>{showFormattedDate(notes.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm">{notes.body}</p>
      </CardContent>
      <CardFooter className={cn("p-0")}>
        <div className="flex w-full">
          <AlertDialog>
            <AlertDialogTrigger className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-500 transition-colors bg-transparent border rounded-none shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input hover:bg-accent hover:text-accent-foreground h-9">
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will delete the note. This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteNoteHandler(notes)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            className={cn("rounded-none w-full text-yellow-500")}
            variant="outline"
            onClick={() => archiveNote(notes.id)}
          >
            Arsipkan
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NotesCard;
