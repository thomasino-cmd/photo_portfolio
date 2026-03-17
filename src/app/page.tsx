import MasonryGrid from '@/components/gallery/MasonryGrid';
import { getAllPhotos } from '@/lib/gallery';
import { cmsProjects } from '@/lib/cmsData';

export default async function HomePage() { // Make async if doing any await or just read sync. Next.js App Router root pages can be async.
  // Although getAllPhotos reads sync from filesystem, we can keep it as is.
  const allPhotos = getAllPhotos();

  // Randomly shuffle to mix all kinds of photos
  const shuffledPhotos = [...allPhotos].sort(() => 0.5 - Math.random());

  // Take a generous sample of photos for the home page (e.g., up to 21)
  const homePhotos = shuffledPhotos.slice(0, 21);

  return (
    <div className="w-full">
      <MasonryGrid
        photos={homePhotos}
        enableLinks={true}
        cmsProjects={cmsProjects}
      />
    </div>
  );
}
