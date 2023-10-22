import { Link } from "react-router-dom";
import styles from "./Department.module.scss";

const Department = ({title, link, img}) => {
    const knowMore = "Дізнатись більше";

    return (
        <div className={styles.wrapper}>
        <div className={styles.info}>
            <p className={styles.cardTitle}>{title}</p>
            <div className={styles.knowMore}>
                <div className={styles.verticalLine}></div>
                <Link to={link} className={styles.linkKnowMore}>{knowMore}</Link>
                <div className={styles.verticalLine}></div>
            </div>
            
        </div>
        <div className={styles.picture}>
            <img src={img} alt={title} />
        </div>
    </div>
    )
};

export default Department;