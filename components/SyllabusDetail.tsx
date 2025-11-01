import React from "react";
import styles from "./syllabusDetail.module.css";

export interface SyllabusItem {
  text: string;
  isBold?: boolean;
  children?: SyllabusItem[];
}

interface SyllabusDetailProps {
  title: string;
  totalMarks: string;
  part: {
    title: string;
    marks: string;
    items: SyllabusItem[];
  };
}

const renderItems = (items: SyllabusItem[], level = 0): React.ReactNode => {
  return (
    <div style={{ paddingLeft: `${level * 40}px` }}>
      {items.map((item, index) => (
        <div key={index}>
          <p className={item.isBold ? styles.boldText : styles.normalText}>
            {item.text}
          </p>
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
        <h1>SYLLABUS FOR BCS PRELIMINARY TEST</h1>
        <h2>{title}</h2>
        <p>{totalMarks}</p>
      </div>
      <div className={styles.partContainer}>
        <div className={styles.partHeader}>
          <span className={styles.partTitle}>{part.title}</span>
          <div className={styles.marksDistribution}>
            <span>Marks</span>
            <span>Distribution</span>
            <span className={styles.marks}>{part.marks}</span>
          </div>
        </div>
        <div className={styles.content}>{renderItems(part.items)}</div>
      </div>
    </div>
  );
};

export default SyllabusDetail;
