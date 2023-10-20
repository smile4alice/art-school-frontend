import { Link } from "react-router-dom";
import styles from "./Derpartment.scss";

const Derpatment = ({title, link, img}) => {
    const knowMore = "Дізнатись більше";

    return (
        <div className={styles.wrapper}>
        <div className={styles.info}>
            <p className={styles.title}>{title}</p>
            <div className={styles.knowMore}>
                <div className={styles.vertical_line}></div>
                <Link to={link} className={styles.linkKnowMore}>{knowMore}</Link>
                <div className={styles.vertical_line}></div>
            </div>
            
        </div>
        <div className={styles.picture}>
            <img src={img} alt={title} />
        </div>
    </div>
    )
};

export default Derpatment;