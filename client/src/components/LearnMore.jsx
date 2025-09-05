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