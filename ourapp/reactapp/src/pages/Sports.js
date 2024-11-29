import Banner2 from "../components/Banner2/Banner2";
import { useUser } from "../components/contexts/UserContext";
import SportCard2 from "../components/SportCard2/SportCard2";

export default function Sports() {

    const {user} = useUser();

    return (
        <>
            <Banner2>
                <button> View Profile</button>
                <button> Sign out </button>
            </Banner2>
            <main>
                <h2>Welcome back, <span>{user.name}</span> </h2>
                <SportCard2></SportCard2>
            </main>
        </>
    )
}