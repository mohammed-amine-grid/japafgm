export type  PokemonData = null | undefined | {
    name: string;
    image:string;
    types:string[];
    classification:string;
    maxCP: string;
    maxHP:string;
    weaknesses:string[];
}
