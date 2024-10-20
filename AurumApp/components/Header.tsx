/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { SVGProps, useEffect, useState } from "react";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
} from "../lib/dynamic";
import { useAccount} from 'wagmi'
import Spinner from "@/components/Spinner";
import { ArrowLeftRight } from "lucide-react";
// import { useRouter } from "next/navigation";

export default function HeaderComponent() {

  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { address } = useAccount()
  // const router= useRouter()

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsLoading(false);
    };

    signIn();
  }, [sdkHasLoaded]);

  
  return (
    <div className="flex justify-center">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-background border border-muted shadow-md rounded-md mx-4">
        {/* Show only the logo if the user is not connected */}
        {!address ? (
          <>
          <Link href="/" className="mr-6 flex items-center" prefetch={false}>
            <Image src="/images/Aurum.png" alt={`Aurum logo`} width={60} height={60} className="h-fit" />
            <span className="sr-only text-white">Aurum</span>
            <h1 className="text-white text-2xl font-bold ml-2">AURUM</h1>
            </Link>
          <div className="ml-auto flex items-center gap-4">

              <div className="ml-auto flex items-center gap-4">
                {isLoading ? <Spinner /> : <DynamicWidget />}
              </div>

            </div>
          </>
        ) : (
          <>
            <nav className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader className="mb-8">
                    <SheetTitle>Aurum</SheetTitle>
                  </SheetHeader>

                  <Link key="m-01" href="/give-funds" prefetch={false}
                    className="flex w-full items-center gap-2 my-4 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    Give Funds
                  </Link>
                  <Link key="m-02" href="/approve" prefetch={false}
                    className="flex w-full items-center gap-2 my-4 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    Approve
                  </Link>
                  <Link key="m-03" href="/summary" prefetch={false}
                    className="flex w-full items-center gap-2 my-4 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    Summary
                  </Link>
                  {/* <Link key="m-04" href="/page4" prefetch={false}
                    className="flex w-full items-center gap-2 my-4 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    Page 4
                  </Link>
                  <Link key="m-04" href="/page5" prefetch={false}
                    className="flex w-full items-center gap-2 my-4 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    Page 5
                  </Link> */}
                </SheetContent>
              </Sheet>
            </nav>

            <Link href="/" className="mr-6 flex items-center" prefetch={false}>
              <Image src="/images/Aurum.png" alt={`Aurum logo`} width={60} height={60} className="h-fit" />
              <span className="sr-only">Aurum</span>
              {/* <h1 className="text-white text-md font-bold ml-2 xs:hidden">AURUM</h1> */}
              </Link>

            <nav className="hidden lg:flex items-center gap-4 text-sm font-medium">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem key="m-01">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/give-funds"
                        className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                        prefetch={false}
                      >
                        <ArrowLeftRight size={20} className="inline-block mr-2" />
                        Give Funds
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem key="m-02">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/approve"
                        className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                        prefetch={false}
                      >
                        <ArrowLeftRight size={20} className="inline-block mr-2" />
                        Approve
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem key="m-03">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/summary"
                        className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                        prefetch={false}
                      >
                        <ArrowLeftRight size={20} className="inline-block mr-2" />
                        Summary
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  {/* <NavigationMenuItem key="m-04">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/page4"
                        className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                        prefetch={false}
                      >
                        <Key size={20} className="inline-block mr-2" />
                        Page 4
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem key="m-05">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/page5"
                        className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                        prefetch={false}
                      >
                        <User size={20} className="inline-block mr-2" />
                        Page 5
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem> */}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            <div className="ml-auto flex items-center gap-4">

              <div className="ml-auto flex items-center gap-4">
                {isLoading ? <Spinner /> : <DynamicWidget />}
              </div>

            </div>
          </>
        )}
      </header>
    </div>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
