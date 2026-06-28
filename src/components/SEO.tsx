import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  schema?: Record<string, any>;
}

export default function SEO({ title, description, schema }: SEOProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    if (schema) {
      const scriptId = "jsonld-seo-schema";
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    }

    return () => {
      if (schema) {
        const script = document.getElementById("jsonld-seo-schema");
        if (script) {
          script.remove();
        }
      }
    };
  }, [title, description, schema]);

  return null;
}
