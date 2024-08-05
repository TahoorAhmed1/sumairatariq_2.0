import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

import SidebarNav from "./sidebar-nav";

export function Sidebar({ open, setOpen, e }) {
  return (
    <Sheet open={open} onOpenChange={setOpen} side={"left"}>
      <SheetContent
        side={"left"}
        className="bg-white py-0 px-0 outline-none focus:outline-none border-0"
      >
        <SheetHeader className={"px-4 py-4"}>
          <SheetTitle className="text-2xl text-left">Category</SheetTitle>
        </SheetHeader>
        <Separator className="bg-slate-100"></Separator>
        <ScrollArea className="h-[500px] flex flex-col ">
          {e?.map((a, i) => {
            return <SidebarNav key={i} a={a} setOpen={setOpen} />;
          })}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
