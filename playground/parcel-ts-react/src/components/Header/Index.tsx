import React from 'react';
import styles from './styles.scss';

const Header: React.FC = ({children}) => <h1 className={`${styles.headerText}`}>{children}</h1>

export default Header;
