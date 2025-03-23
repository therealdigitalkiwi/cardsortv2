import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { Card } from './Card';
import type { CardData } from '../types';

const initialCards: CardData[] = [
  { 
    id: '1',
    title: 'Strategic Alignment',
    summary: 'Connect daily tasks to organizational objectives through roadmap planning',
    detail: 'Develop phased roadmaps with SMART goals, track KPIs, and maintain business objective alignment using Gantt charts and OKR frameworks.'
  },
  { 
    id: '2',
    title: 'Stakeholder Diplomacy',
    summary: 'Manage expectations across leadership and teams',
    detail: 'Create communication matrices with tailored updates for executives/teams, conduct alignment workshops, and resolve conflicts through structured negotiation.'
  },
  { 
    id: '3',
    title: 'Risk Forecasting',
    summary: 'Anticipate threats before they impact timelines',
    detail: 'Implement risk registers with probability/impact scores, conduct premortems for high-stakes phases, and establish mitigation trigger points.'
  },
  { 
    id: '4',
    title: 'Agile Facilitation',
    summary: 'Lead iterative delivery with team flexibility',
    detail: 'Manage sprint capacity planning, maintain velocity dashboards, and remove blockers through daily standups and retrospective action plans.'
  },
  { 
    id: '5',
    title: 'Resource Orchestration',
    summary: 'Optimize team talents and budgets',
    detail: 'Balance workloads using capacity heatmaps, negotiate shared resources, and implement productivity tracking with timeboxing techniques.'
  },
  { 
    id: '6',
    title: 'Scope Guardianship',
    summary: 'Prevent creep while adapting to needs',
    detail: 'Maintain requirement traceability matrices, lead change control boards, and validate deliverables against baseline agreements.'
  },
  { 
    id: '7',
    title: 'Cross-Team Synergy',
    summary: 'Align departments with conflicting priorities',
    detail: 'Facilitate working agreements through RACI matrices, run collaborative design sessions, and resolve conflicts with escalation protocols.'
  },
  { 
    id: '8',
    title: 'Decisive Momentum',
    summary: 'Balance speed with informed choices',
    detail: 'Implement RAPID decision models, maintain decision logs with owners/dates, and escalate bottlenecks through predefined protocols.'
  },
  { 
    id: '9',
    title: 'Influence Engineering',
    summary: 'Secure buy-in from resistant stakeholders',
    detail: 'Map power dynamics, demonstrate quick wins through pilots, and build consensus with phased implementation strategies.'
  },
  { 
    id: '10',
    title: 'Knowledge Amplification',
    summary: 'Convert experience into team assets',
    detail: 'Conduct After Action Reviews (AARs), maintain searchable lesson databases, and update playbooks with process improvements.'
  },
];

export function CardGrid() {
  const [cards, setCards] = useState(initialCards);
  
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleReset() {
    setCards(initialCards);
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Card Sorting Activity</h1>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-white bg-apple-blue rounded-full
            hover:bg-blue-600 transition-colors duration-200"
        >
          Reset Order
        </button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={cards} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}