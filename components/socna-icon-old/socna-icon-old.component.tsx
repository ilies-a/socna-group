import React, { FC } from 'react';
import Image from 'next/image';
import styles from './socna-icon.module.scss'

type SocnaIconProps = {
    name: string,
    bright: number,
  }

const SocnaIcon:FC<SocnaIconProps>  = ({name, bright})=>{
    const setBright = (): string | null =>{
        switch (bright){
            case -1:
                return styles['dark'];;
            case 1:
                return styles['bright'];
            default:
                return null;

        }
        // if(bright){
        //     return styles['bright'];
        // }
        // return styles['dark'];
    } 

    return(
        <div className={styles['socna-icon']}>
            <Image
            src={`/img/socna-icons/${name}.png`}
            alt={name}
            fill={true}
            priority
            />
            <div className={`${styles['filter']} ${setBright()}`}></div>
            <div className={`${styles['go-to-section']}`}>
                <div className={`${styles['arrow-wrapper']}`}>
                    <Image
                    src="/img/socna-icons/arrow2.png"
                    alt={name}
                    fill={true}
                    priority
                    />
                </div>
            </div>
      </div>
    );
}

export default SocnaIcon;