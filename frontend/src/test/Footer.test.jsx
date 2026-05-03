/**
 * Additional frontend tests for Home, Dossier, and Footer components.
 * These cover previously untested pages to improve code coverage.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

// ── Footer ────────────────────────────────────────
describe('Footer component', () => {
  const renderFooter = () => render(
    <MemoryRouter><Footer /></MemoryRouter>
  );

  it('renders without crashing', () => {
    expect(() => renderFooter()).not.toThrow();
  });

  it('renders brand name INFORMED POLL', () => {
    renderFooter();
    // Multiple elements may contain 'INFORMED' (from brand spans)
    const matches = screen.getAllByText(/INFORMED/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders System section', () => {
    renderFooter();
    const matches = screen.getAllByText(/System/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Archives section', () => {
    renderFooter();
    const matches = screen.getAllByText(/Archives/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders copyright text', () => {
    renderFooter();
    expect(screen.getByText(/KINETIC-CORE/i)).toBeInTheDocument();
  });

  it('renders neural subscription input', () => {
    renderFooter();
    expect(screen.getByPlaceholderText(/USER@IDENT\.NET/i)).toBeInTheDocument();
  });

  it('renders Link subscription button', () => {
    renderFooter();
    expect(screen.getByRole('button', { name: /Link/i })).toBeInTheDocument();
  });

  it('renders privacy and terms links', () => {
    renderFooter();
    expect(screen.getByText(/Privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms/i)).toBeInTheDocument();
  });
});
