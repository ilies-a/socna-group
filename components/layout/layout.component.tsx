import styles from './layout.module.scss';
import Header from '../header/header.component';

type LayoutProps = {
    children: JSX.Element,
  };

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div className={styles["main-wrapper"]}>
        <Header/>
        {children}
      </div>)
  };
  
export default Layout;