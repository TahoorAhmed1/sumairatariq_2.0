import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

function Navigation({ a }) {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem className="flex flex-col">
          <NavigationMenuTrigger>
            <Link
              href={`/product-design/${a.id}?category=${a?.name}`}
              className="font-semibold text-[14px] "
            >
              {a?.name}
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col  p-2 md:w-[130px] font-semibold text-[12px]">
              {a?.SubCategory?.map((b) => (
                <>
                  <Link
                    className="text-black hover:bg-slate-100/70 rounded-[3px]  py-1.5 px-3"
                    href={`/product-design/${a.id}?category=${a?.name}&subcategory=${b?.name}`}
                  >
                    <NavigationMenuLink open={true} key={b.id}>
                      {b.name}
                    </NavigationMenuLink>
                  </Link>
                </>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navigation;
