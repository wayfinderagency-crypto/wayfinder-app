import Link from "next/link";
import { strapiFetch } from "@/lib/strapi";
import { RichTextRender } from "@/components/RichTextRender";
import { OtherArticles } from "@/components/OtherArticles";

interface Params {
  params: { slug: string };
}

export default async function BlogArticle({ params }: Params) {
  const { slug } = params;

  // Pobieramy artykuł z pełnym populate
  const data = await strapiFetch(
    `/articles?filters[slug][$eq]=${slug}&populate=*`
  );
  const article = data?.data?.[0];

  if (!article) {
    return <div className="container py-5">Artykuł nie znaleziony</div>;
  }

  // Pobieramy inne artykuły
  const others = await strapiFetch(
    `/articles?filters[slug][$ne]=${slug}&pagination[limit]=3&sort=publishedAt:desc&populate=*`
  );

  // Cover URL
  const coverUrl = article.cover?.url || null;

  return (
    <article className="container-fluid py-5 mt-5">
      <div className="container mb-4">
        {/* Back link */}
        <Link href="/blog" className="text-pink fw-bold d-inline-block mb-3">
          <i className="fa-solid fa-arrow-left"></i> Back
        </Link>

        {/* Tytuł i data */}
        <h1 className="mb-2">{article.title}</h1>
        <p className="text-muted fst-italic">
          Last updated:{" "}
          {new Date(article.publishedAt).toLocaleDateString("pl-PL")}
        </p>

        {/* Description */}
        {article.description && (
          <div className="fs-5 py-3">{article.description}</div>
        )}
      </div>

      {/* Cover image */}
      {coverUrl && (
        <div className="container-fluid mb-4 text-center">
          <img
            src={coverUrl}
            alt={article.title}
            className="img-article-cover img-fluid rounded-3"
          />
        </div>
      )}

      {/* Treść artykułu */}
      <div className="container">
        {article.content && <RichTextRender content={article.content} />}
      </div>

      {/* Inne artykuły */}
      {others?.data?.length > 0 && <OtherArticles articles={others.data} />}
    </article>
  );
}
