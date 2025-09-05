// // components/LearnMore.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const LearnMore = () => {
//   const [info, setInfo] = useState(null);
//   const [testimonials, setTestimonials] = useState({ wedding: [], tutoringChemistry: [] });

//   useEffect(() => {
//         const fetchData = async () => {
//       try {
//         const [infoRes, testimonialsRes] = await Promise.all([
//           axios.get('/learn-more'),
//           axios.get('/testimonials')
//         ]);
//         setInfo(infoRes.data);
//         setTestimonials(testimonialsRes.data);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!info || !testimonials) return <div>Loading...</div>;

//   return (
//     <div className="learn-more">
//       <h1>About LMJM-services</h1>
//       <p>{info.overview}</p>

//       <h2>How It Works</h2>
//       <p>{info.howItWorks}</p>

//       <h2>Benefits</h2>
//       <ul>{info.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>

//       <h2>Use Cases</h2>
//       <p>{info.useCases}</p>

//       <h2>Tech Stack</h2>
//       <p>{info.techStack}</p>

//       <h2>Developer Features</h2>
//       <ul>{info.devFeatures.map((f, i) => <li key={i}>{f}</li>)}</ul>

//       <h2>Reliability</h2>
//       <p>{info.reliability}</p>

//       <h2>Explore More</h2>
//       <a href={info.callToAction.contact}>Contact Us</a> | <a href={info.callToAction.docs}>Documentation</a>

//       <h2>💍 Wedding Testimonials</h2>
//       {testimonials.wedding.length > 0 ? (
//         testimonials.wedding.map((t, i) => (
//           <blockquote key={`wedding-${i}`}>
//             <p>"{t.quote}"</p>
//             <footer>— {t.name}</footer>
//           </blockquote>
//         ))
//       ) : (
//         <p>No wedding testimonials available.</p>
//       )}

//       <h2>🧪 Tutoring Chemistry Testimonials</h2>
//       {testimonials.tutoringChemistry.length > 0 ? (
//         testimonials.tutoringChemistry.map((t, i) => (
//           <blockquote key={`tutoring-${i}`}>
//             <p>"{t.quote}"</p>
//             <footer>— {t.name}</footer>
//           </blockquote>
//         ))
//       ) : (
//         <p>No tutoring testimonials available.</p>
//       )}
//     </div>
//   );
// };

// export default LearnMore;

// components/LearnMore.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LearnMore = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearnMoreData = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        setData(response.data);
      } catch (err) {
        console.error('Error fetching LearnMore data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLearnMoreData();
  }, []);

  if (loading || !data) return <div>Loading...</div>;

  const {
    overview,
    howItWorks,
    benefitsValues,
    useCases,
    techStack,
    developerFeatures,
    scalability,
    callToAction,
    wedding,
    tutoringChemistry
  } = data;

  return (
    <div className="learn-more">
      <h1>{overview.title}</h1>
      <p>{overview.content}</p>

      <h2>{howItWorks.title}</h2>
      <p>{howItWorks.content}</p>

      <h2>{benefitsValues.title}</h2>
      <ul>
        {benefitsValues.content.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <h2>{useCases.title}</h2>
      <p>{useCases.content}</p>

      <h2>{techStack.title}</h2>
      <p>{techStack.content}</p>

      <h2>{developerFeatures.title}</h2>
      <p>{developerFeatures.content}</p>

      <h2>{scalability.title}</h2>
      <p>{scalability.content}</p>

      <h2>{callToAction.title}</h2>
      <p>{callToAction.content}</p>

      <h2>💍 Wedding Testimonials</h2>
      {wedding.length > 0 ? (
        wedding.map((t, i) => (
          <blockquote key={`wedding-${i}`}>
            <p>"{t.quote}"</p>
            <footer>— {t.name}</footer>
          </blockquote>
        ))
      ) : (
        <p>No wedding testimonials available.</p>
      )}

      <h2>🧪 Tutoring Chemistry Testimonials</h2>
      {tutoringChemistry.length > 0 ? (
        tutoringChemistry.map((t, i) => (
          <blockquote key={`tutoring-${i}`}>
            <p>"{t.quote}"</p>
            <footer>— {t.name}</footer>
          </blockquote>
        ))
      ) : (
        <p>No tutoring testimonials available.</p>
      )}
    </div>
  );
};

export default LearnMore;