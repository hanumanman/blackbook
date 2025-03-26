'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Home, Menu, Settings, Triangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { TableOfContents } from './TableOfContents';

export interface IPageSettings {
  fontSize: number;
  lineHeight: number;
}

interface Props {
  chapterNumber: number;
  novelID: number;
  pageSettings: IPageSettings;
  setPageSettings: Dispatch<SetStateAction<IPageSettings>>;
}
export const Utility = ({ chapterNumber, novelID, pageSettings, setPageSettings }: Props) => {
  const t = useTranslations('utility');
  const { fontSize, lineHeight } = pageSettings;
  const { setLocalSettings, getLocalSettings } = useLocalSettings();

  useEffect(() => {
    const { fontSize: localFontSize, lineHeight: localLineHeight } = getLocalSettings();

    if (!!localFontSize) {
      setPageSettings((prev) => ({ ...prev, fontSize: localFontSize }));
    }
    if (!!localLineHeight) {
      setPageSettings((prev) => ({ ...prev, lineHeight: localLineHeight }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPageSettings]);

  return (
    <div className={cn('flex gap-4 w-full items-center justify-between')}>
      <Link href={chapterNumber > 1 ? `/${novelID}/${chapterNumber - 1}` : '#'}>
        <Button variant={'outline'} aria-label="Go to previous chapter">
          <Triangle size={14} className="-rotate-90" />
        </Button>
      </Link>
      <div className="flex gap-4">
        {/* Navigation input */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'outline'} aria-label="Open page navigation dialog">
              <Menu size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent aria-describedby="Table of contents" className="flex flex-col gap-3 overflow-y-scroll">
            <TableOfContents novelID={novelID} />
            <SheetDescription>
              <VisuallyHidden>Table of contents</VisuallyHidden>
            </SheetDescription>
          </SheetContent>
        </Sheet>

        {/* Page settings */}
        <Dialog
          onOpenChange={(open) => {
            if (open === false) {
              setLocalSettings({
                fontSize,
                lineHeight,
              });
            }
          }}
        >
          <DialogTrigger asChild>
            <Button aria-label="Open page settings" variant={'outline'}>
              <Settings size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby="Page settings menu">
            <DialogTitle className="font-bold text-lg">{t('Set font size')}</DialogTitle>
            <div className="flex gap-2">
              <Slider
                value={[fontSize]}
                onValueChange={(value: number[]) => setPageSettings((prev) => ({ ...prev, fontSize: value[0] }))}
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
                  setPageSettings((prev) => ({ ...prev, lineHeight: value[0] }));
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel nulla dolore cupiditate ut dolorem iusto
                earum distinctio quidem. Tenetur commodi hic quia voluptatum libero omnis vel veritatis mollitia, rem
                itaque.
              </p>
            </div>

            <div className="flex gap-2 w-full justify-center pt-2">
              <Button
                variant={'outline'}
                onClick={() => {
                  setPageSettings({ fontSize: 16, lineHeight: 1.5 });
                }}
              >
                Reset
              </Button>
              <DialogClose asChild>
                <Button variant={'outline'} aria-label="Save settings">
                  {t('Save')}
                </Button>
              </DialogClose>
            </div>
            <DialogDescription>
              <VisuallyHidden>Settings dialog for reader page</VisuallyHidden>
            </DialogDescription>
          </DialogContent>
        </Dialog>

        {/* Return to novel page */}
        <Link href={`/${novelID}`}>
          <Button aria-label="Return to novel page" variant={'outline'}>
            <Home size={18} />
          </Button>
        </Link>
      </div>

      <Link prefetch href={`/${novelID}/${chapterNumber + 1}`}>
        <Button aria-label="Go to next chapter" variant={'outline'}>
          <Triangle size={14} className="rotate-90" />
        </Button>
      </Link>
    </div>
  );
};

const LOCALKEYS = {
  LINE_HEIGHT: 'lineHeight',
  FONT_SIZE: 'fontSize',
};

const useLocalSettings = () => {
  function getLocalSettings() {
    const fontSize = Number(localStorage.getItem(LOCALKEYS.FONT_SIZE));
    const lineHeight = Number(localStorage.getItem(LOCALKEYS.LINE_HEIGHT));
    return { fontSize, lineHeight };
  }

  function setLocalSettings({ fontSize, lineHeight }: { lineHeight?: number; fontSize?: number }) {
    if (fontSize) {
      localStorage.setItem(LOCALKEYS.FONT_SIZE, fontSize.toString());
    }
    if (lineHeight) {
      localStorage.setItem(LOCALKEYS.LINE_HEIGHT, lineHeight.toString());
    }
  }

  return {
    setLocalSettings,
    getLocalSettings,
  };
};
