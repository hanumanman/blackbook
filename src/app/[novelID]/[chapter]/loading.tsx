import { Spinner } from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="min-h-[100vh] grid place-items-center">
      <Spinner />
    </div>
  );
}
