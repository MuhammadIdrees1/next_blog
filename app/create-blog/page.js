"use client";
import { useState } from "react";
import { showToastMessage } from "../lib/Toast";
import { useSession } from "next-auth/react";
import { create_blog } from "../services/blog_api";
const page = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Nature");
  const [photo, setPhoto] = useState(null);

  if (status === "unauthenticated") {
    return <p>access denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !photo) {
      showToastMessage("error", " fill all fields");
      return;
    }
    const image = photo.name;
    const body = { title, description, image, category };
    try {
      const res = await create_blog(session?.user?.accessToken, body);
      if (res.ok) {
        showToastMessage("success", "successfully created blog");
      }
    } catch (error) {
      showToastMessage("error", error.message);
    }

    console.log(title, description, image, category);
  };

  const uploadImage = async () => {};

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create Blog
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Title"
                  required=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2  text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Description"
                  required=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 mt-3 text-sm font-medium text-gray-900 "
                  >
                    Select Category
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Mountain">Mountain</option>
                    <option value="Ocean">Ocean</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Forest">Forest</option>
                  </select>
                </div>{" "}
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="file_input"
                >
                  Upload Image
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>{" "}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Create Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
