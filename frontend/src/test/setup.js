import '@testing-library/jest-dom';

// Mock framer-motion — animations not needed in JSDOM
vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_, tag) => {
      const Component = ({ children, ...props }) => {
        // strip framer-specific props
        const cleanProps = Object.fromEntries(
          Object.entries(props).filter(([k]) => !['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'variants', 'layout', 'layoutId', 'drag', 'dragConstraints', 'dragElastic', 'onDragEnd'].includes(k))
        );
        return React.createElement(tag, cleanProps, children);
      };
      Component.displayName = `motion.${tag}`;
      return Component;
    },
  });
  return {
    motion,
    AnimatePresence: ({ children }) => children,
    useAnimation: () => ({ start: vi.fn() }),
  };
});

// Mock react-router-dom Link / NavLink / useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const React = require('react');
  return {
    ...actual,
    Link: ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children),
    NavLink: ({ to, children, className, ...props }) => {
      const cls = typeof className === 'function' ? className({ isActive: false }) : className;
      return React.createElement('a', { href: to, className: cls, ...props }, children);
    },
  };
});

// Mock fetch globally
global.fetch = vi.fn();

// Reset fetch mock between tests
afterEach(() => {
  vi.clearAllMocks();
});

// Stub window.matchMedia (not in JSDOM)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Stub ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Suppress noisy console errors from missing CSS vars in JSDOM
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) return;
    originalError(...args);
  };
});
afterAll(() => {
  console.error = originalError;
});
