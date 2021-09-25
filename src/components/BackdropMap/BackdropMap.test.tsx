import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BackdropMap from './BackdropMap';

describe('<BackdropMap />', () => {
  test('it should mount', () => {
    render(<BackdropMap />);
    
    const backdropMap = screen.getByTestId('BackdropMap');

    expect(backdropMap).toBeInTheDocument();
  });
});