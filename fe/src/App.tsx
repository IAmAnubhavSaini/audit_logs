import React, {useEffect, useState} from 'react';
import './App.css';
import ReactJson from "react-json-view";

function App() {

    const [logs, setLogs] = useState([]);
    useEffect(() => {
        fetch("http://localhost:10081/logs").then(res => res.json()).then(data => setLogs(data)).catch(e => console.error(e));
    }, []);

    return (<div className="App">
        <ReactJson src={logs}/>
    </div>);
}

export default App;
