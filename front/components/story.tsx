import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StoryProps {
  username: string
  avatarUrl: string
}

export function Story({ username, avatarUrl }: StoryProps) {
  return (
    <div className="flex flex-col items-center space-y-1 flex-shrink-0">
      <Avatar className="w-14 h-14 sm:w-16 sm:h-16 ring-2 ring-pink-500 ring-offset-2">
        <AvatarImage src={avatarUrl} alt={username} />
        <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="text-xs truncate w-14 sm:w-16 text-center">{username}</span>
    </div>
  )
}

