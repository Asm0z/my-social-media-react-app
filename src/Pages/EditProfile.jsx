import axios from "axios";
import { FileInput, Label } from "flowbite-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../Context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  let navigate = useNavigate();
  let { getUserData } = useContext(UserContext);
  let { register, handleSubmit } = useForm();
  async function uploadImage(value) {
    let imgFile = value.photo[0];
    let formData = new FormData();
    formData.append("photo", imgFile);
    let { data } = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.message == "success") {
      getUserData();
      toast.success("Image Changed successfully");
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }
  return (
    <>
      <form className="text-center" onSubmit={handleSubmit(uploadImage)}>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-purple-300 bg-purple-50 hover:bg-purple-100 dark:border-purple-500 dark:bg-purple-500/35 dark:hover:border-purple-900 dark:hover:bg-purple-900/35"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-purple-500 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-purple-500 dark:text-white">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-purple-500 dark:text-white">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <FileInput
              {...register("photo")}
              id="dropzone-file"
              className="hidden"
            />
          </Label>
        </div>
        <button
          type="submit"
          className="mt-3 text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-purple-800 cursor-pointer"
        >
          Submit New Data
        </button>
      </form>
    </>
  );
}
