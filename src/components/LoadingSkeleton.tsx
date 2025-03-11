import { Spinner } from './Spinner';

export const LoadingSkeleton = () => {
  return (
    <div className="grid place-items-center h-screen w-full">
      <Spinner />
    </div>
  );
};
