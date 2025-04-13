import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import TeamSection from "../component/TeamSection";


const About = () => {
    return (
        <div>
            <Navbar></Navbar>
            <section className="py-5 bg-light text-center">
      <div className="container">
        <h2 className="mb-4">About Our Blog</h2>
        <p
         className="lead text-muted"
         >
          Welcome to our blog! We share insightful articles, industry trends, and expert opinions to keep you informed and engaged. 
          Our team works tirelessly to bring you valuable content that inspires and educates.
        </p>
      </div>
    </section>
            <TeamSection></TeamSection>
            <Footer></Footer>
        </div>
    );
};

export default About;