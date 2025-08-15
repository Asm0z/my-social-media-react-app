import React, { useContext, useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreatePost() {
  let { user } = useContext(UserContext);
  let fileInput = useRef();
  let {register, handleSubmit} = useForm()
  async function handleCreatedPost(value){
    let formData = new FormData();
    formData.append("body", value.body);
    formData.append("image", fileInput.current.files[0]);
    let {data} = await axios.post('https://linked-posts.routemisr.com/posts',formData,{
        headers:{
            token: localStorage.getItem("token"),
        }
    })
    if(data.message == "success"){
        toast.success("Image Created successfully");
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleCreatedPost)} className="my-5  bg-purple-100 dark:bg-purple-500/35 rounded-3xl p-5">
      <h3 className="text-purple-900 dark:text-white py-3 border-b-2 dark:border-white">
        Share Your Thoughts <i class="fa-solid fa-message ps-2"></i>
      </h3>
      <div className="flex justify-between align-middle py-5">
        <img
          className="w-10 h-10 rounded-full"
          src={user?.photo}
          alt={user?.name}
        />
        <input
          type="text"
          {...register("body")}
          class=" mx-5 bg-purple-50 border border-purple-300 text-purple-900 text-sm rounded-lg focus:ring-purple-500/35 focus:border-purple-500/35 block w-full p-2.5 dark:bg-purple-900/35 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500/35 dark:focus:border-purple-500/35"
        />
        <label htmlFor="uploadPostImage" className="my-auto cursor-pointer">
          <i class="fa-regular fa-images text-2xl text-purple-900 dark:text-white"></i>
        </label>
        <input ref={fileInput} type="file" hidden id="uploadPostImage" />
      </div>
      <button
        type="submit"
        className="mt-3 text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:focus:ring-purple-800"
      >
        Share Post
      </button>
    </form>
  );
}
