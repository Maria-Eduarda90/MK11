import Image from 'next/image';

import styles from './styles.module.scss';

export function Header() {
    return(
        <div className={styles.container}>
            <h1>Mortal Kombat</h1>
            <Image width={192} height={192} src="/img/Mortal_Kombat_Logo.svg.png" alt="icon"/>
        </div>
    );
}