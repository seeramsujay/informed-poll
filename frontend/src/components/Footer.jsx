import React from 'react';
import { Vote, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-purple-600 p-1.5 rounded-lg">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display tracking-wider">VOTE<span className="text-purple-500">IQ</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering citizens with data-driven insights and AI assistance for a more informed democracy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-display uppercase tracking-widest text-slate-200">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-purple-400">Analysis</a></li>
              <li><a href="#" className="hover:text-purple-400">Comparisons</a></li>
              <li><a href="#" className="hover:text-purple-400">Verification</a></li>
              <li><a href="#" className="hover:text-purple-400">Security</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-display uppercase tracking-widest text-slate-200">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400">Election Dates</a></li>
              <li><a href="#" className="hover:text-purple-400">Poll Locations</a></li>
              <li><a href="#" className="hover:text-purple-400">API Docs</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-display uppercase tracking-widest text-slate-200">Newsletter</h4>
            <p className="text-sm text-slate-500">Stay informed with weekly election summaries.</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Email" className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-xs w-full focus:outline-none focus:border-purple-500" />
              <button className="bg-purple-600 px-4 py-2 rounded-lg text-xs font-bold text-white">Join</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-600">
          <p>© 2026 VOTEIQ TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
