import { GetStaticProps } from 'next';
import Image from 'next/image';
import { api } from '../lib/api';
import Link from 'next/link';

import styles from './styles.module.scss';

type Characters = {
  id: string;
  avatar: string;
  name: string;
}

type HomeType = {
  latestCharacters: Array<Characters>;
  allCharacters: Array<Characters>;
}

export default function Home({ latestCharacters, allCharacters }: HomeType) {
  return (
    <div className={styles.container}>
      <section>
        <h1>Em destaque</h1>

        <ul className={styles.latestCharacters}>
          {latestCharacters.map(character => {
            return(
              <li key={character.id}>
                <Image
                  width={192}
                  height={192}
                  src={character.avatar}
                  alt={character.name}
                />

                <Link href="/">
                  {character.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.allCharacters}>
        <div className={styles.separator}>ESCOLHA SEU LUTADOR</div>
        <ul>
          {allCharacters.map(character => {
            return(
              <li key={character.id}>
                <Image
                  width={192}
                  height={192}
                  src={character.avatar}
                  alt={character.name}
                />

                <Link href="/">
                  {character.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('characters')

  const characters = data.map(character => {
    return {
      id: character.id,
      avatar: character.avatar,
      name: character.results.name
    }
  })

  const latestCharacters = characters.slice(0, 2);
  const allCharacters = characters.slice(2, characters.length);

  return {
    props: {
      latestCharacters,
      allCharacters
    },
    revalidate: 60 * 60 * 8,
  }
}