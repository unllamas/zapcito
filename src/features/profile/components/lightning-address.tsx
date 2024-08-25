import { Skeleton } from '@/components/ui/skeleton';

interface ComponentProps {
  value: string | undefined;
}

export const LightningAddress = (props: ComponentProps) => {
  const { value } = props;

  if (!value) return <Skeleton className='w-[120px] h-[16px] bg-card rounded-full mt-2' />;

  return <p className='text-muted-foreground whitespace-nowrap'>{value}</p>;
};
