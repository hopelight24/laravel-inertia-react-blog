import Card from "@/Components/Card";
import Main from "@/Layouts/Main";
import { For } from "@/utils";
import { Link } from "@inertiajs/inertia-react";
import { isNull } from "lodash";
import moment from "moment";
import { Fragment } from "react";
import FeatherIcon from "feather-icons-react";

const Index = (props) => {
  const { articles } = props;
  console.log(articles);

  return (
    <Main title="Home" data={props}>
      <section className="pt-6 pb-10">
        <div>
          <section className="mb-8 mt-1 lg:px-1">
            <h2 className="text-3xl md:text-4xl font-medium text-center">
              All Articles
            </h2>
          </section>
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-6">
              <div className="card md:card-side shadow-md shadow-slate-400 md:col-span-2 rounded-md bg-no-repeat bg-cover bg-center">
                <div className="bg-white w-full">
                  <figure>
                    <img
                      src={
                        articles?.data[0]?.image !== ""
                          ? `/storage/${articles?.data[0]?.image}`
                          : "/default-images/article-images/default-article-image.png"
                      }
                      alt={articles?.data[0]?.title}
                      width="100%"
                      className="object-cover object-center max-h-[440px]"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-2xl mb-2">
                      {articles?.data[0]?.title}
                    </h2>
                    <div className="badge badge-primary py-2.5 !font-lexend text-sm mb-2 truncate">
                      Posted&nbsp;
                      {moment(articles?.data[0]?.created_at).format("LL")}
                    </div>
                    <p className="text-base break-words">
                      {articles?.data[0]?.excerpt}
                    </p>
                    <div className="card-actions flex items-center justify-between mt-4">
                      <Link
                        href={`/articles/${articles?.data[0]?.slug}`}
                        className="btn btn-primary btn-sm rounded"
                      >
                        Read More
                      </Link>
                      <div class="badge badge-secondary py-2.5 !font-lexend">
                        {articles?.data[0]?.category?.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <For
                each={articles?.data?.slice(1)}
                render={(data, index) => (
                  <Fragment key={index}>
                    <Card article={data} />
                  </Fragment>
                )}
              />
            </div>
          </section>
          <section className="mt-9 mb-6 w-full flex justify-center items-center">
            <div className="btn-group">
              <Link
                as="button"
                href={props.articles.prev_page_url}
                className={`btn bg-danger outline-danger hover:bg-danger border-danger hover:border-danger rounded capitalize text-base flex gap-3 ${
                  isNull(props.articles.prev_page_url)
                    ? "btn-disabled bg-red-400 border-red-400 outline-red-400 cursor-not-allowed text-light"
                    : ""
                }`}
              >
                <FeatherIcon size={18} icon="chevron-left" /> <span>Prev</span>
              </Link>
              <button className="btn bg-danger outline-danger hover:bg-danger border-danger hover:border-danger capitalize text-base no-animation btn-disabled text-light">
                Page {props.articles.current_page}
              </button>
              <Link
                as="button"
                href={props.articles.next_page_url}
                className={`btn bg-danger outline-danger hover:bg-danger border-danger hover:border-danger rounded capitalize text-base flex gap-3 ${
                  isNull(props.articles.next_page_url)
                    ? "btn-disabled bg-red-400 border-red-400 outline-red-400 cursor-not-allowed text-light"
                    : ""
                }`}
              >
                <span>Next</span> <FeatherIcon size={18} icon="chevron-right" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </Main>
  );
};

export default Index;
