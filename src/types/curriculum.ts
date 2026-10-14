export interface KnowledgeCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EndOfTopicQuestions {
  easy: string;
  medium: string;
  hard: string;
}

export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  subtitle?: string;
  readingTimeMinutes: number;
  definition: string;
  inSimpleTerms: string;
  whyDoesItExist: string;
  howDoesItWork: string;
  syntaxDescription: string;
  exampleCode: string;
  codeExplanation: string[];
  expectedOutput: string;
  commonMistakes: { mistake: string; consequence: string; correction: string }[];
  importantPoints: string[];
  relatedConcepts: { name: string; targetId?: string; note: string }[];
  knowledgeCheck?: KnowledgeCheck;
  endOfTopicQuestions: EndOfTopicQuestions;
  memoryDiagram?: {
    title: string;
    description: string;
    bindings: { name: string; pointsTo: string; type: string; memoryId: string; value: string }[];
  };
}

export interface Section {
  id: string;
  number: number;
  title: string;
  description: string;
  badge: string;
  lessons: Lesson[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  simpleExplanation: string;
  exampleSnippet?: string;
}
