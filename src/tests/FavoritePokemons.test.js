import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './servicesForTests/RenderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Deve testar componente FavoritePokemons', () => {
  it('verifies if text No Favorite Pokemon Found is renderized', () => {
    renderWithRouter(<FavoritePokemons />);
    const empty = screen.getByText(/no favorite pokemon found/i);
    expect(empty).toBeInTheDocument();
  });
  it('verifies if favorite pokemons cards are renderized', () => {
    renderWithRouter(<App />);
    const moreDetailButton = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailButton);
    const favoriteButton = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteButton);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);
    screen.logTestingPlaygroundURL();
    const pokemonCard = screen.getByText(/pikachu/i);
    expect(pokemonCard).toBeInTheDocument();
  });
});
