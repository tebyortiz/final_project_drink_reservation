import { useEffect, useState } from "react";

export const useFetchCocktailOptions = () => {
  const [cocktailOptions, setCocktailOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        const cocktailNames = data.drinks.map((drink: any) => drink.strDrink);
        setCocktailOptions(cocktailNames);
      })
      .catch((error) => {
        console.error("Error al obtener opciones de cócteles:", error);
      });
  }, []);

  return cocktailOptions;
};

export const useFetchBeerOptions = () => {
  const [beerOptions, setBeerOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((data) => {
        const beerNames = data.map((beer: any) => beer.name);
        setBeerOptions(beerNames);
      })
      .catch((error) => {
        console.error("Error al obtener opciones de cervezas:", error);
      });
  }, []);

  return beerOptions;
};
