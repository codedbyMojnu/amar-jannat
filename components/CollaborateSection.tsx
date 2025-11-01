import styles from "./collaborate-section.module.css";

const CollaborateSection: React.FC = () => {
  return (
    <section className={styles.collaborateSection}>
      <div className={styles.card}>
        <h2 className={styles.title}>চলুন একসাথে কাজ করি!</h2>
        <p className={styles.description}>
          আপনার যদি কোনো প্রশ্ন থাকে, আমার সঙ্গে যোগাযোগ করুন।
        </p>
        <div className={styles.buttons}>
          <a href="/contact" className={styles.contactButton}>
            যোগাযোগ করুন
          </a>
          <a
            href="/pdf/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeButton}
          >
            📄 রিজিউম ডাউনলোড
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollaborateSection;
