'use client'

import { Story } from '@/components/story'
import { Post } from '@/components/post'
import { ProtectedRoute } from '@/components/protected-route'
import { UploadForm } from '@/components/upload-form';
import { API_URL, getAuthToken, IMG_URL } from '@/lib/utils';
import { getFiles } from '@/service/fileSystem';
import { useState, useEffect } from 'react';
import { getUser } from '@/service/user'
import { Button } from '@/components/ui/button';
import { RecycleIcon } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFiles = (page = 1) => {
    getFiles(page).then(response => {
      response.json().then((data: any) => {
        if (page === 1) {
          setPosts(data?.files?.data);
        } else {
          setPosts(prevPosts => [...prevPosts, ...data?.files?.data]);
        }
        setTotalPages(data?.files?.totalPages);
      });
    });
  };

  useEffect(() => {
    fetchFiles(currentPage);
    getUser().then(response => {
      response.json().then(data => {
        setUsers(data.users);
      });
    });
  }, [currentPage]);

  const loadMoreFiles = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 overflow-x-auto stories-scroll">
            <div className="flex space-x-4 w-max">
              {users && users.map((user: any) => (
                <Story key={user.id} username={user?.userName} avatarUrl={"/placeholder-user.jpg"} />
              ))}
            </div>
          </div>
          <UploadForm onUploadSuccess={() => fetchFiles(1)} />
          <div id="posts" className="space-y-8">
            {posts?.map((post: any) => (
              <Post
                uuid={post.uuid}
                key={post.id}
                id={post.id}
                username={post?.user?.userName}
                mimeType={post?.mimeType}
                avatarUrl={"/placeholder-user.jpg"}
                mediaUrl={(`${IMG_URL}/${post?.path}/${post?.filename}`) || ""}
                tags={post.tags}
                viewCount={post.views}
              />
            ))}
          </div>
          {currentPage < totalPages && (
            <div className="flex justify-center">
              <Button onClick={loadMoreFiles} className=" m-2 flex items-center justify-center text-sm rounded-full" variant={'default'}>
                <RecycleIcon className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

