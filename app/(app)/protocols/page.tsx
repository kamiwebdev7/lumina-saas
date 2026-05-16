'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Droplets, Beef, Wind, Footprints, Moon, Pill,
  CheckCircle2, ChevronRight, Info, Clock, Trophy
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const protocols = [
  {
    id: 1,
    icon: Droplets,
    title: 'Morning Hydration',
    description: 'Start with 500ml water + pinch of Himalayan salt to activate cellular hydration pathways and support cortisol awakening response.',
    target: '500 ml',
    time: '6:30 – 7:30 AM',
    category: 'Morning',
    done: true,
    color: 'text-[#5a9bbf]',
    bg: 'bg-[#ebf4fb]',
    borderDone: 'border-[#c8e5f4]',
    tip: 'Adding electrolytes in the morning improves mitochondrial function by up to 22%.',
  },
  {
    id: 2,
    icon: Beef,
    title: 'Protein Target',
    description: 'Reach 35g+ protein by noon to optimize muscle protein synthesis and support sustained energy through metabolic pathways.',
    target: '35 g before noon',
    time: '7:00 – 12:00 PM',
    category: 'Morning',
    done: true,
    color: 'text-sand-600',
    bg: 'bg-sand-100',
    borderDone: 'border-sand-200',
    tip: 'Morning protein intake reduces ghrelin spikes by 40% and stabilizes blood glucose.',
  },
  {
    id: 3,
    icon: Wind,
    title: 'Breathwork',
    description: 'Box breathing or 4-7-8 technique to downregulate the nervous system, reduce morning cortisol, and prime focus.',
    target: '5 minutes',
    time: '8:00 – 9:00 AM',
    category: 'Morning',
    done: true,
    color: 'text-sage-400',
    bg: 'bg-sage-100',
    borderDone: 'border-sage-200',
    tip: 'Just 5 minutes of structured breathwork lowers cortisol by up to 23%.',
  },
  {
    id: 4,
    icon: Footprints,
    title: 'Walking Goal',
    description: 'Brisk walking in natural light supports circadian rhythm, lymphatic drainage, and post-prandial glucose regulation.',
    target: '6,000 steps',
    time: 'Any time',
    category: 'Movement',
    done: false,
    color: 'text-sand-600',
    bg: 'bg-sand-50',
    borderDone: 'border-sand-200',
    tip: 'A 20-min walk after meals reduces glucose spikes by 30% compared to sitting.',
  },
  {
    id: 5,
    icon: Moon,
    title: 'Sleep Target',
    description: 'Maintain consistent sleep window of 8.5 hours. Cool room (18-20°C), blackout curtains, and blue light off 90 min before.',
    target: '8.5 hours',
    time: '9:30 PM – 6:00 AM',
    category: 'Evening',
    done: false,
    color: 'text-[#7c6fa0]',
    bg: 'bg-[#f0edf8]',
    borderDone: 'border-[#e2dcf2]',
    tip: 'Consistent sleep timing regulates cortisol rhythm better than any supplement.',
  },
  {
    id: 6,
    icon: Pill,
    title: 'Supplement Stack',
    description: 'Magnesium glycinate (400mg), Vitamin D3 + K2, and Omega-3 to support cellular repair, hormone balance, and inflammation.',
    target: 'With dinner',
    time: '6:00 – 8:00 PM',
    category: 'Evening',
    done: false,
    color: 'text-blush-400',
    bg: 'bg-blush-100',
    borderDone: 'border-blush-200',
    tip: 'Magnesium glycinate taken in the evening improves sleep latency by 37%.',
  },
];

const categories = ['All', 'Morning', 'Movement', 'Evening'];

function ProtocolCard({ protocol, onToggle }: { protocol: typeof protocols[0]; onToggle: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={cn(
        'rounded-2xl border p-5 transition-all duration-300 cursor-default',
        protocol.done
          ? 'bg-sand-50 border-sand-200 opacity-95'
          : 'bg-card border-sand-200 shadow-soft hover:shadow-card hover:-translate-y-0.5'
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5', protocol.bg)}>
          <protocol.icon className={cn('w-5 h-5', protocol.color)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className={cn('font-medium text-sm', protocol.done ? 'text-sand-500 line-through' : 'text-sand-800')}>
              {protocol.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant="outline" className="text-[10px] border-sand-200 text-sand-500 font-normal">
                <Clock className="w-2.5 h-2.5 mr-1" />
                {protocol.time}
              </Badge>
            </div>
          </div>

          <p className={cn('text-xs leading-relaxed mb-3', protocol.done ? 'text-sand-500' : 'text-sand-600')}>
            {expanded ? protocol.description : `${protocol.description.slice(0, 80)}...`}
          </p>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-sand-50 rounded-xl p-3 mb-3 flex items-start gap-2"
            >
              <Info className="w-3.5 h-3.5 text-sand-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-sand-600 leading-relaxed">{protocol.tip}</p>
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggle(protocol.id)}
                className={cn(
                  'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200',
                  protocol.done
                    ? 'bg-sand-200 text-sand-600 hover:bg-sand-300'
                    : 'bg-sand-700 text-sand-50 hover:bg-sand-800'
                )}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {protocol.done ? 'Undo' : 'Mark Complete'}
              </button>

              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-sand-500 hover:text-sand-600 flex items-center gap-1 transition-colors"
              >
                {expanded ? 'Less' : 'Details'}
                <ChevronRight className={cn('w-3 h-3 transition-transform', expanded && 'rotate-90')} />
              </button>
            </div>

            <span className="text-xs font-medium text-sand-600 bg-sand-100 px-2 py-1 rounded-full">
              {protocol.target}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProtocolsPage() {
  const [items, setItems] = useState(protocols);
  const [activeCategory, setActiveCategory] = useState('All');

  const toggle = (id: number) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, done: !p.done } : p));
  };

  const filtered = activeCategory === 'All' ? items : items.filter(p => p.category === activeCategory);
  const completedCount = items.filter(p => p.done).length;
  const completionPct = Math.round((completedCount / items.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8 space-y-7">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs text-sand-500 uppercase tracking-widest font-medium mb-1">Daily Protocols</p>
        <h1 className="font-serif text-3xl lg:text-4xl font-light text-sand-900 mb-2">
          Your <em>Wellness Blueprint</em>
        </h1>
        <p className="text-sm text-sand-600">Thursday, May 14 · Week 6 of Protocol</p>
      </motion.div>

      {/* Progress summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="bg-sand-900 rounded-2xl p-5 text-sand-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-sand-500 mb-1">Today&apos;s Completion</p>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-light">{completionPct}%</span>
              <span className="text-sm text-sand-500">{completedCount}/{items.length} done</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full border-2 border-sand-600 flex items-center justify-center">
            <Trophy className={cn('w-6 h-6', completionPct === 100 ? 'text-sand-300' : 'text-sand-600')} />
          </div>
        </div>
        <Progress value={completionPct} className="h-2 bg-sand-700 [&>div]:bg-sand-400" />
        {completionPct === 100 && (
          <p className="text-xs text-sand-300 mt-2 font-medium">Exceptional! Full protocol complete today.</p>
        )}
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="flex gap-2 flex-wrap"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
              activeCategory === cat
                ? 'bg-sand-700 text-sand-50'
                : 'bg-sand-100 text-sand-600 hover:bg-sand-200'
            )}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Protocol cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.16 }}
        className="space-y-3"
      >
        {filtered.map((protocol) => (
          <ProtocolCard key={protocol.id} protocol={protocol} onToggle={toggle} />
        ))}
      </motion.div>

      {/* Note from coach */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.24 }}
        className="bg-blush-50 border border-blush-200 rounded-2xl p-5"
      >
        <div className="flex items-start gap-3">
          <img
            src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Coach"
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <p className="text-xs font-medium text-sand-700 mb-0.5">Dr. Elena Marchetti · Your Coach</p>
            <p className="text-sm text-sand-600 leading-relaxed italic">
              &ldquo;You&apos;ve been incredibly consistent this week, Sophia. Your sleep data shows remarkable improvement. Keep prioritizing the evening wind-down — it&apos;s making the biggest difference.&rdquo;
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
