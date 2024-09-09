import React, { useState } from 'react';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useActiveUser, useNewEvent } from 'nostr-hooks';

interface EditProfileProps {
  profile: NDKUserProfile | null;
}

export function DrawerEditProfile({ profile }: EditProfileProps) {
  // Flow
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [website, setWebsite] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Libs and hooks
  const { activeUser } = useActiveUser();
  const { createNewEvent } = useNewEvent();

  if (!profile) return null;

  const handleSave = async (): Promise<void> => {
    if (!activeUser) return;
    setIsUpdating(true);

    const event = createNewEvent();

    event.kind = 0;

    event.content = JSON.stringify({
      ...profile,
      name: name || profile?.name,
      about: about || profile?.about,
      website: website || profile?.website,
    });

    event
      .publish()
      .then(() => {
        toast.success('Profile updated.');

        setOpen(false);
        setIsUpdating(false);
      })
      .catch((err) => {
        toast.warning('Oops,', { description: err.message });

        setIsUpdating(false);
      });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='w-full max-w-xl mx-auto'>
          <DrawerHeader className='flex items-center justify-between gap-2 w-full px-4 mb-4'>
            <DrawerTitle className='font-bold text-lg'>Edit profile</DrawerTitle>
            <Button variant={isUpdating ? 'ghost' : 'default'} size='sm' onClick={handleSave} disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save'}
            </Button>
          </DrawerHeader>
          <div className='flex flex-col gap-4 px-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                placeholder='Satoshi'
                defaultValue={profile?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='about'>Description</Label>
              <Textarea
                id='about'
                placeholder='Space to describe yourself'
                defaultValue={profile?.about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='website'>Website</Label>
              <Input
                id='website'
                placeholder='bitcoin.org'
                defaultValue={profile?.website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
          <DrawerFooter className='pt-2'>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
