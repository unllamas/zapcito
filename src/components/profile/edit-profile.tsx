import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';

// import { Avatar } from './avatar';
// import { Banner } from './banner';

export function DrawerDialogDemo(props: any) {
  const { profile } = props;

  // Flow
  const [open, setOpen] = useState(false);

  // Data
  const [name, setName] = useState<string>(profile?.displayName || profile?.name);
  const [description, setDescription] = useState<string>(profile?.about);
  const [link, setLink] = useState<string>(profile?.website);

  // Assets
  // const [profilePhoto, setProfilePhoto] = useState(profile?.image);
  // const [coverPhoto, setCoverPhoto] = useState(profile?.banner);

  // const handleFileChange = (event: any, setPhoto: any) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     //@ts-ignore
  //     reader.onload = (e) => setPhoto(e.target.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='w-full max-w-xl mx-auto'>
          <div className='flex items-center justify-between gap-2 px-4'>
            <h3 className='font-bold text-lg'>Edit profile</h3>
            <div>
              <Button variant='ghost' size='sm' disabled>
                Save
              </Button>
            </div>
          </div>
          <div className='flex flex-col gap-2 px-4'>
            {/* <div className='relative bg-background overflow-hidden w-full object-cover rounded-none md:rounded-3xl'>
              <Banner value={coverPhoto} />
              <Label
                htmlFor='cover-photo'
                className='absolute top-0 lef-0 flex justify-center items-center w-full h-full bg-background/65'
              >
                <CameraIcon className='h-6 w-6 text-white' />
                <Input
                  id='cover-photo'
                  type='file'
                  className='sr-only'
                  onChange={(e) => handleFileChange(e, setCoverPhoto)}
                  accept='image/*'
                />
              </Label>
            </div>
            <div className='overflow-hidden relative mt-[-60px] w-28 h-28 mx-4 rounded-full'>
              <Avatar src={profilePhoto} variant='profile' />
              <Label
                htmlFor='profile-photo'
                className='absolute top-0 lef-0 flex justify-center items-center w-full h-full bg-background/65'
                tabIndex={1}
              >
                <CameraIcon className='h-6 w-6 text-white' />
                <Input
                  id='profile-photo'
                  type='file'
                  className='sr-only'
                  onChange={(e) => handleFileChange(e, setProfilePhoto)}
                  accept='image/*'
                />
              </Label>
            </div> */}
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='link'>Link</Label>
              <Input id='link' name='link' value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
          </div>
          <DrawerFooter className='pt-2'>
            <DrawerClose asChild>
              <Button variant='outline'>Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
