export interface Lesson {
  id: string;
  title: string;
  type: "VIDEO" | "READING" | "QUIZ";
  duration: string;
  completed: boolean;
}

export interface Section {
  id: string;
  title: string;
  goal: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  progress: number;
  sections: Section[];
}

export const COURSES: Course[] = [
  {
    id: "101",
    title: "English Grammar Essentials",
    subtitle: "Master grammar fundamentals for IELTS band 7+",
    description:
      "A comprehensive course covering all essential grammar topics tested in IELTS. From tenses to complex sentence structures, build the foundation needed to excel in both Writing and Speaking modules.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=300&fit=crop",
    progress: 0.6,
    sections: [
      {
        id: "s1",
        title: "Section 1: Introduction to Grammar",
        goal: "Understand core grammar concepts and identify weak areas.",
        lessons: [
          { id: "l1", title: "What is IELTS Grammar?", type: "VIDEO", duration: "~10 min", completed: true },
          { id: "l2", title: "Common Grammar Mistakes", type: "VIDEO", duration: "~8 min", completed: true },
          { id: "l3", title: "Grammar Diagnostic Quiz", type: "QUIZ", duration: "~15 min", completed: true },
        ],
      },
      {
        id: "s2",
        title: "Section 2: Tenses & Verb Forms",
        goal: "Master all 12 tenses and use them accurately in writing.",
        lessons: [
          { id: "l4", title: "Present Tenses Deep Dive", type: "VIDEO", duration: "~12 min", completed: true },
          { id: "l5", title: "Past Tenses Explained", type: "VIDEO", duration: "~10 min", completed: true },
          { id: "l6", title: "Future Tenses & Conditionals", type: "VIDEO", duration: "~14 min", completed: false },
          { id: "l7", title: "Tense Practice Exercises", type: "QUIZ", duration: "~20 min", completed: false },
        ],
      },
      {
        id: "s3",
        title: "Section 3: Complex Sentences",
        goal: "Build complex sentence structures for higher band scores.",
        lessons: [
          { id: "l8", title: "Relative Clauses", type: "VIDEO", duration: "~11 min", completed: false },
          { id: "l9", title: "Passive Voice Mastery", type: "VIDEO", duration: "~9 min", completed: false },
          { id: "l10", title: "Sentence Structure Quiz", type: "QUIZ", duration: "~15 min", completed: false },
        ],
      },
    ],
  },
  {
    id: "234",
    title: "Vocabulary Builder Pro",
    subtitle: "Expand your vocabulary for higher IELTS scores",
    description:
      "Learn high-frequency IELTS vocabulary organized by topic. Each section includes word lists, contextual examples, and practice exercises to ensure retention.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop",
    progress: 0.35,
    sections: [
      {
        id: "s1",
        title: "Section 1: Education Vocabulary",
        goal: "Learn 50+ education-related words and phrases.",
        lessons: [
          { id: "l1", title: "Academic Word List Overview", type: "VIDEO", duration: "~12 min", completed: true },
          { id: "l2", title: "Education Topic Vocabulary", type: "READING", duration: "~15 min", completed: true },
          { id: "l3", title: "Practice: Education Words", type: "QUIZ", duration: "~10 min", completed: false },
        ],
      },
      {
        id: "s2",
        title: "Section 2: Technology & Science",
        goal: "Build vocabulary for technology and science topics.",
        lessons: [
          { id: "l4", title: "Tech & Science Keywords", type: "VIDEO", duration: "~10 min", completed: false },
          { id: "l5", title: "Reading Practice: AI Article", type: "READING", duration: "~20 min", completed: false },
        ],
      },
    ],
  },
  {
    id: "305",
    title: "Conversation Mastery",
    subtitle: "Speak fluently and confidently in any situation",
    description:
      "Develop natural conversation skills through structured practice. Cover common IELTS Speaking topics with model answers and pronunciation drills.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=300&fit=crop",
    progress: 0.1,
    sections: [
      {
        id: "s1",
        title: "Section 1: Speaking Fundamentals",
        goal: "Understand the IELTS Speaking test format and criteria.",
        lessons: [
          { id: "l1", title: "Speaking Test Overview", type: "VIDEO", duration: "~8 min", completed: true },
          { id: "l2", title: "Fluency vs Accuracy", type: "VIDEO", duration: "~10 min", completed: false },
        ],
      },
      {
        id: "s2",
        title: "Section 2: Part 1 Topics",
        goal: "Answer Part 1 questions naturally and confidently.",
        lessons: [
          { id: "l3", title: "Introducing Yourself", type: "VIDEO", duration: "~7 min", completed: false },
          { id: "l4", title: "Talking About Hobbies", type: "VIDEO", duration: "~9 min", completed: false },
          { id: "l5", title: "Part 1 Mock Practice", type: "QUIZ", duration: "~15 min", completed: false },
        ],
      },
    ],
  },
];