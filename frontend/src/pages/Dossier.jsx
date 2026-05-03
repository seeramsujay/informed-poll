import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  BookOpen, 
  ShieldCheck, 
  Fingerprint, 
  FileText, 
  Lock, 
  Search, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  Cpu,
  Smartphone,
  MapPin,
  ChevronRight,
  Info,
  Hash,
  Scale,
  ExternalLink,
  Zap
} from 'lucide-react';

const TableOfContents = ({ activeSection }) => {
  const sections = [
    { id: 'basics', title: '01. The Absolute Basics' },
    { id: 'pregame', title: '02. The Pre-Game' },
    { id: 'mainevent', title: '03. The Main Event' },
    { id: 'edgecases', title: '04. Edge Cases & Rights' },
    { id: 'postgame', title: '05. Post-Game & Audit' },
  ];

  return (
    <nav className="hidden xl:block sticky top-32 w-64 self-start space-y-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-6">Dispatch Index</p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`block text-xs font-bold uppercase tracking-widest transition-all ${
            activeSection === s.id ? 'text-[var(--primary)] translate-x-2' : 'text-white/40 hover:text-white'
          }`}
        >
          {s.title}
        </a>
      ))}
      <div className="pt-8">
        <div className="h-px w-12 bg-[var(--primary)]/30" />
      </div>
    </nav>
  );
};

const ProTip = ({ children }) => (
  <div className="my-12 p-8 border-l-2 border-[var(--primary)] bg-[var(--primary)]/5 space-y-3">
    <div className="flex items-center gap-2 text-[var(--primary)]">
      <Zap className="w-4 h-4 fill-[var(--primary)]" />
      <span className="text-[10px] font-bold uppercase tracking-widest">Tactical Insight</span>
    </div>
    <p className="text-white/80 text-sm leading-relaxed italic font-medium">
      "{children}"
    </p>
  </div>
);

const Dossier = () => {
  const [activeSection, setActiveSection] = useState('basics');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['basics', 'pregame', 'mainevent', 'edgecases', 'postgame'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPos && element.offsetTop + element.offsetHeight > scrollPos) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] selection:bg-[var(--primary)] selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--primary)] z-[200] origin-left"
        style={{ scaleX }}
      />

      <main className="relative z-10 px-6 lg:px-12 max-w-[1800px] mx-auto py-24">
        {/* Header Section */}
        <header className="max-w-4xl mx-auto mb-32 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[var(--primary)]"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--primary)]">Classified: Electoral Intelligence</span>
            </div>
            <h1 className="font-display text-7xl md:text-9xl uppercase italic tracking-tighter leading-[0.8] text-white">
              THE ZERO-TO-HERO <br />
              <span className="text-[var(--primary)]">CIVIC DOSSIER</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between pt-8">
              <p className="text-white/40 text-lg max-w-xl font-light leading-relaxed">
                A comprehensive codification of the exact rules, procedural logistics, and statutory frameworks governing the Indian electoral process.
              </p>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Version</p>
                <p className="text-xl font-display uppercase italic text-white">ECI-D.2024.V4</p>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="flex gap-24">
          <TableOfContents activeSection={activeSection} />

          <div className="flex-1 max-w-4xl space-y-32 pb-64">
            {/* Phase 1 */}
            <section id="basics" className="scroll-mt-32 space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-[0.3em]">Phase 01</span>
                <h2 className="font-display text-5xl md:text-7xl uppercase italic tracking-tighter text-white">Decoding the Matrix</h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  To participate effectively, you must first comprehend the structural hierarchy and the administrative safeguards that ensure free and fair elections. The system relies on a decentralized design where core steps are accounted for at the Polling Station (PS) level.
                </p>
              </div>

              <div className="space-y-12 text-white/50 leading-relaxed">
                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic flex items-center gap-3">
                    <Hash className="w-5 h-5 text-[var(--primary)]" /> Constituencies & Hierarchy
                  </h3>
                  <p>
                    A <strong>"Constituency"</strong> is a geographically defined area in which residents vote to elect a representative. The territorial mapping is updated periodically by the Delimitation Commission based on census data.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/5 p-8 bg-white/[0.02]">
                    <div className="space-y-2">
                      <h4 className="text-white text-sm font-bold uppercase tracking-widest">Lok Sabha</h4>
                      <p className="text-xs">Federal level. 543 Parliamentary Constituencies. Determines the Prime Minister and Central Government.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white text-sm font-bold uppercase tracking-widest">Vidhan Sabha</h4>
                      <p className="text-xs">State level. Multiple Assembly Constituencies per state. Determines the Chief Minister and State Government.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-[var(--primary)]" /> Journey of a Vote
                  </h3>
                  <p>
                    When you cast a vote, the data is recorded in the <strong>Control Unit (CU)</strong> of the EVM. Simultaneously, the <strong>VVPAT</strong> printer generates a physical slip for an independent audit mechanism.
                  </p>
                  <p>
                    The machines are devoid of external network connectivity and run on alkaline batteries, ensuring immunity from cyber interception and power grid failures. Post-poll, they are sealed with <strong>Pink Paper Seals</strong> and stored in armed 24/7 guarded strong rooms.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[var(--primary)]" /> Model Code of Conduct (MCC)
                  </h3>
                  <p>
                    The MCC is a self-regulatory set of operational norms enforced from the moment elections are announced. It dictates strict parameters for general conduct and campaigning.
                  </p>
                  <ul className="list-none space-y-4 border-l border-[var(--primary)]/20 pl-6 text-sm">
                    <li>• Ruling parties are prohibited from using official state resources for campaigns.</li>
                    <li>• No new financial grants or infrastructural project announcements during the window.</li>
                    <li>• Utilities must function without political fanfare or functionaries.</li>
                  </ul>
                </div>
              </div>

              <ProTip>
                The MCC is the ultimate equalizer. If a ruling politician suddenly promises a massive cash handout for a district the day after elections are announced, that is a direct MCC violation.
              </ProTip>
            </section>

            {/* Phase 2 */}
            <section id="pregame" className="scroll-mt-32 space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-[0.3em]">Phase 02</span>
                <h2 className="font-display text-5xl md:text-7xl uppercase italic tracking-tighter text-white">Registration & Eligibility</h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  The foundation of a free and fair election rests upon an inclusive, pure, and transparently prepared electoral roll. The ECI ensures inclusion of all eligible citizens while rigorously purifying the roll.
                </p>
              </div>

              <div className="space-y-12 text-white/50 leading-relaxed">
                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic">The Four Pillars of Eligibility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { t: 'Citizenship', d: 'Must be a citizen of India. Non-citizens are disqualified under Article 326 of the Constitution read with Section 16 of the RP Act, 1950. NRIs who have not acquired other citizenship remain eligible.' },
                      { t: 'Age Threshold', d: 'Must be 18 years of age on the "qualifying date" (historically Jan 1st of the revision year).' },
                      { t: 'Ordinary Residence', d: 'Must be resident in the constituency. Homeless citizens are eligible after field verification. Students can enroll at parents\' address or hostel.' },
                      { t: 'Disqualifications', d: 'Unsound mind (as declared by court) or criminal electoral offenses bar registration.' }
                    ].map(p => (
                      <div key={p.t} className="p-6 border border-white/5 bg-white/[0.01]">
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-2">{p.t}</h4>
                        <p className="text-xs leading-relaxed">{p.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[var(--primary)]" /> Mastering Form 6
                  </h3>
                  <p>
                    <strong>Form 6</strong> is the primary statutory application. The process requires specific evidentiary elements: unsigned passport photo (4.5x3.5cm), valid proof of age, and proof of residence.
                  </p>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-4">
                      <span className="text-[var(--primary)] font-bold">01</span>
                      <p><strong>Account Creation:</strong> Navigate to NVSP or download the Voter Helpline App. Verify via OTP.</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[var(--primary)] font-bold">02</span>
                      <p><strong>Form Selection:</strong> Select "New Voter Registration". Ensure names are provided in both English and official state language to avoid transliteration errors.</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[var(--primary)] font-bold">03</span>
                      <p><strong>Aadhaar Auth:</strong> Furnishing Aadhaar is optional but recommended. If not available, a formal declaration is required.</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[var(--primary)] font-bold">04</span>
                      <p><strong>Tracking:</strong> System generates a reference number. EPIC (Voter ID) is delivered free of cost via speed post post-enrollment.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic">Valid Identity Proofs</h3>
                  <p className="text-xs">While EPIC is primary, ECI permits 12 alternate documents if your name is on the roll:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      'Aadhaar Card', 'PAN Card', 'Indian Passport', 'Driving License', 'MNREGA Job Card',
                      'Bank/Post Office Passbook', 'Health Insurance Smart Card', 'NPR Smart Card',
                      'Pension Document', 'Service Identity Card', 'Official ID for MPs/MLAs', 'UDID Card'
                    ].map(doc => (
                      <div key={doc} className="px-4 py-2 border border-white/5 text-[10px] uppercase tracking-widest text-white/40">
                        {doc}
                      </div>
                    ))}
                  </div>
                  <ProTip>
                    Photo Voter Slips distributed by BLOs are for finding your booth—they are NOT valid standalone proof of identity inside the booth.
                  </ProTip>
                </div>

                <div className="space-y-4 bg-[var(--primary)]/5 p-8 border border-[var(--primary)]/20">
                  <h4 className="text-white font-display text-xl uppercase italic">Statutory Warning</h4>
                  <p className="text-xs italic leading-relaxed">
                    Providing a false statement in Form 6 is a punishable offense under Section 31 of the RP Act 1950, carrying a penalty of up to one year of imprisonment.
                  </p>
                </div>
              </div>
            </section>

            {/* Phase 3 */}
            <section id="mainevent" className="scroll-mt-32 space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-[0.3em]">Phase 03</span>
                <h2 className="font-display text-5xl md:text-7xl uppercase italic tracking-tighter text-white">The Main Event</h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  The physical polling station is a highly regulated, high-security environment governed by the Conduct of Elections Rules, 1961. Access is strictly limited to authorized personnel.
                </p>
              </div>

              <div className="space-y-12 text-white/50 leading-relaxed">
                <div className="space-y-8">
                  <h3 className="text-white font-display text-3xl uppercase italic">Booth Personnel & Flow</h3>
                  <div className="space-y-12 relative">
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--primary)]/20" />
                    {[
                      { n: 'PO1', t: 'Verification', d: 'Manages the marked electoral roll. Verifies identity and calls out your serial number for polling agents.' },
                      { n: 'PO2', t: 'Register & Ink', d: 'Records serial in Form 17A, secures your signature, and applies indelible ink to your left forefinger.' },
                      { n: 'PO3', t: 'Activation', d: 'Custodian of the Control Unit. Collects your slip and presses the "Ballot" button to activate the voting compartment.' }
                    ].map(p => (
                      <div key={p.n} className="relative pl-16">
                        <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-[#15121b] border border-[var(--primary)] flex items-center justify-center font-display text-lg text-[var(--primary)]">
                          {p.n}
                        </div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">{p.t}</h4>
                        <p className="text-sm">{p.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic">EVM & VVPAT Mechanics</h3>
                  <p>
                    Beside each candidate profile is a blue button. When pressed:
                  </p>
                  <ol className="list-decimal list-inside space-y-4 text-sm pl-4">
                    <li><strong>Visual Verification:</strong> Red LED glows next to the candidate on the BU.</li>
                    <li><strong>The 7-Second Window:</strong> VVPAT slip containing name and symbol is visible for exactly seven seconds.</li>
                    <li><strong>Auditory Confirmation:</strong> Printed slip drops into the sealed box, followed by a loud, sustained "beep".</li>
                  </ol>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic flex items-center gap-3">
                    <Fingerprint className="w-5 h-5 text-[var(--primary)]" /> Indelible Ink Protocol
                  </h3>
                  <p>
                    Mandatory anti-fraud measure under <strong>Rule 49K</strong> of the Conduct of Elections Rules, 1961. It contains silver nitrate, which reacts with skin salt and UV light to create a mark that cannot be washed off for weeks.
                  </p>
                  <div className="p-6 border border-white/5 bg-white/[0.01] text-xs space-y-2">
                    <p><strong>Application:</strong> Painted with a brush as a continuous line from top of nail to bottom of first joint.</p>
                    <p><strong>Exceptions:</strong> If no left forefinger, next sequential finger. If no left hand, right hand. If no fingers, the extremity (stump) of the arm (Rule 43).</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Phase 4 */}
            <section id="edgecases" className="scroll-mt-32 space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-[0.3em]">Phase 04</span>
                <h2 className="font-display text-5xl md:text-7xl uppercase italic tracking-tighter text-white">Edge Cases & Rights</h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  The electoral architecture anticipates anomalies and subversion. Equip yourself with the protocols to navigate these specific red flags under the 1961 Conduct of Elections Rules.
                </p>
              </div>

              <div className="space-y-12 text-white/50 leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 p-8 border border-white/5 hover:border-[var(--primary)]/30 transition-colors">
                    <h4 className="text-white font-display text-2xl uppercase italic">Tendered Votes (Section 49P)</h4>
                    <p className="text-xs leading-relaxed">
                      If an impostor has already voted in your name, you discover a signature next to your entry. You are issued a <strong>physical paper ballot</strong>. It is sealed in a specialized envelope and used as judicial evidence if the margin is narrow (Section 49P).
                    </p>
                  </div>
                  <div className="space-y-4 p-8 border border-white/5 hover:border-[var(--primary)]/30 transition-colors">
                    <h4 className="text-white font-display text-2xl uppercase italic">Challenge Votes (Rule 36)</h4>
                    <p className="text-xs leading-relaxed">
                      Polling agents can challenge an identity by depositing <strong>₹2 in cash</strong>. The PO conducts a summary inquiry, warnings of penal consequences, and requires entry in Form 14 (Rule 36).
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-[var(--accent)]" /> Rule 49MA: Test Vote
                  </h3>
                  <p>
                    If the VVPAT prints a different slip than selected, Rule 49MA applies. You must submit a written declaration. The PO initiates a "Test Vote" in the presence of agents.
                  </p>
                  <div className="p-6 bg-red-500/5 border border-red-500/20 text-xs italic">
                    Note: If proven false, you are liable for prosecution under Section 177 of the IPC. This provision serves to deter frivolous attempts to stall polling.
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[var(--secondary)]" /> cVIGIL Surveillance
                  </h3>
                  <p>
                    Anonymous reporting of MCC violations. Media must be captured <strong>live</strong> to prevent doctored uploads. ECI's GIS/GPS technology tracks precise locations with a <strong>100-minute resolution timeline</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* Phase 5 */}
            <section id="postgame" className="scroll-mt-32 space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-[0.3em]">Phase 05</span>
                <h2 className="font-display text-5xl md:text-7xl uppercase italic tracking-tighter text-white">Post-Game & Audit</h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  Integrity depends on the inviolability of hardware. The process follows a rigid, statutorily defined chronological sequence from strong rooms to declaration (Form 21E).
                </p>
              </div>

              <div className="space-y-12 text-white/50 leading-relaxed">
                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic">Securing the Tally</h3>
                  <p>
                    VVPAT knobs are rotated to "Lock" to prevent unspooling during transit. Machines are secured using Pink Paper Seals bearing signatures of all polling agents.
                  </p>
                  <div className="p-8 border border-white/5 bg-white/[0.01] flex items-center gap-8">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"><Lock className="w-5 h-5 opacity-20" /></div>)}
                    </div>
                    <p className="text-xs">Strong Rooms are monitored 24/7 by CCTV and guarded perimeters where political parties maintain their own vigil.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-display text-3xl uppercase italic">The Counting Sequence</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest">01. Postal Ballots First</h4>
                      <p className="text-xs leading-relaxed">Tabulation begins with ETPBS and standard postal ballots before EVM counts commence.</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest">02. Data Reconciliation</h4>
                      <p className="text-xs leading-relaxed">Digital totals must perfectly reconcile with the manual aggregate recorded in <strong>Form 17C</strong>.</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest">03. Random VVPAT Audit</h4>
                      <p className="text-xs leading-relaxed">Physical slips from 5 randomly selected stations per segment are manually counted (2019 SC mandate).</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest">04. Final Certification</h4>
                      <p className="text-xs leading-relaxed">The Returning Officer executes <strong>Form 21E</strong> to certify the outcome and transmit the mandate.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-12 space-y-4 border-t border-white/5">
                  <h3 className="text-white font-display text-xl uppercase italic">Works Cited</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[9px] uppercase tracking-wider opacity-30 leading-loose">
                    <p>ECI Handbooks (2023-24)</p>
                    <p>Article 324, Constitution of India</p>
                    <p>RP Act, 1950 & 1951</p>
                    <p>Conduct of Elections Rules, 1961</p>
                    <p>SVEEP Literacy Database</p>
                    <p>Supreme Court Directives (2019)</p>
                  </div>
                </div>
              </div>

              <div className="pt-24 border-t border-white/5 text-center space-y-6">
                <div className="flex justify-center gap-4">
                  <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] flex items-center gap-2 hover:underline">
                    Visit ECI Portal <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                  <a href="https://www.eci.gov.in/eBooks" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] flex items-center gap-2 hover:underline">
                    Download Handbooks <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
                  End of Dossier // Consensus V4.2 Secured
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dossier;
