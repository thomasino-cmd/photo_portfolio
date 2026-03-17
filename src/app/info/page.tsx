import React from 'react';
import PhotoStack from '@/components/info/PhotoStack';
import ContactBox from '@/components/info/ContactBox';

export const metadata = {
    title: 'Info | Thomas Sterlini',
    description: 'Learn more about Thomas Sterlini, photographer based in Sestri Levante and Genoa.',
};

export default function InfoPage() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">

                {/* Left Column: Text */}
                <div className="flex-1 space-y-8 order-2 lg:order-1">
                    <h1 className="font-serif text-5xl md:text-7xl uppercase tracking-tighter leading-none">
                        INFO / <br /> CONTACT
                    </h1>

                    <div className="font-space text-lg md:text-xl leading-relaxed space-y-6 max-w-xl">
                        <p>
                            Sono Thomas Sterlini, fotografo con base tra Sestri Levante e Genova.
                        </p>
                        <p>
                            Ho iniziato a fotografare a 17 anni, partendo dai diciottesimi degli amici e continuando poi negli ultimi 6 anni con eventi, discoteche, sport, real estate e qualche matrimonio.
                        </p>
                        <p>
                            Nel frattempo ho studiato ingegneria informatica — mantenendomi tra fotografia e portapizze — e ora sto proseguendo con la magistrale.
                            <br />
                            <span className="italic opacity-70">
                                Questo sito, tra l’altro, l’ho programmato io.
                            </span>
                        </p>
                    </div>

                    <ContactBox />
                </div>

                {/* Right Column: Photo Stack */}
                <div className="flex-1 w-full order-1 lg:order-2">
                    <PhotoStack />
                </div>

            </div>
        </div>
    );
}
