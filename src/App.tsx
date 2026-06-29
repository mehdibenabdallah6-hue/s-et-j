/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import Location from './components/Location';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Scroll to top when page loads to ensure correct initial state
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="antialiased min-h-screen selection:bg-wedding-accent selection:text-wedding-bg">
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
  );
}
