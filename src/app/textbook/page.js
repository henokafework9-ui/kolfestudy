"use client";
import { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Download,
  Search,
  Filter,
  GraduationCap,
  Grid,
  List,
  X,
  Eye,
  Bookmark,
  Sparkles,
  CheckCircle2,
  Layers,
  Award,
  Share2,
  ChevronRight,
  FileText,
  Clock,
  BookMarked,
} from 'lucide-react';

// Fixed static dataset for books - ALWAYS offline ready, NO DB dependency
const booksData = [
  // GRADE 9
  {
    id: 1,
    grade: 9,
    title: "Grade 9 Mathematics Student Textbook",
    subject: "Mathematics",
    author: "Ministry of Education Ethiopia",
    pages: 340,
    fileSize: "19.0 MB",
    cover: "/book cover/gread9-maths-cover.jpeg",
    pdf: "/books/grade-9-mathematics-new-curriculum--student-textbook-_kehulum_com_0fa6.pdf",
    bgGradient: "from-blue-600 via-indigo-600 to-purple-700",
    description: "New curriculum Grade 9 Mathematics student textbook covering Real Numbers, Linear Equations, Functions, and Geometry.",
  },
  {
    id: 2,
    grade: 9,
    title: "Grade 9 Physics Student Textbook",
    subject: "Physics",
    author: "Ministry of Education Ethiopia",
    pages: 280,
    fileSize: "8.1 MB",
    cover: "/book cover/gread9-physics-cover.png",
    pdf: "/books/grade-9-physics-new-curriculum--student-textbook-kehulumcom1759930084a307.pdf",
    bgGradient: "from-violet-600 via-purple-600 to-indigo-800",
    description: "New curriculum Grade 9 Physics student textbook covering Measurements, Motion, Force, Work, Energy, and Power.",
  },
  {
    id: 3,
    grade: 9,
    title: "Grade 9 Chemistry Student Textbook",
    subject: "Chemistry",
    author: "Ministry of Education Ethiopia",
    pages: 260,
    fileSize: "7.6 MB",
    cover: "/book cover/gread9-chemistry.jpeg",
    pdf: "/books/grade-9-chemistry-new-curriculum--student-textbook-kehulumcom17599332397bc8.pdf",
    bgGradient: "from-teal-600 via-emerald-600 to-cyan-800",
    description: "New curriculum Grade 9 Chemistry student textbook covering Atomic Structure, Periodic Table, and Chemical Bonding.",
  },
  {
    id: 4,
    grade: 9,
    title: "Grade 9 Biology Student Textbook",
    subject: "Biology",
    author: "Ministry of Education Ethiopia",
    pages: 295,
    fileSize: "11.5 MB",
    cover: "/book cover/gread9-biology-cover.jpeg",
    pdf: "/books/biologe 9.pdf",
    bgGradient: "from-emerald-600 via-green-600 to-teal-800",
    description: "New curriculum Grade 9 Biology student textbook covering Cell Biology, Human Health, Nutrition, and Ecosystems.",
  },
  {
    id: 5,
    grade: 9,
    title: "Grade 9 English Student Textbook",
    subject: "English",
    author: "Ministry of Education Ethiopia",
    pages: 240,
    fileSize: "82.5 MB",
    cover: "/book cover/gread9-english.png",
    pdf: "/books/grade-9-english-for-ethiopia-new-curriculum--student-textbook-kehulumcom175993262346a1.pdf",
    bgGradient: "from-rose-600 via-pink-600 to-red-800",
    description: "Grade 9 English for Ethiopia student textbook focusing on Reading, Grammar, Vocabulary, and Communication skills.",
  },
  {
    id: 6,
    grade: 9,
    title: "Grade 9 Geography Student Textbook",
    subject: "Geography",
    author: "Ministry of Education Ethiopia",
    pages: 220,
    fileSize: "20.8 MB",
    cover: "/book cover/gread9-geograph.jpeg",
    pdf: "/books/grade-9-geography-new-curriculum--student-textbook-kehulumcom1759931498f683.pdf",
    bgGradient: "from-amber-600 via-orange-600 to-yellow-800",
    description: "New curriculum Grade 9 Geography textbook covering Map Reading, Physical Environment, and Population.",
  },
  {
    id: 7,
    grade: 9,
    title: "Grade 9 History Student Textbook",
    subject: "History",
    author: "Ministry of Education Ethiopia",
    pages: 230,
    fileSize: "9.4 MB",
    cover: "/book cover/gread9-history.png",
    pdf: "/books/grade-9-history-new-curriculum--student-textbook-kehulumcom1759931286d445.pdf",
    bgGradient: "from-red-600 via-amber-700 to-orange-800",
    description: "New curriculum Grade 9 History student textbook covering World Civilizations and Ethiopian History.",
  },
  {
    id: 8,
    grade: 9,
    title: "Grade 9 Information Technology (ICT)",
    subject: "ICT",
    author: "Ministry of Education Ethiopia",
    pages: 190,
    fileSize: "14.5 MB",
    cover: '/book cover/gread9-IT.png',
    pdf: "/books/grade-9-information-technology-new-curriculum--student-textbook-kehulumcom1759930819ba23.pdf",
    bgGradient: "from-sky-600 via-blue-600 to-indigo-800",
    description: "New curriculum Grade 9 Information Technology textbook covering Hardware, Software, Word Processing, and Internet.",
  },
  {
    id: 9,
    grade: 9,
    title: "Grade 9 Citizenship Education Student Textbook",
    subject: "Civics",
    author: "Ministry of Education Ethiopia",
    pages: 210,
    fileSize: "7.0 MB",
    cover: "/book cover/gread9-citizenship.jpeg",
    pdf: "/books/grade-9-citizenship-education-new-curriculum--student-textbook-kehulumcom17599329642348.pdf",
    bgGradient: "from-purple-600 via-indigo-600 to-blue-800",
    description: "New curriculum Grade 9 Citizenship Education textbook covering Democracy, Constitution, Rights, and Duties.",
  },
  {
    id: 10,
    grade: 9,
    title: "Grade 9 Amharic Language Student Textbook",
    subject: "Amharic",
    author: "Ministry of Education Ethiopia",
    pages: 250,
    fileSize: "1.4 MB",
    cover: "/book cover/gread9-amharic.jpeg",
    pdf: "/books/grade-9-amharic-new-curriculum1.pdf",
    bgGradient: "from-teal-600 via-cyan-600 to-blue-700",
    description: "New curriculum Grade 9 Amharic language student textbook focusing on Literature, Syntax, and Essay Writing.",
  },
  {
    id: 11,
    grade: 9,
    title: "Grade 9 Economics Student Textbook",
    subject: "Economics",
    author: "Ministry of Education Ethiopia",
    pages: 200,
    fileSize: "4.6 MB",
    cover: "/book cover/gread9-economics.jpeg",
    pdf: "/books/grade-9-economics-new-curriculum--student-textbook-kehulumcom1759932804ce76.pdf",
    bgGradient: "from-emerald-600 via-teal-600 to-green-800",
    description: "New curriculum Grade 9 Economics student textbook covering Fundamental Economic Concepts, Demand, and Supply.",
  },
  {
    id: 12,
    grade: 9,
    title: "Grade 9 Health & Physical Education (HPE)",
    subject: "HPE",
    author: "Ministry of Education Ethiopia",
    pages: 180,
    fileSize: "6.5 MB",
    cover: "/book cover/gread9-sport.jpeg",
    pdf: "/books/grade-9-health-and-physical-education-hpe-new-curriculum--student-textbook-kehulumcom1759931015f4a8.pdf",
    bgGradient: "from-orange-600 via-amber-600 to-yellow-700",
    description: "New curriculum Grade 9 Health and Physical Education textbook focusing on Fitness, Sports, and Health.",
  },

  // GRADE 10
  {
    id: 13,
    grade: 10,
    title: "Grade 10 Mathematics Student Textbook",
    subject: "Mathematics",
    author: "Ministry of Education Ethiopia",
    pages: 350,
    fileSize: "18.0 MB",
    cover: "/book cover/gread10-maths.png",
    pdf: "/books/grade-10-mathematics-new-curriculum--student-textbook-kehulumcom1759925836e39e.pdf",
    bgGradient: "from-blue-600 via-indigo-600 to-purple-700",
    description: "New curriculum Grade 10 Mathematics student textbook covering Polynomials, Logarithms, Trigonometry, and Probability.",
  },
  {
    id: 14,
    grade: 10,
    title: "Grade 10 Physics Student Textbook",
    subject: "Physics",
    author: "Ministry of Education Ethiopia",
    pages: 290,
    fileSize: "9.8 MB",
    cover: "/book cover/gread10-physcis.jpeg",
    pdf: "/books/grade-10-physics-new-curriculum--student-textbook-kehulumcom17599255229e06.pdf",
    bgGradient: "from-violet-600 via-purple-600 to-indigo-800",
    description: "New curriculum Grade 10 Physics student textbook covering Vectors, Electricity, Magnetism, and Waves.",
  },
  {
    id: 15,
    grade: 10,
    title: "Grade 10 Chemistry Student Textbook",
    subject: "Chemistry",
    author: "Ministry of Education Ethiopia",
    pages: 275,
    fileSize: "6.7 MB",
    cover: "/book cover/gread10-chemistry.jpeg",
    pdf: "/books/grade-10-chemistry-new-curriculum--student-textbook-kehulumcom175992936186a3.pdf",
    bgGradient: "from-teal-600 via-emerald-600 to-cyan-800",
    description: "New curriculum Grade 10 Chemistry student textbook covering Chemical Bonding, Reactions, Acids, Bases, and Salts.",
  },
  {
    id: 16,
    grade: 10,
    title: "Grade 10 Biology Student Textbook",
    subject: "Biology",
    author: "Ministry of Education Ethiopia",
    pages: 310,
    fileSize: "12.8 MB",
    cover: "/book cover/gread10-biology.jpeg",
    pdf: "/books/biology_10.pdf",
    bgGradient: "from-emerald-600 via-green-600 to-teal-800",
    description: "New curriculum Grade 10 Biology student textbook covering Genetics, Heredity, Human Systems, and Disease Prevention.",
  },
  {
    id: 17,
    grade: 10,
    title: "Grade 10 English Student Textbook",
    subject: "English",
    author: "Ministry of Education Ethiopia",
    pages: 245,
    fileSize: "5.3 MB",
    cover: "/book cover/gread10-english.jpeg",
    pdf: "/books/grade-10-english-for-ethiopia-new-curriculum--student-textbook-kehulumcom1759928736fa82.pdf",
    bgGradient: "from-rose-600 via-pink-600 to-red-800",
    description: "Grade 10 English for Ethiopia student textbook with advanced Comprehension, Essay Writing, and Grammar.",
  },
  {
    id: 18,
    grade: 10,
    title: "Grade 10 Geography Student Textbook",
    subject: "Geography",
    author: "Ministry of Education Ethiopia",
    pages: 230,
    fileSize: "11.4 MB",
    cover: "/book cover/gread10-geography.jpeg",
    pdf: "/books/grade-10-geography-new-curriculum--student-textbook-kehulumcom17599285581298.pdf",
    bgGradient: "from-amber-600 via-orange-600 to-yellow-800",
    description: "New curriculum Grade 10 Geography textbook covering Physical Geography of Ethiopia & Horn of Africa.",
  },
  {
    id: 19,
    grade: 10,
    title: "Grade 10 History Student Textbook",
    subject: "History",
    author: "Ministry of Education Ethiopia",
    pages: 240,
    fileSize: "10.3 MB",
    cover: "/book cover/gread10-history.jpeg",
    pdf: "/books/grade-10-history-new-curriculum--student-textbook-kehulumcom1759927358e997.pdf",
    bgGradient: "from-red-600 via-amber-700 to-orange-800",
    description: "New curriculum Grade 10 History student textbook covering Modern World History and Modern Ethiopia.",
  },
  {
    id: 20,
    grade: 10,
    title: "Grade 10 Information Technology (ICT)",
    subject: "ICT",
    author: "Ministry of Education Ethiopia",
    pages: 200,
    fileSize: "12.2 MB",
    cover: "/book cover/gread10-IT.png",
    pdf: "/books/grade-10-information-technology-new-curriculum--student-textbook-kehulumcom1759926369d9fc.pdf",
    bgGradient: "from-sky-600 via-blue-600 to-indigo-800",
    description: "New curriculum Grade 10 Information Technology textbook covering Spreadsheets, Databases, and Networking.",
  },
  {
    id: 21,
    grade: 10,
    title: "Grade 10 Citizenship Education Student Textbook",
    subject: "Civics",
    author: "Ministry of Education Ethiopia",
    pages: 215,
    fileSize: "11.9 MB",
    cover: "/book cover/gread10-citizenship.jpeg",
    pdf: "/books/grade-10-citizenship-education-new-curriculum--student-textbook-kehulumcom1759929229d024.pdf",
    bgGradient: "from-purple-600 via-indigo-600 to-blue-800",
    description: "New curriculum Grade 10 Citizenship Education textbook covering Constitutional Governance, Ethics, and Rights.",
  },
  {
    id: 22,
    grade: 10,
    title: "Grade 10 Amharic Language Student Textbook",
    subject: "Amharic",
    author: "Ministry of Education Ethiopia",
    pages: 260,
    fileSize: "4.1 MB",
    cover: "/book cover/gread10-amharic.png",
    pdf: "/books/grade-10-amharic-new-curriculum--student-textbook-kehulumcom1759929798ed19.pdf",
    bgGradient: "from-teal-600 via-cyan-600 to-blue-700",
    description: "New curriculum Grade 10 Amharic language student textbook focusing on Composition, Grammar, and Analysis.",
  },
  {
    id: 23,
    grade: 10,
    title: "Grade 10 Economics Student Textbook",
    subject: "Economics",
    author: "Ministry of Education Ethiopia",
    pages: 210,
    fileSize: "3.1 MB",
    cover: "/book cover/gread10-economics.jpeg",
    pdf: "/books/grade-10-economics-new-curriculum--student-textbook-kehulumcom1759928992f5b9.pdf",
    bgGradient: "from-emerald-600 via-teal-600 to-green-800",
    description: "New curriculum Grade 10 Economics student textbook covering Microeconomics, Production, and Markets.",
  },
  {
    id: 24,
    grade: 10,
    title: "Grade 10 Health & Physical Education (HPE)",
    subject: "HPE",
    author: "Ministry of Education Ethiopia",
    pages: 190,
    fileSize: "9.5 MB",
    cover: "/book cover/gread10-sport.jpeg",
    pdf: "/books/grade-10-health-and-physical-education-hpe-new-curriculum--student-textbook-kehulumcom17599270253739 (1).pdf",
    bgGradient: "from-orange-600 via-amber-600 to-yellow-700",
    description: "New curriculum Grade 10 HPE student textbook focusing on Physical Fitness, Sports Rules, and Health Education.",
  },

  // GRADE 11
  {
    id: 25,
    grade: 11,
    title: "Grade 11 Mathematics Student Textbook",
    subject: "Mathematics",
    author: "Ministry of Education Ethiopia",
    pages: 380,
    fileSize: "143.1 MB",
    cover: "/book cover/gread11-MATHS.jpeg",
    pdf: "/uploads/1786767383812_maths_11.pdf",
    bgGradient: "from-blue-600 via-indigo-600 to-purple-700",
    description: "New curriculum Grade 11 Mathematics student textbook covering Functions, Vectors, Matrices, and Trigonometry.",
  },
 
  {
    id: 26,
    grade: 11,
    title: "Grade 11 Physics Student Textbook",
    subject: "Physics",
    author: "Ministry of Education Ethiopia",
    pages: 320,
    fileSize: "9.7 MB",
    cover: "/book cover/gread11-physics.jpeg",
    pdf: "/books/grade-11-physics-new-curriculum--student-textbook-kehulumcom17551049158ab7.pdf",
    bgGradient: "from-violet-600 via-purple-600 to-indigo-800",
    description: "New curriculum Grade 11 Physics student textbook covering Kinematics, Dynamics, Energy, and Thermodynamics.",
  },
  {
    id: 27,
    grade: 11,
    title: "Grade 11 Chemistry Student Textbook",
    subject: "Chemistry",
    author: "Ministry of Education Ethiopia",
    pages: 305,
    fileSize: "7.7 MB",
    cover: "/book cover/gread11-chemistry.jpeg",
    pdf: "/books/grade-11-chemistry-new-curriculum--student-textbook-kehulumcom17599238964126.pdf",
    bgGradient: "from-teal-600 via-emerald-600 to-cyan-800",
    description: "New curriculum Grade 11 Chemistry student textbook covering Chemical Kinetics, Equilibrium, and Thermodynamics.",
  },
  {
    id: 28,
    grade: 11,
    title: "Grade 11 Biology Student Textbook",
    subject: "Biology",
    author: "Ministry of Education Ethiopia",
    pages: 330,
    fileSize: "40.0 MB",
    cover: "/book cover/gread11-biology.png",
    pdf: "/books/bioloy 11.pdf",
    bgGradient: "from-emerald-600 via-green-600 to-teal-800",
    description: "New curriculum Grade 11 Biology student textbook covering Biomolecules, Enzymes, Cell Respiration, and Taxonomy.",
  },
  {
    id: 29,
    grade: 11,
    title: "Grade 11 English Student Textbook",
    subject: "English",
    author: "Ministry of Education Ethiopia",
    pages: 260,
    fileSize: "146.2 MB",
    cover: "/book cover/gread11-english.png",
    pdf: "/books/grade-11-english-for-ethiopia-new-curriculum--student-textbook-kehulumcom175992307047b8.pdf",
    bgGradient: "from-rose-600 via-pink-600 to-red-800",
    description: "Grade 11 English for Ethiopia student textbook featuring Academic Reading, Advanced Grammar, and Writing.",
  },
  {
    id: 30,
    grade: 11,
    title: "Grade 11 Geography Student Textbook",
    subject: "Geography",
    author: "Ministry of Education Ethiopia",
    pages: 250,
    fileSize: "11.0 MB",
    cover: "/book cover/gread11-GEOGRAPHY.jpeg",
    pdf: "/books/grade-11-geography-new-curriculum--student-textbook-kehulumcom1759920987ac44.pdf",
    bgGradient: "from-amber-600 via-orange-600 to-yellow-800",
    description: "New curriculum Grade 11 Geography textbook covering Geomorphology, Climatology, and Natural Resources.",
  },
  {
    id: 31,
    grade: 11,
    title: "Grade 11 History Student Textbook",
    subject: "History",
    author: "Ministry of Education Ethiopia",
    pages: 265,
    fileSize: "11.4 MB",
    cover: "/book cover/gread11-history.jpeg",
    pdf: "/books/grade-11-history-new-curriculum--student-textbook-kehulumcom17599198807fa3.pdf",
    bgGradient: "from-red-600 via-amber-700 to-orange-800",
    description: "New curriculum Grade 11 History student textbook covering Early State Formation, Ethiopian History, and Global events.",
  },
  {
    id: 32,
    grade: 11,
    title: "Grade 11 Information Technology (ICT)",
    subject: "ICT",
    author: "Ministry of Education Ethiopia",
    pages: 220,
    fileSize: "4.3 MB",
    cover: "/book cover/gread11-IT.jpeg",
    pdf: "/books/grade-11-information-technology-new-curriculum--student-textbook-kehulumcom17599167591be6.pdf",
    bgGradient: "from-sky-600 via-blue-600 to-indigo-800",
    description: "New curriculum Grade 11 ICT textbook covering Database Management, Programming Fundamentals, and Web Design.",
  },
  {
    id: 34,
    grade: 11,
    title: "Grade 11 Economics Student Textbook",
    subject: "Economics",
    author: "Ministry of Education Ethiopia",
    pages: 240,
    fileSize: "5.6 MB",
    cover: "/book cover/gread11-economics.jpeg",
    pdf: "/books/grade-11-economics-new-curriculum--student-textbook-kehulumcom17599236035876.pdf",
    bgGradient: "from-emerald-600 via-teal-600 to-green-800",
    description: "New curriculum Grade 11 Economics student textbook covering Macroeconomics, National Income, and Money & Banking.",
  },
  {
    id: 35,
    grade: 11,
    title: "Grade 11 Agriculture Student Textbook",
    subject: "Agriculture",
    author: "Ministry of Education Ethiopia",
    pages: 250,
    fileSize: "21.3 MB",
    cover: "/book cover/gread11-agriclture.jpeg",
    pdf: "/books/grade-11-agriculture-new-curriculum--student-textbook-kehulumcom17599249828b69.pdf",
    bgGradient: "from-green-600 via-emerald-700 to-teal-800",
    description: "New curriculum Grade 11 Agriculture student textbook covering Crop Production, Soil Science, and Animal Husbandry.",
  },

  // GRADE 12
  {
    id: 36,
    grade: 12,
    title: "Grade 12 Mathematics Student Textbook",
    subject: "Mathematics",
    author: "Ministry of Education Ethiopia",
    pages: 390,
    fileSize: "122.6 MB",
    cover: "/book cover/gread12-maths.jpeg",
    pdf: "/books/grade-12-mathematics-new-curriculum--student-textbook-kehulumcom17599122086bb1.pdf",
    bgGradient: "from-blue-600 via-indigo-600 to-purple-700",
    description: "New curriculum Grade 12 Mathematics student textbook covering Sequences & Series, Differential & Integral Calculus, Vectors, and Statistics.",
  },
  {
    id: 37,
    grade: 12,
    title: "Grade 12 Physics Student Textbook",
    subject: "Physics",
    author: "Ministry of Education Ethiopia",
    pages: 340,
    fileSize: "11.1 MB",
    cover: "/book cover/gread12-physics.jpeg",
    pdf: "/books/grade-12-physics-new-curriculum--student-textbook-kehulumcom1759910068aff6.pdf",
    bgGradient: "from-violet-600 via-purple-600 to-indigo-800",
    description: "New curriculum Grade 12 Physics student textbook covering Electromagnetism, Quantum Physics, and Nuclear Physics.",
  },
  {
    id: 38,
    grade: 12,
    title: "Grade 12 Chemistry Student Textbook",
    subject: "Chemistry",
    author: "Ministry of Education Ethiopia",
    pages: 320,
    fileSize: "6.7 MB",
    cover: "/book cover/gread12-chemistry.png",
    pdf: "/books/grade-12-chemistry-new-curriculum--student-textbook-kehulumcom1759915918b6bd.pdf",
    bgGradient: "from-teal-600 via-emerald-600 to-cyan-800",
    description: "New curriculum Grade 12 Chemistry student textbook covering Organic Chemistry, Electrochemistry, and Polymers.",
  },
  {
    id: 39,
    grade: 12,
    title: "Grade 12 Biology Student Textbook",
    subject: "Biology",
    author: "Ministry of Education Ethiopia",
    pages: 340,
    fileSize: "180.1 MB",
    cover: "/book cover/gread12-biology.png",
    pdf: "/books/grade-12-biology-new-curriculum--student-textbook-kehulumcom17599148324a02.pdf",
    bgGradient: "from-emerald-600 via-green-600 to-teal-800",
    description: "New curriculum Grade 12 Biology student textbook covering Applications of Biology, Biotechnology, Human Body Systems, and Ecology.",
  },
  {
    id: 40,
    grade: 12,
    title: "Grade 12 English Student Textbook",
    subject: "English",
    author: "Ministry of Education Ethiopia",
    pages: 270,
    fileSize: "14.4 MB",
    cover: "/book cover/gread12-english.jpeg",
    pdf: "/books/grade-12-english-for-ethiopia-new-curriculum--student-textbook-kehulumcom1759915593b3b5.pdf",
    bgGradient: "from-rose-600 via-pink-600 to-red-800",
    description: "Grade 12 English for Ethiopia student textbook focusing on Advanced Essay Writing, Literature, Research, and Communication Skills.",
  },
  {
    id: 41,
    grade: 12,
    title: "Grade 12 Geography Student Textbook",
    subject: "Geography",
    author: "Ministry of Education Ethiopia",
    pages: 260,
    fileSize: "11.2 MB",
    cover: "/book cover/gread12-geograph.jpeg",
    pdf: "/books/grade-12-geography-new-curriculum--student-textbook-kehulumcom17599134797b34.pdf",
    bgGradient: "from-amber-600 via-orange-600 to-yellow-800",
    description: "New curriculum Grade 12 Geography textbook covering GIS, Remote Sensing, and Global Economic Geography.",
  },
  {
    id: 42,
    grade: 12,
    title: "Grade 12 History Student Textbook",
    subject: "History",
    author: "Ministry of Education Ethiopia",
    pages: 280,
    fileSize: "7.5 MB",
    cover: "/book cover/gread12-history.jpeg",
    pdf: "/books/grade-12-history-new-curriculum--student-textbook-kehulumcom17599097897dd4.pdf",
    bgGradient: "from-red-600 via-amber-700 to-orange-800",
    description: "New curriculum Grade 12 History student textbook covering Contemporary Ethiopian History and Global Relations.",
  },
  {
    id: 43,
    grade: 12,
    title: "Grade 12 Information Technology (ICT)",
    subject: "ICT",
    author: "Ministry of Education Ethiopia",
    pages: 235,
    fileSize: "8.9 MB",
    cover: "/book cover/gread12- IT.jpeg",
    pdf: "/books/grade-12-information-technology-new-curriculum--student-textbook-kehulumcom1759915352faae.pdf",
    bgGradient: "from-sky-600 via-blue-600 to-indigo-800",
    description: "New curriculum Grade 12 Information Technology textbook covering Information Systems, Software Development, and E-Commerce.",
  },
  {
    id: 44,
    grade: 12,
    title: "Grade 12 Economics Student Textbook",
    subject: "Economics",
    author: "Ministry of Education Ethiopia",
    pages: 240,
    fileSize: "3.9 MB",
    cover: "/book cover/gread12-economics.jpeg",
    pdf: "/books/grade-12-economics-new-curriculum--student-textbook-kehulumcom1759915712056d.pdf",
    bgGradient: "from-emerald-600 via-teal-600 to-green-800",
    description: "New curriculum Grade 12 Economics student textbook covering International Trade, Economic Development, and Ethiopian Economy.",
  },
  {
    id: 45,
    grade: 12,
    title: "Grade 12 Agriculture Student Textbook",
    subject: "Agriculture",
    author: "Ministry of Education Ethiopia",
    pages: 270,
    fileSize: "39.6 MB",
    cover: "/book cover/gread12-agriculture.jpeg",
    pdf: "/books/grade-12-agriculure-new-curriculum--student-textbook-kehulumcom175991626076c1.pdf",
    bgGradient: "from-green-600 via-emerald-700 to-teal-800",
    description: "New curriculum Grade 12 Agriculture student textbook covering Advanced Agronomy, Animal Science, and Agribusiness.",
  },
];

const grades = [9, 10, 11, 12];
const subjects = [
  "All",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Geography",
  "History",
  "ICT",
  "Civics",
  "Amharic",
  "Economics",
  "Agriculture",
  "HPE",
];

// Helper to render book cover fallback with subject-styled gradient & typography
function BookCoverImage({ book }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !book.cover) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-20px",
            bottom: "-20px",
            opacity: 0.15,
            pointerEvents: "none",
            transform: "rotate(15deg) scale(1.4)",
          }}
        >
          <BookOpen size={180} />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                fontWeight: "800",
                letterSpacing: "0.08em",
                padding: "0.2rem 0.6rem",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
              }}
            >
              Grade {book.grade}
            </span>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#a5b4fc" }}>
              PDF BOOK
            </span>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#fde047",
              }}
            >
              {book.subject}
            </span>
            <h4
              style={{
                fontSize: "0.95rem",
                fontWeight: "900",
                lineHeight: 1.3,
                marginTop: "0.3rem",
                color: "#ffffff",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {book.title}
            </h4>
          </div>
        </div>
        <div
          style={{
            paddingTop: "0.6rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "rgba(255, 255, 255, 0.85)",
          }}
        >
          <span>{book.pages ? `${book.pages} Pages` : "Textbook"}</span>
          <span style={{ fontWeight: "700", color: "#60a5fa" }}>{book.fileSize || "PDF"}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={book.cover}
      alt={book.title}
      onError={() => setImgError(true)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.5s ease",
      }}
    />
  );
}

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [activeModalBook, setActiveModalBook] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // Toggle book bookmark
  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter books based on search, grade, and subject
  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      const matchGrade =
        selectedGrade === "All" || String(book.grade) === selectedGrade;
      const matchSubject =
        selectedSubject === "All" || book.subject === selectedSubject;
      const query = search.toLowerCase().trim();
      const matchSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.subject.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        `grade ${book.grade}`.includes(query);

      return matchGrade && matchSubject && matchSearch;
    });
  }, [search, selectedGrade, selectedSubject]);

  // Counts for grade filter tabs
  const gradeCounts = useMemo(() => {
    const counts = { All: booksData.length };
    grades.forEach((g) => {
      counts[g] = booksData.filter((b) => b.grade === g).length;
    });
    return counts;
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        color: "#f8fafc",
        paddingBottom: "5rem",
      }}
    >
      {/* HERO SECTION */}
      <section style={{ padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(129, 140, 248, 0.3)",
              padding: "0.4rem 1.2rem",
              borderRadius: "999px",
              fontSize: "0.85rem",
              fontWeight: "700",
              color: "#a5b4fc",
              marginBottom: "1.25rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <Sparkles size={16} style={{ color: "#818cf8" }} />
            Official Ethiopian Curriculum Textbooks
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: "900",
              lineHeight: 1.15,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 60%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Digital Textbook Repository
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#94a3b8",
              maxWidth: "750px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.6,
            }}
          >
            Instant, direct access to high school textbooks for Grade 9, Grade 10,
            Grade 11, and Grade 12. No registration required.
          </p>

          {/* QUICK STATS CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(99, 102, 241, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#818cf8",
                }}
              >
                <BookOpen size={24} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff" }}>
                  40+
                </div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  Digital Textbooks
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(168, 85, 247, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#c084fc",
                }}
              >
                <GraduationCap size={24} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff" }}>
                  4 Grades
                </div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  Grades 9, 10, 11 & 12
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(236, 72, 153, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f472b6",
                }}
              >
                <Layers size={24} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff" }}>
                  10 Subjects
                </div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  STEM & Social Sciences
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                padding: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#34d399",
                }}
              >
                <CheckCircle2 size={24} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff" }}>
                  100% Free
                </div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  Always Offline Ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH AND CONTROLS SECTION */}
      <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "24px",
            padding: "1.75rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* SEARCH INPUT BAR */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "1.25rem",
                color: "#64748b",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search by book title, subject, or grade (e.g. Grade 11 Biology, Mathematics)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                padding: "1rem 3rem 1rem 3.2rem",
                fontSize: "1rem",
                color: "#ffffff",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.15)")}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: "1.25rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "26px",
                  height: "26px",
                  color: "#cbd5e1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* FILTER ROW */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.25rem",
            }}
          >
            {/* GRADE TABS */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                overflowX: "auto",
                paddingBottom: "0.25rem",
                maxWidth: "100%",
              }}
            >
              <button
                onClick={() => setSelectedGrade("All")}
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "12px",
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  border: "none",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  whiteSpace: "nowrap",
                  background:
                    selectedGrade === "All"
                      ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                      : "rgba(15, 23, 42, 0.6)",
                  color: selectedGrade === "All" ? "#ffffff" : "#94a3b8",
                  boxShadow:
                    selectedGrade === "All"
                      ? "0 4px 14px rgba(99, 102, 241, 0.4)"
                      : "none",
                }}
              >
                All Grades
                <span
                  style={{
                    background:
                      selectedGrade === "All"
                        ? "rgba(255,255,255,0.25)"
                        : "rgba(255,255,255,0.1)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                  }}
                >
                  {gradeCounts.All}
                </span>
              </button>

              {grades.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(String(g))}
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    border: "none",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    whiteSpace: "nowrap",
                    background:
                      selectedGrade === String(g)
                        ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                        : "rgba(15, 23, 42, 0.6)",
                    color: selectedGrade === String(g) ? "#ffffff" : "#94a3b8",
                    boxShadow:
                      selectedGrade === String(g)
                        ? "0 4px 14px rgba(99, 102, 241, 0.4)"
                        : "none",
                  }}
                >
                  Grade {g}
                  <span
                    style={{
                      background:
                        selectedGrade === String(g)
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(255,255,255,0.1)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {gradeCounts[g]}
                  </span>
                </button>
              ))}
            </div>

            {/* SUBJECT & VIEW MODE CONTROLS */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {/* SUBJECT SELECTOR */}
              <div style={{ position: "relative" }}>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  style={{
                    background: "rgba(15, 23, 42, 0.8)",
                    color: "#e2e8f0",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    padding: "0.6rem 2.2rem 0.6rem 1rem",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    outline: "none",
                    cursor: "pointer",
                    appearance: "none",
                    WebkitAppearance: "none",
                  }}
                >
                  {subjects.map((sub) => (
                    <option key={sub} value={sub} style={{ background: "#0f172a", color: "#fff" }}>
                      {sub === "All" ? "All Subjects" : sub}
                    </option>
                  ))}
                </select>
                <Filter
                  size={14}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* VIEW MODE TOGGLE */}
              <div
                style={{
                  display: "flex",
                  background: "rgba(15, 23, 42, 0.8)",
                  padding: "3px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  style={{
                    padding: "0.45rem",
                    borderRadius: "9px",
                    border: "none",
                    background: viewMode === "grid" ? "#6366f1" : "transparent",
                    color: viewMode === "grid" ? "#fff" : "#94a3b8",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="List View"
                  style={{
                    padding: "0.45rem",
                    borderRadius: "9px",
                    border: "none",
                    background: viewMode === "list" ? "#6366f1" : "transparent",
                    color: viewMode === "list" ? "#fff" : "#94a3b8",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TEXTBOOKS GRID / LIST SECTION */}
      <section style={{ maxWidth: "1240px", margin: "3rem auto 0", padding: "0 1.5rem" }}>
        {/* RESULTS HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff" }}>
              {selectedGrade === "All"
                ? "All Grade Textbooks"
                : `Grade ${selectedGrade} Textbooks`}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              Showing {filteredBooks.length} textbook{filteredBooks.length !== 1 ? "s" : ""}
            </p>
          </div>

          {(search || selectedGrade !== "All" || selectedSubject !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedGrade("All");
                setSelectedSubject("All");
              }}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#cbd5e1",
                padding: "0.4rem 1rem",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>

        {/* NO RESULTS DISPLAY */}
        {filteredBooks.length === 0 ? (
          <div
            style={{
              background: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              padding: "4rem 2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "rgba(99, 102, 241, 0.15)",
                color: "#818cf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <BookOpen size={36} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#ffffff" }}>
              No Textbooks Found
            </h3>
            <p style={{ color: "#94a3b8", maxWidth: "450px", margin: "0.5rem auto 1.5rem" }}>
              We couldn't find any textbooks matching "{search || selectedSubject}".
              Try searching with another keyword or resetting your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedGrade("All");
                setSelectedSubject("All");
              }}
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.75rem",
                borderRadius: "999px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {filteredBooks.map((book) => {
              const isBookmarked = bookmarkedIds.includes(book.id);

              return (
                <div
                  key={book.id}
                  className="group"
                  style={{
                    background: "rgba(30, 41, 59, 0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = "rgba(129, 140, 248, 0.4)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 35px -10px rgba(99, 102, 241, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px -5px rgba(0, 0, 0, 0.3)";
                  }}
                >
                  {/* BOOK COVER CONTAINER */}
                  <div
                    style={{
                      height: "260px",
                      position: "relative",
                      overflow: "hidden",
                      background: "#0f172a",
                    }}
                  >
                    <BookCoverImage book={book} />

                    {/* GRADE BADGE */}
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "rgba(15, 23, 42, 0.85)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#818cf8",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: "800",
                        letterSpacing: "0.03em",
                      }}
                    >
                      Grade {book.grade}
                    </span>

                    {/* BOOKMARK BUTTON */}
                    <button
                      onClick={(e) => toggleBookmark(book.id, e)}
                      title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        background: isBookmarked
                          ? "#6366f1"
                          : "rgba(15, 23, 42, 0.75)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Bookmark
                        size={16}
                        fill={isBookmarked ? "#ffffff" : "transparent"}
                      />
                    </button>
                  </div>

                  {/* BOOK METADATA BODY */}
                  <div
                    style={{
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          color: "#818cf8",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {book.subject}
                      </span>
                      <span style={{ color: "#475569" }}>•</span>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                        {book.fileSize}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: "800",
                        color: "#ffffff",
                        lineHeight: 1.3,
                        marginBottom: "0.6rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {book.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#94a3b8",
                        marginBottom: "1.25rem",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {book.description}
                    </p>

                    {/* ACTIONS ROW */}
                    <div
                      style={{
                        marginTop: "auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.6rem",
                      }}
                    >
                      <button
                        onClick={() => setActiveModalBook(book)}
                        style={{
                          background: "rgba(99, 102, 241, 0.15)",
                          border: "1px solid rgba(129, 140, 248, 0.3)",
                          color: "#a5b4fc",
                          padding: "0.6rem 0.5rem",
                          borderRadius: "10px",
                          fontSize: "0.8rem",
                          fontWeight: "700",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.35rem",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#6366f1";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(99, 102, 241, 0.15)";
                          e.currentTarget.style.color = "#a5b4fc";
                        }}
                      >
                        <Eye size={14} /> Read Online
                      </button>

                      <a
                        href={book.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        style={{
                          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                          color: "#ffffff",
                          padding: "0.6rem 0.5rem",
                          borderRadius: "10px",
                          fontSize: "0.8rem",
                          fontWeight: "700",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.35rem",
                          boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Download size={14} /> PDF Link
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW */
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filteredBooks.map((book) => {
              const isBookmarked = bookmarkedIds.includes(book.id);

              return (
                <div
                  key={book.id}
                  style={{
                    background: "rgba(30, 41, 59, 0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "18px",
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1.25rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(129, 140, 248, 0.4)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      flex: 1,
                      minWidth: "280px",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "80px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <BookCoverImage book={book} />
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <span
                          style={{
                            background: "rgba(99, 102, 241, 0.2)",
                            color: "#818cf8",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "800",
                          }}
                        >
                          Grade {book.grade}
                        </span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "#34d399",
                            fontWeight: "700",
                          }}
                        >
                          {book.subject}
                        </span>
                        <span style={{ color: "#475569" }}>•</span>
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                          {book.pages} Pages ({book.fileSize})
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "800",
                          color: "#fff",
                          margin: "0 0 0.25rem",
                        }}
                      >
                        {book.title}
                      </h3>

                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#94a3b8",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {book.description}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <button
                      onClick={(e) => toggleBookmark(book.id, e)}
                      style={{
                        padding: "0.6rem",
                        borderRadius: "10px",
                        background: isBookmarked
                          ? "#6366f1"
                          : "rgba(15, 23, 42, 0.6)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <Bookmark
                        size={16}
                        fill={isBookmarked ? "#ffffff" : "transparent"}
                      />
                    </button>

                    <button
                      onClick={() => setActiveModalBook(book)}
                      style={{
                        background: "rgba(99, 102, 241, 0.15)",
                        border: "1px solid rgba(129, 140, 248, 0.3)",
                        color: "#a5b4fc",
                        padding: "0.6rem 1.25rem",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <Eye size={16} /> Read
                    </button>

                    <a
                      href={book.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                        color: "#ffffff",
                        padding: "0.6rem 1.25rem",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        fontWeight: "700",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <Download size={16} /> PDF
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FULLSCREEN / MODAL BOOK READER */}
      {activeModalBook && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setActiveModalBook(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "950px",
              maxHeight: "90vh",
              background: "#0f172a",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "24px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                padding: "1.25rem 1.75rem",
                background: "rgba(30, 41, 59, 0.9)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      background: "#6366f1",
                      color: "#fff",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: "800",
                    }}
                  >
                    Grade {activeModalBook.grade}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#818cf8",
                      fontWeight: "700",
                    }}
                  >
                    {activeModalBook.subject}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "800",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  {activeModalBook.title}
                </h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <a
                  href={activeModalBook.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                    color: "#ffffff",
                    padding: "0.55rem 1.2rem",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Download size={16} /> Open PDF
                </a>
                <button
                  onClick={() => setActiveModalBook(null)}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* MODAL CONTENT / EMBEDDED READER */}
            <div
              style={{
                flex: 1,
                minHeight: "500px",
                background: "#1e293b",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <iframe
                src={`${activeModalBook.pdf}#toolbar=1&navpanes=0`}
                title={activeModalBook.title}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "800px",
                  border: "none",
                }}
              />
            </div>

            {/* MODAL FOOTER */}
            <div
              style={{
                padding: "1rem 1.75rem",
                background: "rgba(30, 41, 59, 0.9)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.85rem",
                color: "#94a3b8",
              }}
            >
              <div>
                Author:{" "}
                <strong style={{ color: "#cbd5e1" }}>
                  {activeModalBook.author}
                </strong>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <span>File Size: {activeModalBook.fileSize}</span>
                <span>Pages: {activeModalBook.pages}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
