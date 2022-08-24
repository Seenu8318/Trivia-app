import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
   const[letsPlay] = useSound(play);
   const[correctAnswer] = useSound(correct);
   const[wrongAnswer] = useSound(wrong);

  const delay = (duration, callback) => {
    setTimeout(()=>{
        callback();
    }, duration);
  }

  const handleQuit = () => {
    alert("Are you sure?");
      setStop(true);  
  }
  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(2000,() => {
        setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    delay(4000,() => {
        if(a.correct){
            correctAnswer();
            delay(2000,()=>{
                setQuestionNumber((prev)=> prev+1);
                setSelectedAnswer(null);
            })
        }else{
            wrongAnswer();
            delay(1000,()=>{
                setStop(true);
            })
        }
    })
  };
  useEffect(()=>{
    letsPlay();
   },[letsPlay]);
  let count = 0;
  useEffect(() => {
    if(count===data.length-1){
      setStop(true);
    }
    setQuestion(data[questionNumber - 1]);
    count++;
  }, [data, questionNumber]);

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
      <button className="quit" onClick={handleQuit}>Quit</button>
    </div>
  );
};

export default Trivia;
