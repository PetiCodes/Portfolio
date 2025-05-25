"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading fallback
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      <p className="ml-2 text-gray-400">Loading 3D Model...</p>
    </div>
  );
}

// Dynamically import the 3D scene to avoid SSR issues
const LaptopScene = dynamic(() => import('./LaptopScene'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

// Main Laptop Model Component
export default function LaptopModel() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <LaptopScene />
      </Suspense>
    </div>
  );
} 