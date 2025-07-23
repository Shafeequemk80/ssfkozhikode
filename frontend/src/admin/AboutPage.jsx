import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-green-50 min-h-screen py-12 px-6 md:px-16 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto space-y-14">

        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
            32nd Edition SSF Kozhikode South District Sahityotsav
          </h1>
          <p className="text-xl text-gray-600 italic">
            Celebrating Artistic Excellence
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-white shadow-md rounded-2xl p-6 md:p-10">
          <p className="text-lg leading-relaxed">
            The <span className="font-semibold text-green-600">Sunni Students' Federation (SSF)</span> is proud to present the 32nd edition of the <strong>Kozhikode South District Sahityotsav</strong>, a premier cultural and artistic extravaganza that has been a cornerstone of creative expression for students across India. For five decades, this esteemed event has provided a platform for young talent to shine, showcasing their skills in various art forms and literary pursuits.
          </p>
        </section>

        {/* About SSF */}
        <section className="bg-white shadow-md rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-green-700 mb-4">About SSF</h2>
          <p className="text-lg leading-relaxed">
            The <strong>Sunni Students' Federation (SSF)</strong> is a national student organization dedicated to nurturing and promoting the intellectual, cultural, and artistic talents of students. With a presence in every state, SSF has been a driving force in shaping the minds of young individuals, empowering them to become leaders and change-makers. Through various programs and events, SSF fosters a culture of creativity, innovation, and excellence among students.
          </p>
        </section>

        {/* About the Event */}
        <section className="bg-white shadow-md rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-green-700 mb-4">About the Event</h2>
          <p className="text-lg leading-relaxed">
            The <strong>Sahityotsav</strong> is a celebration of creativity and talent, featuring around <strong>180 competitions</strong> in art and literature that cater to diverse interests and abilities. From unit level to the National Sahityotsav, the event encourages students to express themselves, explore their creativity, and strive for excellence. Competitions range from poetry and storytelling to painting, performance, and more.
          </p>
        </section>

        {/* Theme */}
        <section className="bg-green-100 border-l-8 border-green-600 shadow-md rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Theme: The Importance of Humanity in Contemporary Scenario
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            This year's Sahityotsav theme highlights the significance of <strong>humanity</strong> in today’s world — where conflicts, crises, and challenges call for empathy, compassion, and creative solutions. Participants are invited to reflect on the role of humanity through their <em>art, literature, and performances</em>, bringing light to a world in need of kindness.
          </p>
        </section>

        {/* Closing Section */}
        <section className="bg-white shadow-md rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Empowering Young Minds</h2>
          <p className="text-lg leading-relaxed">
            The <strong>SSF Kozhikode South District Sahityotsav</strong> is more than just a cultural event — it’s a celebration of the immense artistic potential within young minds. By offering this prestigious platform, we aim to nurture the <span className="text-green-600 font-medium">intellectual, cultural, and creative growth</span> of students, helping shape the leaders of tomorrow.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
