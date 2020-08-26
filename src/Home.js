import React from "react";
import TodoList from "./components/TodoList";
import Sidebar from "./components/Sidebar";
import "./Home.css";

const Home = () => {
    return (
        <section className="container">
            <Sidebar/>
            <TodoList/>
        </section>
    )
}

export default Home;
