import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './header.module.scss';
import SocnaIconsWrapper from '../socna-icons-wrapper/socna-icons-wrapper.component';

import { selectHeaderIsReduced } from '../../redux/header/header.selectors';
import { setHeaderIsReduced } from '../../redux/header/header.actions';

const Header: React.FC = () => {
    const headerIsReduced = useSelector(selectHeaderIsReduced);

    const setReducedHeaderStyle = (): string | null =>{
        return headerIsReduced ? styles['reduced-header']:null
    } 

    return (
        <div className={`${styles['main-wrapper']} ${setReducedHeaderStyle()}`}>
            <div className={styles["logo"]}>
                <div className={styles["title-subtitle-wrapper"]}>
                    <div className={`${styles['title']} ${setReducedHeaderStyle()}`}>SOCNA</div>
                    <div className={`${styles['subtitle']} ${setReducedHeaderStyle()}`}>Expert Ingénierie & Étude technique</div>
                </div>
                <hr className={styles["separator"]}/>
            </div>
            <div className={styles["socna-icons-wrapper-wrapper"]}>
                <SocnaIconsWrapper/>
            </div>
            <div className={styles["buttons-right"]}>
                <div className={styles["buttons-wrapper"]}>
                    <div className={styles["button"]}>Mentions légales</div>
                    {/* <div className={styles["button"]}>A propos</div>
                    <div className={styles["button"]}>Connexion</div> */}
                </div>
                <hr className={styles["separator"]}/>
            </div>
        </div>);
  };
  
export default Header;