import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import Authenticated from "@/Layouts/Authenticated";
import { Link, useForm } from "@inertiajs/inertia-react";
import { useEffect } from "react";

const Profile = (props) => {
  const { user } = props.auth;
  const { name, email, city, country, phone_number, avatar, gender } = user;

  const { data, errors, processing, post, setData } = useForm({
    name,
    email,
    city,
    country,
    phone_number,
    avatar: null,
    gender,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    post(route("change.profile"));
  };

  useEffect(() => {
    const avatar = document.getElementById("avatar");
    const image_preview = document.querySelector(".image-preview");

    avatar.addEventListener("change", async function () {
      const file = this.files[0];
      image_preview.src = await URL.createObjectURL(file);
      image_preview.style.display = "block";
    });
  }, []);

  return (
    <Authenticated auth={props.auth} errors={props.errors} title="My Profile">
      <div className="p-6 lg:p-7">
        <div className="mb-5">
          <h2 className="text-2xl text-center md:text-3xl mb-3 font-medium">
            Edit Profile
          </h2>
          <hr className="border-t border-t-slate-300" />
        </div>
        <div className="mb-5">
          <div className="max-w-2xl mx-auto">
            <ValidationErrors errors={errors} />
            <form onSubmit={submitHandler}>
              <div className="mt-4">
                <div className="flex justify-center items-center flex-col gap-3 mb-8">
                  <div className="avatar">
                    <div className="w-36 rounded-full ring-2 ring-opacity-50 ring-sky-500 ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          avatar
                            ? `/storage/${avatar}`
                            : "/storage/profile-images/defaultavatar.png"
                        }
                        className="image-preview"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <Label
                  forInput="avatar"
                  value="Avatar (jpg, png, webp) maks 1MB"
                />
                <Input
                  autoComplete="off"
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="mt-1 block w-full !px-1.5"
                  handleChange={(e) => setData("avatar", e.target.files[0])}
                />
              </div>
              <div className="mt-4">
                <Label forInput="name" value="Name" />
                <Input
                  autoComplete="off"
                  type="text"
                  name="name"
                  className="mt-1 block w-full"
                  placeholder="Deo Subarno"
                  defaultValue={data.name}
                  handleChange={(e) => setData("name", e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Label forInput="email" value="Email" />
                <Input
                  autoComplete="off"
                  type="email"
                  name="email"
                  className="mt-1 block w-full"
                  defaultValue={data.email}
                  handleChange={(e) => setData("email", e.target.value)}
                  disabled
                />
              </div>
              <div className="mt-4">
                <Label forInput="city" value="City" />
                <Input
                  autoComplete="off"
                  type="text"
                  name="city"
                  className="mt-1 block w-full"
                  placeholder="Bekasi"
                  defaultValue={data.city}
                  handleChange={(e) => setData("city", e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Label forInput="country" value="Country" />
                <Input
                  autoComplete="off"
                  type="text"
                  name="country"
                  className="mt-1 block w-full"
                  placeholder="Indonesia"
                  defaultValue={data.country}
                  handleChange={(e) => setData("country", e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Label forInput="phone_number" value="Phone Number" />
                <Input
                  autoComplete="off"
                  type="number"
                  name="phone_number"
                  className="mt-1 block w-full"
                  placeholder="08xxxxxxxxxx"
                  defaultValue={data.phone_number}
                  handleChange={(e) => setData("phone_number", e.target.value)}
                />
              </div>
              <div className="flex items-center justify-start mt-4 gap-3">
                <Button type="submit" processing={processing}>
                Update Profile
                </Button>
                <Link
                  href={route("profile")}
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

export default Profile;
