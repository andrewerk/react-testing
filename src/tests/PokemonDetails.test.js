import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './servicesForTests/RenderWithRouter';
import App from '../App';

describe('Test details page', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetailButton = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailButton);
  });
  it('verify if information are rendered correctly', () => {
    const title = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    const moreDetailButton = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(title).toBeInTheDocument();
    expect(moreDetailButton).toBeNull();
    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
    const resume = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make/i,
    );
    expect(resume).toBeInTheDocument();
  });
  it('verify if map information are rendered', () => {
    const title = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(title).toBeInTheDocument();
    const maps = screen.getAllByRole('img', { name: /pikachu location/i });
    const locals = [
      /Kanto Viridian Forest/i,
      /Kanto Power Plant/i,
    ];
    const src = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];
    maps.forEach((map, index) => {
      expect(map).toBeInTheDocument();
      expect(map.src).toBe(src[index]);
      const local = screen.getByText(locals[index]);
      expect(local).toBeInTheDocument();
    });
  });
  it('test favorite button', () => {
    const favoriteButton = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteButton);
    expect(screen.queryByRole(
      'img', { name: /pikachu is marked as favorite/i },
    )).toBeInTheDocument();
    userEvent.click(favoriteButton);
    expect(screen.queryByRole(
      'img', { name: /pikachu is marked as favorite/i },
    )).toBeNull();
  });
});
