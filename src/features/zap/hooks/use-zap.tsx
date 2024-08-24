import { useEffect, useState } from 'react';
import { useZap as useZapHandle } from '@lawallet/react';
import { toast } from 'sonner';

import { config } from '@/config/payment';

export const useZap = () => {
  const [amount, setAmount] = useState(0);
  const [comment, setComment] = useState('');
  const [screen, setScreen] = useState<'information' | 'payment' | 'finished'>('information');
  const [processing, setProcessing] = useState(false);

  // dios@lawallet.ar
  const userPubkey: string = 'cee287bb0990a8ecbd1dee7ee7f938200908a5c8aa804b3bdeaed88effb55547';

  const { invoice, createZapInvoice } = useZapHandle({
    receiverPubkey: userPubkey,
    config,
  });

  const handleGenerate = async () => {
    if (invoice.loading) return;

    createZapInvoice(amount, comment).then((bolt11: string | undefined) => {
      if (!bolt11) {
        console.log('upds, algo paso mal');
        return;
      }

      setScreen('payment');
    });
  };

  const handleReset = () => {
    setAmount(0);
    setComment('');
    setTimeout(() => {
      setScreen('information');
    }, 1000);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success('Copiado al portapapeles.');
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles:', err);
      });
  };

  // Pay with extension wallet
  const payWithWebLN = async (invoice: string) => {
    try {
      setProcessing(true);
      if (!window.webln) {
        throw new Error('WebLN not detected');
      }
      await window.webln.enable();
      await window.webln.sendPayment(invoice);
      setProcessing(false);
    } catch (e) {
      toast.warning((e as Error).message);
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (invoice.payed) {
      setScreen('finished');
    }
  }, [invoice.payed]);

  return {
    // Variables
    amount,
    comment,
    invoice,
    screen,
    processing,
    // Handles
    generate: handleGenerate,
    reset: handleReset,
    copy: handleCopy,
    pay: payWithWebLN,
    // Sets
    setAmount,
    setComment,
    setScreen,
  };
};
