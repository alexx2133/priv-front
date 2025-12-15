import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

import "quill/dist/quill.snow.css";
function HtmlViewer({ html, height }: { html: string; height?: number }) {
  const [sanitized, setSanitized] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && html) {
      const clean = DOMPurify.sanitize(html);
      setSanitized(clean);
    }
  }, [html]);
  // console.log(html, sanitized);

  return (
    <div
      className={"ql-editor" + " links"}
      style={{
        lineHeight: height ? height : "1",
        textAlign: "inherit",
      }}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

export default HtmlViewer;
