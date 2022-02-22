import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './servicesForTests/RenderWithRouter';
import App from '../App';

describe('Deve testar componente App.js', () => {
  it('verifies if links are renderized', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', {
      name: /about/i });
    const favoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('verifies if page are redirected to home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('verifies if page are redirected to about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('verifies if page are redirected to favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('verifies if page are redirected to not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
