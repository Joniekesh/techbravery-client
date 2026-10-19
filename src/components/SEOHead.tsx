import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const DEFAULT_TITLE = "TechBravery | Software Development & Digital Solutions";

const DEFAULT_DESCRIPTION =
  "TechBravery builds custom web and mobile applications, SaaS products, blockchain solutions, and AI-powered software for businesses in Africa and beyond.";

// Replace this with your actual production domain.
// Configure VITE_SITE_URL in your production environment.
const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://yourdomain.com"
).replace(/\/+$/, "");

const SEOHead = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = "/og-image.png",
  url,
  type = "website",
  noindex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    const upsertMeta = (
      attribute: "name" | "property",
      key: string,
      content: string,
    ) => {
      let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.content = content;
    };

    const pageUrl = new URL(url || window.location.pathname, SITE_URL);

    // Canonical URLs should not contain tracking parameters or fragments.
    pageUrl.search = "";
    pageUrl.hash = "";

    const canonicalUrl = pageUrl.href;
    const imageUrl = new URL(image, SITE_URL).href;

    // Primary SEO
    document.title = title;

    upsertMeta("name", "description", description);

    if (keywords) {
      upsertMeta("name", "keywords", keywords);
    }

    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow",
    );

    // Open Graph
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", "TechBravery");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", title);

    // Twitter / X
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    // Canonical link
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalUrl;
  }, [title, description, keywords, image, url, type, noindex]);

  return null;
};

export default SEOHead;

// import { useEffect } from 'react';

// interface SEOHeadProps {
//   title?: string;
//   description?: string;
//   keywords?: string;
//   image?: string;
//   url?: string;
//   type?: string;
// }

// const SEOHead = ({
//   title = "TechBravery - Engineering the Digital Future",
//   description = "Full-service software agency building innovative digital products for Africa and beyond. Custom web & mobile apps, SaaS development, blockchain solutions, cyber security services and AI integration.",
//   keywords = "African software development, custom web apps, mobile app development, SaaS platforms, blockchain solutions, AI integration, fintech development, digital transformation Africa",
//   image = "/og-image.png",
//   url = window.location.href,
//   type = "website"
// }: SEOHeadProps) => {

//   useEffect(() => {
//     // Update document title
//     document.title = title;

//     // Update meta description
//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//       metaDescription.setAttribute('content', description);
//     }

//     // Update meta keywords
//     let metaKeywords = document.querySelector('meta[name="keywords"]');
//     if (!metaKeywords) {
//       metaKeywords = document.createElement('meta');
//       metaKeywords.setAttribute('name', 'keywords');
//       document.head.appendChild(metaKeywords);
//     }
//     metaKeywords.setAttribute('content', keywords);

//     // Update Open Graph tags
//     const updateOGTag = (property: string, content: string) => {
//       let tag = document.querySelector(`meta[property="${property}"]`);
//       if (!tag) {
//         tag = document.createElement('meta');
//         tag.setAttribute('property', property);
//         document.head.appendChild(tag);
//       }
//       tag.setAttribute('content', content);
//     };

//     updateOGTag('og:title', title);
//     updateOGTag('og:description', description);
//     updateOGTag('og:image', image);
//     updateOGTag('og:url', url);
//     updateOGTag('og:type', type);
//     updateOGTag('og:site_name', 'TechBravery');

//     // Update Twitter Card tags
//     const updateTwitterTag = (name: string, content: string) => {
//       let tag = document.querySelector(`meta[name="${name}"]`);
//       if (!tag) {
//         tag = document.createElement('meta');
//         tag.setAttribute('name', name);
//         document.head.appendChild(tag);
//       }
//       tag.setAttribute('content', content);
//     };

//     updateTwitterTag('twitter:card', 'summary_large_image');
//     updateTwitterTag('twitter:title', title);
//     updateTwitterTag('twitter:description', description);
//     updateTwitterTag('twitter:image', image);
//     updateTwitterTag('twitter:site', '@techbravery');

//     // Update canonical URL
//     let canonical = document.querySelector('link[rel="canonical"]');
//     if (!canonical) {
//       canonical = document.createElement('link');
//       canonical.setAttribute('rel', 'canonical');
//       document.head.appendChild(canonical);
//     }
//     canonical.setAttribute('href', url);

//   }, [title, description, keywords, image, url, type]);

//   return null;
// };

// export default SEOHead;
