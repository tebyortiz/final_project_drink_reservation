import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider, Cocktail, Beer, Area } from "../models/UsersModels";

interface ProvidersState {
  providers: Provider[];
}

const initialState: ProvidersState = {
  providers: [
    {
      company: {
        name: "Cervelandia",
        logo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFBgSFRUWGRgaGBkVGhgZGBgYGB4YGhgZGhgYGhgcIS4lHR4sIBgYJjgnKz0xNzU1HSU7QDszPy40NTEBDAwMDw8QGRESGjQsISQ0Pz8/ND8xNzExNDQxPTc/ODc1OzY/NjE0NDQ0MTQ0NDQ2NDExNDU0PzQ9PTE0Pz8xMf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAABgcIAQQFAwL/xABMEAACAQMBBAQICQkFCAMAAAABAgADBBESBQYhMQcTQVEiMmFxgZGxshQVMzRCVHKh0VJic3SCkpOisxYjlMPiJTVDU2TB0vAkRIP/xAAaAQEBAAMBAQAAAAAAAAAAAAAAAQIFBgQD/8QAJBEBAAICAQMEAwEAAAAAAAAAAAECAxFBBDFxISIzkRIygQX/2gAMAwEAAhEDEQA/ALmiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIkU3w31oWOFcM9VhqWmpAIX8t2PBVyMdpPHA4GBK4kBsN7tpOBUOx36sjIK3CBsHkQjqrH7p8dsb+1Cadpa21VbuqxQJcoaYTh4/MhxzPAkAAk9gIWJEgZ3W2mV6xtruKmM6Vop1QPdjtHlx6J1d2d9K6XR2btJVWsDpSqnBXJGVB7PCGNLDGTwIBgWNE4nMBERAREQEREBERAREQEREBERAREQEREBERAROCZDd5t/KNu4t6Km4uWYItJDwDnkHbsOSPBGT5ucDpb/7+myYW9BVesVDktnSinOMgcSxxnHDA4nmMwW23Y2ntBxtIikS7I6l30B1TSF0ooOF8HHHGeJ45yet0lgNdiqXpmo9NOupI4c0qyIqshI4Y5Y9Mk24PSLTRKVlcqV0haaVl4rp5KHXmuOA1DI4ZOIFq27kqGZSjEAlSVJBxxGVJB9E4r0lOHKBmTLJkDUGwR4JPikgkdnOQXfa7va97S2ZaVDRDUevqVRkHTrZPGHEAaeQwSWHHE9LZO6Fehgjad4zcCQ5Soh7xpqKxA9OfLA8/a2999av1lzYBbXUAalOoKjKpPjNjkfIQB2A5nl9KG7lxc1re5tKTVD1Z1MhRSNLK9JgWI4+G2MceEsK7qUhTNK4qUsOpRgxVAysMEaS3aJ2qJRUGll0KoAIIwFAwOPdiBV27HSbVFcWt/TVSX6s1FBRkfOAKiE8s8yMY7scrZBmct/byldbRqmgyBHNOl1hZVpswVUaoXPAIOWrlhcyc7f3i2ha13uqIW4scIAQy1E4IoZy6EtTywPE5X1wLViRfdbfS2vhpRtNUDLUWwH4cyvY6+Ucu3ElEBERAREQEREBERAREQEREBERAREQE4Jgyo+lbfI5fZ1uezFw4PYR8iPQfC8hx3wPjv70isxa1smwnFXrqeLd60j2Dn4XM9mOZiPR+G+MrdkptU0uWZVGSFKsjVD2AKXDZPtInT3b2DVvawoUQByZ3PionLU2PuHby7yNA7tbuULKl1VFeJwXc+O7D6TH2DkOyFZ/3o2LVtLh6VUEkszpUPJ0LE6we08ePcT65RujudZXbI4vTgYZ7VlVawIPFderDKcY1KvI9hlybT2ZRuENOvTSovPS6ggHvHcfKJn/AHX2LSuLmpSqglEV2ABxxDhRxIPYZhkvFKza3aFrWbTFY5XltjaFpbsLmvVSmyoyDUw1FWKtgL4zcUGMd5kL2jvTe33gWKG3oHncVBh2Hei/RHrJ71n72dura0PCS3XPYzguc+Qty9E9wqukEElskEY7O/M1uT/Q3uKR/ZeunSxHrafpCqe4FE5evVrVXPjPkDJ/aDMfSTPlebgUVpu61awUIzacrjwVJAOFHdJtPjtT5vU/Rv7jTw06zNN493d6bYMcR2V5uv0fVb63F0lemgLOmhkYnKHHMGdE/Cdj3ul8HAVnVTmnWosSCCDjOQrAZ5EH02n0O/7sT9JV9+RbpxoDrbZ/yqdVD+yyEe+3rnRw1KGb0bP+CXz06LFVVlqUWUkMqOodMEcRjURnySzOj7pB68raXRAreKlTgFqdysOSv9zdmOU719ulS2hs+2dsJX+DUilUDjk01OlwPGTJ5dnZKU2ns6pb1XoVkKOh4j71dW7VPMEe2BqcTmV50Y75G5T4NXbNxTGQx51KY4avtDke/ge/FhwEREBERAREQEREBERAREQERECL7+bxfArRqi46xz1dIH8sjxsdygFvQB2zPlvbvWqKig1KlR9IB4lmc8ST5Sck+cyWdKm2zcXzU1OUtx1S9xqcDUbz5wv7EkPQzsAEvfuvImlSz34/vHHrCj9qFT3dDdtLG3WiuC5w1R8cXfHE/ZHIDsHnMkMRCPyZQe4Xz2v9ip/UWX4ZQe4Pz6t9h/6izz9X8NvD7YPkha7XFPQ2M5ZQuk8hgYyJ0IhjxzjHs9E56+Sb63w2dKRT0jlxPjtX5Cp+jf3Gn2nx2r8hU/Rv7jTCn7R5Z37P10O/7sT9JV9+Rbp0rDXar2qlZz5i1MD3T6pKOh8/7MT9JV9+QbbTjau2Vpp4VIFKWRxBo0yWqv5iWcA+Ve+dZDRrl2Fb6LahTP0KNNP3UUf9pGukXdMXtDXTA+EUwSh/KXmaZPceY7jjsJzNBBgZX2fevQqpWpkq9Nwy5yMEcCrDuIypHcSJpTd7bCXVvTuU5OuSOZVhwdD5QwI9EpvpY3fFvd9ei4p3GW4clqjGsftZD+ctPV6F9taatSyY+C466mO51ADj0rpP7BgXJERAREQEREBERAREQEREBOltW8FGhUrtypo7n9lSf+07sh/Slc6NmV/zzTp+h6ig/dmBn+o7Oxc+E7sXOO1mOTjzsT65prdrZYtrWjbj6FMBj3ufCdvSxY+mZ63RtBVvrameRroT5kOsj1IZpqBzE8i/uLhX006asmF8I89RLhhjUOQCHy6j3T77NrVWDdaoUg4GO0d+Mn/3s4cQ7x5TO26d51V6WbIR3egW+iHZtSgnlklAMeWaJPKZrsN3Li5avUo09aUnZn8IKSMsdKZ5tgH7phkpF6zWeWVLTW0Wjhb8/bVCQATwXOPTzlfbK39RWKVEfq8+A+oNUC9gqcAGP5w9R5z3RvnZf80+lH/8Zz+TpM1JmNTPhta5sdoidpDPjtT5B/0b+408X+2dl/zj+4//AIz5X2+Fo1J0FXiUdR4D8SVIA8XvMwpgy/lHtn6W+Wmu8Iru8u1Li1Fnao/wcs+p1ARSWPhq1Zua55hePnlq7h7mLYozMweu+A7gYUKOIRAezvPafMAOr0PD/ZifpavvydzpoacidHaVWoqg0kDMWAwTgY45JORjlz4+adOzu7lnAekFUnBbhkDQTqGGP0sDHlP5OWDyOk/ZYr7OqkDwqWLhTzPgeP60LiUfu7tH4NdULjOAlRGY/mE6X/kLTTVzQDo1M8mVlPmYEH2zKlejpLUz9Esh84JU+yFaxE5nl7t3fW2lvV/Lo029JQEz1IQiIgIiICIiAiIgIiICQ/pL2ZUubLqqRQHrUZjUcIoVQxJLHy6fXJhM3797dqXV3V1serp1Hp06efBUIxXVp5ajgknnxxyECQ7m7rvbX1C5rXFloRnLablGbjTdFwMDtYS3/jq2+sUP4qfjMt6R3D1RpHcPVC6ak+Orf6xQ/ip+MfHVt9YofxU/GZb0DuHqE40juHqEGmpPjq2+sUP4qfjKq2tuvUSrWNhtG3SjXLF0a56sgMSSh0hgw8JgDwIBx5TWGkdw9QnOkdw9UCXf2Br/AFnZ/wDiv9E4/sFX+s7P/wAV/okS0juHqjSO4QJd/YGv9Z2f/iv9E5TcGsSAbrZ6jPE/Cc4HfjRx80iGkdw9UaR3D1QNGbsC0s7ZLVLmi2jJZjUQFnYlnbGeGSTw7Biex8dW31ih/FT8ZlvSO4eqNA7h6hBpqP46tvrFD+Kn4zn45t/rFD+Kn4zLWkdw9QnOgdw9Qgaj+Orb6xQ/ip+Mo/ae5dZ69V0r2OhqtR1zcqDpd2ZcjHA4IkM0DuHqEaR3D1QNK7l0ersqFFnR2p01RjTcOuR3MPJie/Mt7D2zUs6ouKLFSpBZRwV1HNHHaCM+bmJqCjU1AMORAPrGYR9IiICIiAiIgIiICIiAmWNtfObj9Yr/ANVpqeZY2185uP1iv/VaBNejncq3v6FWpWesrJV6sdWyKNOhG46kPHLGd3a+6ux7a4W1rV7tajBGByhUB2KrlxT4DIPHsns9CHzW4/Wf8mlIv0rWbVtrJQpgl3o0UUDics9QZx3DOSewQO/vR0WCjRevbVaj9WpdqdQKWKqMnQyBeOM8COMrCaL3z3jpWds4ZwarIy06efCZiukHHPSCckzOiDAA7hiFdrZ1APWpUznD1aaHHPDuqnHlwZbm1OjKwoUaldql2Vpo1Rgr0y2lQWOMpz4Sq93lzeWo/wCpt/6yTRW9IpmyuBWZlpmi4dlGWCFSGIHacQSpHOxe7aX71v8AhIm2M8M4zwzzx2Z8skV/Q2UtN+prXz1dJ0B0pqhb6OrwQdPmkcgfqkuWUHtYD1kCXTcdFdiiM5qXWFUscVKfJQScf3fklL0PHX7S+0TUl8AaLhshSjaiOekqc48uIFDL8SHt2kPTQ/CRW50630Z0a20asatGo6NWPpacZ8skr7P2SVJS+ugdJKq9AkE48EEquBk4kVEAxwCe4Ey7KPRTZFFY1LnioY+HT7Rn/lykqninzH2TVFgc0KZ76a+6IRVGxdztk3upba6utajJVtCsBy1aWpjK5xxEiG9261WwqhHOtHBanUAwGAPFSPosMjI8oI8nvdE9lV+MtelwqJUV2KkAasBVJPaTg4/Nkr6ayvwSiD4/XjT340Pq9HL7oFJ1vFbzH2TV1l8mn2F90TKNbxW8x9k1dZfJp9hfdEEuxERAREQEREBERAREQEyxtr5zcfrFf+q01PMsba+c3H6xX/qtAtzoQ+a3H6z/AJNKdff7fu5sr3qqKUSopo7akYu2ovldYYYHg8OHbPv0IfNbj9Z/yac8ff8A3Yub3apWjTbQaVJGqkYRBlixLHgSAc6Rx5QLJvNmW99br1tNWWoisCQNa6lBBV+asM8xM1VaehmTOdLFcjkdJIz90u7e7fajZUPgtuweuEFNQDkU8AKHdhwyMeLzJ7hxlHAYGO7hCvV3VXN9aj/qKJ9VRTNB72WT1rK4oUwC9Sk6KCQBlhgZJ4CZrt6zI61EYq6kMrKcMCOIII5GfW52hWqfKVqr5566jv7zGBJX6PblfHq2VP7dyAfuQyNbRtDSqvSLo5Qga6ba0bwQcoxAyOOPODOoqKOQHqE/UD9IfCHnHtmmjtOhUpsiV6LFlZQBUQ8SCByMzHOGpg8wD6IEnrdH+0UUf/GZwABlKlNx6tWfung3tlUov1dVHRwAdLqVbBzg4PZwPHyT8211Up/J1HT7DunukT9Xt9UrMHrVHqOFCB3Yu2kZIBY8TzPPvgdduRmotjHNtRPfRpn+RZlyX7ujvrZVKFGh16pUWmlMrUBTLKiqdJPgtxHYYHQ6ON7611Ur21wVZqY1o4AUlQ2llYDhkEqcjv8AJIL0o0rpLwLc1OsQrqosFCqEJwy6RwDggZ558E9oA9LojcDadZe+nVx6KqT2OnCiNFrUxxD1Ez9pVbH8hhFP1vFbzH2TV1l8mn2F90TKNbxW8x9k1dZfJp9hfdEEuxERAREQEREBERAREQEyxtr5zcfrFf8AqtNTzLG2vnNx+sV/6rQJbuTvulha1afVtUqvWLqudKBerRQWfnzU8ADPJ29vte3WQ9YpTP8Aw6WUTHcSPCb0kjySOFgOJM9vZG6d5c4NK2cqfpuNCecM+NQ82YV4YnMs3ZnRBWbBuLhEHatNS7fvtgfcZ+t49yFslD0bN7xQMl6lZyVPlt6KplfKCfLArBmA58J9KFF38RHf7Cs/ugz2ae9VVR/cUrOj3GlbIT+9U1kyXbD6WaiAJc0FcDhrpYRseVDlSefIr5oEGo7v3b+LaXJ8vUVcevTidpd0L88rO49KEe2XHYdJezqnjVmpnuqI6j94Ar989WnvhYNyvbX01kX7iYNqHbc6/H/06/7mfZOtW3dvF8azuR/+FUj1hZf9XfPZ68Te23oqo33KTPF2h0o2CZ0NUqkdlNGAP7T6RAoytaunj03T7aOnvAT4qwPIg+aWHt3pUuauUt0Wgp4ajipU9BI0L6j55G/7V3D4SrTtrgk4Aq2tJ2JPIAoqsT98DwZwZbewej9bmmal3aLaMR4HUVKiv52pVC6p5uJ8gnw2l0PMONvchu5aqYP768P5YFd7F2tVtay3FBgHUEeENSlSMFSO4+iSnezfdL+0SlUpFK6VFqKVOqmw0srYJ4qcNnByOHOeTtbcm/t8l7d2UfTpf3q/y+EB5wJHc/dwPn7oH4reK3mPsmrrL5NPsL7omUa3it5j7Jq6y+TT7C+6ISXYiIgIiICIiAiIgIiICV/trovtriu1cVatPWxd0TRpLE5ZhqUlSTknymWBECObF3LsrXDU6Clx/wASp4dT0M3i+jEkWJzEBOCJzECK7wbiWd3lnTRUPHraeFcnvYY0t6RK72p0S3SEmhVp1h2Bs0mx2DtUn0iXdEDM95ujf0s67Svw7VTrB60LTzHs6q+NSqr9pHX2iaqiBlelYVm4JRrN9mm7ewT17Hcq/qkaLWqAfpVAKYHn1kH1ZmkYg2prY/RFWYhrm4SmO1aQLsfJrbCqfQ0sfYG6VrZ8aFIa8YNRvDqH9s8h5BgeSe/EBERA4xPE21utaXWevoIzYxrA01B5nGDPciBXFDoltFqhzVrNTBz1TaNJ/NZgoJX/ANzLGAnMQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQP/Z",
        phone: "261586975",
        email: "cervelandia1@example.com",
      },
      service: {
        type: "Cervecería",
        cocktails: [],
        beers: [],
        areas: [],
      },
      responsibleCompany: {
        name: "Andres Rojo",
        phone: "261498632",
        email: "andresrojo1@example.com",
        photo:
          "data:image/jpeg;base64,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",
      },
      login: {
        username: "cervelandia1",
        password: "asdasd",
      },
    },
    {
      company: {
        name: "Coctelandia",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvdSo4SIYd_SpDsSXSK9kAGZnIKtXgGw0wA&usqp=CAU",
        phone: "261623147",
        email: "coctelandia1@example.com",
      },
      service: {
        type: "Coctelería",
        cocktails: [],
        beers: [],
        areas: [],
      },
      responsibleCompany: {
        name: "Lucía Soul",
        phone: "261759682",
        email: "luciasoul1@example.com",
        photo:
          "data:image/jpeg;base64,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",
      },
      login: {
        username: "coctelandia1",
        password: "asdasd",
      },
    },
    {
      company: {
        name: "Neon Bar",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXrnHPW3uUM4Z2YdTOtqNiIUV0J9-v7EiL_w&usqp=CAU",
        phone: "261475213",
        email: "neonbar1@example.com",
      },
      service: {
        type: "Ambos",
        cocktails: [],
        beers: [],
        areas: [],
      },
      responsibleCompany: {
        name: "Juan Polo",
        phone: "261446872",
        email: "juanpolo1@example.com",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Cz1uFvEc_dzDSrKwR5_acmeaqOScB-UXsg&usqp=CAU",
      },
      login: {
        username: "neonbar1",
        password: "asdasd",
      },
    },
  ],
};

const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    addProvider: (state, action: PayloadAction<Provider>) => {
      state.providers = [...state.providers, action.payload];
    },
    addCocktail: (
      state,
      action: PayloadAction<{ providerName: string; cocktail: Cocktail }>
    ) => {
      const { providerName, cocktail } = action.payload;
      const providerIndex = state.providers.findIndex(
        (provider) => provider.company.name === providerName
      );

      if (providerIndex !== -1) {
        const cocktailWithDetails = {
          ...cocktail,
          image: cocktail.image,
          ingredients: cocktail.ingredients,
        };

        state.providers[providerIndex].service.cocktails = [
          ...(state.providers[providerIndex].service.cocktails || []),
          cocktailWithDetails,
        ];
      }
    },

    removeCocktail: (
      state,
      action: PayloadAction<{ providerName: string; cocktail: string }>
    ) => {
      const { providerName, cocktail } = action.payload;
      const providerIndex = state.providers.findIndex(
        (provider) => provider.company.name === providerName
      );
      if (providerIndex !== -1) {
        state.providers[providerIndex].service.cocktails = (
          state.providers[providerIndex].service.cocktails || []
        ).filter((c) => c.name !== cocktail);
      }
    },
    addBeer: (
      state,
      action: PayloadAction<{ providerName: string; beer: Beer }>
    ) => {
      const { providerName, beer } = action.payload;
      const providerIndex = state.providers.findIndex(
        (provider) => provider.company.name === providerName
      );

      if (providerIndex !== -1) {
        const updatedBeers = [
          ...(state.providers[providerIndex].service.beers || []),
          beer,
        ];

        state.providers[providerIndex].service.beers = updatedBeers;
      }
    },
    removeBeer: (
      state,
      action: PayloadAction<{ providerName: string; beer: string }>
    ) => {
      const { providerName, beer } = action.payload;
      const providerIndex = state.providers.findIndex(
        (provider) => provider.company.name === providerName
      );
      if (providerIndex !== -1) {
        state.providers[providerIndex].service.beers = (
          state.providers[providerIndex].service.beers || []
        ).filter((b) => b.name !== beer);
      }
    },

    addArea: (
      state,
      action: PayloadAction<{ providerName: string; area: Area }>
    ) => {
      const { providerName, area } = action.payload;
      const providerIndex = state.providers.findIndex(
        (provider) => provider.company.name === providerName
      );

      if (providerIndex !== -1) {
        state.providers[providerIndex].service.areas.push(area);
      }
    },
    removeArea: (
      state,
      action: PayloadAction<{ providerName: string; areaName: string }>
    ) => {
      const { providerName, areaName } = action.payload;
      const providerIndex = state.providers.findIndex(
        (provider) => provider.company.name === providerName
      );

      if (providerIndex !== -1) {
        state.providers[providerIndex].service.areas = state.providers[
          providerIndex
        ].service.areas.filter((area) => area.name !== areaName);
      }
    },
    updateCocktailStock: (
      state,
      action: PayloadAction<{
        providerName: string;
        updatedCocktails: Cocktail[];
      }>
    ) => {
      const { providerName, updatedCocktails } = action.payload;
      const providerIndex = state.providers.findIndex(
        (provider) => provider.company.name === providerName
      );
      if (providerIndex !== -1) {
        state.providers[providerIndex].service.cocktails = updatedCocktails;
      }
    },
    updateBeerStock: (
      state,
      action: PayloadAction<{ providerName: string; updatedBeers: Beer[] }>
    ) => {
      const { providerName, updatedBeers } = action.payload;
      const providerIndex = state.providers.findIndex(
        (provider) => provider.company.name === providerName
      );
      if (providerIndex !== -1) {
        state.providers[providerIndex].service.beers = updatedBeers;
      }
    },
  },
});

export const {
  addProvider,
  addCocktail,
  removeCocktail,
  addBeer,
  removeBeer,
  addArea,
  removeArea,
  updateCocktailStock,
  updateBeerStock,
} = providersSlice.actions;

export default providersSlice.reducer;
