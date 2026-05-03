/**
 * Tests for Dossier page — civic dossier content, scroll progress,
 * section navigation and external links.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dossier from '../pages/Dossier.jsx';

const renderDossier = () =>
  render(
    <MemoryRouter>
      <Dossier />
    </MemoryRouter>
  );

describe('Dossier page', () => {
  // ── Render ──────────────────────────────────
  describe('initial render', () => {
    it('renders without crashing', () => {
      expect(() => renderDossier()).not.toThrow();
    });

    it('renders the main heading CIVIC DOSSIER', () => {
      renderDossier();
      expect(screen.getByText(/CIVIC DOSSIER/i)).toBeInTheDocument();
    });

    it('renders the classified label', () => {
      renderDossier();
      expect(screen.getByText(/Classified: Electoral Intelligence/i)).toBeInTheDocument();
    });

    it('renders version badge', () => {
      renderDossier();
      expect(screen.getByText(/ECI-D\.2024\.V4/i)).toBeInTheDocument();
    });
  });

  // ── Section content ──────────────────────────
  describe('section headings', () => {
    it('renders Phase 01 heading', () => {
      renderDossier();
      expect(screen.getByText(/Decoding the Matrix/i)).toBeInTheDocument();
    });

    it('renders Phase 02 heading', () => {
      renderDossier();
      // Text appears in ToC + heading
      const matches = screen.getAllByText(/Registration & Eligibility/i);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it('renders Phase 03 heading', () => {
      renderDossier();
      // Text appears in ToC + heading
      const matches = screen.getAllByText(/The Main Event/i);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it('renders Phase 04 heading', () => {
      renderDossier();
      const matches = screen.getAllByText(/Edge Cases/i);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it('renders Phase 05 heading', () => {
      renderDossier();
      const matches = screen.getAllByText(/Post-Game/i);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });
  });

  // ── Key content ──────────────────────────────
  describe('civic content', () => {
    it('renders EVM mention', () => {
      renderDossier();
      expect(screen.getByText(/Control Unit \(CU\)/i)).toBeInTheDocument();
    });

    it('renders Form 6 information', () => {
      renderDossier();
      const matches = screen.getAllByText(/Form 6/i);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it('renders Aadhaar mention', () => {
      renderDossier();
      const matches = screen.getAllByText(/Aadhaar/i);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it('renders indelible ink section', () => {
      renderDossier();
      expect(screen.getByText(/Indelible Ink Protocol/i)).toBeInTheDocument();
    });

    it('renders VVPAT content', () => {
      renderDossier();
      const matches = screen.getAllByText(/VVPAT/i);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it('renders Model Code of Conduct', () => {
      renderDossier();
      expect(screen.getByText(/Model Code of Conduct/i)).toBeInTheDocument();
    });

    it('corrected typo: "Navigate" not "Navigat"', () => {
      renderDossier();
      expect(document.body.textContent).not.toMatch(/Navigat to NVSP/);
      expect(document.body.textContent).toMatch(/Navigate to NVSP/);
    });
  });

  // ── Table of Contents ────────────────────────
  describe('table of contents', () => {
    it('renders dispatch index nav', () => {
      renderDossier();
      expect(screen.getByText(/Dispatch Index/i)).toBeInTheDocument();
    });

    it('renders all 5 ToC links', () => {
      renderDossier();
      expect(screen.getByText(/01\. The Absolute Basics/i)).toBeInTheDocument();
      expect(screen.getByText(/02\. The Pre-Game/i)).toBeInTheDocument();
      expect(screen.getByText(/03\. The Main Event/i)).toBeInTheDocument();
      expect(screen.getByText(/04\. Edge Cases/i)).toBeInTheDocument();
      expect(screen.getByText(/05\. Post-Game/i)).toBeInTheDocument();
    });
  });

  // ── External links ───────────────────────────
  describe('external links', () => {
    it('renders ECI portal link', () => {
      renderDossier();
      const link = screen.getByRole('link', { name: /Visit ECI Portal/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://voters.eci.gov.in');
    });

    it('ECI link has noopener noreferrer', () => {
      renderDossier();
      const link = screen.getByRole('link', { name: /Visit ECI Portal/i });
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders Download Handbooks link', () => {
      renderDossier();
      const link = screen.getByRole('link', { name: /Download Handbooks/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  // ── Works Cited ──────────────────────────────
  describe('works cited', () => {
    it('renders works cited section', () => {
      renderDossier();
      expect(screen.getByText(/Works Cited/i)).toBeInTheDocument();
    });

    it('cites ECI Handbooks', () => {
      renderDossier();
      expect(screen.getByText(/ECI Handbooks/i)).toBeInTheDocument();
    });
  });
});
