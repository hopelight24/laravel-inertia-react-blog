import { Link } from "@inertiajs/inertia-react";
import moment from "moment";

const Card = (props) => (
  <div className="card rounded-md shadow-md hover:shadow-md shadow-slate-400 hover:shadow-slate-400 bg-white">
    <figure>
      <img
        src={
          props.article.image !== ""
            ? `/storage/${props.article.image}`
            : "/default-images/article-images/default-article-image.png"
        }
        width="100%"
        alt={props.article.title}
        className="object-cover select-none"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title text-2xl mb-2">{props.article.title}</h2>
      <div className="badge badge-primary py-2.5 !font-lexend text-sm mb-2">
        Posted {moment(props.article.created_at).format("LL")}
      </div>
      <p className="text-base break-words">{props.article.excerpt}</p>
      <div className="card-actions flex justify-between items-center mt-3 text-base">
        <Link
          className="underline !font-lexend"
          href={`/articles/${props.article.slug}`}
        >
          Read More
        </Link>
        <div class="badge badge-secondary py-2.5 !font-lexend">
          {props.article.category.name}
        </div>
      </div>
    </div>
  </div>
);

export default Card;
