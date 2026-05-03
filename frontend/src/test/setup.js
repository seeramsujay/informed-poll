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
    useScroll: () => ({ scrollYProgress: { get: () => 0, set: vi.fn(), on: vi.fn(), destroy: vi.fn() } }),
    useSpring: (v) => v ?? { get: () => 0 },
    useInView: () => true,
    useMotionValue: (initial) => ({ get: () => initial, set: vi.fn(), on: vi.fn() }),
  };
});

// Mock Firebase
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn(() => vi.fn()), // returns unsubscribe fn
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  signOut: vi.fn(),
  signInWithEmailAndPassword: vi.fn((auth, email) => {
    if (email === 'notanemail') {
      return Promise.reject({ message: 'Firebase: Invalid email format', code: 'auth/invalid-email' });
    }
    return Promise.resolve({ user: { uid: 'mock-uid' } });
  }),
  createUserWithEmailAndPassword: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
}));

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

// Mock AuthContext
vi.mock('../context/AuthContext.jsx', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    loginWithGoogle: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }) => children,
}));

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
