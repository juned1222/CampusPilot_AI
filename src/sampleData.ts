/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Subject, PYQAnalysis, CommunityNote, VivaQuestion, CodingQuestion, LeaderboardUser, ContributorBadge } from './types';

export const SUBJECTS: Subject[] = [
  { id: 'bt101', code: 'BT101', name: 'Engineering Chemistry', year: 'First Year', category: 'First Year', unitsCount: 5, description: 'Covers water analysis, boiler troubles, coal analysis, lubricants, and polymer synthesis.' },
  { id: 'bt102', code: 'BT102', name: 'Engineering Mathematics-I', year: 'First Year', category: 'First Year', unitsCount: 5, description: 'Maclaurin and Taylor expansion, partial differentiation, Maxima & Minima, Euler’s theorem.' },
  { id: 'bt103', code: 'BT103', name: 'English for Communication', year: 'First Year', category: 'First Year', unitsCount: 4, description: 'Sentence drafting, barriers to communication, letter writing, official correspondence.' },
  { id: 'bt104', code: 'BT104', name: 'Basic Electrical & Electronics', year: 'First Year', category: 'First Year', unitsCount: 5, description: 'DC circuits, Kirchhoff’s laws, AC circuits, Transformers, and Semiconductor diodes.' },
  { id: 'bt105', code: 'BT105', name: 'Engineering Physics', year: 'First Year', category: 'First Year', unitsCount: 5, description: 'Lasers, Fiber optics, Superconductors, Wave particle duality, and Quantum mechanics.' },
  { id: 'bt106', code: 'BT106', name: 'Basic Computer Engineering', year: 'First Year', category: 'First Year', unitsCount: 5, description: 'Computer anatomy, C++ programming basics, OOPs concepts, and Database definitions.' },
  { id: 'bt107', code: 'BT107', name: 'Engineering Graphics', year: 'First Year', category: 'First Year', unitsCount: 5, description: 'Scales, conic sections, projections of points, lines, plans and solids.' },
  { id: 'bt108', code: 'BT108', name: 'Rural Outreach', year: 'First Year', category: 'First Year', unitsCount: 3, description: 'Rural sociology, farming systems, community welfare, and localized technical solutions.' },
  { id: 'cs301', code: 'CS301', name: 'Data Structures', year: 'Second Year', category: 'Core CS', unitsCount: 5, description: 'Arrays, Stacks, Queues, Linked Lists, Trees (AVL, BST) and Hashing algorithms.' },
  { id: 'cs401', code: 'CS401', name: 'Analysis & Design of Algorithms', year: 'Second Year', category: 'Core CS', unitsCount: 5, description: 'Divide & Conquer, Greedy method, Dynamic Programming, Backtracking, and NP-Hard problems.' },
  { id: 'cs501', code: 'CS501', name: 'Operating Systems', year: 'Third Year', category: 'Core CS', unitsCount: 5, description: 'Process management, CPU scheduling, deadlocks, virtual memory, paging, and file management.' },
  { id: 'cs601', code: 'CS601', name: 'Computer Networks', year: 'Third Year', category: 'Core CS', unitsCount: 5, description: 'OSI Reference Model, TCP/IP, routing algorithms, slide window protocols, subnets, DNS.' },
  { id: 'cs701', code: 'CS701', name: 'Web Development & Cloud', year: 'Final Year', category: 'Specialization', unitsCount: 5, description: 'React architecture, RESTful servers, Node.js, routing, virtualization, and AWS Cloud deployments.' }
];

export const CORE_BADGES: ContributorBadge[] = [
  { id: 'b1', name: 'First Milestone', description: 'Contributed your first PYQ paper or summary', icon: 'Award' },
  { id: 'b2', name: 'Saviour Of Batch', description: 'Your exam emergency resource got 50+ downloads', icon: 'Flame' },
  { id: 'b3', name: 'Gold Pen Academic', description: 'Contributed 5 sets of handwritten high-quality study sheets ', icon: 'BookOpen' },
  { id: 'b4', name: 'External Specialist', description: 'Added 20+ realistic viva questions with expert tips', icon: 'CheckCircle' },
  { id: 'b5', name: 'Alumni Contributor', description: 'Contributed interview experiences / roadmap items', icon: 'Star' }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Aarav Sharma', points: 1450, badgeCount: 4, contributions: 18 },
  { rank: 2, name: 'Ananya Verma', points: 1220, badgeCount: 3, contributions: 15 },
  { rank: 3, name: 'Rahul Chaurasia', points: 1050, badgeCount: 3, contributions: 12 },
  { rank: 4, name: 'Priyanjali Sen', points: 940, badgeCount: 2, contributions: 9 },
  { rank: 5, name: 'You (Rahul RGPV)', points: 540, badgeCount: 2, contributions: 5, isCurrentUser: true },
  { rank: 6, name: 'Amit Saxena', points: 410, badgeCount: 1, contributions: 4 },
  { rank: 7, name: 'Simran Singh', points: 320, badgeCount: 1, contributions: 3 }
];

export const SAMPLE_PYQS: PYQAnalysis[] = [
  {
    id: 'pyq_1',
    subjectCode: 'BT101',
    paperName: 'RGPV End-Sem Dec 2025',
    year: '2025',
    type: 'End-Sem',
    difficulty: 'Medium',
    uploadedBy: 'Aarav Sharma',
    uploadedAt: 'Jan 2026',
    frequentTopics: [
      { topic: 'Zeolite process & Lime-Soda calculations', frequency: 9, weightage: 22, trend: 'rising' },
      { topic: 'Proximate and Ultimate Coal analysis', frequency: 8, weightage: 18, trend: 'stable' },
      { topic: 'Calorific value using Bomb Calorimeter', frequency: 7, weightage: 15, trend: 'rising' },
      { topic: 'Polymerization (Nylon-66, Bakelite mechanism)', frequency: 6, weightage: 12, trend: 'stable' },
      { topic: 'Lubricant properties (Viscosity Index, Flash point)', frequency: 5, weightage: 10, trend: 'failing' }
    ],
    unitWeightages: [
      { unit: 'Unit I', name: 'Water & Carbon Analysis', percentage: 25 },
      { unit: 'Unit II', name: 'Boiler feed water & Treatment', percentage: 20 },
      { unit: 'Unit III', name: 'Lubricants & Tribology', percentage: 15 },
      { unit: 'Unit IV', name: 'Coal & Combustibles Technology', percentage: 22 },
      { unit: 'Unit V', name: 'Polymer Science & Synthetics', percentage: 18 }
    ],
    expectedQuestions: [
      { question: 'A water sample contains 150 mg/l of Mg(HCO3)2 and 80 mg/l of CaSO4. Calculate temporary and permanent hardness in terms of CaCO3 equivalents.', estimatedMarks: 10, confidenceScore: 94 },
      { question: 'Explain the principle, diagram and mechanism of the Lime-Soda continuous de-mineralizer process.', estimatedMarks: 14, confidenceScore: 89 },
      { question: 'Explain chemical polymerization dynamics of Bakelite and Teflon preparation with synthetic loops.', estimatedMarks: 7, confidenceScore: 85 }
    ]
  },
  {
    id: 'pyq_2',
    subjectCode: 'BT104',
    paperName: 'RGPV End-Sem June 2025',
    year: '2025',
    type: 'End-Sem',
    difficulty: 'Hard',
    uploadedBy: 'Ananya Verma',
    uploadedAt: 'Jul 2025',
    frequentTopics: [
      { topic: 'Superposition & Thevenin Theorem proof/numericals', frequency: 10, weightage: 25, trend: 'rising' },
      { topic: 'Transformer Equivalent Circuit & Efficiency', frequency: 8, weightage: 20, trend: 'stable' },
      { topic: 'Three-Phase Balanced Star/Delta Systems', frequency: 7, weightage: 18, trend: 'rising' },
      { topic: 'Half wave & Full wave rectifiers with ripple calculations', frequency: 5, weightage: 15, trend: 'stable' },
      { topic: 'BJT configurations & collector feedback bias', frequency: 4, weightage: 12, trend: 'failing' }
    ],
    unitWeightages: [
      { unit: 'Unit I', name: 'DC Network Analysis', percentage: 24 },
      { unit: 'Unit II', name: 'Single & Three-Phase AC Systems', percentage: 22 },
      { unit: 'Unit III', name: 'Magnetic Circuits & Inductance', percentage: 14 },
      { unit: 'Unit IV', name: 'Electrical Machines & Transformers', percentage: 20 },
      { unit: 'Unit V', name: 'Semiconductor Devices & Diode Applications', percentage: 20 }
    ],
    expectedQuestions: [
      { question: 'State and prove Superposition Theorem. Draw network steps to find current flowing through 5-ohm load resistor.', estimatedMarks: 12, confidenceScore: 96 },
      { question: 'Derive the EMF equation of a single phase transformer. What are the major losses that affect winding efficiency?', estimatedMarks: 8, confidenceScore: 91 },
      { question: 'Find load voltage of a delta connection given balanced load impedance of (12 + j16) ohms per phase across 415V source.', estimatedMarks: 10, confidenceScore: 87 }
    ]
  },
  {
    id: 'pyq_3',
    subjectCode: 'CS301',
    paperName: 'RGPV MST-II Nov 2025',
    year: '2025',
    type: 'MST-II',
    difficulty: 'Medium',
    uploadedBy: 'Priyanjali Sen',
    uploadedAt: 'Nov 2025',
    frequentTopics: [
      { topic: 'AVL Tree rotations & Height balancing logic', frequency: 9, weightage: 30, trend: 'rising' },
      { topic: 'Dijkstra & Prim Dijkstra algorithm simulation', frequency: 8, weightage: 25, trend: 'rising' },
      { topic: 'Hashing collisions & Chaining vs Open Addressing', frequency: 6, weightage: 20, trend: 'failing' },
      { topic: 'BST insertions and recursive traversal algorithms', frequency: 5, weightage: 15, trend: 'stable' }
    ],
    unitWeightages: [
      { unit: 'Unit I', name: 'Basic linear stacks and Linked list structures', percentage: 10 },
      { unit: 'Unit II', name: 'Non-linear tree hierarchies', percentage: 35 },
      { unit: 'Unit III', name: 'Graph node maps & path metrics', percentage: 30 },
      { unit: 'Unit IV', name: 'Sorting & Search tables', percentage: 15 },
      { unit: 'Unit V', name: 'Collision and Hash stores', percentage: 10 }
    ],
    expectedQuestions: [
      { question: 'Construct an AVL tree by inserting following values sequentially: 15, 20, 24, 10, 13, 7, 30, 22. Identify and perform specific rotations.', estimatedMarks: 14, confidenceScore: 95 },
      { question: 'Differentiate between BFS and DFS. Write a complete interactive traversal function in C++.', estimatedMarks: 10, confidenceScore: 90 }
    ]
  }
];

export const SAMPLE_NOTES: CommunityNote[] = [
  {
    id: 'note_1',
    subjectCode: 'BT101',
    title: 'Water Technology Unit 1 - Golden Shortcuts & Boiler Problems',
    author: 'Rajesh Mishra',
    authorYear: 'RGPV 2026 Passout',
    likes: 88,
    downloads: 142,
    fileSize: '4.2 MB',
    fileType: 'Handwritten Scan',
    topicsCovered: ['Water Hardness', 'Zeolite calculations', 'CaCO3 comparison table', 'EDTA titrations steps'],
    aiSummary: 'An absolute lifesaver blueprint for EDTA numerical questions. Rajesh details step-by-step math setups, and explains the background behind 1000g water density equivalents. Demystifies scale vs sludge formation, priming and foaming remedies, and boiler rust chemistry in high temperatures.',
    flashcards: [
      { question: 'What is the color change sequence in EDTA titration?', answer: 'Wine red to sharp steel blue (using Eriochrome Black T indicator at pH 10 buffered by NH4OH).' },
      { question: 'What causes Caustic Embrittlement in boilers?', answer: 'Boiler feed water containing Na2CO3 decomposes into NaOH, which reacts with highly stressed joint seams causing microscopic cracks.' },
      { question: 'Write the scale-preventing chemical for carbonate conditioning.', answer: 'Sodium phosphate (Na3PO4) or Calgon (sodium hexametaphosphate) forming soluble complexes.' }
    ],
    createdAt: '3 days ago'
  },
  {
    id: 'note_2',
    subjectCode: 'BT105',
    title: 'Fiber Optics & Quantum Principles Handouts - Simple Exam Formulas',
    author: 'Nikita Patel',
    authorYear: 'EC Batch 3rd Year',
    likes: 72,
    downloads: 110,
    fileSize: '2.8 MB',
    fileType: 'PDF',
    topicsCovered: ['Numerical Aperture', 'Step Index vs Graded Index', 'Schrodingers Wave Engine', 'Laser population inversion'],
    aiSummary: 'A condensed 12-page roadmap for Physics Unit III & IV. Includes hand-drawn layout diagrams for Ruby Laser and Helium-Neon laser systems. Distills the Schrödinger time-independent equations into 4 easily reproducible math lines, and provides a direct cheat sheet for refractive indices boundary math.',
    flashcards: [
      { question: 'What is the physical significance of Wavefunction (ψ)?', answer: 'The wave function itself has no physical reality, but its square magnitude |ψ|² represents the probability density of finding a particle at a coordinate.' },
      { question: 'What is the equation for Numerical Aperture of an optical fiber?', answer: 'NA = √(n₁² - n₂²) where n₁ is the core refractive index and n₂ is the cladding refractive index.' },
      { question: 'List three vital properties of Laser radiation.', answer: 'Extremely monochromatic, highly directional, highly coherent, and of hyper-intense brilliance.' }
    ],
    createdAt: '1 week ago'
  },
  {
    id: 'note_3',
    subjectCode: 'CS301',
    title: 'Tree Rotations & AVL Tree Cheat Sheet with Visual Trace',
    author: 'Vikram Aditya',
    authorYear: 'CSE 3rd Year',
    likes: 95,
    downloads: 164,
    fileSize: '1.5 MB',
    fileType: 'Handwritten Scan',
    topicsCovered: ['AVL Tree', 'LL, RR, LR, RL Rotations', 'BST insertion bugs', 'B-Trees introduction'],
    aiSummary: 'Drawn in colored ink, this reference contains the explicit transformations for all balanced tree rotations. Vikram maps exactly which child nodes switch parents during LL (left-left) and RL (right-left) rotation, which saves 15 minutes of confusion in theoretical MST papers.',
    flashcards: [
      { question: 'What are the permissible balance factors of an AVL node?', answer: 'Every node must have a balance factor of either -1, 0, or +1.' },
      { question: 'When is a RL (Right-Left) double rotation triggered?', answer: 'When a value is inserted into the left subtree of the right child of a critical node.' }
    ],
    createdAt: '4 days ago'
  }
];

export const SAMPLE_VIVAQA: VivaQuestion[] = [
  {
    id: 'vq1',
    subjectCode: 'BT101',
    question: 'Why is hard water not preferred in laundry washing operations?',
    answer: 'Hard water contains magnesium and calcium salts that immediately react with soap molecules (sodium palmitate/stearate) to form an insoluble grayish precipitates called "scum". This scales soap potency and wastes raw cleaning components before foaming occurs.',
    difficulty: 'Easy',
    frequencyIndex: 9,
    examinerInsight: 'Often asked as the initial warm-up question. Answer directly with chemical scum composition details to show expertise.',
    followUpQuestion: 'Can we use synthetic detergents in hard water instead? Why?'
  },
  {
    id: 'vq2',
    subjectCode: 'BT101',
    question: 'What is the operational chemical difference between Zeolite and Ion-Exchange methods?',
    answer: 'Zeolite (hydrated sodium aluminosilicate) can replace only cations by substituting them with Na+ ions, whereas Ion-Exchange processes employ cation-exchange resins (H+ donors) and anion-exchange resins (OH- donors) sequentially. This demineralizes water completely rather than just replacing some minerals.',
    difficulty: 'Medium',
    frequencyIndex: 8,
    examinerInsight: 'The external examiner may drill you on the chemical regenerant compounds (such as NaCl vs HCl/NaOH).',
    followUpQuestion: 'How would you chemically revive a saturated anion and cation resin cell?'
  },
  {
    id: 'vq3',
    subjectCode: 'BT105',
    question: 'Why must the optical fiber cladding have a lower refractive index than the core?',
    answer: 'Applying the condition for Total Internal Reflection (TIR) requires light to travel from a denser medium (with higher refractive index, core) to a rarer medium (with lower refractive index, cladding) with an angle of incidence greater than the critical angle.',
    difficulty: 'External Examiner Level',
    frequencyIndex: 10,
    examinerInsight: 'Extremely popular topic! The examiner might ask you to draw the TIR boundary on a sketch pad.',
    followUpQuestion: 'What is acceptance angle and how does NA limit it?'
  },
  {
    id: 'vq4',
    subjectCode: 'BT104',
    question: 'What is core loss in transformers and why is it categorized into hysteresis and eddy-current components?',
    answer: 'Core loss represents power lost inside the magnetic laminations due to alternating fluxes. Hysteresis loss occurs due to molecular friction domain reversals (magnetic lagging), while Eddy Current loss is induced circulatory currents within metal sheets. Stacked thin insulated steel plates are used to combat eddy currents.',
    difficulty: 'Medium',
    frequencyIndex: 8,
    examinerInsight: 'Be ready to explain why copper loss changes with load current while core loss remains absolutely constant.',
    followUpQuestion: 'How does load change affect copper loss relative to system load factor?'
  },
  {
    id: 'vq5',
    subjectCode: 'CS301',
    question: 'What is the principal difference between AVL Trees and basic Binary Search Trees (BST)?',
    answer: 'A standard BST can become highly unbalanced and degrade into a linear list with Worst-Case operations taking O(N) time. An AVL Tree is a self-balancing binary search tree that automatically adjusts via directional rotations to maintain a node height difference (balance factor) within a -1 to +1 limit, securing O(log N) operations.',
    difficulty: 'External Examiner Level',
    frequencyIndex: 9,
    examinerInsight: 'Expect examiners to challenge you on why Red-Black Trees are preferred in databases over AVL.',
    followUpQuestion: 'How many rotations are required to balance a double-heavy node chain?'
  }
];

export const SAMPLE_CODING: CodingQuestion[] = [
  {
    id: 'c1',
    category: 'DSA',
    title: 'Topological Sort (Kahn’s Algorithm)',
    difficulty: 'Medium',
    problemStatement: 'Given a Directed Acyclic Graph (DAG) with V vertices and E edges, return a valid topological ordering of vertices. A topological sorting is a linear ordering of vertices such that for every directed edge u -> v, vertex u comes before v in the ordering.',
    sampleInput: 'V = 6, adj = [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]',
    sampleOutput: '[5, 4, 2, 3, 0, 1]',
    optimalComplexity: 'O(V + E) Time, O(V) Space',
    codeSolution: `// C++ Implementation of Kahn's BFS Algorithm
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> topologicalSort(int V, vector<vector<int>>& adj) {
    vector<int> inDegree(V, 0);
    for (int i = 0; i < V; i++) {
        for (int neighbor : adj[i]) {
            inDegree[neighbor]++;
        }
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    vector<int> topo;
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        topo.push_back(curr);
        
        for (int neighbor : adj[curr]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    return topo;
}`,
    companyTags: ['Amazon', 'Google', 'Flipkart', 'Cisco']
  },
  {
    id: 'c2',
    category: 'C++',
    title: 'Polymorphism & Virtual Functions Pitfalls',
    difficulty: 'Medium',
    problemStatement: 'Demonstrate how a Virtual Destructor is crucial in base pointer operations. Illustrate what occurs when base pointers reference dynamically-allocated derived classes and are deleted without standard virtual definitions.',
    optimalComplexity: 'O(1) Space Overhead via vptr',
    codeSolution: `#include <iostream>
using namespace std;

class Base {
public:
    Base() { cout << "Base Constructor\\n"; }
    // CRITICAL: Must be virtual to avoid memory leaks!
    virtual ~Base() { cout << "Base Destructor\\n"; }
};

class Derived : public Base {
    int* data;
public:
    Derived() { 
        cout << "Derived Constructor\\n"; 
        data = new int[100]; 
    }
    ~Derived() { 
        cout << "Derived Destructor (Releasing memory)\\n"; 
        delete[] data; 
    }
};

int main() {
    Base* ptr = new Derived();
    delete ptr; // Triggers Base AND Derived destructors correctly because Base destructor is virtual
    return 0;
}`,
    companyTags: ['Microsoft', 'Qualcomm', 'Adobe']
  },
  {
    id: 'c3',
    category: 'Web Dev',
    title: 'Custom React Fetch Hook with Abort Controller',
    difficulty: 'Medium',
    problemStatement: 'Implement a highly robust custom hook \`useFetch\` in React/TypeScript. The hook must perform standard async fetches, expose reactive state (data, loading, error), and support auto-cleanup via the standard AbortController standard to prevent state modifications on cancelled unmounted nodes.',
    codeSolution: `import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(\`Network response failed with code \${response.status}\`);
        }
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Fetch failed');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}`,
    companyTags: ['Meta', 'Uber', 'Razorpay']
  }
];
