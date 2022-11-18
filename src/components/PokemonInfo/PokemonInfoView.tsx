import { FC, useCallback } from "react";
import { PokemonData } from "../../types";
import "./PokemonInfoView.scss";
interface PokemonInfoViewProps {
  pokemon: PokemonData;
}

const PokemonInfoView: FC<PokemonInfoViewProps> = ({ pokemon }) => {


  return (
    <div className="PokemonInfoView">
      <div className="PokemonInfoView__img-wrapper">
        <img src={pokemon?.image} alt={pokemon?.name} />
      </div>
      <section>
      </section>
        <h2>{pokemon?.name}</h2>
      <section className="PokemonInfoView__details">

        <div className="PokemonInfoView__details__maxHP">
          <h4>maxHP</h4>
          <p>{pokemon?.maxHP}</p>
        </div>
        <div className="PokemonInfoView__details__maxCP">
          <h4>maxCP</h4>
          <p>{pokemon?.maxCP}</p>
        </div>
        <div className="PokemonInfoView__details__classification">
          <h4>Classification</h4>
          <p>{pokemon?.classification}</p>
        </div>
        <div className="PokemonInfoView__details__types">
          <h4>types</h4>
          {pokemon?.types.map((type) => (
            <span key={type}>{type}</span>
          ))}
        </div>


        <div className="PokemonInfoView__details__weaknesses">
          <h4>Weaknesses</h4>
           {pokemon?.weaknesses.map((type) => (
            <span key={type}>{type}</span>
          ))}
        </div>

      </section>
    </div>
  );
};

export default PokemonInfoView;
