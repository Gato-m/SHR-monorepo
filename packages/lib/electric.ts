import { Electric } from 'electric-sql/expo';

export async function initElectric() {
  const electric = await Electric.connect({
    // Šeit raksti pareizo URL atkarībā no tā, kur testē
    url: process.env.ELECTRIC_URL ?? 'http://192.168.32.6:5133',
  });

  return electric;
}
