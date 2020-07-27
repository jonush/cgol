import React from 'react';

const About = () => {
    return (
        <div className='about'>
            <p><a target='_blank' href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Conway's Game of Life</a> is a zero-player game that simulates life-cycles using cellular automaton. The game is played on a grid of any size, which is populated by cells. The game allows for interaction during the initial setup and will then run on its own until all life-cycles are completed. The Game of Life is <a target='_blank' href='https://stackoverflow.com/questions/7284/what-is-turing-complete'>Turing Complete</a></p>

            <div>
                <p>There are four main rules to Conway's Game of Life:</p>

                <ol>
                    <li>Any living cell with less than two neighbors will die.</li>
                    <li>Any living cell with two or three neighbors will live.</li>
                    <li>Any living cell with more than three neighbors will die.</li>
                    <li>Any dead cell with exactly three neighbors will revive.</li>
                </ol>
            </div>
        </div>
    )
}

export default About;