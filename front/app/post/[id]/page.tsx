'use client'
import { Post } from '@/components/post'
import { ProtectedRoute } from '@/components/protected-route'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { renderMedia } from '@/components/ui/mimeTypeCo';
import { IMG_URL } from '@/lib/utils';
import { getFile, getMyFiles } from '@/service/fileSystem';
import { Bookmark, Send } from 'lucide-react';
import { Eye } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PostPage() {
    const [post, setPost] = useState<any>(null);
    const params = useParams();

    const fetchFile = () => {
        getFile(params.id as string).then(response => {
            response.json().then((data: any) => {
                setPost(data.file);
            });
        });
    };

    useEffect(() => {
        fetchFile();
    }, []);

    return (
        <ProtectedRoute>
            <Card className="max-w-md mx-auto w-full">
                <CardHeader className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={"/placeholder-user.jpg"} alt={post?.user?.userName} />
                        <AvatarFallback>{post?.user?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{post?.user?.userName}</span>
                </CardHeader>
                <CardContent className="p-0">
                    {renderMedia(`${IMG_URL}/${post?.path}/${post?.filename}`, post?.mimeType)}
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2">
                    <div className="flex justify-between w-full">
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Eye className="h-4 w-4" />
                        <span>{post?.views} view{post?.views !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {post?.tags.map((tag: any, index: number) => (
                            <span key={index} className="text-blue-500 text-sm hover:underline">
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </ProtectedRoute>
    )
}

