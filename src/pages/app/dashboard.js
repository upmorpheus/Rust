import firebase from 'gatsby-plugin-firebase';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import CreateResume from '../../components/dashboard/CreateResume';
import ResumePreview from '../../components/dashboard/ResumePreview';
import TopNavbar from '../../components/dashboard/TopNavbar';
import LoadingScreen from '../../components/router/LoadingScreen';

const Dashboard = ({ user }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = `users/${user.uid}/resumes`;

    firebase
      .database()
      .ref(ref)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const resumesArr = [];
          const data = snapshot.val();
          Object.keys(data).forEach((key) => resumesArr.push(data[key]));
          setResumes(resumesArr);
        }

        setLoading(false);
      });

    firebase
      .database()
      .ref(ref)
      .on('child_removed', (snapshot) => {
        if (snapshot.val()) {
          setResumes(resumes.filter((x) => x.id === snapshot.val().id));
        }
      });

    return () => {
      firebase.database().ref(ref).off();
    };
  }, [user]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard | Reactive Resume</title>
        <link rel="canonical" href="https://rxresu.me/app/dashboard" />
      </Helmet>

      <TopNavbar />

      <div className="container mt-12">
        <div className="grid grid-cols-6 gap-8">
          <CreateResume />

          {resumes.map((x) => (
            <ResumePreview key={x.id} resume={x} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
