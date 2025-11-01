import React from "react";
import styles from "./donate.module.css";

type DonateProps = {
  href?: string;
  text?: string;
};

const DEFAULT_LINK = "https://github.com/codedbyMojnu/amar-jannat";

const Donate: React.FC<DonateProps> = ({
  href = DEFAULT_LINK,
  text = "Support / Donate",
}) => {
  return (
    <section className={styles.container} aria-labelledby="donate-title">
      <h2 id="donate-title" className={styles.title}>
        আপনার সাপোর্ট আমাদের অনুপ্রেরণা
      </h2>
      <div className={styles.card}>
        <p className={styles.text}>
          Amar Jannat সম্পূর্ণ{" "}
          <span className={styles.highlight}>ফ্রি ও ওপেন</span>। আপনার ছোট্ট
          একটি সাপোর্ট কনটেন্ট কোয়ালিটি উন্নত করা, নতুন ফিচার যুক্ত করা এবং
          ধারাবাহিকতা বজায় রাখতে সাহায্য করে।
        </p>
        <a
          className={styles.button}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Support or donate to Amar Jannat"
        >
          {text}
        </a>
      </div>
    </section>
  );
};

export default Donate;
