export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured: boolean;
  image: string;
}

export const blogCategories = [
  'Career Tips',
  'Resume Writing',
  'Interview Prep',
  'Job Search',
  'Professional Development',
  'Industry Insights',
  'Workplace Skills',
  'Networking'
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Resume Mistakes That Are Costing You Job Interviews',
    slug: '10-resume-mistakes-costing-job-interviews',
    excerpt: 'Discover the most common resume mistakes that prevent you from getting interviews and learn how to fix them.',
    content: `
<h1>10 Resume Mistakes That Are Costing You Job Interviews</h1>

<p>Your resume is your first impression with potential employers. Unfortunately, many job seekers make critical mistakes that prevent them from landing interviews. Here are the top 10 resume mistakes and how to avoid them.</p>

<h2>1. Generic, One-Size-Fits-All Resumes</h2>
<p><strong>The Mistake:</strong> Using the same resume for every job application.</p>
<p><strong>The Fix:</strong> Customize your resume for each position by incorporating keywords from the job description and highlighting relevant experience.</p>

<h2>2. Poor Formatting and Design</h2>
<p><strong>The Mistake:</strong> Using inconsistent fonts, poor spacing, or overly creative designs that distract from content.</p>
<p><strong>The Fix:</strong> Use clean, professional formatting with consistent fonts, proper spacing, and clear section headers.</p>

<h2>3. Focusing on Duties Instead of Achievements</h2>
<p><strong>The Mistake:</strong> Listing job responsibilities without showing impact.</p>
<p><strong>The Fix:</strong> Use action verbs and quantify your achievements. Instead of "Managed social media," write "Increased social media engagement by 150% over 6 months."</p>

<h2>4. Including Irrelevant Information</h2>
<p><strong>The Mistake:</strong> Adding personal details, hobbies, or outdated experience that doesn't relate to the target job.</p>
<p><strong>The Fix:</strong> Only include information that's relevant to the position you're applying for.</p>

<h2>5. Typos and Grammatical Errors</h2>
<p><strong>The Mistake:</strong> Submitting resumes with spelling mistakes or poor grammar.</p>
<p><strong>The Fix:</strong> Proofread multiple times, use spell-check, and have someone else review your resume.</p>

<h2>6. Weak or Missing Professional Summary</h2>
<p><strong>The Mistake:</strong> Starting with a generic objective or skipping the summary entirely.</p>
<p><strong>The Fix:</strong> Write a compelling 2-3 sentence summary that highlights your key qualifications and value proposition.</p>

<h2>7. Inconsistent Employment History</h2>
<p><strong>The Mistake:</strong> Leaving gaps unexplained or showing frequent job changes without context.</p>
<p><strong>The Fix:</strong> Address employment gaps honestly and show career progression or skill development.</p>

<h2>8. Using Passive Language</h2>
<p><strong>The Mistake:</strong> Writing in passive voice or using weak language.</p>
<p><strong>The Fix:</strong> Use strong action verbs like "Led," "Developed," "Increased," "Implemented."</p>

<h2>9. Including Outdated Contact Information</h2>
<p><strong>The Mistake:</strong> Using old email addresses, phone numbers, or unprofessional email handles.</p>
<p><strong>The Fix:</strong> Use a professional email address and ensure all contact information is current.</p>

<h2>10. Making It Too Long or Too Short</h2>
<p><strong>The Mistake:</strong> Creating a 4-page resume or cramming everything into half a page.</p>
<p><strong>The Fix:</strong> Aim for 1-2 pages, focusing on the most relevant and recent experience.</p>

<h2>Conclusion</h2>
<p>Avoiding these common mistakes can significantly improve your chances of landing interviews. Remember, your resume should tell a compelling story of your professional journey and demonstrate the value you can bring to an employer.</p>
    `,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Career Coach and Resume Expert with 10+ years of experience helping professionals land their dream jobs.'
    },
    category: 'Resume Writing',
    tags: ['Resume Tips', 'Job Search', 'Career Advice'],
    publishedAt: '2024-01-15',
    readTime: 8,
    featured: true,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'How to Ace Your Next Job Interview: A Complete Guide',
    slug: 'how-to-ace-job-interview-complete-guide',
    excerpt: 'Master the art of interviewing with proven strategies, common questions, and expert tips.',
    content: `
# How to Ace Your Next Job Interview: A Complete Guide

Job interviews can be nerve-wracking, but with proper preparation and the right mindset, you can turn them into opportunities to shine. Here's your complete guide to interview success.

## Before the Interview

### Research the Company
- Study the company's mission, values, and recent news
- Understand their products, services, and target market
- Research the interviewer on LinkedIn if possible

### Prepare Your Stories
Use the STAR method (Situation, Task, Action, Result) to prepare examples that demonstrate:
- Leadership skills
- Problem-solving abilities
- Teamwork and collaboration
- Adaptability and learning

### Practice Common Questions
- "Tell me about yourself"
- "Why do you want this job?"
- "What are your strengths and weaknesses?"
- "Where do you see yourself in 5 years?"

## During the Interview

### Make a Great First Impression
- Arrive 10-15 minutes early
- Dress appropriately for the company culture
- Offer a firm handshake and maintain eye contact
- Bring multiple copies of your resume

### Show Enthusiasm and Engagement
- Ask thoughtful questions about the role and company
- Listen actively and respond thoughtfully
- Show genuine interest in the opportunity

### Handle Difficult Questions
- Take a moment to think before answering
- Be honest about areas for improvement
- Turn weaknesses into learning opportunities

## After the Interview

### Follow Up Professionally
- Send a thank-you email within 24 hours
- Reiterate your interest in the position
- Address any concerns that came up during the interview

### Continue Your Job Search
- Don't put all your eggs in one basket
- Keep applying to other positions
- Use the interview experience to improve for next time

## Red Flags to Watch For

Be aware of these warning signs during interviews:
- Vague job descriptions
- High turnover rates
- Unprofessional interviewer behavior
- Pressure to accept immediately

## Conclusion

Remember, interviews are a two-way street. While the company is evaluating you, you should also be assessing whether they're the right fit for your career goals. Stay confident, be authentic, and let your qualifications speak for themselves.
    `,
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'HR Director and Interview Coach with expertise in talent acquisition and candidate development.'
    },
    category: 'Interview Prep',
    tags: ['Interview Tips', 'Job Search', 'Career Development'],
    publishedAt: '2024-01-12',
    readTime: 10,
    featured: true,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'The Ultimate Guide to LinkedIn Networking for Job Seekers',
    slug: 'ultimate-guide-linkedin-networking-job-seekers',
    excerpt: 'Learn how to leverage LinkedIn effectively to build professional relationships and find job opportunities.',
    content: `
# The Ultimate Guide to LinkedIn Networking for Job Seekers

LinkedIn is more than just an online resume—it's a powerful networking tool that can open doors to new opportunities. Here's how to use it effectively for your job search.

## Optimizing Your LinkedIn Profile

### Professional Headline
Your headline should be more than just your job title. Include keywords and value proposition:
- Instead of: "Marketing Manager"
- Try: "Digital Marketing Manager | Driving 200% ROI Growth | SaaS & E-commerce Expert"

### Summary Section
Write a compelling summary that tells your professional story:
- Start with a hook
- Highlight key achievements
- Include relevant keywords
- End with a call to action

### Experience Section
- Use bullet points to highlight achievements
- Include metrics and results
- Use industry keywords
- Keep descriptions concise but impactful

## Building Your Network

### Connect Strategically
- Connect with colleagues, classmates, and industry professionals
- Personalize connection requests
- Aim for quality over quantity

### Engage with Content
- Like, comment, and share relevant posts
- Write thoughtful comments that add value
- Share industry insights and articles

### Join LinkedIn Groups
- Participate in industry-specific groups
- Share knowledge and ask questions
- Build relationships with group members

## Job Searching on LinkedIn

### Use LinkedIn Jobs
- Set up job alerts for relevant positions
- Use the "Easy Apply" feature strategically
- Research companies and hiring managers

### Reach Out to Recruiters
- Connect with recruiters in your industry
- Keep your profile updated and searchable
- Be responsive to recruiter messages

### Leverage Your Network
- Let your network know you're job searching
- Ask for introductions to hiring managers
- Request informational interviews

## Creating Valuable Content

### Share Industry Insights
- Comment on industry trends
- Share relevant articles with your perspective
- Write about your professional experiences

### Showcase Your Expertise
- Write LinkedIn articles about your field
- Share project successes and learnings
- Participate in industry discussions

## LinkedIn Etiquette

### Do's
- Keep interactions professional
- Respond promptly to messages
- Thank people for connections and help
- Maintain an active presence

### Don'ts
- Don't spam people with sales pitches
- Avoid controversial topics
- Don't connect without personalization
- Don't neglect your profile updates

## Measuring Your Success

Track these metrics to gauge your LinkedIn effectiveness:
- Profile views
- Connection growth
- Post engagement
- InMail responses
- Job application responses

## Conclusion

LinkedIn networking is a marathon, not a sprint. Consistent engagement, valuable content sharing, and genuine relationship building will yield the best results for your job search and career development.
    `,
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'LinkedIn Strategist and Personal Branding Expert helping professionals build their online presence.'
    },
    category: 'Networking',
    tags: ['LinkedIn', 'Networking', 'Job Search', 'Personal Branding'],
    publishedAt: '2024-01-10',
    readTime: 12,
    featured: false,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    title: '5 In-Demand Skills Every Professional Should Develop in 2024',
    slug: '5-in-demand-skills-professionals-2024',
    excerpt: 'Stay ahead of the curve by developing these essential skills that employers are actively seeking.',
    content: `
# 5 In-Demand Skills Every Professional Should Develop in 2024

The job market is constantly evolving, and staying competitive means continuously developing new skills. Here are the top 5 skills that will be in high demand throughout 2024.

## 1. Artificial Intelligence and Machine Learning Literacy

### Why It Matters
AI is transforming every industry, and professionals who understand how to work with AI tools will have a significant advantage.

### How to Develop It
- Take online courses in AI fundamentals
- Learn to use AI tools like ChatGPT, Claude, or industry-specific AI platforms
- Understand the ethical implications of AI
- Practice prompt engineering

### Career Impact
- Increased efficiency and productivity
- Better decision-making capabilities
- Enhanced problem-solving skills
- Higher earning potential

## 2. Data Analysis and Interpretation

### Why It Matters
Data-driven decision making is crucial across all industries, not just tech companies.

### How to Develop It
- Learn tools like Excel, Google Analytics, Tableau, or Power BI
- Understand basic statistics and data visualization
- Practice interpreting data to make business recommendations
- Take courses in data analysis

### Career Impact
- Better strategic thinking
- Improved business acumen
- Enhanced credibility with leadership
- More opportunities for advancement

## 3. Digital Marketing and Social Media Management

### Why It Matters
Every business needs an online presence, making digital marketing skills valuable across industries.

### How to Develop It
- Learn SEO, SEM, and social media advertising
- Understand content marketing strategies
- Get certified in Google Ads and Facebook Ads
- Practice creating engaging content

### Career Impact
- Increased visibility and personal branding
- Better understanding of customer behavior
- Enhanced communication skills
- Opportunities in growing digital economy

## 4. Emotional Intelligence and Leadership

### Why It Matters
As automation handles routine tasks, human skills like emotional intelligence become more valuable.

### How to Develop It
- Practice active listening and empathy
- Learn conflict resolution techniques
- Develop self-awareness and self-regulation
- Take leadership training courses

### Career Impact
- Better team collaboration
- Improved management capabilities
- Enhanced client relationships
- Greater career advancement opportunities

## 5. Cybersecurity Awareness

### Why It Matters
With increasing cyber threats, every professional needs to understand cybersecurity basics.

### How to Develop It
- Learn about common cyber threats
- Understand data protection principles
- Practice secure online behaviors
- Get certified in cybersecurity fundamentals

### Career Impact
- Increased value to employers
- Better risk management skills
- Enhanced professional credibility
- Opportunities in growing security field

## How to Get Started

### Create a Learning Plan
1. Assess your current skill level
2. Choose 1-2 skills to focus on initially
3. Set specific, measurable goals
4. Allocate time for regular practice

### Find Learning Resources
- Online platforms: Coursera, Udemy, LinkedIn Learning
- Professional certifications
- Industry conferences and workshops
- Mentorship and networking

### Apply Your Skills
- Volunteer for projects that use new skills
- Create personal projects to practice
- Share your learning journey on LinkedIn
- Seek feedback from colleagues and mentors

## Conclusion

Investing in these skills will not only make you more valuable in your current role but also prepare you for future opportunities. Start with one skill that aligns with your career goals and gradually expand your expertise.

Remember, the key to skill development is consistent practice and real-world application. Don't just learn—implement what you've learned to see real career benefits.
    `,
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Learning and Development Specialist focused on future-ready skills and career advancement strategies.'
    },
    category: 'Professional Development',
    tags: ['Skills Development', 'Career Growth', 'Future Skills', 'Professional Development'],
    publishedAt: '2024-01-08',
    readTime: 9,
    featured: false,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Remote Work: How to Stay Productive and Advance Your Career',
    slug: 'remote-work-productivity-career-advancement',
    excerpt: 'Master remote work with strategies for productivity, communication, and career growth in a virtual environment.',
    content: `
# Remote Work: How to Stay Productive and Advance Your Career

Remote work has become the new normal for many professionals. While it offers flexibility, it also presents unique challenges for productivity and career advancement. Here's how to thrive in a remote work environment.

## Setting Up for Success

### Create a Dedicated Workspace
- Designate a specific area for work
- Invest in ergonomic furniture
- Ensure good lighting and minimal distractions
- Keep your workspace organized and professional

### Establish Boundaries
- Set clear work hours and stick to them
- Communicate your schedule to family/roommates
- Create rituals to start and end your workday
- Resist the urge to work from bed or couch

## Productivity Strategies

### Time Management Techniques
- Use the Pomodoro Technique for focused work sessions
- Block time for deep work and meetings separately
- Prioritize tasks using the Eisenhower Matrix
- Take regular breaks to maintain energy

### Technology Tools
- Project management: Asana, Trello, Monday.com
- Communication: Slack, Microsoft Teams, Zoom
- Time tracking: RescueTime, Toggl, Clockify
- Note-taking: Notion, Obsidian, Evernote

### Minimize Distractions
- Use website blockers during work hours
- Turn off non-essential notifications
- Keep your phone in another room
- Use noise-canceling headphones

## Communication and Collaboration

### Overcommunicate
- Provide regular updates on project progress
- Be proactive in sharing challenges and solutions
- Use video calls for important discussions
- Document decisions and action items

### Build Relationships
- Schedule virtual coffee chats with colleagues
- Participate in team-building activities
- Join company social channels
- Attend virtual networking events

### Meeting Best Practices
- Always test technology before important calls
- Have good lighting and a professional background
- Mute when not speaking
- Prepare agenda and talking points in advance

## Career Advancement in Remote Work

### Increase Your Visibility
- Volunteer for high-visibility projects
- Share your wins and achievements regularly
- Contribute to company-wide initiatives
- Mentor junior team members

### Develop New Skills
- Take advantage of online learning opportunities
- Attend virtual conferences and webinars
- Pursue relevant certifications
- Learn new technologies and tools

### Network Virtually
- Join professional associations and online communities
- Participate in industry forums and discussions
- Attend virtual networking events
- Maintain relationships with former colleagues

## Maintaining Work-Life Balance

### Set Clear Boundaries
- Create physical separation between work and personal space
- Establish "commute" rituals to transition between modes
- Take actual lunch breaks away from your desk
- Use vacation time and truly disconnect

### Stay Connected
- Schedule regular check-ins with friends and family
- Join virtual social groups or hobby clubs
- Maintain relationships outside of work
- Consider co-working spaces for social interaction

### Take Care of Your Health
- Maintain regular exercise routine
- Eat healthy meals and stay hydrated
- Get adequate sleep and maintain consistent schedule
- Take breaks to rest your eyes and stretch

## Common Remote Work Challenges and Solutions

### Challenge: Feeling Isolated
**Solution:** Schedule regular video calls, join virtual communities, work from coffee shops occasionally

### Challenge: Difficulty Focusing
**Solution:** Use time-blocking, eliminate distractions, create accountability systems

### Challenge: Communication Gaps
**Solution:** Overcommunicate, use multiple channels, schedule regular check-ins

### Challenge: Career Stagnation
**Solution:** Be proactive about visibility, seek feedback regularly, pursue growth opportunities

## Building a Remote Career

### Position Yourself as a Remote Work Expert
- Share tips and best practices with colleagues
- Help onboard new remote team members
- Advocate for remote-friendly policies
- Become a go-to resource for remote work solutions

### Develop Remote Leadership Skills
- Learn to manage and motivate virtual teams
- Master asynchronous communication
- Build trust without face-to-face interaction
- Create inclusive virtual environments

## Conclusion

Remote work success requires intentionality, discipline, and continuous adaptation. By implementing these strategies, you can not only maintain productivity but also advance your career in a remote environment.

Remember, remote work is a skill that improves with practice. Be patient with yourself as you develop new habits and routines that work for your unique situation.
    `,
    author: {
      name: 'Lisa Thompson',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      bio: 'Remote Work Consultant and Productivity Expert helping teams and individuals excel in virtual environments.'
    },
    category: 'Workplace Skills',
    tags: ['Remote Work', 'Productivity', 'Work-Life Balance', 'Career Development'],
    publishedAt: '2024-01-05',
    readTime: 11,
    featured: false,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop'
  }
];

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post =>
      post.id !== currentPost.id &&
      (post.category === currentPost.category ||
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};
