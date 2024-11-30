import Banner2 from "../components/Banner2/Banner2";
import { useUser } from "../components/contexts/UserContext";
import FAQ from "../components/FAQ/FAQ";
import "./Home2.css";

import { useNavigate } from 'react-router-dom';


export default function Home() {

    const navigate = useNavigate();
    const { user } = useUser()

    const handleLoginCLick = () => {
        if (user) {
            navigate('/sports');
        }
        else {
            navigate('/auth?form=login')
        }
    }   
    
    return (
        <>
            <div className="greeter">
                <Banner2>
                        <button onClick = {handleLoginCLick}>  Log in</button>
                </Banner2>
                <main className="main-background">
                    <div className="main-header"> Custom Sports Newsletter</div>
                    <div className="main-subheader"> 
                        <span>Your teams. </span>
                        <span>Your updates. </span> 
                        <span>Your game day connection. </span>
                    </div>
                    <div className="feature-list">
                        <span className="feature-item">
                            <span>🏈 Personalized Updates:</span> Track your favorite NFL and NBA teams.
                        </span>
                        <span className="feature-item">
                            <span>📬 Weekly Emails:</span> Timely updates on game results and highlights.
                        </span>
                        <span className="feature-item">
                            <span>🎯 Focus on What Matters:</span> Receive only the news you care about.
                        </span>
                    </div>
                    <button onClick = {() => navigate('/auth?form=signup')} className="signup-button"> Sign up today! </button>
                </main>
            </div>

            <div className="extras">
                <div className="section-title">About Us</div>
                <div className="section-content">
                    As sports fans ourselves, we wanted to create a way to easily stay updated on our favorite teams without searching through endless highlights. 
                    Our newsletter is designed with fans in mind, giving you the updates you want when you want them.
                </div>
                
                <div className="section-title">Our Reviews</div>
                <div className="reviews">
                    <div className="review-item">
                        <blockquote>
                            <p>"I love how I can track my favorite teams in one place! The weekly updates are a game-changer."</p>
                            <footer>– Andy C.</footer>
                        </blockquote>
                    </div>
                    <div className="review-item">
                        <blockquote>
                            <p>"The newsletter is really awesome. I think the people who made this website are awesome too."</p>
                            <footer>– Andrew L.</footer>
                        </blockquote>
                    </div>
                </div>
                
                <FAQ></FAQ>
                
            </div>

        </>
    );
}
  