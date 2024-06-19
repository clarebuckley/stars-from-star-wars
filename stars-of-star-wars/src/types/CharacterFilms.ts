export type CharacterFilms = {
    films: FilmDetails[]
}

export type FilmDetails = {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    edited: Date;
}