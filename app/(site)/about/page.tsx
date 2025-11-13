import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PleaseSignIn from "@/components/auth/PleaseSignIn";
import AboutSection from "@/components/pages-component/AboutSection";
import { getServerSession } from "next-auth";
import React from "react";




const AboutPage = async () => {
  // ✅ Move getServerSession inside the component
  const session = await getServerSession(authOptions);

  console.log(session); // ✅ Now it will log in the server console (not browser)

  if (!session) {
    return <PleaseSignIn />;
  }

  return (
    <div>
      <AboutSection />
    </div>
  );
};

export default AboutPage;
