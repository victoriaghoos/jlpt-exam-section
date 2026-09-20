import type { StemSegment } from '../types';

interface StemRendererProps {
  segments: StemSegment[];
}

export function StemRenderer({ segments }: StemRendererProps) {
  return (
    <>
      {segments.map((segment, index) => {
        switch (segment.kind) {
          case 'text':
            return <span key={index}>{segment.value}</span>;
          case 'target':
            return <u key={index}>{segment.value}</u>;
          case 'blank':
            return <span key={index}>（　）</span>;
          default: {
            const exhaustive: never = segment;
            return exhaustive;
          }
        }
      })}
    </>
  );
}
