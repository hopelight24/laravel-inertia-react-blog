import Authenticated from "@/Layouts/Authenticated";
import { For, RenderIfFalse, RenderIfTrue } from "@/utils";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { Fragment } from "react";

const Index = (props) => {
  const deleteArticle = async (slug) => {
    if (confirm("Delete this item ?")) {
      await axios.delete(`/dashboard/articles/${slug}`);
    }
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      flash={props.flash}
      title="My Dashboard"
    >
      <div className="p-6 lg:p-7">
        <div className="mb-5">
          <div className="flex justify-between w-full">
            <h2 className="text-2xl md:text-3xl mb-3">My Dashboard</h2>
            <Link
              className="btn bg-success hover:bg-success rounded btn-sm border-none outline-none flex capitalize !items-center justify-center"
              as="button"
              href="/dashboard/articles/create"
            >
              <FeatherIcon icon="plus" size={20} />
              <span>&nbsp;Create Post&nbsp;</span>
            </Link>
          </div>
          <hr className="border-t border-t-slate-300" />
        </div>
        <div className="overflow-x-auto relative lg:rounded-md slide-element">
          <table className="w-full text-center text-sm">
            <thead className="text-sm bg-danger text-slate-100 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  No
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Post Title
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              <RenderIfTrue isTrue={props.articles.length > 0}>
                <For
                  each={props.articles}
                  render={(article, index) => (
                    <Fragment key={index}>
                      <tr
                        className={`text-sm ${
                          index % 2 === 0 ? "bg-slate-200" : "bg-slate-100"
                        }`}
                      >
                        <th className="py-4 px-6 font-medium whitespace-nowrap text-base text-center">
                          {index + 1}
                        </th>
                        <th className="py-4 px-6 text-left font-medium whitespace-nowrap text-base">
                          {article.title}
                        </th>
                        <td className="py-4 px-6 whitespace-nowrap text-base">
                          {article.category.name}
                        </td>
                        <td className="py-4 px-6 flex !flex-nowrap btn-group">
                          <Link
                            href={route("articles.show", article.slug)}
                            method="get"
                            className="btn bg-sky-400 text-dark hover:bg-sky-400 rounded btn-sm border-none outline-none"
                          >
                            <FeatherIcon size={22} icon="eye" />
                          </Link>
                          <Link
                            href={route("articles.edit", article.slug)}
                            method="get"
                            className="btn bg-warning text-dark hover:bg-warning rounded btn-sm border-none outline-none"
                          >
                            <FeatherIcon size={22} icon="edit" />
                          </Link>
                          <Link
                            className="btn bg-danger hover:bg-danger rounded btn-sm border-none outline-none"
                            onClick={() => deleteArticle(article.slug)}
                          >
                            <FeatherIcon size={22} icon="trash-2" />
                          </Link>
                        </td>
                      </tr>
                    </Fragment>
                  )}
                />
              </RenderIfTrue>
              <RenderIfFalse isFalse={props.articles.length > 0}>
                <tr className="bg-gray-200 text-sm">
                  <td
                    className="py-4 px-6 text-left font-medium whitespace-nowrap text-base"
                    colSpan={4}
                  >
                    <h1 className="text-xl text-center">
                      Kamu belum memiliki artikel :(
                    </h1>
                  </td>
                </tr>
              </RenderIfFalse>
            </tbody>
          </table>
        </div>
        {/* <RenderIfTrue isTrue={props.articles.data.length >= 10}>
          <div className="mt-7 mb-2 w-full flex justify-center items-center">
            <Paginate links={props.articles.links} />
          </div>
        </RenderIfTrue> */}
      </div>
    </Authenticated>
  );
};

export default Index;
