import { useState } from 'react'
import './App.css'
import { useRef , useEffect} from 'react'

function App() { 
  const [minutesInput1, setMinutesInput1] = useState('')
  const [minutesInput2, setMinutesInput2] = useState('')
  const [secondsInput1, setSecondsInput1] = useState('')
  const [secondsInput2, setSecondsInput2] = useState('')
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false)

  const ref = useRef();

  const getTotalSeconds = () =>{
    const minutes = parseInt((minutesInput1 || '0') + (minutesInput2 || '0'));
    const seconds = parseInt((secondsInput1 || '0') + (secondsInput2 || '0'));  
    return minutes*60 + seconds;
  };

  const formatTime = (totalSeconds) =>{
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60 ;
    return `${String(m).padStart(2 , '0')}:${String(s).padStart(2, '0')}`;
  }

  const startTimer = () =>{
    if(isRunning) return;

    const totalSeconds = getTotalSeconds();
    if(totalSeconds <= 0) return;
    
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  }

  const resetTimer = () => {
    clearInterval(ref.current);
    setIsRunning(false);
    setTimeLeft(0);
    setMinutesInput1('');
    setMinutesInput2('');
    setSecondsInput1('');
    setSecondsInput2('');
  };

  useEffect(() =>{
    if(isRunning){
      ref.current = setInterval(() =>{
        setTimeLeft((prev) => {if(prev <= 1)
        {
          clearInterval(ref.current);
          setIsRunning(false);
          return 0;
        }
        return prev-1;  
        });
    }, 1000)
    }
    return () => clearInterval(ref.current);
  } , [isRunning])

  return (
    <>
      <div className='main-container bg-black h-screen'>  
        <div className='flex flex-col items-center '>
            <h1 className='text-white text-[40px] font-[serif] mt-5 mb-10'>COUNTDOWN TIMER</h1>
                <div className='flex flex-col items-center space-x-4 w-80 text-white text-[18px] border-1 border-white/20 p-3 rounded-lg '>
                  <div className='mb-4 font-serif'>Set Timer:</div>
                  <div className='flex space-x-4 text-white text-[18px]'>
                  <input 
                     type="text" 
                     placeholder='M'
                     value={minutesInput1}
                     onChange={(e) => setMinutesInput1(e.target.value)}
                     className='bg-black border-b relative border-white text-white p-2 w-8'
                     maxLength={1}
                     />
                  <input 
                     type="text" 
                     placeholder='M'
                     value={minutesInput2}
                     onChange={(e) => setMinutesInput2(e.target.value)}
                     className='bg-black border-b relative border-white text-white p-2 w-8'
                     maxLength={1}
                     />
                  <div className='text-[18px] mt-2'>:</div>
                  <input 
                     type="text" 
                     placeholder='S'
                     value={secondsInput1}
                     onChange={(e) => setSecondsInput1(e.target.value)}
                     className='bg-black border-b relative border-white text-white p-2 w-8'
                     maxLength={1}
                     />
                  <input 
                     type="text" 
                     placeholder='S'
                     value={secondsInput2}
                     onChange={(e) => setSecondsInput2(e.target.value)}
                     className='bg-black border-b relative border-white text-white p-2 w-8'
                     maxLength={1}
                     />
                </div>   
                <div>
                  <button className='h-8 w-12 mt-10 cursor-pointer shadow-lg font-[oswald] bg-white/40 rounded-xl hover:bg-white/20 hover:text-white text-[10px] mb-3 '
                    onClick={startTimer}
                  >
                    START
                  </button>
                </div>
                </div>
                <div className='display flex flex-col items-center justify-center mt-10 '>
                   <div className='text-white text-[130px] font-[oswald] '>
                       {formatTime(timeLeft)}
                   </div>
                    <button
                      onClick={resetTimer}
                      className='h-10 w-20 mt-5 cursor-pointer shadow-lg font-[oswald] bg-white/40 rounded-xl hover:bg-white/20 hover:text-white'
                    >
                    RESET
                  </button>
                </div> 
        </div>
      </div>
    </>
  )
}

export default App
