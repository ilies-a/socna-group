import React, { FC, useState } from 'react';
import Link from 'next/link';
import styles from './socna-icons-wrapper.module.scss';
import SocnaIcon from '@/components/socna-icon/socna-icon.component';
import { useSelector } from 'react-redux';
import { selectSelectedNavButton } from '../../redux/nav/nav.selectors';


const SocnaIconsWrapper:FC = ()=>{

    const selectedNavButton = useSelector(selectSelectedNavButton);
    const [hover, setHover] = useState('');

    const handleOnMouseEnter = (componentName: string) =>{
        setHover(componentName);
    }
    const handleOnMouseLeave = () =>{
        setHover('');
    } 

    const setSocnaIconBright = (iconName: string): number => {
        if ((selectedNavButton === undefined && hover === '') ||
        hover === iconName ||
        (selectedNavButton === iconName && (hover === iconName || hover === ''))){
            return 2;
        }
        else if (selectedNavButton === iconName && hover != '' && hover != iconName){
            return 1;
        }
        return 0;
    }

    return(
        <div className={styles['main-wrapper']}>
            <div className={styles['socna-icon-wrapper']} onMouseEnter={()=> handleOnMouseEnter('ing')} onMouseLeave={()=> handleOnMouseLeave()}>
                <SocnaIcon 
                name = 'ing' 
                bright = {setSocnaIconBright('ing')} />
            </div>
            <div className={styles['socna-icon-wrapper']} onMouseEnter={()=> handleOnMouseEnter('lab')} onMouseLeave={()=> handleOnMouseLeave()}>
                <SocnaIcon 
                name = 'lab' 
                bright = {setSocnaIconBright('lab')}  />
            </div>
            <div className={styles['socna-icon-wrapper']} onMouseEnter={()=> handleOnMouseEnter('res')} onMouseLeave={()=> handleOnMouseLeave()}>
                <SocnaIcon 
                name = 'res' 
                bright = {setSocnaIconBright('res')}  />
            </div>
            {/* <Link href='/sol' style={{height:"inherit"}}> */}
                <div className={styles['socna-icon-wrapper']} onMouseEnter={()=> handleOnMouseEnter('sol')} onMouseLeave={()=> handleOnMouseLeave()}>
                    <SocnaIcon 
                    name = 'sol' 
                    bright = {setSocnaIconBright('sol')}  />
                </div>
            {/* </Link> */}
        </div>
    );
}

export default SocnaIconsWrapper;