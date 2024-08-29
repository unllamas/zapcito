interface QuoteProps {
  raw: any;
}

export const Quote = (props: QuoteProps) => {
  // @ts-ignore
  const { raw } = props;

  return (
    <div className='w-full p-4 bg-warning/10 rounded-lg border-[1px] border-dotted border-warning/35 text-center mt-2'>
      <span className='text-sm text-warning-foreground'>Quote under construction.</span>
    </div>
  );
};
