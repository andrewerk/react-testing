import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './servicesForTests/RenderWithRouter';
import About from '../components/About';

describe('Deve testar componente App.js', () => {
  it('verifies if title About is rederized', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(title).toBeInTheDocument();
  });
  it('verifies if text paragraph one is rederized', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getByText(
      /this application simulates a pokédex/i,
    );

    expect(paragraph).toBeInTheDocument();
  });
  it('verifies if text paragraph two is rederized', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );

    expect(paragraph).toBeInTheDocument();
  });
  it('verifies if image is rederized', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', {
      name: /pokédex/i,
    });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
