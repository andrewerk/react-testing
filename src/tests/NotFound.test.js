import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './servicesForTests/RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Deve testar componente NotFound', () => {
  it('verifies if title Page requested not found 😭 is renderized', () => {
    renderWithRouter(<NotFound />);
    screen.logTestingPlaygroundURL();

    const title = screen.getByRole('heading', {
      name: /page requested not found Crying emoji/i,
    });

    expect(title).toBeInTheDocument();
  });
  it('verifies if image is rederized', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
