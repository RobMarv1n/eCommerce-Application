import { Link } from 'react-router-dom';
import { ProfileCard } from './ProfileCard/ProfileCard';

import styles from './AboutUs.module.css';

export function AboutUs() {
  const team = [
    {
      image: '/alexey-kandyba.jpg',
      name: 'Alexey Kandyba',
      role: 'Team Lead',
      description:
        'Hi, I am Alex. I started learning programming at university, and after trying out several languages, my eyes settled on JS and the frontend. For me, frontend is not just about writing code. This is creating a user experience that leaves a pleasant impression. I strive to ensure that every element on the page is not only functional, but also intuitive, responsive, and visually appealing.',
      contributions: [
        'CI/CD',
        'Creating Login page',
        'Creating Registration page',
        'Creating Profile page',
        'Writing tests',
      ],
      github: 'https://github.com/RobMarv1n',
    },
    {
      image: '/sergey-elsukov.jpg',
      name: 'Sergey Elsukov',
      role: 'Design Engineer',
      description:
        'My name is Sergey. I graduated from the Physics Department of Samara State University and have been working as a design engineer ever since.I do physical calculations and often write Delphi programs to perform them. A couple of years ago, I became interested in the JavaScript language and decided to take RS School courses. Completed the Node.JS and Pre-School courses. After completing the basic course on Frontend, I plan to take a course on React. I really love programming and will continue to develop in this field.',
      contributions: [
        'Development environment configuration',
        'Creating and setting up client Api on the commercetools platform',
        'Creating the database and importing products and categories',
        'Implementing API interactions with the database',
        'Creating product cards, a list of categories, and a list of ratings for a catalog page',
      ],
      github: 'https://github.com/Sergey-Ado',
    },
    {
      image: '/aleksey-zaderiy.jpg',
      name: 'Aleksey Zaderiy',
      role: 'UI Developer',
      description:
        'Hi, my name is Aleksey, I am an aspiring UI developer with a passion for building things from scratch. After years of exploring different career paths, I found my direction in web development. I enjoy building engaging user interfaces and I am especially interested in exploring complex animations and technologies like Three.js. I am currently studying at RS School and love making music in my free time.',
      contributions: [
        'Project design',
        'Styling pages and components',
        'Creating Header component',
        'Creating UI components in project',
        'Creating Error page',
        'Creating About Us page',
        'Creating Product page',
      ],
      github: 'https://github.com/howlight',
    },
  ];

  return (
    <section className={`container ${styles.aboutUs}`}>
      <div>
        <h1 className={`title ${styles.aboutUsTitle}`}>
          <span className={styles.aboutUsTitleAccent}>Meet</span> Our Team
          🥒🥕🥬
        </h1>
        <p className={styles.aboutUsIntroduction}>
          Behind every great product is&nbsp;a&nbsp;dedicated team
          of&nbsp;passionate individuals, working together to&nbsp;bring ideas
          to&nbsp;life.
        </p>
      </div>
      <div className={styles.aboutUsProfileCards}>
        {team.map(
          ({ image, name, role, description, contributions, github }) => {
            return (
              <ProfileCard
                key={name}
                image={image}
                name={name}
                role={role}
                description={description}
                contributions={contributions}
                github={github}
              />
            );
          }
        )}
      </div>
      <Link to={'https://rs.school'} target="_blank">
        <img src="/logo-rs.svg" alt="RS School Logo" width={120} height={62} />
      </Link>
    </section>
  );
}
