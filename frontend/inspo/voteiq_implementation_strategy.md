Best Way to Build This Project
Here's the full picture — architecture, tooling, and execution order.
1. Tech Stack Decision
The prompt spec'd a single JSX file with Tailwind CDN. That's fine for a prototype, but for a real project:
Go with Vite + React + Tailwind (proper install)
npm create vite@latest voteiq -- --template react
cd voteiq
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react

Why Vite over CRA: faster HMR, smaller bundle, modern defaults. Why proper Tailwind install over CDN: you get purging (smaller CSS), JIT, and custom config access.
2. File Structure
Don't dump everything in one file even though the prompt says so. When you paste into Claude Code, tell it to split properly:
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Timeline.jsx
│   ├── CandidateStack.jsx
│   ├── ChatAssistant.jsx
│   └── Footer.jsx
├── data/
│   └── mock.js          ← candidates, timeline steps, chat messages
├── hooks/
│   └── useCandidates.js ← swipe logic isolated
├── App.jsx
└── index.css            ← Tailwind directives + custom keyframes

This way Claude Code can regenerate individual sections without touching everything else.
3. State Management
Keep it simple — no Redux, no Zustand. Just useState and useReducer at the App level, passed as props:
State Type Lives In completedSteps boolean[] App.jsx candidateIndex number App.jsx chatMessages object[] ChatAssistant.jsx (local) inputValue string ChatAssistant.jsx (local)
4. The Custom Animations Problem
Tailwind doesn't ship with the custom keyframes you need (wiggle, float, pulse-glow). Add them to tailwind.config.js, not inline style tags:
// tailwind.config.js
theme: {
  extend: {
    animation: {
      'wiggle': 'wiggle 0.4s ease-in-out',
      'float': 'float 3s ease-in-out infinite',
      'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-2deg)' },
        '50%': { transform: 'rotate(2deg)' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-8px)' },
      },
      pulseGlow: {
        '0%, 100%': { boxShadow: '0 0 10px #7c3aed' },
        '50%': { boxShadow: '0 0 25px #7c3aed, 0 0 50px #4f46e5' },
      }
    }
  }
}

Then just use className="animate-wiggle" — clean, no inline style hacks.
5. Google Fonts — Right Way
Don't inject a <style> tag inside JSX. Add to index.html:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

Then in tailwind.config.js:
fontFamily: {
  display: ['"Bebas Neue"', 'cursive'],
  body: ['"DM Sans"', 'sans-serif'],
}

Use as font-display and font-body classes.
6. Build Order (Critical)
Do sections in this order — each unlocks the next:


mock.js first — define all candidate data, timeline steps, chat messages. Everything else reads from this.

App.jsx shell — layout skeleton, state declarations, pass props down.

Navbar + Hero — gets the visual tone locked in early. If this looks wrong, stop and fix before continuing.

Timeline — mostly presentational, good warmup for the bento grid CSS.

CandidateStack — the hardest part. The stacked card z-index + rotation + swipe state is the trickiest UI. Isolate its logic in useCandidates.js.

ChatAssistant — second hardest. Mock the data first, wire input last.

Footer — easiest, do it last.
7. The Candidate Stack — How to Actually Build It
This is where most people get it wrong. Don't use absolute positioning on all three cards relative to a container — the layout breaks on mobile. Instead:
// Render all 3 cards in a relative container
// Top card: z-30, no rotation, full opacity
// Middle card: z-20, rotate-2, scale-95, opacity-80, translateY-2
// Bottom card: z-10, -rotate-2, scale-90, opacity-60, translateY-4

Calculate which card is "top" based on candidateIndex % candidates.length. On "Pass" or "Save", increment index and trigger the wiggle animation via a className toggle with a setTimeout reset.
8. Responsiveness Strategy
The bento grid (sections 3+4 side by side) should use CSS Grid, not Flex:
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <CandidateStack />
  <ChatAssistant />
</div>

The timeline section uses a horizontal scroll on mobile:
<div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">

9. When to Use Claude Code vs Claude Chat
Task Use Generate the full component skeleton Claude Code (paste the prompt) Fix a specific broken section Claude Code (describe just that section) Debug why an animation isn't working Claude Chat (explain, then take fix to Claude Code) Design decisions / architecture questions Claude Chat
10. The One Mistake to Avoid
Don't try to build the real Gemini API integration in the first pass. Mock the chat responses with a setTimeout + hardcoded reply array. The UI/UX is the hard part — the API wiring is 20 lines once the shell is working. Ship the visual first, wire the brains second.

design accordingly

UI Elements Breakdown
Every section, every element, what it is, what it does, and what state/behavior it has.
Navbar
One <nav> fixed to the top. Inside it, three things in a row:


Logo — just a styled <span> with text "VOTEIQ". No image, no SVG. Clicking it scrolls to top.

Nav links — a <ul> with anchor tags. On mobile this entire list is hidden (hidden md:flex). No hamburger menu needed for this project unless you want to add one later.

Button group — two <button> elements side by side. "Log In" is a ghost button (just a border, no fill). "Get Started" is a filled gradient button. These don't do anything functional yet — placeholders.
The navbar itself needs position: fixed, width: full, z-50, and a backdrop-blur so content scrolls behind it without it looking broken.
Hero Section
One tall <section> that takes up roughly the full viewport height (min-h-screen). Everything inside is centered with flexbox column.
Floating badge — a <div> styled as a pill. Just a <span> with text and an emoji inside. It has the float animation on it. No interactivity.
Headline — an <h1>. The gradient text effect is done with three Tailwind classes together: bg-clip-text, text-transparent, and bg-gradient-to-b. The text itself is just a string, possibly with a <br /> to force a line break.
Subheadline — a <p> tag. No special behavior.
CTA buttons — two <button> elements inside a flex row. Primary button has a Lucide ArrowRight icon inside it using <ArrowRight size={16} />. Secondary button has a <Play size={16} /> icon. Neither button routes anywhere yet — onClick handlers are empty or console.log placeholders.
Stat pills — a flex row of three <div> elements. Each is just text with an emoji prefix. No state, no interactivity.
Timeline Section
Section header — an <h2> with a decorative underline. The underline is a <div> with a fixed width and gradient background placed directly below the h2 inside a flex column container. Not a CSS text-decoration — an actual DOM element so you can control its color and glow independently.
Timeline container — on mobile, a <div> with flex flex-col gap-4. On desktop, flex flex-row overflow-x-auto gap-4. The horizontal scroll on desktop is intentional for the cinematic feel.
Connector lines — these sit between cards. Each is a <div> with a fixed height of 2px, a gradient background, and flex-1 to stretch between cards. On mobile they become vertical (rotate or change to w-2px h-8). They are purely decorative divs, no interactivity.
Each Timeline Card — a <div> styled as a glassmorphism card. Inside it:


A faded watermark number — an <span> with huge font size, very low opacity, positioned absolute behind the content

A Lucide icon component (Calendar, Mail, Clock, Flag)

A bold <h3> title

A <span> styled as a pill for the date — inline-flex with padding and a teal background

A <p> for the description

A status badge — another <span> pill, color changes based on status
Card click behavior — each card has an onClick that calls toggleStep(index). This flips completedSteps[index] between true and false in state. When true, the status badge changes from "Action Required" to "Done" and changes color from orange to green.
Candidate Stack Section
This is the most structurally complex part.
Section header — same pattern as timeline. <h2> + subtitle <p>.
Stack container — a <div> with position: relative and a fixed height (e.g., h-96). This is the boundary box. All three cards are position: absolute inside it and stacked via z-index.
Each candidate card — a <div> with absolute positioning. The top card has no rotation. The second card has rotate-2 and slight scale down. The third has -rotate-3 and more scale down. You calculate which card gets which treatment based on offset from candidateIndex.
Inside each card:


An image placeholder — a <div> with a gradient background and an aspect ratio, or a gray box with a <User /> icon centered in it

Candidate name — <h3>

Party tag — a <span> pill

Three policy bullets — a <ul> with <li> items, each with an emoji or Lucide icon prefix
Wiggle behavior — a boolean state isWiggling. When the top card is hovered, set it to true. A useEffect with a setTimeout of 400ms sets it back to false. The card has animate-wiggle class applied conditionally: className={isWiggling ? 'animate-wiggle' : ''}.
Action buttons — two <button> elements below the stack inside a flex row centered:


Pass button: onClick increments candidateIndex by 1, triggers wiggle

Save button: onClick increments candidateIndex by 1, could push to a saved array in state
Progress bar — a <div> container with three child <div> segments. Each segment is colored based on whether it's been visited. Text below says "X candidates remaining" computed from state.
Chat Assistant Section
Outer card — a glassmorphism <div> with a fixed height and overflow-hidden. It's a grid with three rows: header, message area, input area.
Header — a <div> with an <h3> title and a <p> subtitle. May include a small animated green dot (<span> with animate-pulse) to indicate "live".
Message area — a <div> with overflow-y-auto and flex flex-col gap-3. It contains a list of message objects rendered with .map(). Each message object has { role: 'user' | 'ai', text: string }.
Each message renders as a <div> with conditional alignment:


User messages: ml-auto (pushes right), violet gradient background, white text

AI messages: mr-auto, dark background with a teal left border (border-l-2 border-teal-400), a small avatar dot
useEffect for scroll — a useRef on the message container bottom. Whenever chatMessages state changes, ref.current.scrollIntoView({ behavior: 'smooth' }) runs. This keeps the view pinned to the latest message.
Input area — a <div> flex row at the bottom. Contains:


A <Mic /> icon button on the left (decorative, no function yet)

A <input type="text" /> in the middle taking flex-1. Its value is bound to inputValue state and onChange updates it

A send <button> on the right with <Send /> icon
Send behavior — onClick on send button (and onKeyDown Enter on input): pushes the current inputValue as a user message into chatMessages, clears input, then after a 1 second setTimeout pushes a hardcoded mock AI reply from a response array.
Footer
A <footer> with text-center. Inside:


Big <h2> headline in display font

<p> subtext

One CTA <button> (same as hero primary button, reusable component ideally)

A <div> with small <a> links separated by · characters
No state, no interactivity beyond button hover effects.
Summary Table
Element Tag Has State Interactive Navbar nav No Scroll anchor Floating badge div > span No No Hero headline h1 No No CTA buttons button No Hover glow Timeline cards div completedSteps[] Click to toggle Connector lines div No No Candidate stack div (absolute) candidateIndex, isWiggling Hover wiggle Pass / Save buttons button Writes to above Click to advance Progress bar div segments Reads from above No Chat messages div list chatMessages[] No Chat input input inputValue Type + Enter/Send Footer CTA button No Hover glow.