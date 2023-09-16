import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="container flex items-center justify-center mx-auto max-w-7xl">
      <div className="py-6 md:flex md:items-center md:justify-center md:py-8">
        <div className="text-center text-gray-600 dark:text-zinc-400">
          Made by{" "}
          <a
            className="transition-all duration-300 ease-in-out hover:text-zinc-50"
            href="https://ikram-maulana.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Ikram Maulana
          </a>{" "}
          · All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
