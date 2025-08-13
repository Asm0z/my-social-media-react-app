import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostsDetails() {
  let { id } = useParams();
  useEffect(() => {
    getPostDetails();
  }, []);
  let [post, setPost] = useState(null);
  async function getPostDetails() {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setPost(data.post);
    console.log(data);
  }
  return (
    <div>
      {post && (
        <div className="md:w-3/4 w-full md:mx-auto">
          <div className="my-5  bg-purple-100 dark:bg-purple-500/35 rounded-3xl p-5">
            <div className="flex items-center gap-4 pb-2">
              <img
                className="w-10 h-10 rounded-full"
                src={post.user.photo}
                alt="user-avatar"
              />
              <div className="font-medium text-purple-900 dark:text-white">
                <div>{post.user.name}</div>
                <div className="text-sm text-purple-900 dark:text-white">
                  {new Date(post.createdAt).toDateString()}{" "}
                  {new Date(post.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <p className="text-purple-900 dark:text-white py-3 border-t-2 dark:border-white">
              {post.body}
            </p>
            <img
              src={post.image}
              className="w-full rounded-2xl"
              alt="post-image"
            />
            <div className="footer py-5 flex justify-baseline items-center ">
              <h3 className="font-medium text-purple-900 dark:text-white">
                {post.comments.length} comment
              </h3>
            </div>

            {post.comments.map((comment) => {
              return (
                <div className="border-2 border-purple-400 dark:border-gray-200 rounded-2xl p-5 my-5" key={comment._id}>
                  <div className="flex items-center gap-4 py-2">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        comment.commentCreator
                          .photo
                      }
                      alt="user-avatar"
                    />
                    <div className="font-medium text-purple-900 dark:text-white">
                      <div>
                        {
                          comment.commentCreator
                            .name
                        }
                      </div>
                      <div className="text-sm text-purple-900 dark:text-white">
                        {new Date(post.createdAt).toDateString()}{" "}
                        {new Date(
                          comment.createdAt
                        ).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <h3 className="px-16 text-purple-700 dark:text-gray-300">
                    {comment.content}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
