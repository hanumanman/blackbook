import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface SynopsisTabProps {
  synopsis: string;
  novelID: string;
}

export async function SynopsisTab({ synopsis, novelID }: SynopsisTabProps) {
  const t = await getTranslations('common');
  return (
    <div className="prose max-w-none dark:prose-invert">
      <p className="leading-relaxed">{synopsis}</p>
      <Link className="mt-6 flex justify-center" href={`/${novelID}/1`}>
        <Button size="lg">{t('Read from beginning')}</Button>
      </Link>
    </div>
  );
}

