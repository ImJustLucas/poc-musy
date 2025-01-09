import MainButton from "@/components/mainButton";

const QUESTION_DURATION = 7000;

interface QCMComponentProps {
  questionNumber: number;
  currentQuestion: any;
  selectedAnswer: string | null;
  handleAnswerClick: (answer: string) => void;
}

const QCM: React.FC<QCMComponentProps> = ({
  questionNumber,
  currentQuestion,
  selectedAnswer,
  handleAnswerClick,
}) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between">
      <div className="w-full mt-8">
        {/* Barre de progression */}
        <div className="w-full h-1 bg-gray-300 mb-4 overflow-hidden">
          <div
            className="progress-bar bg-blue-500 h-full"
            style={{
              animation: `progress-linear ${QUESTION_DURATION}ms linear forwards`,
            }}
          ></div>
        </div>
        <div className="text-xl mt-16">Question {questionNumber}/10</div>
      </div>
      <div className="text-2xl text-center">{currentQuestion.question}</div>
      <div className="w-full grid grid-cols-2 gap-2 mb-8">
        {currentQuestion.answers.map((answer: string) => (
          <MainButton
            key={answer}
            text={answer}
            onClick={() => handleAnswerClick(answer)}
            type={
              selectedAnswer
                ? answer === currentQuestion.correctAnswer
                  ? "correct"
                  : answer === selectedAnswer
                  ? "wrong"
                  : undefined
                : undefined
            }
          />
        ))}
      </div>
      <style>
        {`
          @keyframes progress-linear {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default QCM;
