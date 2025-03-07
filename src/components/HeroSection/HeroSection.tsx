import { FC } from "react";
import styles from "./HeroSection.module.scss";
import HeroSectionImage from "../SVG/HeroSectionImage";
import Link from "next/link";
import CurlyArrow from "../SVG/CurlyArrow";

const HeroSection: FC<{}> = () => {
    return (
        <section className={styles.heroSectionContainer}>
            <div className={styles.heroSectionLeft}>
                <HeroSectionImage styles={styles.heroSectionImage} />
            </div>
            <div className={styles.heroSectionRight}>
                <div className={styles.tagLineContainer}>
                    <p className={styles.tagLine}>
                        Talk with people <br /> in a secure way
                    </p>
                    <p className={styles.features}>Simple, Reliable, Private</p>
                </div>
                <CurlyArrow styles={styles.curlyArrow} />
                <Link href={"/chat"} className={styles.heroSectionCta}>
                    Talk with people
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
