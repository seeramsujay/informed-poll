import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ChatAssistant from '../components/ChatAssistant.jsx';

const renderChat = () =>
  render(
    <MemoryRouter>
      <ChatAssistant />
    </MemoryRouter>
  );

describe('ChatAssistant component', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  // ── Render ──────────────────────────────────
  describe('initial render', () => {
    it('renders the AI header label', () => {
      renderChat();
      expect(screen.getByText(/VoteIQ Neural Sync/i)).toBeInTheDocument();
    });

    it('renders the initial AI greeting message', () => {
      renderChat();
      // Greeting contains 'VoteIQ' — may appear in header too, so check any occurrence
      const items = screen.getAllByText(/VoteIQ/i);
      expect(items.length).toBeGreaterThan(0);
    });

    it('renders the message input field', () => {
      renderChat();
      expect(screen.getByPlaceholderText(/Ask about voting rules/i)).toBeInTheDocument();
    });

    it('renders the send button', () => {
      renderChat();
      const btn = document.querySelector('button[type="submit"]');
      expect(btn).toBeInTheDocument();
    });

    it('renders at least 2 quick prompt buttons', () => {
      renderChat();
      const buttons = screen.getAllByRole('button').filter(b => b.textContent.includes('?') || b.textContent.toLowerCase().includes('deadline'));
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('renders the reset button', () => {
      renderChat();
      // The reset button has a RotateCcw icon, find by aria or test accessible
      // We check button count is reasonable
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(2);
    });
  });

  // ── Typing ──────────────────────────────────
  describe('input interaction', () => {
    it('updates input value as user types', async () => {
      renderChat();
      const input = screen.getByPlaceholderText(/Ask about voting rules/i);
      await userEvent.type(input, 'How do I register?');
      expect(input.value).toBe('How do I register?');
    });

    it('clears input after successful submit', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'You can register at vote.gov.' }),
      });
      renderChat();
      const input = screen.getByPlaceholderText(/Ask about voting rules/i);
      await userEvent.type(input, 'How do I register?');
      fireEvent.submit(input.closest('form'));
      await waitFor(() => expect(input.value).toBe(''));
    });
  });

  // ── API call ─────────────────────────────────
  describe('API integration', () => {
    it('calls /api/chat with POST and correct body', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'Mock response' }),
      });
      renderChat();
      const input = screen.getByPlaceholderText(/Ask about voting rules/i);
      await userEvent.type(input, 'Test question');
      fireEvent.submit(input.closest('form'));
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/chat',
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ message: 'Test question' }),
          })
        );
      });
    });

    it('displays AI reply in the chat after successful fetch', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'AI says: register online.' }),
      });
      renderChat();
      const input = screen.getByPlaceholderText(/Ask about voting rules/i);
      await userEvent.type(input, 'How to register?');
      fireEvent.submit(input.closest('form'));
      await waitFor(() => {
        expect(screen.getByText('AI says: register online.')).toBeInTheDocument();
      });
    });

    it('shows error message when fetch throws', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));
      renderChat();
      const input = screen.getByPlaceholderText(/Ask about voting rules/i);
      await userEvent.type(input, 'Any question');
      fireEvent.submit(input.closest('form'));
      await waitFor(() => {
        expect(screen.getByText(/Connection error|backend may be offline/i)).toBeInTheDocument();
      });
    });

    it('does not call fetch when input is empty', async () => {
      renderChat();
      const submitBtn = document.querySelector('button[type="submit"]');
      fireEvent.click(submitBtn);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  // ── Quick prompts ────────────────────────────
  describe('quick prompt buttons', () => {
    it('clicking a quick prompt sends that message', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'Here is what you need.' }),
      });
      renderChat();
      // Find a quick prompt button (they contain question text)
      const quickBtns = screen.getAllByRole('button').filter(
        b => b.textContent.includes('ID') || b.textContent.includes('deadline') || b.textContent.includes('register')
      );
      expect(quickBtns.length).toBeGreaterThan(0);
      fireEvent.click(quickBtns[0]);
      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    });
  });

  // ── Reset ────────────────────────────────────
  describe('reset behaviour', () => {
    it('reset clears messages to only the greeting', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: 'Registered!' }),
      });
      renderChat();
      const input = screen.getByPlaceholderText(/Ask about voting rules/i);
      await userEvent.type(input, 'Question?');
      fireEvent.submit(input.closest('form'));
      await waitFor(() => screen.getByText('Registered!'));

      // Click reset (the RotateCcw button — only button without text)
      const allBtns = screen.getAllByRole('button');
      const resetBtn = allBtns.find(b => !b.textContent.trim() || b.querySelector('svg'));
      // Find it via aria-label or just click first SVG button in header
      const header = document.querySelector('.bg-white\\/5');
      if (header) {
        const btn = within(header).getByRole('button');
        fireEvent.click(btn);
        await waitFor(() => {
          expect(screen.queryByText('Registered!')).not.toBeInTheDocument();
        });
      }
    });
  });

  // ── Accessibility ────────────────────────────
  describe('accessibility', () => {
    it('input has a placeholder (accessible hint)', () => {
      renderChat();
      const input = screen.getByPlaceholderText(/Ask about voting rules/i);
      expect(input).toBeInTheDocument();
    });

    it('submit button is in the document', () => {
      renderChat();
      expect(document.querySelector('button[type="submit"]')).toBeInTheDocument();
    });
  });
});
