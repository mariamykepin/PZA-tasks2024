import React, { useState, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects([
      { id: 1, title: 'Programming Project', description: 'You can visit my github at ....' },
      { id: 2, title: 'Design Project', description: 'You can visit my dribbbles at ...' },
    ]);
  }, []);

  return (
    <section className="p-10">
      <h2 className="text-3xl font-bold mb-4">My Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-4">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
