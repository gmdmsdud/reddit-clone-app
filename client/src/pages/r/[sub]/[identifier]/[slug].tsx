import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import { Post } from '../../../../types';

const PostPage = () => {

    const router = useRouter();
    const { identifier,sub,slug} = router.query; 

    const fetcher = async (url: string) => {
        try {
            const res = await axios.get(url);
            return res.data;

        } catch (error:any) {
            throw error.response.data            
        }
    }

    const { data: post, error} = useSWR<Post>(identifier && slug ? `/post/${identifier}/${slug}`: null)

  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
        <div className="w-full md:mr-3 md:w-8/12">
            <div className="bg-white rounded">
                {post && (
                    <>
                    <div className='flex'>
                        <div className='py-2 pr-2'>
                            <div className='flex items-center'>
                                <p className='text-xs test-gray-400'>
                                    Posted by
                                    <Link href ={`/u/${post.username}`}>
                                        <a className='mx-1 hover:underline'>
                                            /u/{post.username}
                                        </a>
                                    </Link>
                                    <Link href={post.url}>
                                        <a className="mx-1 hover:underline">
                                            {dayjs(post.createdAt).format("yyyy-MM-dd HH:mm")}
                                        </a>
                                    </Link>
                                </p>
                            </div>
                            <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                            <p className="my-3 text-sm">{post.body}</p>
                            <div className="flex">
                                <button>
                                    <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                                    <span className='font-bold'>
                                        {post.commentCount}Comments
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>

    </div>
  )
}

export default PostPage