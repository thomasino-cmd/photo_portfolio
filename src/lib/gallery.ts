import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

export interface Photo {
    id: string;
    url: string;
    width: number;
    height: number;
    alt: string;
    category: string;
}

// Ensure we only read the filesystem once in production using a global variable or simple module caching.
let allPhotosCache: Photo[] | null = null;

const PORTFOLIO_DIR = path.join(process.cwd(), 'public', 'PORTFOLIO_SITO');

/**
 * Retrieves all photos from the public/PORTFOLIO_SITO directory.
 */
export function getAllPhotos(): Photo[] {
    if (allPhotosCache && process.env.NODE_ENV === 'production') {
        return allPhotosCache;
    }

    const photos: Photo[] = [];

    try {
        if (!fs.existsSync(PORTFOLIO_DIR)) {
            console.warn(`Portfolio directory not found at ${PORTFOLIO_DIR}`);
            return [];
        }

        const categories = fs.readdirSync(PORTFOLIO_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const category of categories) {
            const categoryPath = path.join(PORTFOLIO_DIR, category);
            const files = fs.readdirSync(categoryPath, { withFileTypes: true })
                .filter(dirent => dirent.isFile() && /\.(jpe?g|png|webp|avif|gif)$/i.test(dirent.name));

            for (const file of files) {
                const filePath = path.join(categoryPath, file.name);

                try {
                    const buffer = fs.readFileSync(filePath);
                    const dimensions = sizeOf(buffer);
                    if (dimensions && dimensions.width && dimensions.height) {
                        photos.push({
                            id: `${category}-${file.name}`,
                            url: `/PORTFOLIO_SITO/${category}/${file.name}`,
                            width: dimensions.width,
                            height: dimensions.height,
                            alt: `${category} photo ${file.name}`,
                            category: category,
                        });
                    }
                } catch (err) {
                    console.error(`Failed to read dimensions for ${filePath}:`, err);
                }
            }
        }

    } catch (err) {
        console.error('Error reading portfolio directory:', err);
    }

    allPhotosCache = photos;
    return photos;
}

/**
 * Retrieves photos for a specific category.
 */
export function getPhotosByCategory(categoryName: string): Photo[] {
    const allPhotos = getAllPhotos();
    // Use case-insensitive matching in case URLs differ slightly from folder names
    const normalizedCategory = categoryName.toLowerCase().replace(/-/g, ' ');

    return allPhotos.filter(photo => photo.category.toLowerCase() === normalizedCategory);
}
