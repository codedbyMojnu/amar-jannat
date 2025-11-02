import styles from "./courseCards.module.css";

const courses = [
  {
    href: "/bcs-exam-preparation",
    icon: "🎓",
    title: "BCS প্রস্তুতি গাইডলাইন",
    description:
      "সর্বশেষ সিলেবাস, প্রশ্ন ব্যাংক, ও কার্যকর কৌশলসহ প্রিলিমিনারি, লিখিত, ও ভাইভা পরীক্ষার সেরা রিসোর্স।",
  },
  {
    href: "/primary-assistant-teacher",
    icon: "🏫",
    title: "প্রাইমারি শিক্ষক নিয়োগ",
    description:
      "DPE পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি। সর্বশেষ সিলেবাস, প্রশ্ন সমাধান, এবং ফাইনাল মডেল টেস্ট।",
  },
  {
    href: "/ntrca-school-teacher",
    icon: "✍️",
    title: "NTRCA স্কুল নিবন্ধন",
    description:
      "স্কুল ও স্কুল-২ লেভেলের শিক্ষক নিবন্ধন পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি, বিগত সালের প্রশ্নসহ।",
  },
  {
    href: "/ntrca-college-teacher",
    icon: "🏛️",
    title: "NTRCA কলেজ নিবন্ধন",
    description:
      "কলেজ লেভেলের প্রভাষক নিবন্ধন পরীক্ষার বিষয়ভিত্তিক সিলেবাস ও চূড়ান্ত মডেল টেস্ট।",
  },
  {
    href: "/web-development",
    icon: "💻",
    title: "ওয়েব ডেভেলপমেন্ট কোর্স",
    description:
      "শূন্য থেকে প্রফেশনাল ওয়েব ডেভেলপার হওয়ার পূর্ণাঙ্গ বাংলা গাইডলাইন। HTML, CSS, React ও Next.js।",
  },
  {
    href: "/higher-secondary-level",
    icon: "📖",
    title: "উচ্চ মাধ্যমিক (HSC)",
    description:
      "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখার সকল বিষয়ের অধ্যায়ভিত্তিক লেকচার ও বোর্ড পরীক্ষার প্রস্তুতি।",
  },
];

const CourseCards = () => {
  return (
    <div className={styles.cardGrid}>
      {courses.map((course) => (
        <a key={course.href} href={course.href} className={styles.courseCard}>
          <h3 className={styles.cardTitle}>
            <span className={styles.cardIcon}>{course.icon}</span>
            {course.title}
          </h3>
          <p className={styles.cardDescription}>{course.description}</p>
        </a>
      ))}
    </div>
  );
};

export default CourseCards;
