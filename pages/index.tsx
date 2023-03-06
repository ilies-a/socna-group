import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import Layout from '@/components/layout/layout.component';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderIsReduced } from '../redux/header/header.actions';
import { selectHeaderIsReduced } from '../redux/header/header.selectors';
import { setScrollToSectionFunction, setSelectedNavButton } from '../redux/nav/nav.actions';
import { selectSelectedNavButton, selectNavButtonClicked } from '../redux/nav/nav.selectors';
import { scrollTo } from "seamless-scroll-polyfill";

import { 
  LARGE_SCREEN_HEADER_HEIGHT,
  SMALL_SCREEN_HEADER_HEIGHT,
  MEDIUM_SCREEN_MAX_WIDTH,
} from '../styles/variables';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useDispatch();
  const headerIsReduced = useSelector(selectHeaderIsReduced);
  const selectedNavButton = useSelector(selectSelectedNavButton);
  const navButtonClicked = useSelector(selectNavButtonClicked);

  const section1:React.MutableRefObject<HTMLDivElement | undefined> = React.useRef();
  const section2:React.MutableRefObject<HTMLDivElement | undefined> = React.useRef();
  const section3:React.MutableRefObject<HTMLDivElement | undefined> = React.useRef();
  const section4:React.MutableRefObject<HTMLDivElement | undefined> = React.useRef();
  const mainContainer:React.MutableRefObject<HTMLDivElement | undefined> = React.useRef();

  const [enableSetSelectedNavButton, setEnableSetSelectedNavButton] = useState(true);

  useEffect(() => {
    dispatch(setScrollToSectionFunction(scrollToSection));
    addScrollListenerToWindow();
    // if(selectedNavButton!==null){
    //   scrollToSection(selectedNavButton);
    // }
  });

  useEffect(() => {
    return () => {
      removeScrollListenerToWindow();
    };
  });

  const addScrollListenerToWindow = ()=>{
    window.addEventListener('scroll', handleScroll);
  };

  const removeScrollListenerToWindow = ()=>{
    window.removeEventListener('scroll', handleScroll);
  };

  const getDesktopOrMobileHeight = ()=>{
    return window.innerWidth>MEDIUM_SCREEN_MAX_WIDTH ? LARGE_SCREEN_HEADER_HEIGHT : SMALL_SCREEN_HEADER_HEIGHT;
  };

  const handleScroll = () => {
    const scrollY:number = window.scrollY;
    handleHeaderReduction(scrollY);
    if(enableSetSelectedNavButton){
      selectCurrentScrolledSection(scrollY);
    }
  };

  const handleHeaderReduction = (scrollY:number) =>{
    if(scrollY === 0){
      dispatch(setHeaderIsReduced(false));
    } else if(scrollY>0 && headerIsReduced === false){
      dispatch(setHeaderIsReduced(true));
    }
  };

  const selectCurrentScrolledSection = (scrollY:number) =>{
    if (section1.current === undefined || 
      section2.current === undefined ||
      section3.current === undefined ||
      section4.current === undefined){
        return null;
      }

    const vh = window.innerHeight;
    const shift = -getDesktopOrMobileHeight();
    const section1Top = section1.current.offsetTop - vh/2 + shift;
    const section2Top = section2.current.offsetTop - vh/2 + shift;
    const section3Top = section3.current.offsetTop - vh/2 + shift;
    const section4Top = section4.current.offsetTop - vh/2 + shift;
    const section4Bottom = section4Top+section4.current.offsetHeight;

    let sectionToSelect

    if(scrollY>=section1Top && scrollY<=section2Top)
    {
      sectionToSelect='ing'
    }
    else if(scrollY>section2Top && scrollY<=section3Top)
    {
      sectionToSelect='lab'
    }
    else if(scrollY>section3Top && scrollY<=section4Top)
    {
      sectionToSelect='res'
    }
    else if(scrollY>section4Top && scrollY<=section4Bottom)
    {
      sectionToSelect='sol'
    }
    else{
      sectionToSelect= undefined
    }
    dispatch(setSelectedNavButton(sectionToSelect));
  }

  const scrollToSection = useCallback((navButtonClicked: string)=>{
    let sectionRef:React.MutableRefObject<HTMLDivElement | undefined>
    switch(navButtonClicked) {
      case 'ing':
        sectionRef = section1;
        break
      case 'lab':
        sectionRef = section2;
        break
      case 'res':
        sectionRef = section3;
        break;
      case 'sol':
        sectionRef = section4;
        break;
      default:
        sectionRef = mainContainer;
        break
    }

    if (sectionRef.current === undefined){
        return null;
      }

    disableSetSelectedNavButtonForShortTime();
    scrollToY(sectionRef.current.offsetTop-getDesktopOrMobileHeight());
  }, []);

  useEffect(() => {
    scrollToSection(navButtonClicked);
  }, [navButtonClicked]);

  useEffect(() => {
  }, [selectedNavButton]);
  
  const scrollToY = (y:number) =>{
    scrollTo(window, { behavior: "smooth", top: y});

  };

  const disableSetSelectedNavButtonForShortTime = ()=>{
    setEnableSetSelectedNavButton(false);
    setTimeout(()=>{
      setEnableSetSelectedNavButton(true);
    },500)
  };

  const markers: [number, number][] = new Array(6).fill(0);
  markers[0] = [50, 50];
  markers[1] = [30, 30];
  markers[2] = [50, 20];
  markers[3] = [70, 60];
  markers[4] = [70, 40];
  markers[5] = [40, 70];

  return (
    <>
      <Head>
        <title>SOCNA Group</title>
        <meta name="description" content="SOCNA Group official site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Layout>
          <div className={styles["main-wrapper"]} ref={mainContainer as React.RefObject<HTMLDivElement>}>
            <div className={`${styles["section"]} ${styles["presentation-section"]}`}>
              <div className={styles["presentation-text"]}>
                <div>Diagnostics</div>
                <div>Réseaux</div>
                <div>Etudes de sol</div>
                <br/>
                <div className={styles["socna-with-you"]}>SOCNA vous accompagne</div>
                {/* <h1>Expert Ingénierie & Étude technique.</h1> */}
              </div>
              <div className={styles["presentation-image-wrapper"]}>
                <Image
                  src="/img/index-page/france-map.jpg"
                  alt="presentation"
                  fill={true}
                  priority
                  />
                  {
                    markers.map((position, index) => {
                      return <div key={index} className={styles["marker-image-wrapper"]} style={{left: `${position[0]}%`, top: `${position[1]}%`}}>
                        <Image
                          src="/img/index-page/marker.png"
                          alt="marker"
                          fill={true}
                          priority
                        />
                        <div>&#10003;</div>
                      </div>
                    })
                  }
              </div>
            </div>
            <div className={`${styles["section"]} ${styles["socna-section"]} ${styles["ing-section"]}`} ref={section1 as React.RefObject<HTMLDivElement>}>
              <div>Bénéficiez de l&apos;expertise SOCNA et faites un diagnostic complet de vos structures.</div>
              <div className={`${styles["link-to-site"]} ${styles["link-to-site-ing"]}`}>Aller au site</div>
              {/* <h1 className={styles["ing-section-title"]}>SOCNA ING</h1> */}
              {/* <div className={styles["ing-section-body"]}> */}
                {/* <p className={styles["ing-text"]}>
                  <div>Socna Ing phrase.</div>
                  <div>Socna Ing phrase.</div>
                  <div>Socna Ing phrase.</div>
                </p> */}
                {/* <div className={`${styles["section-illustration-wrapper"]} ${styles["ing-section-illustration-wrapper"]}`}>
                  <Image
                    src="/img/index-page/presentation.jpeg"
                    alt="ing-illustration"
                    fill={true}
                    priority
                    />
                </div> */}
              {/* </div> */}
            </div>
            <div className={`${styles["section"]} ${styles["socna-section"]} ${styles["lab-section"]}`} ref={section2 as React.RefObject<HTMLDivElement>}>
              <div>Bénéficiez de l&apos;expertise SOCNA et faites un diagnostic complet de vos structures.</div>
              <div className={`${styles["link-to-site"]} ${styles["link-to-site-lab"]}`}>Aller au site</div>
                {/* <h1>SOCNA LAB</h1>
              <p className={styles["lab-text"]}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p> */}
              {/* <div className={styles["presentation-image-wrapper"]}>
                <Image
                  src="/img/index-page/presentation.jpg"
                  alt="presentation"
                  fill={true}
                  priority
                  />
              </div> */}
            </div>
            <div className={`${styles["section"]} ${styles["socna-section"]} ${styles["res-section"]}`} ref={section3 as React.RefObject<HTMLDivElement>}>
              <div>Bénéficiez de l&apos;expertise SOCNA et faites un diagnostic complet de vos structures.</div>
              <div className={`${styles["link-to-site"]} ${styles["link-to-site-res"]}`}>Aller au site</div>
              {/* <h1>SOCNA RES</h1>
              <p className={styles["res-text"]}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p> */}
              {/* <div className={styles["presentation-image-wrapper"]}>
                <Image
                  src="/img/index-page/presentation.jpg"
                  alt="presentation"
                  fill={true}
                  priority
                  />
              </div> */}
            </div>
            <div className={`${styles["section"]} ${styles["socna-section"]} ${styles["sol-section"]}`} ref={section4 as React.RefObject<HTMLDivElement>}>
              <div>Bénéficiez de l&apos;expertise SOCNA et faites un diagnostic complet de vos structures.</div>
              <div className={`${styles["link-to-site"]} ${styles["link-to-site-sol"]}`}>Aller au site</div>
              {/* <h1>SOCNA SOLS</h1>
              <p className={styles["sol-text"]}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p> */}
              {/* <div className={styles["presentation-image-wrapper"]}>
                <Image
                  src="/img/index-page/presentation.jpg"
                  alt="presentation"
                  fill={true}
                  priority
                  />
              </div> */}
            </div>
            {/* <div>
              <div>Accueil</div>
              <div>|</div>
              <div>Mentions légales</div>
            </div> */}
          </div>
        </Layout>
    </>
  )
}
