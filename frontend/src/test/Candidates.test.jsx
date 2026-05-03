import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Candidates from '../pages/Candidates';

// Mock CandidateStack to focus on page layout
vi.mock('../components/CandidateStack', () => ({
  default: () => <div data-testid="candidate-stack">CandidateStack Mock</div>
}));

describe('Candidates Page', () => {
  const renderCandidates = () => render(
    <MemoryRouter>
      <Candidates />
    </MemoryRouter>
  );

  it('renders the candidates heading', () => {
    renderCandidates();
    expect(screen.getAllByText(/CANDIDATES/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the instruction text', () => {
    renderCandidates();
    expect(screen.getByText(/Swipe right to endorse/i)).toBeInTheDocument();
  });

  it('renders the CandidateStack component', () => {
    renderCandidates();
    expect(screen.getByTestId('candidate-stack')).toBeInTheDocument();
  });
});
