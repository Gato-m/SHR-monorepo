import { Electric } from 'electric-sql/expo';

export async function initElectric() {
  const electric = await Electric.connect({
    url: 'http://localhost:5133',
  });

  return electric;
}
