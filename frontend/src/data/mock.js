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
    summary: "Initiate registration sequence via Form 6. Verify eligibility and submit documentation through ECI portals.",
    steps: [
      { title: "Check Eligibility", detail: "Must be an Indian Citizen, 18+ by the qualifying date, and ordinarily resident in the constituency. No disqualifications for unsound mind or criminal offenses." },
      { title: "Form 6 Selection", detail: "Use Form 6 for first-time registration or shifting residence. NRIs must use Form 6A. Access via NVSP portal or Voter Helpline App." },
      { title: "Document Upload", detail: "Upload passport photo (white background), proof of age (Aadhaar/PAN/Passport), and proof of residence (Bank Passbook/Aadhaar/Lease)." },
      { title: "EPIC Tracking", detail: "Upon approval, your Elector's Photo Identity Card (EPIC) is delivered via speed post. Check status using your reference number on NVSP." },
    ],
    link: "https://voters.eci.gov.in/",
    linkLabel: "Register at ECI Portal →"
  },
  {
    id: "02",
    title: "Polling Day Protocol",
    color: "secondary",
    icon: "Zap",
    summary: "Navigate the polling station hierarchy. Understand the 3-PO system and EVM/VVPAT mechanics.",
    steps: [
      { title: "PO1: Identity", detail: "First Polling Officer verifies your name on the marked electoral roll and calls it out for transparency." },
      { title: "PO2: Register & Ink", detail: "Second Polling Officer records your serial in Form 17A, takes your signature/thumbprint, and applies indelible ink." },
      { title: "PO3: Activation", detail: "Third Polling Officer collects your slip and activates the Control Unit, enabling the Balloting Unit inside the compartment." },
      { title: "VVPAT Verification", detail: "Press the blue button. Verify the printed slip for 7 seconds. Listen for the 'BEEP' confirming your vote record." },
    ],
    link: "https://www.eci.gov.in/eBooks",
    linkLabel: "View ECI Manuals →"
  },
  {
    id: "03",
    title: "Voter Rights & Red Flags",
    color: "accent",
    icon: "ShieldCheck",
    summary: "Tactical protocols for edge cases. Know how to handle missing names or impostor voting.",
    steps: [
      { title: "Tendered Vote (49P)", detail: "If someone else voted in your name, demand a physical paper ballot from the PO to ensure your voice is counted." },
      { title: "Challenge Vote (Rule 36)", detail: "If your identity is challenged, be prepared for a summary inquiry by the PO. Carry valid alternative photo ID if EPIC is missing." },
      { title: "Test Vote (49MA)", detail: "If VVPAT shows the wrong candidate, you can demand a test vote. Note: False claims carry legal penalties under IPC 177." },
      { title: "cVIGIL Reporting", detail: "Report bribes, intimidation, or MCC violations anonymously via the cVIGIL app. Action guaranteed in 100 minutes." },
    ],
    link: "https://www.eci.gov.in/cvigil-coe",
    linkLabel: "Download cVIGIL →"
  },
  {
    id: "04",
    title: "Election Audit",
    color: "white",
    icon: "Lock",
    summary: "Post-game transparency. Monitoring the transit and counting of your digital consensus.",
    steps: [
      { title: "EVM Sealing", detail: "Machines are sealed with Pink Paper Seals in the presence of polling agents before transit to Strong Rooms." },
      { title: "Strong Room Vigil", detail: "Political parties monitor the 24/7 armed perimeter of the GPS-tracked Strong Rooms until Counting Day." },
      { title: "Counting Reconciliation", detail: "Digital totals from Control Units are cross-verified with manual Form 17C records from the polling booth." },
      { title: "VVPAT Random Audit", detail: "Mandatory physical slip count for 5 randomly selected polling stations per assembly segment to ensure 100% fidelity." },
    ],
    link: "https://prsindia.org/theprsblog/how-votes-are-counted-in-indian-elections",
    linkLabel: "Counting Process Guide →"
  },
];
