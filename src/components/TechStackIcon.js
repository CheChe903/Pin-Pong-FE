import React from 'react';

const TechStackIcon = ({ stack }) => {
  const colorMap = {
    'React': '61DAFB',
    'JavaScript': 'F7DF1E',
    'Node.js': '339933',
    'Python': '3776AB',
    'Java': '007396',
    'C++': '00599C',
    'C#': '239120',
    'PHP': '777BB4',
    'Ruby': 'CC342D',
    'Swift': 'FA7343',
    'Kotlin': '0095D5',
    'Go': '00ADD8',
    'Rust': '000000',
    'TypeScript': '3178C6',
    'HTML': 'E34F26',
    'CSS': '1572B6',
    'Angular': 'DD0031',
    'Vue.js': '4FC08D',
    'Django': '092E20',
    'Flask': '000000',
    'Spring': '6DB33F',
    'Express': '000000',
    'MongoDB': '47A248',
    'MySQL': '4479A1',
    'PostgreSQL': '336791',
    'Redis': 'DC382D',
    'Docker': '2496ED',
    'Kubernetes': '326CE5',
    'AWS': '232F3E',
    'Azure': '0089D6',
    'Google Cloud': '4285F4',
    'Firebase': 'FFCA28',
    'Git': 'F05032',
    'Jenkins': 'D24939',
    'Jira': '0052CC',
    'Confluence': '172B4D'
  };

  const color = colorMap[stack] || '555555';
  const encodedStack = encodeURIComponent(stack);
  
  return (
    <img 
      src={`https://img.shields.io/badge/${encodedStack}-${color}?style=for-the-badge&logo=${encodedStack}&logoColor=white`}
      alt={stack}
      className="tech-stack-badge"
    />
  );
};

export default TechStackIcon;
