'use client'
import { Post } from '@/components/post'
import { ProtectedRoute } from '@/components/protected-route'
import { Button } from '@/components/ui/button';
import { IMG_URL } from '@/lib/utils';
import { getMyFiles } from '@/service/fileSystem';
import { RecycleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MyPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFiles = (page = 1) => {
    getMyFiles(page).then(response => {
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


  const loadMoreFiles = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  useEffect(() => {
    fetchFiles(currentPage);
  }, [currentPage]);


  return (
    <ProtectedRoute>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 p-2">
        <div className="max-w-3xl w-full">
          <div id="posts" className="space-y-8">
            {posts?.map((post) => (
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

