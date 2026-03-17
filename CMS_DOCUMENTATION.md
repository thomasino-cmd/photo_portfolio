# Simulated CMS & AI Vision Modal Gallery Workflow

This document explains the architecture and scalability of the custom Modal Gallery feature we added to the portfolio.

## Architecture Overview
We introduced a Simulated CMS Database in `src/lib/cmsData.ts`. This file exports an array of projects (`cmsProjects`) that act as a single source of truth for the Modal Gallery. 

When displayed on the homepage, these special CMS projects are injected directly into the standard `MasonryGrid` (the masonry layout combining 3 columns). Clicking on any CMS project triggers the new **Full-Screen Modal Gallery**, completely bypassing the standard category navigation.

## How to Add New Projects (Scalability)

The system is designed to be fully scalable and represents how a real Headless CMS (like Sanity, Strapi, or Contentful) would operate. To add a new project, you simply append a new object to the array in `src/lib/cmsData.ts`:

```typescript
{
    id: 'project-new-brand',
    mediaUrl: '/PORTFOLIO_SITO/PORTRAIT/nuovafoto.jpg',
    mediaType: 'image', // or 'video'
    bgColor: '#123456', // The specific background color for this modal
    title: 'New Brand Campaign',
    description: '' // Leave empty to trigger AI copy generation!
}
```

### The AI "Vision-to-Copy" Integration
In a production-ready application, when you upload an image through the admin panel and leave the `description` field empty, the backend runs a function that asks an AI Computer Vision model to analyze the file. 

**The AI's System Prompt:**
> "Sei un copywriter per un fotografo professionista e direttore artistico. Analizza questa immagine. Scrivi una breve descrizione (max 1-2 frasi). NON descrivere letteralmente cosa c'è nella foto... Concentrati invece sull'energia dell'evento, sullo stile visivo, sulla direzione artistica... Il tono deve essere commerciale, attraente per agenzie pubblicitarie o brand..."

Once the AI generates the description, it saves it back to the database. When you visit the site, you immediately see the generated copy inside the right-hand column of the Modal Gallery.

**Example of the generated copy from ESPN:**
> "A high-octane editorial portrait blending raw athletic energy with bold, mixed-media artistry. This campaign highlights a dynamic approach to sports photography, perfectly capturing the intensity and cultural weight of world-class competitors."

If you prefer to write it yourself or simply tweak what the AI wrote, you just edit the `description` string inside `cmsData.ts`.

## Features
- **Dynamic Theming:** The background of the entire full-screen view shifts seamlessly based on the `bgColor` property in the CMS.
- **Custom Video Player:** Videos have a customized HTML5 player with a sleek, 1px solid black border, play/pause logic, custom timeline scrubbing, and fullscreen mode.
- **Keyboard Navigation:** You can freely use the `ArrowLeft`, `ArrowRight`, and `Escape` keys to navigate the modals effortlessly.
- **Framer Motion Layouts:** The transition from the grid tile into the modal is perfectly smooth using Shared Layout Animations.
