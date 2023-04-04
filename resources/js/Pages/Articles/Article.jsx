import Button from "@/Components/Button";
import Main from "@/Layouts/Main";
import { For, RenderIfFalse, RenderIfTrue } from "@/utils";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import FeatherIcon from "feather-icons-react";
import moment from "moment";

const Article = (props) => {
  const { article } = props;

  const { data, post, processing, setData } = useForm({
    article_id: article.id,
    comment: "",
  });

  const back = () => window.history.back();

  const submitHandler = (e) => {
    e.preventDefault();
    post(route("article.comment"), {
      preserveScroll: true,
    });
    setData("comment", "");
  };

  const likeHandler = (e) => {
    e.preventDefault();
    Inertia.post(
      route("add.like"),
      {
        article_id: article.id,
      },
      {
        preserveScroll: true,
      }
    );
  };

  return (
    <Main data={props} title="Post Details">
      <section className="pt-6 pb-10">
        <div className="container">
          <div className="w-full lg:max-w-3xl mx-auto p-2">
            <div className="mb-10">
              <Link
                as="button"
                onClick={back}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-300"
                preserveScroll
              >
                <FeatherIcon icon="chevron-left" size={21} />
                <span className="text-lg !font-lexend ">
                Back to all post
                </span>
              </Link>
            </div>
            <article>
              <div className="mb-7">
                <h2 className="text-2xl md:text-5xl font-semibold text-center break-words">
                  {article.title}
                </h2>
              </div>
              <div className="mb-7">
                <p className="text-lg md:text-xl font-medium text-center">
                  Posted by <Link>{article.user.name}</Link>
                </p>
              </div>
              <div className="mb-7 rounded overflow-hidden">
                <div>
                  <img
                    src={
                      article.image !== ""
                        ? `/storage/${article.image}`
                        : "/default-images/article-images/default-article-image.png"
                    }
                    width="100%"
                    alt="car!"
                    className="object-cover object-center"
                  />
                </div>
                <RenderIfTrue isTrue={article.likes?.length > 0}>
                  <div className="bg-slate-200 p-3 text-base flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <form
                        className="flex !items-center gap-2 mb-2"
                        onSubmit={likeHandler}
                      >
                        <button
                          className="btn btn-sm border-none outline-none rounded btn-primary"
                          type="submit"
                        >
                          <FeatherIcon icon="heart" />
                        </button>
                        <Link className="btn btn-sm rounded btn-secondary">
                          <FeatherIcon icon="message-circle" />
                        </Link>
                      </form>
                    </div>
                    <div className="text-base md:text-lg font-medium md:font-semibold">
                      Liked By {article.likes[0]?.user.name}&nbsp;
                      {article.likes?.length > 1
                        ? `dan ${article.likes?.slice(1).length} lainnya`
                        : ""}
                    </div>
                  </div>
                </RenderIfTrue>
                <RenderIfFalse isFalse={article.likes?.length > 0}>
                  <div className="bg-slate-200 p-3 text-base flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <form
                        className="flex !items-center gap-2 mb-2"
                        onSubmit={likeHandler}
                      >
                        <button
                          className="btn btn-sm border-none outline-none rounded btn-primary"
                          type="submit"
                        >
                          <FeatherIcon icon="heart" />
                        </button>
                        <Link className="btn btn-sm rounded btn-secondary">
                          <FeatherIcon icon="message-circle" />
                        </Link>
                      </form>
                    </div>
                    <div className="text-lg">{article.likes?.length} Likes</div>
                  </div>
                </RenderIfFalse>
              </div>
              <div className="mb-12 leading-loose">
                <div
                  className="text-lg md:text-xl text-justify font-medium text-gray-900 break-words"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  style={{ lineHeight: "1.8rem" }}
                />
              </div>
              <div className="my-7">
                <hr className="border-t border-t-slate-300" />
              </div>
              <section>
                <div className="mb-7">
                  <h1 className="text-2xl md:text-3xl font-semibold">
                  Comments&nbsp;
                    <span className="text-xl md:text-2xl">
                      ({article.comments.length})
                    </span>
                  </h1>
                </div>
                <RenderIfTrue isTrue={article.comments.length > 0}>
                  <For
                    each={article.comments}
                    render={(data, index) => (
                      <section key={index}>
                        <div className="mb-7 bg-white rounded-md p-4 shadow shadow-slate-400 flex flex-col gap-3">
                          <p className="text-lg md:text-xl font-medium">
                            {data.user.name}
                          </p>
                          <p className="text-base md:text-lg font-medium">
                            {data.comment}
                          </p>
                          <p className="text-sm mt-4 font-medium" key={index}>
                            {moment(data.created_at).calendar()}
                          </p>
                        </div>
                      </section>
                    )}
                  />
                </RenderIfTrue>
                <RenderIfFalse isFalse={article.comments.length > 0}>
                  <div>
                    <p className="text-lg md:text-xl font-medium">
                    No comments yet.
                    </p>
                  </div>
                </RenderIfFalse>
              </section>
              <div className="my-7">
                <hr className="border-t border-t-slate-300" />
              </div>
              <section>
                <div className="mb-7">
                  <h1 className="text-2xl md:text-3xl font-semibold">
                  Leave a Comment
                  </h1>
                </div>
                <RenderIfTrue isTrue={props.auth.user}>
                  <div className="mb-7">
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={submitHandler}
                    >
                      <textarea
                        rows="3"
                        className="outline-none px-3 py-1.5 rounded-sm text-base !font-lexend ring-2 focus:ring-4 focus:ring-opacity-50 focus:ring-sky-500 transition-all selection:bg-rose-700 selection:text-rose-300 border-0 !bg-slate-50 !text-slate-900"
                        placeholder="Write your comment"
                        value={data.comment}
                        onChange={(e) => setData("comment", e.target.value)}
                      ></textarea>
                      <Button
                        type="submit"
                        className="w-full md:w-1/4 flex justify-center"
                        processing={processing}
                      >
                        Submit
                      </Button>
                    </form>
                  </div>
                </RenderIfTrue>
                <RenderIfFalse isFalse={props.auth.user}>
                  <div className="mb-7">
                    <div className="text-lg flex gap-4">
                      <p>
                      Do you want to comment?{" "}
                        <Link
                          className="underline text-blue-600"
                          href={route("login")}
                        >
                          Login
                        </Link>{" "}
                        first
                      </p>
                    </div>
                  </div>
                </RenderIfFalse>
              </section>
            </article>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Article;
