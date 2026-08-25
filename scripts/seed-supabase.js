const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iessywmmbgbwhzyrinkg.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_FW4QRajmhUxU4Lx1g5ypSg_SYnObLFe';

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleExams = [
  { title: "Mathematics Final 2025", subject: "Math", date: "June 2025" },
  { title: "Physics Midterm 2025", subject: "Physics", date: "April 2025" },
  { title: "Chemistry Mock Exam", subject: "Chemistry", date: "May 2025" }
];

const sampleBooks = [
  { title: "Advanced Mathematics", author: "Dr. Smith", category: "Textbook" },
  { title: "Intro to Modern Physics", author: "Prof. Einstein", category: "Reference" },
  { title: "Organic Chemistry Guide", author: "Dr. Polymer", category: "Study Guide" }
];

const sampleNews = [
  { title: "Science Fair 2026 Announced", date: "Aug 15, 2026", excerpt: "Get ready to showcase your innovative projects at this year's annual science fair." },
  { title: "Library Renovation Complete", date: "Aug 10, 2026", excerpt: "The new digital study pods and expanded reading areas are now open to all students." },
  { title: "Upcoming Parent-Teacher Meetings", date: "Aug 05, 2026", excerpt: "Schedule your slots for the mid-semester academic reviews." }
];

async function seed() {
  console.log('Seeding Supabase database...');

  try {
    const { data: eData, error: eErr } = await supabase.from('exams').insert(sampleExams).select();
    if (eErr) console.error('Exams error:', eErr.message);
    else console.log('Exams inserted:', eData.length);
  } catch (err) {
    console.error('Failed exams seed:', err);
  }

  try {
    const { data: bData, error: bErr } = await supabase.from('books').insert(sampleBooks).select();
    if (bErr) console.error('Books error:', bErr.message);
    else console.log('Books inserted:', bData.length);
  } catch (err) {
    console.error('Failed books seed:', err);
  }

  try {
    const { data: nData, error: nErr } = await supabase.from('news').insert(sampleNews).select();
    if (nErr) console.error('News error:', nErr.message);
    else console.log('News inserted:', nData.length);
  } catch (err) {
    console.error('Failed news seed:', err);
  }

  console.log('Seeding finished.');
}

seed();
