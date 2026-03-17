import MasonryGrid from '@/components/gallery/MasonryGrid';
import { getPhotosByCategory } from '@/lib/gallery';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    // category will be e.g. "drones" or "food-and-drink", so getPhotosByCategory can handle it
    const photos = getPhotosByCategory(category);

    return (
        <div className="w-full">
            <h1 className="font-serif text-5xl md:text-8xl font-black mb-16 capitalize tracking-tight leading-none mix-blend-difference text-white">
                {category.replace('-', ' ')}
            </h1>
            <MasonryGrid photos={photos} />
        </div>
    );
}
