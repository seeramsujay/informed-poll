import { describe, it, expect } from 'vitest';
import { candidates, timelineSteps, protocols } from '../data/mock.js';

// ─────────────────────────────────────────────
// candidates[]
// ─────────────────────────────────────────────
describe('mock data › candidates', () => {
  it('has at least 3 candidates', () => {
    expect(candidates.length).toBeGreaterThanOrEqual(3);
  });

  it('every candidate has required fields', () => {
    const REQUIRED = ['id', 'name', 'role', 'party', 'bio', 'image', 'match', 'color', 'policies', 'keyIssues'];
    candidates.forEach(c => {
      REQUIRED.forEach(field => {
        expect(c, `candidate "${c.name}" missing field "${field}"`).toHaveProperty(field);
      });
    });
  });

  it('match scores are 0–100 integers', () => {
    candidates.forEach(c => {
      expect(c.match).toBeGreaterThanOrEqual(0);
      expect(c.match).toBeLessThanOrEqual(100);
      expect(Number.isInteger(c.match)).toBe(true);
    });
  });

  it('each candidate has at least 2 policy positions', () => {
    candidates.forEach(c => {
      expect(c.policies.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('policy scores are 0–100', () => {
    candidates.forEach(c => {
      c.policies.forEach(p => {
        expect(p.score).toBeGreaterThanOrEqual(0);
        expect(p.score).toBeLessThanOrEqual(100);
      });
    });
  });

  it('candidate ids are unique', () => {
    const ids = candidates.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('image URLs are non-empty strings', () => {
    candidates.forEach(c => {
      expect(typeof c.image).toBe('string');
      expect(c.image.length).toBeGreaterThan(0);
    });
  });

  it('stance field exists and is a string', () => {
    candidates.forEach(c => {
      expect(typeof c.stance).toBe('string');
      expect(c.stance.length).toBeGreaterThan(0);
    });
  });
});

// ─────────────────────────────────────────────
// timelineSteps[]
// ─────────────────────────────────────────────
describe('mock data › timelineSteps', () => {
  it('has at least 3 steps', () => {
    expect(timelineSteps.length).toBeGreaterThanOrEqual(3);
  });

  it('each step has id, title, date, description', () => {
    timelineSteps.forEach(step => {
      expect(step).toHaveProperty('id');
      expect(step).toHaveProperty('title');
      expect(step).toHaveProperty('date');
      expect(step).toHaveProperty('description');
    });
  });

  it('exactly one step is active', () => {
    const active = timelineSteps.filter(s => s.active);
    expect(active.length).toBe(1);
  });

  it('step ids are unique', () => {
    const ids = timelineSteps.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─────────────────────────────────────────────
// protocols[]
// ─────────────────────────────────────────────
describe('mock data › protocols', () => {
  it('has exactly 4 protocols', () => {
    expect(protocols.length).toBe(4);
  });

  it('each protocol has required fields', () => {
    const REQUIRED = ['id', 'title', 'color', 'icon', 'summary', 'steps', 'link', 'linkLabel'];
    protocols.forEach(p => {
      REQUIRED.forEach(field => {
        expect(p, `protocol "${p.title}" missing "${field}"`).toHaveProperty(field);
      });
    });
  });

  it('each protocol has at least 3 steps', () => {
    protocols.forEach(p => {
      expect(p.steps.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('each step has title and detail', () => {
    protocols.forEach(protocol => {
      protocol.steps.forEach((step, i) => {
        expect(step, `protocol "${protocol.title}" step ${i} missing title`).toHaveProperty('title');
        expect(step, `protocol "${protocol.title}" step ${i} missing detail`).toHaveProperty('detail');
      });
    });
  });

  it('protocol ids are sequential strings like "01", "02"...', () => {
    protocols.forEach((p, i) => {
      const expected = String(i + 1).padStart(2, '0');
      expect(p.id).toBe(expected);
    });
  });

  it('links are valid http URLs', () => {
    protocols.forEach(p => {
      expect(p.link).toMatch(/^https?:\/\/.+/);
    });
  });
});
