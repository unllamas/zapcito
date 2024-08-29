import { Skeleton } from '@/components/ui/skeleton';

interface ComponentProps {
  value: string | undefined;
}

export const Banner = (props: ComponentProps) => {
  const { value } = props;

  if (!value) return <Skeleton className='max-w-full w-[600px] h-full mx-auto bg-card rounded-none md:rounded-3xl' />;

  return <img src={value} alt='Banner profile' className='w-full h-[200px] rounded-none md:rounded-3xl object-cover' />;
};
