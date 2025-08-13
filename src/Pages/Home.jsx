import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreatePost from "../Components/CreatePost/CreatePost";
import LoadingScreen from "../Components/Loading";

export default function Home() {
  let [postsList, setPosts] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllPosts();
  }, []);
  async function getAllPosts() {
    let { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false);
    if (data.message == "success") {
      setPosts(data.posts);
    }
    console.log(data);
  }
  return (
    <div className="md:w-3/4 w-full md:mx-auto">
      <CreatePost />
      {
        isLoading ? <LoadingScreen /> :
        (
          postsList.map((post) => {
            let {
              _id,
              body,
              image,
              createdAt,
              user: { name, photo },
              comments,
            } = post;
            return (
              <div
                className="my-5  bg-purple-100 dark:bg-purple-500/35 rounded-3xl p-5"
                key={_id}
              >
                <div className="flex items-center gap-4 pb-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={photo}
                    alt="user-avatar"
                  />
                  <div className="font-medium text-purple-900 dark:text-white">
                    <div>{name}</div>
                    <div className="text-sm text-purple-900 dark:text-white">
                      {new Date(createdAt).toDateString()}{" "}
                      {new Date(createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <p className="text-purple-900 dark:text-white py-3 border-t-2 dark:border-white">
                  {body}
                </p>
                <img src={image} className="w-full rounded-2xl" alt="post-image" />
                <div className="footer py-5 flex justify-between items-center ">
                  <h3 className="font-medium text-purple-900 dark:text-white">
                    {comments.length} comment
                  </h3>
                  <Link
                    to={"/postsDetails/" + _id}
                    className="font-medium text-purple-900 dark:text-white"
                  >
                    See Posts Details
                  </Link>
                </div>
                {comments.length > 0 && <div className="border-2 border-purple-400 dark:border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center gap-4 py-2">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={comments[comments.length - 1].commentCreator.photo}
                      alt="user-avatar"
                    />
                    <div className="font-medium text-purple-900 dark:text-white">
                      <div>{comments[comments.length - 1].commentCreator.name}</div>
                      <div className="text-sm text-purple-900 dark:text-white">
                        {new Date(createdAt).toDateString()}{" "}
                        {new Date(
                          comments[comments.length - 1].createdAt
                        ).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <h3 className="px-16 text-purple-700 dark:text-gray-300">
                    {comments[comments.length - 1].content}
                  </h3>
                </div>
                }
              </div>
            );
          })
        )
      }
    </div>
  );
}
