import { useEffect, useRef, useState } from 'react';
import './App.css';
import addBtn from "./assets/add-30.png";
import saved from './assets/bookmark.svg';
import gptLogo from "./assets/chatgpt.svg";
import gptImgLogo from './assets/chatgptLogo.svg';
import home from './assets/home.svg';
import msgIcon from './assets/message.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import { sendMsgToOpenAI } from './openai';


function App() {

  const msgEnd = useRef(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "Hi what can i help you with ?",
      isBot: true
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ])

    const res = await sendMsgToOpenAI(text)
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: res, isBot: true }
    ]);
  }

  const handleEnterKey = async (e) => {
    if (e.key === 'Enter') await handleSend();
  }

  return (

    <div className="App">
      <div className='sidebar'>

        <div className='upperSide'>
          <div className='upperSideTop'><img className='logo' src={gptLogo} alt='' /> <span className='brand'>MyAI</span> </div>
          <div className='newBtn'>
            <button className='midBtn' onClick={() => { window.location.reload() }}><img className='addBtn' src={addBtn} alt='' />New Chat</button>
          </div>
          <div className="upperSideBottom">
            <button className="query"><img src={msgIcon} alt="query" />OpenAI Documentation </button>
            <button className="query"><img src={msgIcon} alt="query" />DashBoard</button>
            <button className="query"><img src={msgIcon} alt="query" />My Account</button>
            <button className="query"><img src={msgIcon} alt="query" />Settings</button>
            <button className="query"><img src={msgIcon} alt="query" />About</button>

          </div>

        </div>

        <div className='lowerSide'>
          <div className="listItems"><img src={home} alt="home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="upgrade" className="listItemsImg" />Upgrade to Pro</div>
        </div>

      </div>
      <div className="main">
        <div className="chats">
          {
            messages.map((message, i) => (
              <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                <img className='chatImg' src={message.isBot ? gptImgLogo : userIcon} alt="" /><p className="txt">{message.text} </p>
              </div>
            ))
          }
          <div ref={msgEnd}></div>
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input onChange={(e) => { setInput(e.target.value) }} value={input} onKeyDown={handleEnterKey} type="text" placeholder='Send a message...' /> <button onClick={handleSend} className="send"><img className='sendBtn' src={sendBtn} alt="" /></button>
          </div>
          <p>MyAI may produce inaccurate information about people, places or facts. MyAI September 20 </p>

        </div>

      </div>



    </div>




  );
}

export default App;
