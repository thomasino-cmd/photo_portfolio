export interface CMSProject {
    id: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    bgColor: string;
    title: string;
    description: string;
}

export const cmsProjects: CMSProject[] = [
    {
        id: 'project-espn',
        mediaUrl: '/PORTFOLIO_SITO/PORTRAIT/DSC_0110.jpg', // Using a placeholder from the portfolio, ideally this would be the actual image_1.png
        mediaType: 'image',
        bgColor: '#C14B4B',
        title: 'ESPN Olympians',
        description: 'A high-octane editorial portrait blending raw athletic energy with bold, mixed-media artistry. This campaign highlights a dynamic approach to sports photography, perfectly capturing the intensity and cultural weight of world-class competitors.'
    },
    {
        id: 'project-lego',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video for Lego
        mediaType: 'video',
        bgColor: '#F9E058',
        title: 'LEGO: Play Is Essential',
        description: 'A vibrant, story-driven lifestyle capture that brings genuine surprise and playful energy to the forefront. The production perfectly balances relatable domestic settings with the bold, imaginative spirit of a global brand.'
    },
    // Empty records to demonstrate scalability & AI auto-generation flow
    {
        id: 'project-empty-1',
        mediaUrl: '/PORTFOLIO_SITO/LANDSCAPE/baianotturna.jpg',
        mediaType: 'image',
        bgColor: '#4B7BEC',
        title: 'Night Escapes',
        description: '' // AI would fill this in post-upload
    },
    {
        id: 'project-empty-2',
        mediaUrl: '/PORTFOLIO_SITO/STREET/DSC_0100.jpg',
        mediaType: 'image',
        bgColor: '#FF7F50',
        title: 'Urban Geometry',
        description: '' // AI would fill this in post-upload
    }
];
