'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Menu, Settings, Triangle } from 'lucide-react'; 
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import Link from 'next/link';

export const Utility = ({
  chapterNumber,
  novelID,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
}: {
  chapterNumber: number;
  novelID: number;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  lineHeight: number;
  setLineHeight: Dispatch<SetStateAction<number>>;
}) => {
  const [input, setInput] = useState('');
  // const { push } = useRouter();

  function handleNavigation(direction: 'prev' | 'next') {
    const newChapter =
      direction === 'prev' ? chapterNumber - 1 : chapterNumber + 1;
    // push(`/${novelID}/${newChapter}`);
  }

  useEffect(() => {
    const localFontSize = localStorage.getItem('fontSize');
    const localLineHeight = localStorage.getItem('lineHeight');
    if (localFontSize) {
      setFontSize(Number(localFontSize));
    }
    if (localLineHeight) {
      setLineHeight(Number(localLineHeight));
    }
  }, [setFontSize, setLineHeight]);

  const t = useTranslations('utility');
  return (
    <div className="flex gap-4 w-full justify-between items-center">
      <Link href={`/${novelID}/${chapterNumber - 1}`} prefetch>
        <Button>
          <Triangle size={14} className="-rotate-90" />
        </Button>
      </Link>

      <div className="flex gap-4">
        {/* Navigation input */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Menu size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="font-bold text-lg">
              {t('Select chapter')}
            </DialogTitle>
            <Input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Link href={`/${novelID}/${input}`} prefetch>
              <Button>{t('Go to chapter')}</Button>
            </Link>
          </DialogContent>
        </Dialog>

        {/* Page settings */}
        <Dialog
          onOpenChange={(value: boolean) => {
            if (!value) {
              localStorage.setItem('fontSize', String(fontSize));
              localStorage.setItem('lineHeight', String(lineHeight));
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Settings size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="font-bold text-lg">
              {t('Set font size')}
            </DialogTitle>
            <div className="flex gap-2">
              <Slider
                value={[fontSize]}
                onValueChange={(value: number[]) => setFontSize(value[0])}
                max={48}
                step={1}
              />
              <p className="font-bold">{fontSize}px</p>
            </div>
            <Label className="font-bold text-lg">{t('Set line height')}</Label>
            <div className="flex gap-2">
              <Slider
                value={[lineHeight]}
                onValueChange={(value: number[]) => setLineHeight(value[0])}
                max={4}
                step={0.1}
              />
              <p className="font-bold">{lineHeight}</p>
            </div>

            <div
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: `${lineHeight}`,
              }}
            >
              <p className="line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                nulla dolore cupiditate ut dolorem iusto earum distinctio
                quidem. Tenetur commodi hic quia voluptatum libero omnis vel
                veritatis mollitia, rem itaque.
              </p>
            </div>
            <div className="flex gap-2 w-full justify-center">
              <Button
                onClick={() => {
                  setFontSize(16);
                  setLineHeight(1.5);
                }}
              >
                Reset
              </Button>
              <DialogClose asChild>
                <Button>{t('Save')}</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Link href={`/${novelID}/${chapterNumber + 1}`} prefetch>
        <Button>
          <Triangle size={14} className="rotate-90" />
        </Button>
      </Link>
    </div>
  );
};
