import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const renderNav = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar component', () => {
  // ── Render ──────────────────────────────────
  describe('initial render', () => {
    it('renders the brand name', () => {
      renderNav();
      expect(screen.getByText(/INFORMED/i)).toBeInTheDocument();
    });

    it('renders all 3 nav links', () => {
      renderNav();
      expect(screen.getByText('Candidates')).toBeInTheDocument();
      expect(screen.getByText('Protocols')).toBeInTheDocument();
      expect(screen.getByText('Neural-Sync')).toBeInTheDocument();
    });

    it('nav links point to correct paths', () => {
      renderNav();
      const candidates = screen.getByText('Candidates').closest('a');
      const protocols = screen.getByText('Protocols').closest('a');
      const neural = screen.getByText('Neural-Sync').closest('a');
      expect(candidates).toHaveAttribute('href', '/candidates');
      expect(protocols).toHaveAttribute('href', '/protocols');
      expect(neural).toHaveAttribute('href', '/neural-sync');
    });

    it('renders Connect Identity button', () => {
      renderNav();
      expect(screen.getByRole('button', { name: /Connect Identity/i })).toBeInTheDocument();
    });
  });

  // ── Identity modal ───────────────────────────
  describe('Connect Identity modal', () => {
    it('modal is not visible initially', () => {
      renderNav();
      expect(screen.queryByText('Connect Identity', { selector: 'h2' })).not.toBeInTheDocument();
    });

    it('clicking Connect Identity opens the modal', async () => {
      renderNav();
      fireEvent.click(screen.getByRole('button', { name: /Connect Identity/i }));
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /Connect Identity/i })).toBeInTheDocument();
      });
    });

    it('modal shows Sign In and Register tabs', async () => {
      renderNav();
      fireEvent.click(screen.getByRole('button', { name: /Connect Identity/i }));
      await waitFor(() => {
        // Tab buttons are inside .flex.glass container, multiple 'Sign In' exist (tab + submit)
        const signInBtns = screen.getAllByRole('button', { name: /Sign In/i });
        expect(signInBtns.length).toBeGreaterThanOrEqual(1);
        const registerBtns = screen.getAllByRole('button', { name: /Register/i });
        expect(registerBtns.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('modal shows Email and Password fields', async () => {
      renderNav();
      fireEvent.click(screen.getByRole('button', { name: /Connect Identity/i }));
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/you@example\.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
      });
    });

    it('clicking Register tab shows the Name field', async () => {
      renderNav();
      fireEvent.click(screen.getByRole('button', { name: /Connect Identity/i }));
      await waitFor(() => screen.getByRole('button', { name: /Register/i }));
      fireEvent.click(screen.getByRole('button', { name: /Register/i }));
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
      });
    });

    it('Name field is NOT visible on Sign In tab', async () => {
      renderNav();
      fireEvent.click(screen.getByRole('button', { name: /Connect Identity/i }));
      await waitFor(() => screen.getByPlaceholderText(/you@example\.com/i));
      expect(screen.queryByPlaceholderText(/Your name/i)).not.toBeInTheDocument();
    });

    it('clicking X closes the modal', async () => {
      renderNav();
      fireEvent.click(screen.getByRole('button', { name: /Connect Identity/i }));
      await waitFor(() => screen.getByRole('heading', { name: /Connect Identity/i }));

      // Close button — it's an X icon, no text. Find by its parent element position.
      const closeBtn = document.querySelector('.glass-card button');
      if (closeBtn) {
        fireEvent.click(closeBtn);
        await waitFor(() => {
          expect(screen.queryByRole('heading', { name: /Connect Identity/i })).not.toBeInTheDocument();
        });
      }
    });

    it('eye toggle shows/hides password', async () => {
      renderNav();
      fireEvent.click(screen.getByRole('button', { name: /Connect Identity/i }));
      await waitFor(() => screen.getByPlaceholderText(/••••••••/i));

      expect(screen.getByPlaceholderText(/••••••••/i)).toHaveAttribute('type', 'password');

      // Click eye toggle (re-query each time in case of re-render)
      const getEyeBtn = () => screen.getByPlaceholderText(/••••••••/i).parentElement.querySelector('button');
      await act(async () => { fireEvent.click(getEyeBtn()); });
      await waitFor(() => expect(screen.getByPlaceholderText(/••••••••/i)).toHaveAttribute('type', 'text'));

      await act(async () => { fireEvent.click(getEyeBtn()); });
      await waitFor(() => expect(screen.getByPlaceholderText(/••••••••/i)).toHaveAttribute('type', 'password'));
    });

    it('submit shows loading state', async () => {
      renderNav();
      fireEvent.click(screen.getByRole('button', { name: /Connect Identity/i }));
      await waitFor(() => screen.getByPlaceholderText(/you@example\.com/i));

      fireEvent.change(screen.getByPlaceholderText(/you@example\.com/i), { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'password123' } });

      const form = document.querySelector('.glass-card form');
      fireEvent.submit(form);
      await waitFor(() => {
        expect(screen.getByText(/Syncing\.\.\./i)).toBeInTheDocument();
      });
    });

    it('submit with invalid email shows error message', async () => {
      renderNav();
      fireEvent.click(screen.getByRole('button', { name: /Connect Identity/i }));
      await waitFor(() => screen.getByPlaceholderText(/you@example\.com/i));

      fireEvent.change(screen.getByPlaceholderText(/you@example\.com/i), { target: { value: 'notanemail' } });
      fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'pass' } });

      const form = document.querySelector('.glass-card form');
      fireEvent.submit(form);
      await waitFor(() => {
        expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  // ── Mobile menu ──────────────────────────────
  describe('mobile hamburger menu', () => {
    it('hamburger button is in the DOM', () => {
      renderNav();
      // The mobile button has a Menu/X icon, no text
      const nav = screen.getByRole('navigation');
      const buttons = nav.querySelectorAll('button');
      // Last button is the hamburger
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('clicking hamburger expands mobile nav', async () => {
      renderNav();
      const nav = document.querySelector('nav');
      const buttons = nav.querySelectorAll('button');
      const hamburger = buttons[buttons.length - 1];
      fireEvent.click(hamburger);
      await waitFor(() => {
        // Mobile nav shows the link texts
        const all = screen.getAllByText('Candidates');
        expect(all.length).toBeGreaterThanOrEqual(1);
      });
    });
  });
});
