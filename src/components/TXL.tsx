import React from 'react';
import './Txl.css'

const scroll = ()=>{
    console.log('scroll123')
}


const Txl: React.FC = () => {
    return <div id="scrollDiv" onScroll={scroll}>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        </div>
};

export default Txl;