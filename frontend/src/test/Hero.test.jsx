import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../components/Hero';

describe('Hero Component', () => {
  const renderHero = () => render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  );

  it('renders VOTE LOUDER title', () => {
    renderHero();
    // VOTE appears in Navbar and Hero
    expect(screen.getAllByText(/VOTE/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/LOUDER/i)).toBeInTheDocument();
  });

  it('renders call to action links', () => {
    renderHero();
    const strikeBack = screen.getByRole('link', { name: /STRIKE BACK/i });
    const livePulse = screen.getByRole('link', { name: /LIVE PULSE/i });
    expect(strikeBack).toHaveAttribute('href', '/candidates');
    expect(livePulse).toHaveAttribute('href', '/neuralsync');
  });

  it('renders the interactive election guide tag', () => {
    renderHero();
    expect(screen.getByText(/\/\/ interactive\.election\.guide\.v1\.0/i)).toBeInTheDocument();
  });

  it('renders the milestone card', () => {
    renderHero();
    expect(screen.getByText(/PRIMARY BALLOT LOCKING/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Milestone/i)).toBeInTheDocument();
  });
});
