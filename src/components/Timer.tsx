import { useEffect, useRef, useState } from 'react';

interface TimerProps {
  secondsRemaining: number;
}

// Announce at thresholds rather than on every tick: role="timer" has an
// implicit aria-live of "off", and turning it on would read the clock once a
// second, which is unusable.
const ANNOUNCE_AT = [300, 60, 10];

function format(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function spokenTime(totalSeconds: number): string {
  if (totalSeconds >= 60) {
    const minutes = Math.round(totalSeconds / 60);
    return `${minutes} minute${minutes === 1 ? '' : 's'} left`;
  }
  return `${totalSeconds} seconds left`;
}

export function Timer({ secondsRemaining }: TimerProps) {
  const [announcement, setAnnouncement] = useState('');
  const announced = useRef(new Set<number>());

  useEffect(() => {
    const threshold = ANNOUNCE_AT.find(
      (t) => secondsRemaining <= t && !announced.current.has(t),
    );
    if (threshold === undefined) return;

    announced.current.add(threshold);
    setAnnouncement(spokenTime(secondsRemaining));
  }, [secondsRemaining]);

  return (
    <div className="timer">
      <span className="timer__value" role="timer" aria-label={`Time left: ${spokenTime(secondsRemaining)}`}>
        {format(secondsRemaining)}
      </span>
      <span className="timer__caption" aria-hidden="true">
        Time left
      </span>

      <p className="sr-only" role="status">
        {announcement}
      </p>
    </div>
  );
}