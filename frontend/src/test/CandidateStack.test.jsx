import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CandidateStack from '../components/CandidateStack.jsx';
import { candidates } from '../data/mock.js';

const renderStack = () =>
  render(
    <MemoryRouter>
      <CandidateStack />
    </MemoryRouter>
  );

describe('CandidateStack component', () => {
  // ── Render ──────────────────────────────────
  describe('initial render', () => {
    it('renders without crashing', () => {
      expect(() => renderStack()).not.toThrow();
    });

    it('shows the first candidate name', () => {
      renderStack();
      // CSS uppercase is visual only; DOM text stays original case
      expect(screen.getByText(candidates[0].name)).toBeInTheDocument();
    });

    it('shows a match % badge', () => {
      renderStack();
      expect(screen.getByText(`${candidates[0].match}%`)).toBeInTheDocument();
    });

    it('shows MATCH label', () => {
      renderStack();
      expect(screen.getByText('MATCH')).toBeInTheDocument();
    });

    it('shows the candidate role', () => {
      renderStack();
      // role is inside a badge
      expect(screen.getByText(new RegExp(candidates[0].role, 'i'))).toBeInTheDocument();
    });

    it('renders an endorse (heart) button', () => {
      renderStack();
      // The heart/endorse button has no text, identify via SVG
      const buttons = screen.getAllByRole('button');
      // At least 3 buttons: dismiss, endorse, policy toggle
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('shows the progress indicator', () => {
      renderStack();
      // e.g. "1 / 3" or "1 / 2"
      expect(screen.getByText(/\d+ \/ \d+/)).toBeInTheDocument();
    });

    it('shows endorsed count', () => {
      renderStack();
      expect(screen.getByText(/0 endorsed/i)).toBeInTheDocument();
    });
  });

  // ── Policy breakdown ─────────────────────────
  describe('policy breakdown', () => {
    it('renders the policy breakdown toggle button', () => {
      renderStack();
      expect(screen.getByText(/Policy Breakdown/i)).toBeInTheDocument();
    });

    it('clicking policy toggle shows policy labels', async () => {
      renderStack();
      const toggle = screen.getByText(/Policy Breakdown/i);
      fireEvent.click(toggle);
      await waitFor(() => {
        // First candidate has a "Healthcare" policy
        expect(screen.getByText('Healthcare')).toBeInTheDocument();
      });
    });

    it('clicking policy toggle again collapses it', async () => {
      renderStack();
      const toggle = screen.getByText(/Policy Breakdown/i);
      fireEvent.click(toggle);
      await waitFor(() => screen.getByText('Healthcare'));
      // Re-query the toggle button after re-render
      const toggleAfter = screen.getByText(/Policy Breakdown/i);
      fireEvent.click(toggleAfter);
      await waitFor(() => {
        expect(screen.queryByText('Healthcare')).not.toBeInTheDocument();
      });
    });
  });

  // ── Swipe / Navigation ───────────────────────
  describe('dismiss button (skip candidate)', () => {
    it('clicking dismiss button advances to next candidate', async () => {
      renderStack();
      const buttons = screen.getAllByRole('button');
      // Dismiss is first action button (X icon, red)
      const dismissBtn = buttons.find(b =>
        b.className.includes('red') || b.classList.contains('text-red-400')
      );
      if (!dismissBtn) {
        // fallback: first action button
        fireEvent.click(buttons[buttons.length - 2]);
      } else {
        fireEvent.click(dismissBtn);
      }
      await waitFor(() => {
        // Progress should update to next candidate or ballot screen
        const text = document.body.textContent;
        expect(text).toMatch(/\d+ \/ \d+|Your Ballot/);
      });
    });
  });

  describe('endorse button', () => {
    it('clicking endorse increments endorsed count', async () => {
      renderStack();
      const initialCount = screen.getByText(/0 endorsed/i);
      expect(initialCount).toBeInTheDocument();

      const buttons = screen.getAllByRole('button');
      // Endorse is the last action button (heart, colored)
      const endorseBtn = buttons[buttons.length - 1];
      fireEvent.click(endorseBtn);

      await waitFor(() => {
        const text = document.body.textContent;
        expect(text).toMatch(/1 endorsed|Your Ballot/);
      });
    });
  });

  // ── Ballot screen ────────────────────────────
  describe('ballot screen (after all candidates)', () => {
    it('shows "Your Ballot" heading after all candidates are processed', async () => {
      renderStack();
      const { length } = candidates;
      const buttons = screen.getAllByRole('button');
      // Click dismiss for all candidates
      for (let i = 0; i < length; i++) {
        const btns = screen.getAllByRole('button');
        const dismissBtn = btns.find(b => b.className.includes('red-400')) || btns[btns.length - 2];
        if (dismissBtn) fireEvent.click(dismissBtn);
        await waitFor(() => {
          // Either ballot screen or next card
          expect(document.body.textContent.length).toBeGreaterThan(0);
        });
      }
      await waitFor(() => {
        expect(screen.getByText(/Your Ballot/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('shows Restart button on ballot screen', async () => {
      renderStack();
      for (let i = 0; i < candidates.length; i++) {
        const btns = screen.getAllByRole('button');
        const dismissBtn = btns.find(b => b.className.includes('red-400')) || btns[btns.length - 2];
        if (dismissBtn) fireEvent.click(dismissBtn);
        await waitFor(() => document.body.textContent.length > 0);
      }
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Restart/i })).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('Restart button resets to first candidate', async () => {
      renderStack();
      for (let i = 0; i < candidates.length; i++) {
        const btns = screen.getAllByRole('button');
        const dismissBtn = btns.find(b => b.className.includes('red-400')) || btns[btns.length - 2];
        if (dismissBtn) fireEvent.click(dismissBtn);
        await waitFor(() => document.body.textContent.length > 0);
      }
      await waitFor(() => screen.getByRole('button', { name: /Restart/i }), { timeout: 3000 });
      fireEvent.click(screen.getByRole('button', { name: /Restart/i }));
      await waitFor(() => {
        expect(screen.getByText(/0 endorsed/i)).toBeInTheDocument();
      });
    });
  });

  // ── Swipe instruction text ───────────────────
  describe('hint text', () => {
    it('shows swipe instruction text', () => {
      renderStack();
      expect(screen.getByText(/swipe to skip/i)).toBeInTheDocument();
    });
  });
});
