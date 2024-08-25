import { Skeleton } from '@/components/ui/skeleton';

interface ComponentProps {
  value: string | undefined;
}

export const Description = (props: ComponentProps) => {
  const { value } = props;

  if (!value) return <Skeleton className='w-full h-[20px] bg-card rounded-full mt-2' />;

  return <p className='break-words w-full text-sm'>{value}</p>;
};
