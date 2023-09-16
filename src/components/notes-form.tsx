import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useNotes } from "@/store/useNotes";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Judul minimal memiliki 3 karakter" })
    .max(50, { message: "Judul maksimal harus 50 karakter" }),
  body: z.string().min(3, { message: "Catatan minimal memiliki 3 karakter" }),
});

const NotesForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const [titleRemaining, setTitleRemaining] = useState(50);
  const addNote = useNotes((state) => state.addNote);
  const { toast } = useToast();

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title") {
        const titleValue = value.title ?? "";
        const titleLength = titleValue.length;
        const titleCharLimit = 50;
        const titleCharRemaining = titleCharLimit - titleLength;

        setTitleRemaining(titleCharRemaining);
        if (titleLength > titleCharLimit) {
          form.setValue("title", titleValue.slice(0, titleCharLimit));
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addNote(values);
      form.reset();
      setTitleRemaining(50);
      toast({
        title: "Berhasil!",
        description: "Catatan berhasil disimpan",
      });
    } catch (error) {
      toast({
        title: "Gagal!",
        description: "Catatan gagal disimpan",
        variant: "destructive",
      });
    }
  }

  function onReset() {
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <p
                className={cn(
                  "text-sm font-medium leading-none text-right text-muted-foreground"
                )}
              >
                Sisa Karakter: {titleRemaining}
              </p>
              <FormControl>
                <Input placeholder="Ini adalah judul ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Tuliskan catatanmu di sini ..."
                  className="min-h-[175px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button variant={"destructive"} type="submit" onClick={onReset}>
            Reset
          </Button>
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  );
};

export default NotesForm;
