import React from "react";
import styles from "./syllabusCard.module.css";

// Updated recursive Section type
export interface Section {
  title: string;
  items?: string[];
  subsections?: Section[];
}

interface SyllabusCardProps {
  icon: string;
  title: string;
  marks?: string; // Added marks prop
  sections: Section[];
}

// New recursive component to render sections and their children
const SectionContent: React.FC<{
  section: Section;
  level?: number;
}> = ({ section, level = 0 }) => {
  const sectionStyle = {
    paddingLeft: `${level * 25}px`, // This creates the "TAB" space
  };

  return (
    <div style={sectionStyle}>
      {section.title && (
        <h4 className={level > 0 ? styles.subSubTitle : styles.subTitle}>
          {section.title}
        </h4>
      )}
      {section.items && (
        <ul className={styles.list}>
          {section.items.map((item, itemIndex) => (
            <li key={itemIndex} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.subsections && (
        <div>
          {section.subsections.map((sub, subIndex) => (
            <SectionContent key={subIndex} section={sub} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const SyllabusCard: React.FC<SyllabusCardProps> = ({
  icon,
  title,
  marks, // Destructure marks
  sections,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>
          <span className={styles.icon}>{icon}</span> {title}
        </h3>
        {marks && <span className={styles.marks}>{marks}</span>}
      </div>
      <div className={styles.content}>
        {sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <SectionContent section={section} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyllabusCard;
