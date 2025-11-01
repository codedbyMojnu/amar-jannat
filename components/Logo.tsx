import Lottie from "lottie-react";
import characterJson from "./animation-json/father-children-2.json";
import styles from "./logo.module.css";

const Logo = () => {
  return (
    <div className={styles.container}>
      {/* Animated Character */}
      <div className={styles.lottie} aria-hidden="true">
        <Lottie animationData={characterJson} loop={true} />
      </div>

      {/* Logo Text */}
      <div className={styles.text}>
        {/* Amar */}
        <span className={styles.amar}>Amar</span>

        {/* Jannat */}
        <span className={styles.jannat}>Jannat</span>
      </div>
    </div>
  );
};

export default Logo;
