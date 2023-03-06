import React, { useState } from 'react'
import Image from 'next/image'
import styles from './preload-wrapper.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { selectPreloadIsComplete } from '../../redux/preloader/preloader.selectors';
import { setPreloadIsComplete } from '../../redux/preloader/preloader.actions';


type PreloadWrapperProps = {
    children: JSX.Element,
  };

const PreloadWrapper: React.FC<PreloadWrapperProps> = ({ children }) => {
    const totalOfImages:number = 7;
    let loadedImages = 0;

    const preloadIsComplete = useSelector(selectPreloadIsComplete);

    const dispatch = useDispatch();

    const handleImageLoad = () => {
        loadedImages += 1;
        if(loadedImages === totalOfImages){
            dispatch(setPreloadIsComplete(true));
        }
      };
    
    const imgUrls: string[] = [
        "/img/socna-icons/socna-footer-filter.png",
        "/img/socna-icons/socna-ing-footer.png",
        "/img/socna-icons/socna-lab-footer.png",
        "/img/socna-icons/socna-res-footer.png",
        "/img/socna-icons/socna-sol-footer.png",
        "/img/index-page/france-map.jpg",
        "/img/index-page/marker.png",
    ];
    
    return (
        <div>
            <div className={styles['imgs-wrapper']}>
                {
                    imgUrls.map((value, index) =>{
                        return <Image key={index} src={value} fill alt='' priority onLoadingComplete={() => handleImageLoad()}/>
                    })
                }
            </div>
            {preloadIsComplete? 
                children:
                <div className={styles['loader-wrapper']}>
                    <div className={styles['lds-ellipsis']}><div></div><div></div><div></div><div></div></div>
                </div>
            }
        </div>
      )
  };
  
export default PreloadWrapper;