
import React from 'react';

interface GlitchDigitProps {
  digit: string;
}

export const GlitchDigit: React.FC<GlitchDigitProps> = ({ digit }) => {
  return (
    <span
      className="glitch text-4xl sm:text-6xl md:text-8xl lg:text-9xl w-10 sm:w-14 md:w-20 lg:w-24 text-center font-bold"
      data-text={digit}
    >
      {digit}
    </span>
  );
};
