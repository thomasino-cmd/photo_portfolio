const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../public/PORTFOLIO_SITO');

async function getFiles(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function resizeImages() {
    const files = await getFiles(imagesDir);

    let processedCount = 0;
    let totalOriginalSize = 0;
    let totalNewSize = 0;

    for (const filePath of files) {
        if (!filePath.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

        const stats = fs.statSync(filePath);
        totalOriginalSize += stats.size;

        try {
            // Read the image
            const image = sharp(filePath);
            const metadata = await image.metadata();

            // If image is wider than 1920px (a good max for full hd displays), resize it.
            // E.g., keep the quality high but cap the max dimension.
            if (metadata.width > 1920 || metadata.height > 1920 || stats.size > 1024 * 1024) { // over 1MB or 1920px
                console.log(`Optimizing ${path.basename(filePath)}... (Original: ${metadata.width}x${metadata.height}, ${(stats.size / 1024 / 1024).toFixed(2)}MB)`);

                const tmpPath = filePath + '.tmp';

                await image
                    .resize({
                        width: 1920,
                        height: 1920,
                        fit: 'inside', // Maintain aspect ratio, max dimension 1920
                        withoutEnlargement: true
                    })
                    .jpeg({ quality: 80, force: false })
                    .webp({ quality: 80, force: false })
                    .png({ compressionLevel: 8, force: false })
                    .toFile(tmpPath);

                // Replace original with optimized
                fs.unlinkSync(filePath);
                fs.renameSync(tmpPath, filePath);

                const newStats = fs.statSync(filePath);
                totalNewSize += newStats.size;
                processedCount++;
            } else {
                totalNewSize += stats.size;
            }
        } catch (e) {
            console.error(`Error processing ${filePath}:`, e);
            totalNewSize += stats.size;
        }
    }

    const mb = (bytes) => (bytes / (1024 * 1024)).toFixed(2);
    console.log(`\n🎉 Processed ${processedCount} images.`);
    console.log(`Original size: ${mb(totalOriginalSize)} MB`);
    console.log(`New size:      ${mb(totalNewSize)} MB`);
    console.log(`Space saved:   ${mb(totalOriginalSize - totalNewSize)} MB`);
}

resizeImages().catch(console.error);
