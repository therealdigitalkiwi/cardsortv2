import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import clsx from 'clsx';
import type { CardData } from '../types';

interface CardProps {
  card: CardData;
  index: number;
}

export function Card({ card, index }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative pb-8">
      {/* Placeholder */}
      <div className={clsx(
        'absolute -inset-6 rounded-2xl bg-white/50 backdrop-blur-sm',
        'border border-white/20 shadow-sm -z-10 pb-8',
        isDragging ? 'opacity-0' : 'opacity-100'
      )}>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-medium">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Drag Ghost */}
      {isDragging && (
        <div className={clsx(
          'absolute top-0 left-1/2 -translate-x-1/2',
          'w-[85%] aspect-[3/2] z-0',
          'bg-white/80 rounded-xl border-2 border-apple-blue/30',
          'shadow-2xl pointer-events-none'
        )} />
      )}

      {/* Card */}
      <motion.div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={clsx(
          'relative w-[85%] mx-auto aspect-[3/2] cursor-grab active:cursor-grabbing perspective-1000',
          isDragging ? 'z-10' : 'z-1'
        )}
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsFlipped(prev => !prev)}
      >
        <motion.div
          className="w-full h-full relative preserve-3d transition-transform duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front of card */}
          <div className={clsx(
            'absolute inset-0 backface-hidden',
            'bg-white rounded-xl shadow-lg p-6',
            'border border-gray-100',
            isDragging && 'shadow-2xl ring-2 ring-apple-blue/30'
          )}>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.summary}</p>
          </div>

          {/* Back of card */}
          <div className={clsx(
            'absolute inset-0 backface-hidden rotate-y-180',
            'bg-gray-200 rounded-xl shadow-lg p-6',
            'border border-gray-100',
            isDragging && 'shadow-2xl ring-2 ring-apple-blue/30'
          )}>
            <p className="text-sm text-gray-600 leading-relaxed">{card.detail}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}