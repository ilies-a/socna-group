import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import styles from './socna-icon.module.scss'

import { selectHeaderIsReduced } from '../../redux/header/header.selectors';
import { useSelector, useDispatch } from 'react-redux';

import { selectSelectedNavButton, selectNavButtonClicked, selectScrollToSectionFunction } from '../../redux/nav/nav.selectors';
import { setSelectedNavButton } from '../../redux/nav/nav.actions';

class SocnaIconData {
    name: string;
    fullname: string;
    color: string;
   
    constructor(name: string, fullname:string, color: string) {
      this.name = name;
      this.fullname = fullname;
      this.color = color;
  
    }
}
  
type SocnaIconProps = {
    name: string,
    bright: number,
}

const socnaIngData = new SocnaIconData("ing", "Ing", "yellow");
const socnaLabData = new SocnaIconData("lab", "Lab", "red");
const socnaResData = new SocnaIconData("res", "Réseaux", "blue");
const socnaSolData = new SocnaIconData("sol", "Sols", "green");

const data: { [key: string]: SocnaIconData } = {
    "ing":socnaIngData,
    "lab":socnaLabData,
    "res":socnaResData,
    "sol":socnaSolData,
};

const SocnaIcon:FC<SocnaIconProps>  = ({name, bright})=>{
    // const setIconBodySectionContent = (): string => {
    //     const result: string = "SOCNA-"+data[name].name;
    //     return result;
    // }

    const dispatch = useDispatch();
    const headerIsReduced = useSelector(selectHeaderIsReduced);
    const selectedNavButton = useSelector(selectSelectedNavButton);
    const navButtonClicked = useSelector(selectNavButtonClicked);
    const scrollToSectionFunction = useSelector(selectScrollToSectionFunction);

    const setReducedHeaderStyle = (): string | null =>{
        return headerIsReduced ? styles['reduced-header']:null
    } 
    const setBrightStyle = (): string | null =>{
        switch (bright){
            case 0:
                return styles['dark'];
            case 1:
                return styles['semi-bright'];    
            case 2:
                return styles['bright'];
            default:
                return null;

        }
        // if(bright){
        //     return styles['bright'];
        // }
        // return styles['dark'];
    }

    const setSelectedStyle = (): string | null =>{
        if (name === selectedNavButton) {
            return styles['selected']
        }
        return null;
    }


    const handleOnClick = () =>{
        // dispatch(setSelectedNavButton(name));
        // dispatch(toogleNavButtonClicked(name));
        // alert(scrollToSectionFunction);
        if(scrollToSectionFunction !== 'undefined'){
            scrollToSectionFunction(name);
            dispatch(setSelectedNavButton(name));
        }
    }

    return(
        <div className={`${styles['socna-icon']} ${setSelectedStyle()}`} onClick={handleOnClick}>
            <div className={`${styles['icon-body']} ${styles[name]}`}>
                <div className={`${styles['icon-body-title']} ${setReducedHeaderStyle()}`} >S &nbsp;O &nbsp;C &nbsp;N &nbsp;A</div>
                <div className={`${styles['icon-body-subtitle']} ${setReducedHeaderStyle()}`} >{data[name].fullname}</div>
                <div className={`${styles['body-filter']} ${setBrightStyle()}`}></div>
            </div>
            <div className={`${styles['icon-footer']} ${setReducedHeaderStyle()}`}>
                <Image
                src={`/img/socna-icons/socna-${name}-footer.png`}
                alt={name}
                fill={true}
                priority
                />
                {/* <div className={styles['icon-footer-parts']}>
                    <div className={styles['icon-footer-left']}></div>
                    <div className={styles['icon-footer-right']}></div>
                </div> */}
                <div className={`${styles['footer-filter']} ${setBrightStyle()}`}>
                    <Image
                    src={`/img/socna-icons/socna-footer-filter.png`}
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