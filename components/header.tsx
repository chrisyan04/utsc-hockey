"use client";

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion';
import utschockeylogoImg from '@/public/utsc-hockey-logo.jpeg';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-gray-900 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image src={ utschockeylogoImg } alt="logo" width="50" height="50" quality="95" />
                </Link>
                <nav className="space-x-4 font-bold">
                <motion.ul
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex space-x-4"
                >
                    <li className="hover:text-red-800 transition duration-300">
                    <Link href="/">Home</Link>
                    </li>
                    <li className="hover:text-red-800 transition duration-300">
                    <Link href="/about">About Us</Link>
                    </li>
                    <li className="hover:text-red-800 transition duration-300">
                    <Link href="/roster">Roster</Link>
                    </li>
                    <li className="hover:text-red-800 transition duration-300">
                    <Link href="/media">Media</Link>
                    </li>
                    <li className="hover:text-red-800 transition duration-300">
                    <Link href="/join">Join Us</Link>
                    </li>
                </motion.ul>
                </nav>
            </div>
        </header>
    );
}
