'use client'
import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Eye } from 'lucide-react'
import { updateViewCountInDatabase } from '@/service/fileSystem'
import { renderMedia } from '@/components/ui/mimeTypeCo'

interface PostProps {
    uuid: string
    id: string
    username: string
    avatarUrl: string
    mediaUrl: string
    tags: { name: string }[]
    mimeType: string
    viewCount: number
}


export function Post({ uuid, id, username, avatarUrl, mediaUrl, tags, mimeType, viewCount }: PostProps) {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    const hasViewed = localStorage.getItem(`post_${id}_viewed`)
    if (!hasViewed) {
      updateViewCountInDatabase(id)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          localStorage.setItem(`post_${id}_viewed`, 'true');
        })
        .catch(error => {
          console.error('Failed to update view count:', error);
        });
    }
  }, [id])

  return (
    <Card className="max-w-md mx-auto w-full">
      <CardHeader className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{username}</span>
      </CardHeader>
      <CardContent className="p-0">
        {renderMedia(mediaUrl, mimeType)}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <div className="flex justify-between w-full">
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/post/${uuid}`)
                  .then(() => {
                    setCopySuccess('URL copied to clipboard');
                    setTimeout(() => setCopySuccess(null), 2000); // Hide message after 2 seconds
                  })
                  .catch(err => {
                    console.error('Failed to copy: ', err);
                  });
              }}
            >
              <Send className="h-6 w-6" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
        {copySuccess && <div className="text-green-500 text-sm">{copySuccess}</div>}
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Eye className="h-4 w-4" />
          <span>{viewCount} view{viewCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-blue-500 text-sm hover:underline">
              #{tag.name}
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

