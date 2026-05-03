import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Timeline from '../components/Timeline';

describe('Timeline Component', () => {
  it('renders MISSION BRIEFING title', () => {
    render(<Timeline />);
    expect(screen.getByText(/THE MISSION BRIEFING/i)).toBeInTheDocument();
  });

  it('renders all four default steps', () => {
    render(<Timeline />);
    expect(screen.getByText(/REGISTER/i)).toBeInTheDocument();
    expect(screen.getByText(/GET THE BALLOT/i)).toBeInTheDocument();
    expect(screen.getByText(/EARLY VOTE/i)).toBeInTheDocument();
    expect(screen.getByText(/ELECTION DAY/i)).toBeInTheDocument();
  });
});
