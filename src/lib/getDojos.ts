import { getCollection } from 'astro:content';

export async function getDojos() {
  const dojos = await getCollection('dojos');
  return dojos
    .slice()
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0))
    .filter((dojo) => dojo.data.isActive);
}

export default getDojos;
