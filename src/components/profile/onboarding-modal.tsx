import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';

const steps = [
  {
    title: 'Welcome!',
    content:
      "We've generated a unique digital identity for you. Your public key, or <b>npub...</b>, is your identifier for others to find you.",
    image: '/img/heart.png',
  },
  {
    title: 'Protect Your Identity',
    content:
      "Additionally, we've generated a private key that is essential for keeping your identity secure and unique. <b>Do not share it with anyone!</b>",
    image: '/img/document.png',
  },
  {
    title: "Let's Get Started!",
    content:
      'Are you ready to explore the world of Nostr? Connect, share, and enjoy a secure and decentralized experience.',
    image: '/img/player.png',
  },
];

const StepDot = (props: { isCurrent: boolean; isCompleted: boolean; step: number; onClick: any }) => {
  const { isCurrent, isCompleted, step, onClick } = props;
  return (
    <button
      {...props}
      tabIndex={-1}
      className={`w-3 h-3 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
        isCurrent || isCompleted ? 'bg-primary' : 'bg-border'
      }`}
      aria-label={`Next to ${step + 1}`}
      onClick={() => onClick(step)}
    />
  );
};

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleCloseOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding', 'false');
    }

    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCloseOnboarding();
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='p-0' onPointerDownOutside={(e) => e.preventDefault()}>
        <Image
          className='mx-auto'
          src={steps[currentStep].image}
          alt='Icon by Yassine Design'
          width={200}
          height={200}
        />
        <div className='flex items-center justify-center gap-1 w-full'>
          {steps.map((_, index) => (
            <StepDot
              key={index}
              isCurrent={index === currentStep}
              isCompleted={index < currentStep}
              onClick={handleStepClick}
              step={index}
            />
          ))}
        </div>
        <div className='flex flex-col gap-4 items-center w-full px-4'>
          <div className='flex flex-col gap-2 text-center'>
            <h3 className='text-lg font-semibold'>{steps[currentStep].title}</h3>
            <p className='text-sm' dangerouslySetInnerHTML={{ __html: steps[currentStep].content }} />
          </div>
          <div className='flex justify-between gap-2 w-full mb-4 px-4'>
            <DialogClose asChild>
              <Button className='flex-1' type='button' variant='outline' onClick={handleCloseOnboarding}>
                Skip
              </Button>
            </DialogClose>
            <Button
              className='flex-1'
              variant={currentStep === steps.length - 1 ? 'default' : 'secondary'}
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
