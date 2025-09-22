"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { strapiFetch } from "@/lib/strapi"; // fetch do Strapi Cloud

// Typ artykułu po zmapowaniu
type Article = {
  id: number;
  title: string;
  slug: string;
  publishedAt: string;
  coverUrl: string | null;
  description: string;
};

// Typy surowych danych ze Strapi
type StrapiImage = {
  url: string;
};

type StrapiArticle = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    publishedAt: string;
    description?: string;
    cover?: StrapiImage;
  };
};

type StrapiResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export default function Blog() {
  const searchParams = useSearchParams();
  const pageParam = searchParams?.get("page") || "1";
  const page = parseInt(pageParam);
  const pageSize = 5;

  const [articles, setArticles] = useState<Article[]>([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data: StrapiResponse<StrapiArticle> = await strapiFetch(
          `/articles?sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
        );

        // Mapowanie do prostego typu Article
        const mappedArticles: Article[] = data.data.map((article) => ({
          id: article.id,
          title: article.attributes.title,
          slug: article.attributes.slug,
          publishedAt: article.attributes.publishedAt,
          coverUrl: article.attributes.cover?.url || null,
          description: article.attributes.description || "",
        }));

        setArticles(mappedArticles);
        setPageCount(data.meta.pagination.pageCount);
      } catch (err) {
        console.error("Błąd pobierania artykułów:", err);
        setArticles([]);
      }
    }

    fetchArticles();
  }, [page]);

  return (
    <section className="container-fluid blog pt-5">
      <div className="container mt-5 pt-5">
        <div className="text">
          <h1 className="text-center mb-4 display-4">
            Our <span className="fw-bold text-pink">Blog</span>
          </h1>
          <p className="fs-5 text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>

        <div className="blog-page d-flex flex-column justify-content-center w-100 w-md-75 mx-auto">
          {articles.length === 0 && <p>No articles found.</p>}

          {articles.map((article) => (
            <div
              key={article.id}
              className="blog card mb-5 px-4 border-0 shadow rounded-4"
            >
              <div className="card-body p-3 p-md-5">
                <h3 className="card-title">{article.title}</h3>
                <p className="text-pink fst-italic">
                  {new Date(article.publishedAt).toLocaleDateString("pl-PL")}
                </p>

                {article.coverUrl && (
                  <img
                    src={article.coverUrl}
                    alt={article.title}
                    className="d-block img-fluid mx-auto mb-3 rounded-5"
                  />
                )}

                <p className="fs-5 py-3">{article.description}</p>

                <Link
                  href={`/blog/${article.slug}`}
                  className="btn fs-5 btn-lg px-4 rounded-5"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}

          {/* Paginacja */}
          {pageCount > 1 && (
            <div className="d-flex justify-content-center my-4 gap-2">
              {Array.from({ length: pageCount }).map((_, idx) => (
                <Link
                  key={idx}
                  href={`/blog?page=${idx + 1}`}
                  className={`btn fs-5 btn-lg px-3 rounded-3 ${
                    idx + 1 === page ? "btn-primary" : "btn-outline-primary"
                  }`}
                >
                  {idx + 1}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
