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
import { cn } from '@/lib/utils';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Menu, Settings, Triangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface IPageSettings {
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  lineHeight: number;
  setLineHeight: Dispatch<SetStateAction<number>>;
  // readMode: TReadMode;
  // setReadMode: Dispatch<SetStateAction<TReadMode>>;
}

// export type TReadMode = 'single' | 'infinite';

export const Utility = ({
  chapterNumber,
  novelID,
  pageSettings,
}: {
  chapterNumber: number;
  novelID: number;
  pageSettings: IPageSettings;
}) => {
  const [input, setInput] = useState<string>('');

  const { push } = useRouter();
  const {
    fontSize,
    lineHeight,
    setFontSize,
    setLineHeight,
    // readMode,
    // setReadMode,
  } = pageSettings;

  useEffect(() => {
    const localFontSize = localStorage.getItem('fontSize');
    const localLineHeight = localStorage.getItem('lineHeight');
    // const localReadMode = localStorage.getItem('readMode');

    if (localFontSize) {
      setFontSize(Number(localFontSize));
    }
    if (localLineHeight) {
      setLineHeight(Number(localLineHeight));
    }

    // if (localReadMode) {
    //   setReadMode(localReadMode as TReadMode);
    // }
  }, [setFontSize, setLineHeight]);

  const t = useTranslations('utility');

  // const showNavigateButton = readMode === 'single';
  return (
    <div
      className={cn(
        'flex gap-4 w-full items-center justify-between'
        // readMode === 'single' ? 'justify-between' : 'justify-center'
      )}
    >
      <Link href={`/${novelID}/${chapterNumber - 1}`}>
        <Button>
          <Triangle size={14} className="-rotate-90" />
        </Button>
      </Link>
      <div className="flex gap-4">
        {/* Navigation input */}
        <Dialog>
          <DialogTrigger asChild>
            <Button aria-label="Open page navigation dialog">
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  push(`/${novelID}/${input}`);
                }
              }}
            />
            <Link href={`/${novelID}/${input}`}>
              <Button aria-label="Go to selected chapter">
                {t('Go to chapter')}
              </Button>
            </Link>
          </DialogContent>
        </Dialog>

        {/* Page settings */}
        <Dialog
          onOpenChange={(open) => {
            if (open === false) {
              localStorage.setItem('fontSize', String(fontSize));
              localStorage.setItem('lineHeight', String(lineHeight));
            }
          }}
        >
          <DialogTrigger asChild>
            <Button aria-label="Open page settings">
              <Settings size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby="Page settings menu">
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
                onValueChange={(value: number[]) => {
                  setLineHeight(value[0]);
                }}
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
            {/* <div>
              <p className="font-bold text-lg whitespace-nowrap mr-2 mb-4">
                {t('Reading mode')}
              </p>

              <div className="flex gap-2 items-center">
                <Button
                  variant={readMode === 'single' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => {
                    localStorage.setItem('readMode', 'single');
                    setReadMode('single');
                  }}
                >
                  {t('Single page')}
                </Button>
                <Button
                  variant={readMode === 'infinite' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => {
                    localStorage.setItem('readMode', 'infinite');
                    setReadMode('infinite');
                  }}
                >
                  {t('Infinite scroll')}
                </Button>
              </div>
            </div> */}
            <div className="flex gap-2 w-full justify-center pt-2">
              <Button
                onClick={() => {
                  setFontSize(16);
                  setLineHeight(1.5);
                }}
              >
                Reset
              </Button>
              <DialogClose asChild>
                <Button aria-label="Save settings">{t('Save')}</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Link
        // className={cn(showNavigateButton ? 'visible' : 'invisible')}
        prefetch
        href={`/${novelID}/${chapterNumber + 1}`}
      >
        <Button>
          <Triangle size={14} className="rotate-90" />
        </Button>
      </Link>
    </div>
  );
};
