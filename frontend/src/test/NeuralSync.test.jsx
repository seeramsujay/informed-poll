import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NeuralSync from '../pages/NeuralSync.jsx';

vi.mock('../components/ChatAssistant', () => ({
  default: () => <div data-testid="chat-assistant">Chat Mock</div>,
}));

const renderPage = () =>
  render(
    <MemoryRouter>
      <NeuralSync />
    </MemoryRouter>
  );

describe('NeuralSync page', () => {
  it('renders the NEURAL-SYNC heading', () => {
    renderPage();
    expect(screen.getByText('NEURAL-SYNC')).toBeInTheDocument();
  });

  it('renders the AI Intelligence Layer label', () => {
    renderPage();
    expect(screen.getByText(/AI Intelligence Layer/i)).toBeInTheDocument();
  });

  it('renders the ChatAssistant component', () => {
    renderPage();
    expect(screen.getByTestId('chat-assistant')).toBeInTheDocument();
  });

  it('renders the Gemini model badge', () => {
    renderPage();
    // 'Gemini 1.5 Flash' is rendered in the stat chip
    expect(screen.getByText('Gemini 1.5 Flash')).toBeInTheDocument();
  });

  it('renders the Non-Partisan badge', () => {
    renderPage();
    expect(screen.getByText('Non-Partisan')).toBeInTheDocument();
  });

  it('renders the Suggested Questions sidebar', () => {
    renderPage();
    expect(screen.getByText(/Suggested Questions/i)).toBeInTheDocument();
  });

  it('renders at least 5 suggested question buttons', () => {
    renderPage();
    const sidebar = document.querySelector('.glass-card');
    const allButtons = screen.getAllByRole('button');
    expect(allButtons.length).toBeGreaterThanOrEqual(5);
  });

  it('renders the how it works section', () => {
    renderPage();
    expect(screen.getByText(/How it works/i)).toBeInTheDocument();
  });

  it('how it works has 4 numbered steps', () => {
    renderPage();
    [1, 2, 3, 4].forEach(n => {
      expect(screen.getByText(`${n}.`)).toBeInTheDocument();
    });
  });

  it('renders the Live API badge', () => {
    renderPage();
    expect(screen.getByText(/Live API/i)).toBeInTheDocument();
  });
});
