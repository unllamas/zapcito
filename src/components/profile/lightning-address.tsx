import { Skeleton } from '@/components/ui/skeleton';

interface ComponentProps {
  value: string | undefined;
}

export const LightningAddress = (props: ComponentProps) => {
  const { value } = props;

  if (!value) return <Skeleton className='w-[120px] h-[16px] bg-card rounded-full' />;

  return <p className='truncate w-full max-w-40 lg:max-w-50 text-muted-foreground whitespace-nowrap'>{value}</p>;
};
