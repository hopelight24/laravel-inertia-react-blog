import Authenticated from "@/Layouts/Authenticated";
import { Link } from "@inertiajs/inertia-react";
import FeatherIcon from "feather-icons-react";

const Profile = (props) => {
  const { user } = props.auth;
  const { name, email, gender, city, country, phone_number, avatar } = user;

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      flash={props.flash}
      title="My Profile"
    >
      <div className="p-6 lg:p-7">
        <div className="mb-5">
          <div className="flex justify-between w-full">
            <h2 className="text-2xl md:text-3xl mb-3">My Profile</h2>
            <Link
              className="btn bg-sky-600 hover:bg-sky-600 rounded btn-sm border-none outline-none flex capitalize !items-center justify-center"
              href={route("edit.profile")}
            >
              <FeatherIcon icon="edit" size={18} />
              <span className="hidden md:inline">&nbsp;Edit Profile&nbsp;</span>
            </Link>
          </div>
          <hr className="border-t border-t-slate-300" />
        </div>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 w-full">
          <div className="mb-5">
            <div className="mt-4">
              <div className="flex justify-center items-center flex-col gap-3 mb-8">
                <div className="avatar">
                  <div className="w-44 rounded ring-2 ring-opacity-50 ring-sky-500 ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        avatar
                          ? `/storage/${avatar}`
                          : "/storage/profile-images/defaultavatar.png"
                      }
                      className="image-preview"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5 col-span-2">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="font-medium w-full p-2 text-lg">
                <div className="mb-1 p-1">
                  <span className="block font-semibold text-base">Name : </span>
                  {name}
                </div>
                <div className="mb-1 p-1">
                  <span className="block font-semibold text-base">
                    Email :{" "}
                  </span>
                  {email}
                </div>
                <div className="mb-1 p-1">
                  <span className="block font-semibold text-base">
                    Gender :{" "}
                  </span>
                  {gender ?? "Unknown"}
                </div>
              </div>
              <div className="font-medium w-full p-2 text-lg">
                <div className="mb-1 p-1">
                  <span className="block font-semibold text-base">
                    Phone :{" "}
                  </span>
                  {phone_number ?? "Unknown"}
                </div>
                <div className="mb-1 p-1">
                  <span className="block font-semibold text-base">City : </span>
                  {city ?? "Unknown"}
                </div>
                <div className="mb-1 p-1">
                  <span className="block font-semibold text-base">
                    Country :{" "}
                  </span>
                  {country ?? "Unknown"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Profile;
