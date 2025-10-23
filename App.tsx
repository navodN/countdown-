
import React from 'react';
import { useCountdown } from './hooks/useCountdown';
import { GlitchDigit } from './components/GlitchDigit';

const getNextNovemberFirst = (): Date => {
  const now = new Date();
  const currentYear = now.getFullYear();
  let novemberFirst = new Date(currentYear, 10, 1); // Month is 0-indexed, so 10 is November

  if (now > novemberFirst) {
    novemberFirst = new Date(currentYear + 1, 10, 1);
  }

  return novemberFirst;
};

const TARGET_DATE = getNextNovemberFirst();

const padWithZero = (num: number): string => {
  return String(num).padStart(2, '0');
};

interface TimeUnitProps {
    value: number;
    label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => {
    const formattedValue = padWithZero(value);
    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <GlitchDigit digit={formattedValue[0]} />
                <GlitchDigit digit={formattedValue[1]} />
            </div>
            <span className="mt-2 text-sm md:text-xl text-cyan-400 opacity-75 tracking-widest">{label}</span>
        </div>
    );
};

const TimeSeparator: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full text-4xl md:text-6xl lg:text-8xl text-cyan-400/80 pb-8 md:pb-12">
            :
        </div>
    );
};


const App: React.FC = () => {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  const isFinished = days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0;

  return (
    <div className="bg-black text-cyan-400 min-h-screen flex flex-col items-center justify-center p-4 select-none">
        <header className="text-center mb-8 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-widest text-white uppercase" data-text="COUNTDOWN">
                <span className="glitch" data-text="COUNTDOWN">COUNTDOWN</span>
            </h1>
            <p className="text-cyan-400/80 mt-2 text-sm md:text-base">
                Time remaining until November 1st, {TARGET_DATE.getFullYear()}
            </p>
        </header>

        {isFinished ? (
             <div className="text-4xl md:text-7xl font-bold text-center text-red-500">
                <span className="glitch" data-text="TARGET REACHED">TARGET REACHED</span>
            </div>
        ) : (
            <main className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8">
                <TimeUnit value={days} label="DAYS" />
                <TimeSeparator />
                <TimeUnit value={hours} label="HOURS" />
                <TimeSeparator />
                <TimeUnit value={minutes} label="MINUTES" />
                <TimeSeparator />
                <TimeUnit value={seconds} label="SECONDS" />
            </main>
        )}
        
        <footer className="absolute bottom-4 text-xs text-white/30">
            Created by a world-class senior frontend React engineer.
        </footer>
    </div>
  );
};

export default App;
