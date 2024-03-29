import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchCocktailOptions = () => {
  const [cocktailOptions, setCocktailOptions] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((response) => {
        const cocktailNames = response.data.drinks.map(
          (drink: any) => drink.strDrink
        );
        setCocktailOptions(cocktailNames);
      })
      .catch((error) => {
        console.error("Error al obtener opciones de cócteles:", error);
      });
  }, []);

  const fetchCocktailDetails = async (cocktailName: string) => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
      );
      const data = response.data;

      const cocktailDetails = data.drinks.map((drink: any) => {
        const ingredients: string[] = [];
        for (let i = 1; i <= 15; i++) {
          const ingredientKey = `strIngredient${i}`;
          if (drink[ingredientKey]) {
            ingredients.push(drink[ingredientKey]);
          } else {
            break;
          }
        }
        return {
          name: drink.strDrink,
          price: 0,
          stock: 0,
          image: drink.strDrinkThumb,
          ingredients: ingredients,
        };
      });

      return cocktailDetails;
    } catch (error) {
      console.error("Error al obtener detalles del cóctel:", error);
      return null;
    }
  };

  return { cocktailOptions, fetchCocktailDetails };
};

export const useFetchBeerOptions = () => {
  const [beerOptions, setBeerOptions] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then((response) => {
        const beerNames = response.data.map((beer: any) => beer.name);
        setBeerOptions(beerNames);
      })
      .catch((error) => {
        console.error("Error al obtener opciones de cervezas:", error);
      });
  }, []);

  const fetchBeerDetails = async (beerName: string) => {
    try {
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers?beer_name=${beerName}`
      );
      const data = response.data;

      const beerDetails = data.map((beer: any) => {
        const ingredients = {
          malt: beer.ingredients.malt.map((malt: any) => malt.name),
          hops: beer.ingredients.hops.map((hop: any) => hop.name),
          yeast: [beer.ingredients.yeast],
        };

        return {
          name: beer.name,
          price: 0,
          stock: 0,
          image: beer.image_url,
          abv: beer.abv.toString(),
          ibu: beer.ibu.toString(),
          ingredients,
        };
      });

      return beerDetails;
    } catch (error) {
      console.error("Error al obtener detalles de la cerveza:", error);
      return null;
    }
  };

  return { beerOptions, fetchBeerDetails };
};
