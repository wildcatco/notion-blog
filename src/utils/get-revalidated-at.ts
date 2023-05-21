export async function getRevalidatedAt(slug: string) {
  const response = await fetch(`/blog/${slug}`);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const revalidatedAt = doc
    .querySelector('article')!
    .getAttribute('data-revalidated-at');

  return Number(revalidatedAt);
}
