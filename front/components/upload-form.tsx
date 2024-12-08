"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Image, Film } from 'lucide-react'
import { uploadFile } from "@/service/fileSystem"

export function UploadForm({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    if (input.endsWith(',')) {
      const newTag = input.slice(0, -1).trim()
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      e.target.value = ''
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      const response = await uploadFile(file, tags)
      if (response.ok) {
        onUploadSuccess()
      }
    }
    setFile(null)
    setTags([])
  }

  return (
    <Card className="w-full max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Create a new post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Choose Image or Video</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="file"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("file")?.click()}
              >
                {file ? file.name : "Select File"}
              </Button>
              {file && file.type.startsWith("image/") && <Image className="h-5 w-5" />}
              {file && file.type.startsWith("video/") && <Film className="h-5 w-5" />}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated, optional)</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <Input
              id="tags"
              placeholder="nature, photography, summer"
              onChange={handleTagInputChange}
            />
          </div>
          <Button type="submit" className="w-full" disabled={!file}>
            Upload
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

