import { Skeleton } from '@/components/ui/skeleton';

interface ComponentProps {
  value: string | undefined;
}

export const Name = (props: ComponentProps) => {
  const { value } = props;

  if (!value) return <Skeleton className='w-[80px] h-[24px] bg-card rounded-full' />;

  return <h1 className='font-bold text-xl whitespace-nowrap'>{value}</h1>;
};
