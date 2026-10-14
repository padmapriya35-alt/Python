import { Section } from '../types/curriculum';
import { stage1Section } from './stage1_gettingStarted';
import { stage2Section } from './stage2_fundamentals';
import { stage3Section } from './stage3_controlFlow';
import { stage4Section } from './stage4_dataStructures';
import { stage5Section } from './stage5_functions';
import { stage6Section } from './stage6_modulesPackages';
import { stage7Section } from './stage7_filesData';
import { stage8Section } from './stage8_errorsDebugging';
import { stage9Section } from './stage9_oop';
import { stage10Section } from './stage10_advanced';
import { stage11Section } from './stage11_streamlit';
import { stage12Section } from './stage12_backend';
import { stage13Section } from './stage13_cybersecurity';
import { stage14Section } from './stage14_environmentSetup';

export const allCurriculumSections: Section[] = [
  stage1Section,
  stage2Section,
  stage3Section,
  stage4Section,
  stage5Section,
  stage6Section,
  stage7Section,
  stage8Section,
  stage9Section,
  stage10Section,
  stage11Section,
  stage12Section,
  stage13Section,
  stage14Section
];

export const allLessons = allCurriculumSections.flatMap(section => section.lessons);

export function getLessonById(id: string) {
  return allLessons.find(lesson => lesson.id === id);
}

export function getSectionByLessonId(lessonId: string) {
  return allCurriculumSections.find(section => 
    section.lessons.some(lesson => lesson.id === lessonId)
  );
}

export function getNextAndPrevLessons(currentLessonId: string) {
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex === -1) return { prev: null, next: null };
  return {
    prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  };
}
