import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <p>Name: Abhishek Sah</p>
            <p>Email: sahabhishek097@gmail.com</p>
            <p>Date of Birth: september 23, 2001</p>
          </div>

          {/* About Me */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p>
              As a dedicated Junior Full Stack Developer, I specialize in
              crafting flawless web solutions with JavaScript, React.js, and
              Redux for captivating front-end experiences. With expertise in
              Node.js and Express, I build robust back-end applications and
              seamlessly integrate external services through APIs. I'm skilled
              in MongoDB and SQL for efficient data management and prioritize
              security with ironclad authentication measures. With exceptional
              interpersonal skills and proactive problem-solving abilities, I
              bring a dynamic edge to any team, committed to excellence and
              collaboration.
            </p>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 py-2">Education</h2>
            <p className="py-2">
              SECONDARY SCHOOL CERTIFICATE (SSC) :- Our Lady Of Good Council
              High, Sion, Mumbai. School, Pass - 2017
            </p>
            <p className="py-2">
              HIGHER SECONDARY CERTIFICATE (HSC) :- Guru Nanak Khalsa Arts,
              Commerce and Science College, Matunga, Mumbai. 2017 - 2019
            </p>
            <p className="py-2">
              BACHELOR IN INFORMATION TECHNOLOGY (GRADUATION):- Guru Nanak
              Khalsa Arts, Commerce and Science College, Matunga, Mumbai. 2019 -
              2023
            </p>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <ul>
              <li className="py-1 text-lg">• React.js</li>
              <li className="py-1 text-lg">• Node.js</li>
              <li className="py-1 text-lg">• JavaScript</li>
              <li className="py-1 text-lg">• Express.js</li>
              <li className="py-1 text-lg">• MongoDB</li>
              <li className="py-1 text-lg">• WordPress</li>
              <li className="py-1 text-lg">• SQL</li>
              <li className="py-1 text-lg">• HTML</li>
              <li className="py-1 text-lg">• CSS</li>
              <li className="py-1 text-lg">• Tailwind CSS & Chakra UI</li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Certifications</h2>
            <ul>
              <li>FULL STACK JAVASCRIPT WEB DEVELOPMENT</li>
              <p>
                I am proficient in Full Stack JavaScript Development, certified
                by RST Forum in Dadar, with expertise in HTML, CSS, JavaScript,
                React.js, Node.js, Express.js, Redux, Tailwind CSS, Chakra UI,
                MongoDB, and Mongoose for Authentication and Authorization.
              </p>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <div>
              <h3 className="text-lg font-semibold mb-2">E-COMMERCE WEBSITE</h3>
              <p>
                I contributed to developing a dynamic E-commerce website focused
                on clothing, improving user experience with features like
                user-friendly product browsing, secure payment gateways, and
                personalized user accounts. Additionally, I implemented an
                intuitive admin panel for streamlined management of product
                listings, inventory tracking, and order fulfillment. Leveraging
                my expertise in React.js, JavaScript, Tailwind CSS, Node.js,
                Express.js, MongoDB, and Mongoose, I optimized the website's
                performance and enhanced its functionality.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 pt-3">
                User Management API
              </h3>
              <p>
                I have proficiently developed a robust User Management API with
                comprehensive Authentication and Authorization functionalities,
                encompassing user registration, login, user profile management,
                and OTP-based login. Additionally, the API includes email
                confirmation with OTP upon user signup. Notably, I also designed
                and implemented an Admin panel, restricting access to authorized
                personnel for viewing and updating user data. Leveraging my
                expertise in React.js, JavaScript, Tailwind CSS, Node.js,
                Express.js, MongoDB, and Mongoose, I successfully executed this
                project, showcasing my adeptness in full-stack web development.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 pt-3">
                RESTAURANT WEBSITE
              </h3>
              <p>
                I crafted a user-friendly restaurant website with login/signup,
                table booking, and catering service reservations to simplify the
                dining experience for customers. Additionally, I've curated an
                engaging user experience by incorporating dynamic elements like
                interactive menus, enticing image galleries showcasing the
                restaurant's ambiance, and subtle animations throughout the
                site. The designed and implemented only the frontend of the
                restaurant website using HTML, CSS, and JavaScript.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
