import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Select from "@/Components/Select";
import ValidationErrors from "@/Components/ValidationErrors";
import Authenticated from "@/Layouts/Authenticated";
import { For } from "@/utils";
import { Link, useForm } from "@inertiajs/inertia-react";
import { RichTextEditor } from "@mantine/rte";
import { Fragment, useEffect } from "react";

const Create = (props) => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    category_id: "1",
    image: null,
    content: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    post("/dashboard/articles");
  };

  useEffect(() => {
    const image = document.getElementById("image");
    const image_preview = document.querySelector(".image-preview");

    image.addEventListener("change", async function () {
      const file = this.files[0];
      image_preview.src = await URL.createObjectURL(file);
      image_preview.style.display = "block";
    });
  }, []);

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      title="Create Post"
    >
      <div className="p-6 lg:p-7">
        <div className="mb-4">
          <h2 className="text-2xl text-center md:text-3xl mb-3">
            Create New Post
          </h2>
          <hr className="border-t border-t-slate-300" />
        </div>
        <div className="mb-5">
          <div className="max-w-3xl mx-auto">
            <ValidationErrors errors={errors} />
            <form onSubmit={submitHandler}>
              <div>
                <Label forInput="title" value="Post Title" />
                <Input
                  autoComplete="off"
                  type="text"
                  name="title"
                  className="mt-1 block w-full"
                  placeholder="Write the title"
                  value={data.title}
                  handleChange={(e) => setData("title", e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Label forInput="category_id" value="Post Category" />
                <Select
                  name="category_id"
                  id="category_id"
                  onChange={(e) => setData("category_id", e.target.value)}
                >
                  <For
                    each={props.categories}
                    render={(category, index) => (
                      <Fragment key={index}>
                        <option value={category.id}>{category.name}</option>
                      </Fragment>
                    )}
                  />
                </Select>
              </div>
              <div className="mt-4">
                <Label
                  forInput="image"
                  value="Post Image (jpg, png, webp)"
                />
                <img className="image-preview my-4 w-full md:w-1/2 rounded hidden" />
                <Input
                  autoComplete="off"
                  type="file"
                  name="image"
                  id="image"
                  className="mt-1 block w-full !px-1.5"
                  placeholder="Thumbnail"
                  handleChange={(e) => setData("image", e.target.files[0])}
                />
              </div>
              <div className="mt-4">
                <Label
                  forInput="content"
                  value="Description"
                  className="mb-1"
                />
                { /* <RichTextEditor
                  className="outline-none rounded-sm text-base !font-lexend  ring-1 focus:ring-2 focus:ring-sky-500 transition-all selection:bg-rose-700 selection:text-rose-300 border-0  block w-full"
                  placeholder="your content starts here"
                  value={data.content}
                  onChange={(e) => setData("content", e)}
/> */ }
				
				<Input
                  autoComplete="off"
                  type="text"
                  name="content"
                  className="mt-1 block w-full"
                  placeholder="Write description"
                  value={data.content}
                  handleChange={(e) => setData("content", e.target.value)}
                />
				
              </div>
              <div className="flex items-center justify-start mt-4 gap-3">
                <Button type="submit" processing={processing}>
                Create a new article
                </Button>
                <Link
                  as="button"
                  href={route("dashboard")}
                  className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Create;
