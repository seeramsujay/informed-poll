export const candidates = [
  {
    id: 1,
    name: "Alex Rivers",
    role: "System Architect",
    party: "Progressive Network",
    bio: "Focusing on infrastructure parity and the 'Kinetic Economy'. No partisan lines, just raw system efficiency.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=600",
    match: 84,
    color: "#bd9dff",
    stance: "left",
    policies: [
      { label: "Healthcare", position: "Universal public option alongside private insurance", score: 80 },
      { label: "Climate", position: "Net-zero by 2040 via carbon tax and renewables subsidy", score: 90 },
      { label: "Economy", position: "Expand worker cooperatives, progressive corporate tax", score: 75 },
      { label: "Education", position: "Tuition-free community college, student debt relief", score: 85 },
    ],
    keyIssues: ["Infrastructure", "Climate", "Labor Rights"],
    website: "https://example.com",
  },
  {
    id: 2,
    name: "Jordan Vance",
    role: "Digital Sovereign",
    party: "Centrist Coalition",
    bio: "Focused on digital sovereignty and environmental restoration. We don't build walls; we build nodes.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=600",
    match: 72,
    color: "#62fae3",
    stance: "center",
    policies: [
      { label: "Healthcare", position: "Public-private hybrid, lower prescription costs", score: 60 },
      { label: "Climate", position: "Market-led clean energy transition, innovation incentives", score: 65 },
      { label: "Economy", position: "Balanced budget, targeted small business grants", score: 70 },
      { label: "Education", position: "Merit-based scholarships, trade school investment", score: 55 },
    ],
    keyIssues: ["Tech Governance", "Digital Rights", "Defense"],
    website: "https://example.com",
  },
  {
    id: 3,
    name: "Elena Martinez",
    role: "Liquidity Expert",
    party: "Freedom Platform",
    bio: "Economic fluidity through decentralized finance. We empower the individual to outpace the institution.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=600",
    match: 91,
    color: "#ffb690",
    stance: "right",
    policies: [
      { label: "Healthcare", position: "Deregulate markets, health savings accounts, price transparency", score: 40 },
      { label: "Climate", position: "Tech-led adaptation, oppose carbon tax, nuclear expansion", score: 45 },
      { label: "Economy", position: "Flat tax, deregulation, reduce federal spending", score: 85 },
      { label: "Education", position: "School choice, voucher programs, charter expansion", score: 80 },
    ],
    keyIssues: ["Economic Freedom", "Deregulation", "Individual Rights"],
    website: "https://example.com",
  }
];

export const timelineSteps = [
  { id: 1, title: "Primary Ballot Locking", date: "Nov 15, 2024", active: true, description: "Last day to register to vote in most states." },
  { id: 2, title: "National Policy Debate", date: "Dec 01, 2024", active: false, description: "Final televised debate before election day." },
  { id: 3, title: "Early Voting Opens", date: "Dec 08, 2024", active: false, description: "In-person early voting opens in 47 states." },
  { id: 4, title: "Final Tally Release", date: "Dec 15, 2024", active: false, description: "Official results certified." }
];

export const protocols = [
  {
    id: "01",
    title: "Voter Registration",
    color: "primary",
    icon: "UserCheck",
    summary: "Initiate registration sequence. Verify eligibility and submit documentation before your state deadline.",
    steps: [
      { title: "Check Eligibility", detail: "You must be a US citizen, 18+ by election day, and a resident of your state. Most states allow pre-registration at 16–17." },
      { title: "Gather Documents", detail: "You'll need your SSN or state ID number. Some states also require proof of residency (utility bill, bank statement)." },
      { title: "Register Online or by Mail", detail: "Visit vote.org or your state's Secretary of State website. Deadlines vary: 15–30 days before election in most states, same-day in others." },
      { title: "Confirm Your Registration", detail: "Check your status at vote.org/am-i-registered. Allow 2–4 weeks for processing." },
    ],
    link: "https://vote.org/register-to-vote/",
    linkLabel: "Register at Vote.org →"
  },
  {
    id: "02",
    title: "Ballot Tracking",
    color: "secondary",
    icon: "MapPin",
    summary: "Real-time telemetry on mail-in ballots. Monitor transit status, receipt verification, and final counting.",
    steps: [
      { title: "Request Mail-In Ballot", detail: "Apply through your state's elections website. Deadlines are typically 7–15 days before election day." },
      { title: "Track Ballot Status", detail: "Use BallotTrax or your state's portal to monitor: Sent → Received → Accepted → Counted." },
      { title: "Complete Your Ballot", detail: "Read all instructions carefully. Sign the envelope exactly as your registration. Missing signatures are the #1 rejection cause." },
      { title: "Return It Safely", detail: "Mail early (allow 1 week), use an official drop box, or hand-deliver to your elections office. Never give your ballot to a third party." },
    ],
    link: "https://www.ballotready.org/",
    linkLabel: "Track at BallotTrax →"
  },
  {
    id: "03",
    title: "Polling Locations",
    color: "accent",
    icon: "Navigation",
    summary: "Identify nearest voting nodes. Access wait-time analytics, accessibility features, and required ID.",
    steps: [
      { title: "Find Your Polling Place", detail: "Search at vote.gov or your county clerk's website. Your location is assigned by your registered address." },
      { title: "Know Your Hours", detail: "Most polls open 6 AM–8 PM. Anyone in line by closing time must be allowed to vote. Early voting may extend hours." },
      { title: "Bring Required ID", detail: "Strict ID states: photo ID required. Non-strict: other docs accepted. Check your state's exact rules at NCSL.org." },
      { title: "Handle Issues On-Site", detail: "If your name is missing, request a provisional ballot. Contact your state's voter protection hotline if denied: 1-866-OUR-VOTE." },
    ],
    link: "https://vote.gov/find-your-polling-place/",
    linkLabel: "Find Polling Place →"
  },
  {
    id: "04",
    title: "Election Day",
    color: "white",
    icon: "Zap",
    summary: "Final execution phase. Rights info, early voting locations, and emergency contact channels.",
    steps: [
      { title: "What to Bring", detail: "ID (check state rules), your sample ballot, and water. Wearing candidate gear within 100 ft of polling place may be illegal — check local rules." },
      { title: "Your Rights at the Polls", detail: "You cannot be turned away due to language barriers (translators available). You can vote if registered even if NOT on a poll book (provisional ballot)." },
      { title: "Observe & Report", detail: "Take notes on problems. Photo/video inside polling places is illegal in most states. Call 1-866-OUR-VOTE for violations." },
      { title: "After You Vote", detail: "Keep your 'I Voted' stub as proof. Results aren't final on election night — mail-ins may take days. Trust the process." },
    ],
    link: "https://vote.gov/",
    linkLabel: "Full Guide at Vote.gov →"
  },
];
