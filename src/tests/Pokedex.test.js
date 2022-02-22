import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './servicesForTests/RenderWithRouter';
import App from '../App';

describe('Testing Pokedex functions', () => {
  it('verify if heading is renderized', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });
  it('verify if next pokemon is rederized and filter All is first selected', () => {
    renderWithRouter(<App />);
    const firstType = screen.getAllByText(/electric/i)[0];
    expect(firstType).toBeInTheDocument();
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);
    const secondType = screen.getAllByText(/fire/i)[0];
    expect(secondType).toBeInTheDocument();
    userEvent.click(nextButton);
    const thirdType = screen.getAllByText(/bug/i)[0];
    expect(thirdType).toBeInTheDocument();
    userEvent.click(nextButton);
    const fourthType = screen.getAllByText(/poison/i)[0];
    expect(fourthType).toBeInTheDocument();
    const max = 5;
    for (let i = 0; i <= max; i += 1) {
      userEvent.click(nextButton);
    }
    const pikachuCard = screen.getByText(/pikachu/i);
    expect(pikachuCard).toBeInTheDocument();
  });
  it('verify if only one pokemon is renderized', () => {
    renderWithRouter(<App />);
    const moreDetailButton = screen.getAllByRole('link', {
      name: /more details/i,
    });
    expect(moreDetailButton.length).toBe(1);
  });
  it('verify filter buttons and all button', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const lastButtonIndex = 7;
    const types = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(buttons.length).toBe(lastButtonIndex);
    buttons.forEach((type, index) => {
      // verify if all filter buttons are rendered
      expect(type.innerHTML).toBe(types[index]);
      // verify if allButton funcionality works
      userEvent.click(type);
      const allButton = screen.getByRole('button', {
        name: /all/i,
      });
      expect(allButton).toBeInTheDocument();
      userEvent.click(allButton);
      const pikachuCard = screen.getByText(/pikachu/i);
      expect(pikachuCard).toBeInTheDocument();
    });
  });
});
