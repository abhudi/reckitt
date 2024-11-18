import React, { useState } from 'react';
import { Button } from 'primereact/button';

const Stepper = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { number: 1, label: 'Supplier Details' },
        { number: 2, label: 'Manufacture Details' },
        { number: 3, label: 'Compliance Requirement' }
    ];

    const handleNext = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    return (
        <div className="flex flex-col items-center">
            {/* Stepper Container */}
            <div className="flex items-center justify-center mb-6">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                        {/* Circle with Step Number */}
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.number ? 'bg-pink-500 text-white border-pink-500' : 'bg-transparent text-gray-400 border-gray-300'}`}>
                            <span className="font-bold">{step.number}</span>
                        </div>

                        {/* Step Label */}
                        <span className={`ml-3 ${currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</span>

                        {/* Line Separator */}
                        {index < steps.length - 1 && <div className={`w-20 h-px mx-4 ${currentStep > step.number ? 'bg-pink-500' : 'bg-gray-200'}`}></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stepper;
