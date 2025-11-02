import Link from "next/link";
import React from "react";
import styles from "./syllabusDetail.module.css";

export interface SyllabusItem {
  text: string;
  href?: string; // optional link to turn the text into an anchor
  link?: string; // alias field support
  isBold?: boolean;
  children?: SyllabusItem[];
}

interface SyllabusDetailProps {
  title: string;
  totalMarks: string;
  part: {
    title?: string;
    marks?: string;
    items: SyllabusItem[];
  };
}

const renderItems = (items: SyllabusItem[], level = 0): React.ReactNode => {
  return (
    <div style={{ paddingLeft: `${level * 20}px` }}>
      {items.map((item, index) => (
        <div key={index}>
          <div className={item.isBold ? styles.boldText : styles.normalText}>
            {(() => {
              const url = item.href || item.link;
              if (!url) return item.text;

              const isExternal = /^https?:\/\//i.test(url);

              if (isExternal) {
                return (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {item.text}
                  </a>
                );
              }

              return (
                <Link href={url} legacyBehavior>
                  <a className={styles.link}>{item.text}</a>
                </Link>
              );
            })()}
          </div>
          {item.children && renderItems(item.children, level + 1)}
        </div>
      ))}
    </div>
  );
};

const SyllabusDetail: React.FC<SyllabusDetailProps> = ({
  title,
  totalMarks,
  part,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainHeader}>
        <h2>{title}</h2>
        <p>{totalMarks}</p>
      </div>
      <div className={styles.partContainer}>
        {(part.title || part.marks) && (
          <div className={styles.partHeader}>
            {part.title && (
              <span className={styles.partTitle}>{part.title}</span>
            )}
            {part.marks && (
              <div className={styles.marksDistribution}>
                <span>Marks</span>
                <span>Distribution</span>
                <span className={styles.marks}>{part.marks}</span>
              </div>
            )}
          </div>
        )}
        <div className={styles.content}>{renderItems(part.items)}</div>
      </div>
    </div>
  );
};

export default SyllabusDetail;
