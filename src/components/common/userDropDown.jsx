import { Heart, LogOut, User, UserRound } from "lucide-react";
import { FiLayout } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useHome } from "@/store/home";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function DropdownMenuDemo() {
  const { user } = useHome();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserRound
          className="w-4 h-4 cursor-pointer"
          width={1000}
          height={1000}
          color="white"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-slate-50 ">
        <DropdownMenuLabel>
          Welcome <span className="text-slate-500">{user?.email}</span>{" "}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href={"/dashboard?route=account"}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4 text-slate-800" />
              <span>Profile</span>
              <DropdownMenuShortcut>
                {" "}
                <IoChevronForwardOutline />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard?route="}>
            <DropdownMenuItem>
              <FiLayout className="mr-2 h-4 w-4 text-slate-800" />

              <span>Dashboard</span>
              <DropdownMenuShortcut>
                {" "}
                <IoChevronForwardOutline />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={"/wishlist"}>
            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4 text-slate-800" />
              <span>Wishlist</span>
              <DropdownMenuShortcut>
                <IoChevronForwardOutline />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            Cookies.remove("token");
            localStorage.clear();
            router.push("/login");
          }}
        >
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4 text-slate-800" />
            <span>Log out</span>
            <DropdownMenuShortcut>
              <IoChevronForwardOutline />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
