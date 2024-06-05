import { useEffect } from 'react';
import Terminal from './terminal/';
import Quote from './quote/';
import { loadParticles } from './particles/particles';
import './app.css';

const App = () => {
    useEffect(() => {
        loadParticles()
    }, []);
    return (
        <div className="main">
            <div id="particles-js"></div>
            <div className="center">
                <Terminal />
                <Quote />
            </div>
            {/* <div className="background"></div>
            <dialog id="quote-preloaded-picker-dialog">
                <h3>Load preloaded quotes</h3>
                <div id="quote-options"></div>
                <form method="dialog"><button className="close">Close</button></form>
            </dialog>
            <div className="main">
                <div className="center">
                    <div className="terminal">
                        <input id="terminal-input" type="text" value="" list="bangs" />
                        <div id="bangs"></div>
                    </div>
                    <div className="quote">
                        <div className="text-line"><span id="text"></span></div>
                        <div className="subtext-line"><span id="subtext"></span></div>
                        <div className="nav-line" id="nav-line">
                        </div>
                    </div>
                </div> */}
                {/* <!--div className="box">
                <p className="title">todolist</p>
                <div className="todolist" id="todolist"></div>
                <input id="todolist-new" type="text" className="todolist-new" />
            </div--> */}
        </div >
    );
}

export default App;