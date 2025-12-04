import { usePathname } from "next/navigation";
import { useAppStore } from "../../stores/app";
import { ManagedImg } from "../preload/managedImg";
import style from "./styles/post.module.scss";
import { useEffect, useState } from "react";
import HtmlViewer from "../Common/htmlViewer";
import { getNewsUrl } from "../../utils/api/config";

const PostInfo = () => {
  const { loadPost, post } = useAppStore();
  const path = usePathname();
  const [textParts, setTextParts] = useState<{ first: string; second: string }>(
    { first: "", second: "" }
  );

  useEffect(() => {
    if (path) {
      loadPost(parseInt(path.split("/").pop() as string));
    }
  }, [path]);

  const splitHtmlText = (html: string, wordLimit: number) => {
    if (!html) return { first: "", second: "" };
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const textContent = tempDiv.textContent || "";
    const words = textContent.split(" ");

    if (words.length <= wordLimit) {
      return { first: html, second: "" };
    }

    let currentWordCount = 0;
    let firstPart = "";
    let secondPart = "";
    let inFirstPart = true;

    const regex = /(<[^>]+>|[^<]+)/g;
    const parts = html.match(regex) || [];

    for (const part of parts) {
      if (part.startsWith("<")) {
        if (inFirstPart) {
          firstPart += part;
        } else {
          secondPart += part;
        }
      } else {
        const wordsInPart = part.split(" ");

        if (inFirstPart) {
          let remainingWords = wordLimit - currentWordCount;

          if (remainingWords >= wordsInPart.length) {
            firstPart += part;
            currentWordCount += wordsInPart.length;
          } else {
            const firstWords = wordsInPart.slice(0, remainingWords).join(" ");
            const secondWords = wordsInPart.slice(remainingWords).join(" ");
            firstPart += firstWords + " ";
            secondPart += secondWords + " ";
            currentWordCount = wordLimit;
            inFirstPart = false;
          }
        } else {
          secondPart += part;
        }
      }
    }

    return {
      first: firstPart.trim(),
      second: secondPart.trim(),
    };
  };

  useEffect(() => {
    if (post?.data?.text) {
      const parts = splitHtmlText(post.data.text, 40);
      setTextParts(parts);
    }
  }, [post?.data?.text]);

  return (
    <div className={style.post__info}>
      <div className={style.post__content}>
        <img
          src={getNewsUrl(post?.data?.image)}
          alt={post?.data?.title}
          className={style.post__image}
        />
        <div className={style.post__text_short}>
          <div className={style.post__info__date}>
            {post?.data?.date?.slice(0, 10)}
          </div>
          <div className={style.post__info__title}>{post?.data?.title}</div>
          <div className={style.post__info__text}>
            <HtmlViewer html={textParts.first} />
          </div>
        </div>
        {textParts.second && (
          <div className={style.post__text_long}>
            <div className={style.post__info__text}>
              <HtmlViewer html={textParts.second} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostInfo;
