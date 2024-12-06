import Link from "next/link";
import { useRouter } from "next/router";

const NavigationBar = () => {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-around">
        <li>
          <Link
            href="/"
            className={isActive("/") ? "font-bold underline" : "hover:underline"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/characters"
            className={
              isActive("/characters")
                ? "font-bold underline"
                : "hover:underline"
            }
          >
            Characters
          </Link>
        </li>
        <li>
          <Link
            href="/create-character" // Fixed route
            className={
              isActive("/create-character")
                ? "font-bold underline"
                : "hover:underline"
            }
          >
            Create Character
          </Link>
        </li>
        <li>
          <Link
            href="/advice"
            className={
              isActive("/advice") ? "font-bold underline" : "hover:underline"
            }
          >
            Scenario Advice
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
