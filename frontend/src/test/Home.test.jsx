import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

// Mock child components that have their own tests to keep Home test focused
vi.mock('../components/Hero', () => ({
  default: () => <div data-testid="hero">Hero Mock</div>
}));
vi.mock('../components/Timeline', () => ({
  default: () => <div data-testid="timeline">Timeline Mock</div>
}));
vi.mock('../components/CandidateStack', () => ({
  default: () => <div data-testid="candidate-stack">CandidateStack Mock</div>
}));
vi.mock('../components/ChatAssistant', () => ({
  default: () => <div data-testid="chat-assistant">ChatAssistant Mock</div>
}));

describe('Home Page', () => {
  const renderHome = () => render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  it('renders all main sections', () => {
    renderHome();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
    expect(screen.getByTestId('candidate-stack')).toBeInTheDocument();
    expect(screen.getByTestId('chat-assistant')).toBeInTheDocument();
  });

  it('renders the dossiers section', () => {
    renderHome();
    expect(screen.getByText(/CIVIC/i)).toBeInTheDocument();
    expect(screen.getByText(/INTELLIGENCE/i)).toBeInTheDocument();
    const dossierLink = screen.getByRole('link', { name: /Open Dossier/i });
    expect(dossierLink).toHaveAttribute('href', '/dossier');
  });

  it('contains appropriate headings', () => {
    renderHome();
    expect(screen.getAllByText(/CANDIDATES/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/ASSISTANT/i).length).toBeGreaterThanOrEqual(1);
  });
});
