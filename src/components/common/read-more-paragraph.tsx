"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface ReadMoreParagraphProps {
  text: string;
  maxLines?: number;
  paragraphClassNames?: string;
  readMoreLessClassNames?: string;
}

const ReadMoreParagraph: React.FC<ReadMoreParagraphProps> = ({
  text,
  maxLines = 3,
  paragraphClassNames = "",
  readMoreLessClassNames = "",
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const paragraph = document.getElementById("paragraph");
    if (paragraph) {
      const lineHeight = parseInt(window.getComputedStyle(paragraph).lineHeight);
      const containerHeight = paragraph.clientHeight;
      const numberOfLines = Math.floor(containerHeight / lineHeight);
      const pHeight = lineHeight * maxLines;
      setMaxHeight(pHeight);
      numberOfLines > maxLines && setCollapsed(true);
    }
  }, []);

  const handleReadMoreClick = () => {
    setCollapsed(prevCheck => !prevCheck);
  };

  return (
    <div>
      <div>
        <p
          id="paragraph"
          className={clsx(
            collapsed &&
              `
              text-ellipsis
            overflow-hidden
            h-[${maxHeight}px]
            `,
            paragraphClassNames,
          )}
        >
          {text}
        </p>
      </div>
      {collapsed ? (
        <a className={readMoreLessClassNames} onClick={handleReadMoreClick}>
          Read more
        </a>
      ) : (
        <a className={readMoreLessClassNames} onClick={handleReadMoreClick}>
          Read less
        </a>
      )}
    </div>
  );
};

export default ReadMoreParagraph;
