import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './servicesForTests/RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Test NotFound Component', () => {
  it('verify if title Page requested not found 😭 is renderized', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading', {
      name: /page requested not found Crying emoji/i,
    });

    expect(title).toBeInTheDocument();
  });
  it('verify if image is rederized', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
