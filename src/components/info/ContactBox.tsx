import React from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';

export default function ContactBox() {
    return (
        <div className="mt-24 border-2 border-black p-8 md:p-12 bg-white inline-block">
            <h2 className="font-serif text-3xl mb-8 uppercase tracking-tighter">Get in touch</h2>
            <div className="space-y-6 font-space text-lg">
                <a
                    href="tel:+393914914195"
                    className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-300"
                >
                    <Phone size={20} />
                    <span>391 4914195</span>
                </a>
                <a
                    href="mailto:sterli.thomas.photography@gmail.com"
                    className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-300"
                >
                    <Mail size={20} />
                    <span>sterli.thomas.photography@gmail.com</span>
                </a>
                <a
                    href="https://instagram.com/sterli.thomas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-300"
                >
                    <Instagram size={20} />
                    <span>@sterli.thomas</span>
                </a>
            </div>
        </div>
    );
}
