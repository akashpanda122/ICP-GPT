'use client'

/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import { LoginButton } from './login-button'
import { IILogin, IILogout } from '../lib/auth';
import { useIdentity } from '../context/AppContext';
//import { useInternetIdentity } from "ic-use-internet-identity";

async function UserOrLogin() {
  const session = (await auth()) as Session
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <img className="size-6" src="/images/gemini.png" alt="gemini logo" />
        </Link>
      )}
      <div className="flex items-center">
        {/*<IconSeparator className="size-6 text-muted-foreground/50" />*/}
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/">ICPGPT</Link>
            {/*<LoginButton
              variant="link"
              showGithubIcon={true}
              text="Login"
              className="-ml-2"
            />*/}
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {

  const { identity, setIdentity } = useIdentity();
  //const { login, loginStatus } = useInternetIdentity();

  //const disabled = loginStatus === "logging-in" || loginStatus === "success";
  //const text = loginStatus === "logging-in" ? "Logging in..." : "Login";

  const handleLogout = () => {
    IILogout().then(() => {
      setIdentity("");
    });
  };

  const handleConnect = () => {
    IILogin().then((id) => setIdentity(id));
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end gap-2">
        {/*<Button asChild size="sm" variant="outline">
          <a
            target="_blank"
            href="https://github.com/vercel-labs/gemini-chatbot"
            rel="noopener noreferrer"
          >
            <IconGitHub />
            <span className="hidden ml-2 md:flex">GitHub</span>
          </a>
        </Button>*/}
        {/*<Button asChild size="sm" className="rounded-lg gap-1">
          <a
            href=""
            target="_blank"
          >
            <IconVercel className="size-3" />
            <span className="hidden sm:block">Connect Wallet</span>
            <span className="sm:hidden">Connect Wallet</span>
          </a>
        </Button>*/}

        {identity ? (
          <Button asChild size="sm" className="rounded-lg gap-1">
            <span onClick={handleLogout} className="hidden sm:block">{identity.slice(0, 6) + "..." + identity.slice(-4)}</span>
            <span onClick={handleLogout} className="sm:hidden">{identity.slice(0, 6) + "..." + identity.slice(-4)}</span>
          </Button>
        ) : (
          <Button asChild size="sm" className="rounded-lg gap-1">
            <span onClick={handleConnect} className="hidden sm:block">Connect Wallet</span>
            <span onClick={handleConnect} className="sm:hidden">Connect Wallet</span>
          </Button>
        )}

        {/*/<button onClick={login} disabled={disabled}>
          {text}
        </button>*/}
      </div>
    </header>
  )
}
