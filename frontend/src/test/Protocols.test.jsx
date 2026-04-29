import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Protocols from '../pages/Protocols.jsx';
import { protocols } from '../data/mock.js';

const renderProtocols = () =>
  render(
    <MemoryRouter>
      <Protocols />
    </MemoryRouter>
  );

describe('Protocols page', () => {
  // ── Render ──────────────────────────────────
  describe('initial render', () => {
    it('renders the PROTOCOLS heading', () => {
      renderProtocols();
      expect(screen.getByText('PROTOCOLS')).toBeInTheDocument();
    });

    it('renders all 4 protocol titles', () => {
      renderProtocols();
      protocols.forEach(p => {
        expect(screen.getByText(p.title)).toBeInTheDocument();
      });
    });

    it('renders all protocol summaries', () => {
      renderProtocols();
      protocols.forEach(p => {
        expect(screen.getByText(p.summary)).toBeInTheDocument();
      });
    });

    it('renders all 4 Execute Protocol buttons', () => {
      renderProtocols();
      const btns = screen.getAllByRole('button').filter(b =>
        b.textContent.toLowerCase().includes('execute protocol') ||
        b.textContent.toLowerCase().includes('close protocol')
      );
      expect(btns.length).toBe(4);
    });

    it('renders the data sources disclaimer', () => {
      renderProtocols();
      expect(screen.getByText(/vote\.gov/i)).toBeInTheDocument();
    });
  });

  // ── Expand/collapse ──────────────────────────
  describe('expand/collapse protocol', () => {
    it('clicking "Execute Protocol" expands steps for that protocol', async () => {
      renderProtocols();
      const firstBtn = screen.getAllByRole('button').find(b =>
        b.textContent.toLowerCase().includes('execute protocol')
      );
      fireEvent.click(firstBtn);
      await waitFor(() => {
        // First protocol has "Check Eligibility" as step 1
        expect(screen.getByText(/Check Eligibility/i)).toBeInTheDocument();
      });
    });

    it('clicking "Close Protocol" collapses the steps', async () => {
      renderProtocols();
      const execBtn = screen.getAllByRole('button').find(b =>
        b.textContent.toLowerCase().includes('execute protocol')
      );
      fireEvent.click(execBtn);
      await waitFor(() => screen.getByText(/Check Eligibility/i));

      const closeBtn = screen.getByRole('button', { name: /close protocol/i });
      fireEvent.click(closeBtn);
      await waitFor(() => {
        expect(screen.queryByText(/Check Eligibility/i)).not.toBeInTheDocument();
      });
    });

    it('multiple protocols can show their steps independently', async () => {
      renderProtocols();
      const execBtns = screen.getAllByRole('button').filter(b =>
        b.textContent.toLowerCase().includes('execute protocol')
      );
      // Open first protocol
      fireEvent.click(execBtns[0]);
      await waitFor(() => screen.getByText(/Check Eligibility/i));

      // Verify second protocol step is NOT yet shown
      expect(screen.queryByText(/Request Mail-In Ballot/i)).not.toBeInTheDocument();
    });
  });

  // ── Step completion ──────────────────────────
  describe('step checkboxes', () => {
    const openFirstProtocol = async () => {
      const btn = screen.getAllByRole('button').find(b =>
        b.textContent.toLowerCase().includes('execute protocol')
      );
      fireEvent.click(btn);
      await waitFor(() => screen.getByText(/Check Eligibility/i));
    };

    it('clicking a step marks it as completed (line-through)', async () => {
      renderProtocols();
      await openFirstProtocol();
      // Get the step container (cursor-pointer div)
      const stepTitle = screen.getByText(/Step 1: Check Eligibility/i);
      const stepContainer = stepTitle.closest('[class*="cursor-pointer"]') || stepTitle.parentElement.parentElement;
      fireEvent.click(stepContainer);
      await waitFor(() => {
        // Re-query after state update — element may be remounted
        const updated = screen.getByText(/Step 1: Check Eligibility/i);
        expect(updated.className).toContain('line-through');
      });
    });

    it('clicking a completed step unchecks it', async () => {
      renderProtocols();
      await openFirstProtocol();
      // Helper to get the step container (cursor-pointer div containing Step 1)
      const getStepContainer = () => {
        const el = screen.getByText(/Step 1: Check Eligibility/i);
        return el.closest('[class*="cursor-pointer"]') || el.parentElement.parentElement;
      };
      fireEvent.click(getStepContainer());
      await waitFor(() => {
        expect(screen.getByText(/Step 1: Check Eligibility/i).className).toContain('line-through');
      });
      fireEvent.click(getStepContainer());
      await waitFor(() => {
        expect(screen.getByText(/Step 1: Check Eligibility/i).className).not.toContain('line-through');
      });
    });

    it('shows a progress indicator when steps are completed', async () => {
      renderProtocols();
      await openFirstProtocol();
      // Progress starts at "0 / 4"
      expect(screen.getByText(/0 \/ \d+/)).toBeInTheDocument();
    });

    it('progress counter increments when step is checked', async () => {
      renderProtocols();
      await openFirstProtocol();
      const stepTitle = screen.getByText(/Step 1: Check Eligibility/i);
      const stepContainer = stepTitle.closest('[class*="cursor-pointer"]') || stepTitle.parentElement.parentElement;
      fireEvent.click(stepContainer);
      await waitFor(() => {
        expect(screen.getByText(/1 \/ \d+/)).toBeInTheDocument();
      });
    });

    it('shows "Done" badge when all steps are completed', async () => {
      renderProtocols();
      await openFirstProtocol();
      const protocol = protocols[0];
      // Click all steps
      for (let i = 0; i < protocol.steps.length; i++) {
        const stepTitle = screen.getByText(new RegExp(`Step ${i + 1}: ${protocol.steps[i].title}`, 'i'));
        const container = stepTitle.closest('[class*="cursor-pointer"]') || stepTitle.parentElement.parentElement;
        fireEvent.click(container);
        await waitFor(() => document.body.textContent.length > 0);
      }
      await waitFor(() => {
        expect(screen.getByText(/Done/i)).toBeInTheDocument();
      });
    });
  });

  // ── External links ───────────────────────────
  describe('external links', () => {
    it('external link appears after expanding a protocol', async () => {
      renderProtocols();
      const execBtn = screen.getAllByRole('button').find(b =>
        b.textContent.toLowerCase().includes('execute protocol')
      );
      fireEvent.click(execBtn);
      await waitFor(() => {
        const links = screen.getAllByRole('link');
        const externalLink = links.find(l => l.getAttribute('target') === '_blank');
        expect(externalLink).toBeInTheDocument();
      });
    });
  });
});
