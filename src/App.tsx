/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import Envelope from './components/Envelope';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import Location from './components/Location';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

export default function App() {
  const [siteOpened, setSiteOpened] = useState(false);

  useEffect(() => {
    // Scroll to top when page loads to ensure correct initial state
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll when envelope is visible
  useEffect(() => {
    if (!siteOpened) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => document.body.classList.remove('scroll-locked');
  }, [siteOpened]);

  return (
    <div className="antialiased min-h-screen selection:bg-wedding-accent selection:text-wedding-bg">
      <Envelope onOpen={() => setSiteOpened(true)} />
      
      <div className={`transition-opacity duration-1000 ${siteOpened ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden pointer-events-none'}`}>
        <Navigation />
        <main>
          <Hero />
          <Invitation />
          <Countdown />
          <Timeline />
          <Location />
          <RSVP />
        </main>
        <Footer />
      </div>
    </div>
  );
}
