import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SynopsisTabProps {
  synopsis: string;
  novelID: string;
}

export function SynopsisTab({ synopsis, novelID }: SynopsisTabProps) {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <p className="leading-relaxed">{synopsis}</p>
      <Link className="mt-6 flex justify-center" href={`/${novelID}/1`}>
        <Button size="lg">Read from Beginning</Button>
      </Link>
    </div>
  );
}