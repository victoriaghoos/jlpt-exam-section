interface TimerProps {
  secondsRemaining: number;
}

export function Timer({ secondsRemaining }: TimerProps) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const label = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="timer" role="timer">
      {label}
    </div>
  );
}
