import React from "react";
import fbase from "./firebase";

const Home = () => {
    return (
        <section className="containers">
            Home
            <button onClick={() => fbase.auth().signOut()}>sign out</button>
        </section>
    )
}

export default Home;
