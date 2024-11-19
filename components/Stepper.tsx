import React from 'react';
import { Steps } from 'primereact/steps';

interface StepperProps {
    currentStep: number;
    completedSteps: boolean[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, completedSteps }) => {
    // Remove internal activeIndex state and rely on currentStep from props
    const itemRenderer = (item: any, itemIndex: any) => {
        const isActiveItem = currentStep - 1 === itemIndex; // Determine if the step is the current one
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            <span
                className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
                style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px' }}
            >
                <i className={`${item.icon} text-xl`} />
            </span>
        );
    };

    const items = [
        {
            icon: 'pi pi-user',
            template: (item: any) => itemRenderer(item, 0)
        },
        {
            icon: 'pi pi-calendar',
            template: (item: any) => itemRenderer(item, 1)
        },
        {
            icon: 'pi pi-check',
            template: (item: any) => itemRenderer(item, 2)
        }
    ];

    return (
        <div className="card">
            <Steps model={items} activeIndex={currentStep - 1} readOnly={false} className="m-2 pt-4" />
        </div>
    );
};

export default Stepper;
