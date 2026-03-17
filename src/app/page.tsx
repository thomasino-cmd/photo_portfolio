import MasonryGrid from '@/components/gallery/MasonryGrid';
import { getAllPhotos } from '@/lib/gallery';

export default async function HomePage() {
  const allPhotos = getAllPhotos();

  // Randomly shuffle to mix all kinds of photos
  const shuffledPhotos = [...allPhotos].sort(() => 0.5 - Math.random());

  // Take a generous sample of photos for the home page
  const homePhotos = shuffledPhotos.slice(0, 21);

  return (
    <div className="w-full">
      <MasonryGrid
        photos={homePhotos}
      // enableLinks is omitted (undefined defaults to false in condition) so clicking opens the new ModalGallery
      />
    </div>
  );
}
