import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { api } from '../../lib/api';

import styles from './styles.module.scss';

type CharactersType = {
    id: string;
    image: string;
    name: string;
    objective: string;
    description: string
}

type CharactersProps = {
    characters: CharactersType;
}

export default function Characters({ characters }: CharactersProps){
    return(
        <div className={styles.character}>
            <Image
                width={192}
                height={192}
                src={characters.image}
                alt={characters.name}
            />

            <div className={styles.description}>
                <h1>{characters.name}</h1>
                <span>{characters.objective}</span>

                <p>{characters.description}</p>
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;

    const { data } = await api.get(`/characters/${slug}`);

    const characters = {
        id: data.id,
        image: data.results.image,
        name: data.results.name,
        objective: data.results.objective,
        description: data.results.description
    }

    return {
        props: {
            characters,
        },
    }
}