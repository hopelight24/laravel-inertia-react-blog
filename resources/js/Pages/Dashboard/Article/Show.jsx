import Authenticated from "@/Layouts/Authenticated";
import { Link } from "@inertiajs/inertia-react";
import FeatherIcon from "feather-icons-react";

const Show = (props) => {
  const { article } = props;

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      title="Post Detail"
    >
      <div className="p-6 lg:p-7">
        <div className="mb-5">
          <div className="flex justify-between w-full">
            <h2 className="text-2xl md:text-3xl mb-3">Post Detail</h2>
            <Link
              className="btn btn-secondary rounded btn-sm border-none outline-none flex capitalize items-center justify-center"
              as="button"
              href="/dashboard"
            >
              <FeatherIcon icon="chevrons-left" size={20} />
              <span>&nbsp;Back&nbsp;</span>
            </Link>
          </div>
          <hr className="border-t border-t-slate-300" />
        </div>
        <div className="mb-5">
          <article className="w-full lg:max-w-3xl mx-auto p-2">
            <div className="mb-7 flex justify-center">
              <h2 className="text-4xl md:text-5xl font-semibold text-center break-words">
                {article.title}
              </h2>
            </div>
            <div className="mb-7 rounded overflow-hidden">
              <img
                src={
                  article?.image !== ""
                    ? `/storage/${article?.image}`
                    : "/storage/articles-image/default-article-image.png"
                }
                width="100%"
                alt="car!"
                className="object-cover object-center"
              />
            </div>
            <div className="mb-7 leading-loose">
              <div
                className="text-lg md:text-xl text-justify font-medium text-gray-900 break-words"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{ lineHeight: "2rem" }}
              />
            </div>
          </article>
        </div>
      </div>
    </Authenticated>
  );
};

export default Show;
