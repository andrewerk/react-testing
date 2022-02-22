import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './servicesForTests/RenderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemon from '../data';

describe('Test Pokemon component', () => {
  it('tests if pokemon name is correct', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon[0] } isFavorite />);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
  it('tests if pokemon type is correct', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon[0] } isFavorite />);
    const pokemonType = screen.getByText(/electric/i);
    expect(pokemonType).toBeInTheDocument();
  });
  it('tests if pokemon weight is correct', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon[0] } isFavorite />);
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
  });
  it('tests if pokemon image is rendered', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon[0] } isFavorite />);
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage).toBeDefined();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('tests if redirect to details is rendered and work correctly', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon[0] } isFavorite />);
    const pokemonDetailButton = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonDetailButton).toBeInTheDocument();
    userEvent.click(pokemonDetailButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('verify if start icon is rendered for favorite pokemons', () => {
    renderWithRouter(<App />);
    const moreDetailButton = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailButton);
    const favoriteButton = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteButton);
    const isFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(isFavorite).toBeInTheDocument();
    expect(isFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
