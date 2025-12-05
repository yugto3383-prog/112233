import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Scene from './components/Scene';
import { TreeState } from './types';
import { clsx } from 'clsx';

// Icons
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/>
    <path d="M9 3v4"/>
    <path d="M3 9h4"/>
    <path d="M3 5h4"/>
  </svg>
);

const TreeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 12h5l-4 9h14l-4-9h5L12 2Z" />
  </svg>
);

export default function App() {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.TREE_SHAPE);

  const toggleState = () => {
    setTreeState((prev) => 
      prev === TreeState.TREE_SHAPE ? TreeState.SCATTERED : TreeState.TREE_SHAPE
    );
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-zinc-900 via-emerald-950 to-black overflow-hidden font-sans">
      
      {/* 3D Scene */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: false, stencil: false, depth: true }}
        camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 100 }}
      >
        <Suspense fallback={null}>
          <Scene treeState={treeState} />
        </Suspense>
      </Canvas>
      <Loader 
        containerStyles={{ background: '#020403' }} 
        innerStyles={{ width: '200px', height: '2px', background: '#064e3b' }} 
        barStyles={{ height: '2px', background: '#fbbf24' }} 
        dataStyles={{ color: '#fbbf24', fontFamily: 'serif' }}
      />

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start pointer-events-none z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 tracking-wider drop-shadow-lg">
            NOËL LUXE
          </h1>
          <p className="text-emerald-400/80 text-sm mt-2 tracking-[0.2em] uppercase font-light">
            Interactive 3D Experience
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 w-full flex justify-center pointer-events-none z-10">
        <button
          onClick={toggleState}
          className={clsx(
            "pointer-events-auto group relative flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-md transition-all duration-500 ease-out border",
            treeState === TreeState.TREE_SHAPE 
              ? "bg-emerald-950/40 border-emerald-500/30 hover:bg-emerald-900/60 hover:border-emerald-400/50 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
              : "bg-amber-950/40 border-amber-500/30 hover:bg-amber-900/60 hover:border-amber-400/50 shadow-[0_0_30px_-5px_rgba(251,191,36,0.3)]"
          )}
        >
          {/* Button Glow Effect */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent blur-xl" />
          
          <span className={clsx(
            "transition-colors duration-300",
            treeState === TreeState.TREE_SHAPE ? "text-emerald-300" : "text-amber-300"
          )}>
            {treeState === TreeState.TREE_SHAPE ? <TreeIcon /> : <SparklesIcon />}
          </span>
          
          <span className={clsx(
            "font-serif tracking-widest text-sm font-semibold transition-colors duration-300",
             treeState === TreeState.TREE_SHAPE ? "text-emerald-100" : "text-amber-100"
          )}>
            {treeState === TreeState.TREE_SHAPE ? "ASSEMBLED" : "SCATTERED"}
          </span>
        </button>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
