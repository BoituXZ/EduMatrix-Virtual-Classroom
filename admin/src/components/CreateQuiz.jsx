import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questions: [{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }],
  });

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz),
      });

      if (response.ok) {
        toast.success('Quiz created successfully!', {
          position: "top-right", // Use string directly here
          autoClose: 3000,
        });
        setQuiz({
          title: '',
          description: '',
          questions: [{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }],
        });
      } else {
        toast.error('Failed to create quiz. Please try again.', {
          position: "top-right", // Use string directly here
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('An error occurred while creating the quiz.', {
        position: "top-right", // Use string directly here
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex gap-20 min-h-screen bg-gray-50">
      <Sidebar/>
      <form
        onSubmit={handleSubmit}
        className="w-[70%] justify-center  flex flex-col bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Create a New Quiz</h2>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Quiz Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter quiz title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Quiz Description
          </label>
          <textarea
            id="description"
            placeholder="Enter quiz description"
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Questions Section */}
        {quiz.questions.map((q, index) => (
          <div key={index} className="p-4 bg-gray-50 border rounded-lg space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Question {index + 1}
            </label>
            <input
              type="text"
              placeholder="Enter question"
              value={q.questionText}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  questions: quiz.questions.map((q, i) =>
                    i === index ? { ...q, questionText: e.target.value } : q
                  ),
                })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              {q.options.map((option, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={option}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      questions: quiz.questions.map((q, idx) =>
                        idx === index
                          ? { ...q, options: q.options.map((o, j) => (j === i ? e.target.value : o)) }
                          : q
                      ),
                    })
                  }
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              ))}
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Question
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
