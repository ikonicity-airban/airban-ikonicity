import { motion, AnimatePresence } from 'motion/react';
import { getAccentHex } from '../../utils';

interface HeroShowreelModalProps {
  showShowreel: boolean;
  setShowShowreel: (val: boolean) => void;
  videoUrl: string;
  accentColor: any;
}

export default function HeroShowreelModal({ showShowreel, setShowShowreel, videoUrl, accentColor }: HeroShowreelModalProps) {
  return (
    <AnimatePresence>
      {showShowreel && videoUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#050816]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowShowreel(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="relative max-w-4xl w-full aspect-video bg-[#080D1F] border shadow-2xl rounded-2xl overflow-hidden"
            style={{ borderColor: `${getAccentHex(accentColor)}40` }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowShowreel(false)}
              className="absolute top-4 right-4 bg-[#050816]/80 text-[#CAD5EE] hover:text-white border border-white/5 w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-sm z-10 transition-colors cursor-pointer"
            >
              ✕
            </button>
            
            <iframe
              title="Watch Airban Godwin Showreel"
              src={videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') 
                ? videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1'
                : videoUrl
              }
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
