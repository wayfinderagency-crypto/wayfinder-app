import Link from "next/link";
import { mediaUrl } from "@/lib/strapi";

interface Article {
  id: number;
  title: string;
  slug: string;
  cover_url?: string;
  excerpt?: string;
}

interface Props {
  articles: Article[];
}

export const OtherArticles: React.FC<Props> = ({ articles }) => {
  return (
    <div className="container py-5">
      <h2>Other articles</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 py-3">
        {articles.map((item) => {
          const coverUrl = item.cover_url
            ? item.cover_url.startsWith("http")
              ? item.cover_url
              : mediaUrl(item.cover_url)
            : null;

          return (
            <div className="col" key={item.id}>
              <div className="card bg-pink border-0 rounded-4 shadow h-100">
                {coverUrl && (
                  <img
                    src={coverUrl}
                    alt={item.title}
                    className="img-fluid rounded-4"
                  />
                )}
                <div className="card-body p-5 pt-2">
                  <h5 className="card-title fw-bold py-2">{item.title}</h5>
                  {item.excerpt && <p className="card-text">{item.excerpt}</p>}
                  <Link
                    href={`/blog/${item.slug}`}
                    className="btn btn-second fs-5 btn-lg px-4 rounded-5"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
