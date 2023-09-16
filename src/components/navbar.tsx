import logo from "@/assets/lipsum.webp";
import { useNotes } from "@/store/useNotes";
import { FC, useState } from "react";
import { Input } from "./ui/input";

const Navbar: FC = () => {
  const [keyword, setKeyword] = useState("");
  const searchNotes = useNotes((state) => state.searchNote);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    // Debounce Search
    setTimeout(() => {
      searchNotes(e.target.value);
    }, 300);
  };

  return (
    <header
      id="header"
      className="flex-none w-full mx-auto border-b border-b-input"
    >
      <div className="container flex items-center justify-between w-full gap-2 py-6 mx-auto max-w-7xl">
        <a href="/">
          <img
            src={logo}
            width={126}
            height={36}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
            alt="Logo Ipsum"
          />
        </a>

        <Input
          type="text"
          placeholder="Search ..."
          className="max-w-[192px]"
          value={keyword}
          onChange={onSearch}
        />
      </div>
    </header>
  );
};

export default Navbar;
