import React, { useState } from 'react';
import _ from 'lodash';

const ROTC = () => {
  const [inputs, setInputs] = useState({
    role: '',
    objectives: '',
    task: '',
    contexts: ''
  });
  
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePrompt = () => {
    const cleanedInputs = _.mapValues(inputs, str => 
      str.trim().replace(/\s+/g, ' ')
    );
  
    // 역할에 전문성 추가
    const enhancedRole = cleanedInputs.role.includes('유능한') || cleanedInputs.role.includes('시니어') 
      ? cleanedInputs.role 
      : `유능한 시니어 ${cleanedInputs.role}`;
  
    // 맥락을 구조화
    const contextFormatted = `<context>\n${cleanedInputs.contexts}\n</context>`;
  
    // 마크다운 형식의 프롬프트 생성
    const prompt = `# ${enhancedRole}
  
  너는 ${enhancedRole}야. ${cleanedInputs.objectives} 이를 위해 ${cleanedInputs.task}
  
  ${contextFormatted}
  
  위 내용을 바탕으로 전문성 있게 답변해줘.
  
  <userStyle>Normal</userStyle>`;
  
    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('복사되었습니다!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">ROTC 프롬프트 생성기</h1>
        
        <div className="space-y-4">
          {[
            { key: 'role', label: '역할', placeholder: '예: AI 비서, 마케터, 데이터 분석가' },
            { key: 'objectives', label: '목표', placeholder: '예: 내가 가르치는 학생의 학습 효과를 향상하고 싶어.' },
            { key: 'task', label: '작업', placeholder: '예: 성적을 기반으로 개인화된 학습 계획을 수립해줘.' },
            { key: 'contexts', label: '맥락', placeholder: '예: 나는 해외에서 학교를 다녔고 학생은 한국에서만 학교를 다녔어.' }
          ].map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-2">
              <label className="block font-medium text-gray-700">
                {label}
              </label>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="3"
                value={inputs[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={generatePrompt}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            프롬프트 생성하기
          </button>
        </div>

        {generatedPrompt && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">생성된 프롬프트:</h3>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                복사하기
              </button>
            </div>
            <pre className="whitespace-pre-wrap bg-white p-3 rounded border">
              {generatedPrompt}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROTC;