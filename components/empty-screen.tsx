import { ExternalLink } from '@/components/external-link'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-950 sm:p-8 p-4 text-sm sm:text-base">
        <h1 className="text-2xl text-zinc-50 sm:text-3xl tracking-tight font-semibold max-w-fit inline-block">
          ICPGPT Chatbot
        </h1>
        <p className="leading-normal text-muted-foreground">
          Write and Deploy smart contracts on ICP using natual language Prompts.
        </p>
        <p className="leading-normal text-muted-foreground">
          
        </p>
      </div>
    </div>
  )
}
