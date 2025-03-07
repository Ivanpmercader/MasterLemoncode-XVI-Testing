import React from "react";
import { screen, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import userEvent from '@testing-library/user-event';

const dialogProps: React.ComponentProps<typeof ConfirmationDialogComponent> = {
    isOpen: true,
    onAccept: vi.fn(),
    onClose: vi.fn(),
    title: 'Hello Dialog',
    labels: {
        closeButton: 'Cancel',
        acceptButton: 'Accept'
    },
    children: <h3>Dialog Content</h3>
}

describe('Confirm Dialog specs',()=> {
    it('should check if dialog is display and using snapshot testing', () => {
        // Arrange

        // Act
        const { asFragment } = render(<ConfirmationDialogComponent {...dialogProps}/>);

        
        const dialog = screen.getByRole('dialog');

        // Assert
        
        expect(dialog).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
    it('should check if heading dialog is equal than dialog props title', () => {
        // Arrange

        // Act
        render(<ConfirmationDialogComponent {...dialogProps}/>);
      
        const dialog = screen.getByRole('dialog');

        const heading = screen.getByRole('heading', {
            name: /hello dialog/i
        });
        // Assert
        
        expect(dialog).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
    });

    it('should check if content dialog are equal than content dialog props', () => {
        // Arrange

        // Act
        const { asFragment } = render(<ConfirmationDialogComponent {...dialogProps}/>);
      
        const dialog = screen.getByRole('dialog');

        const contentElement = screen.getByRole('heading', {
            name: /dialog content/i
        });
        // Assert
        
        expect(dialog).toBeInTheDocument();
        expect(contentElement).toBeInTheDocument();
        expect(asFragment).toMatchSnapshot();
    });
    
    it('should check if buttons dialog are equal than dialog props labels closeButton and acceptButton', () => {
        // Arrange

        // Act
        render(<ConfirmationDialogComponent {...dialogProps}/>);
      
        const dialog = screen.getByRole('dialog');

        const buttonElements = screen.getAllByRole('button');
        // Assert
        
        expect(dialog).toBeInTheDocument();
        expect(buttonElements[0].textContent).toEqual('Cancel');
        expect(buttonElements[1].textContent).toEqual('Accept');
    });

    it.each<{
        regexNameButton: { name: RegExp };
        buttonAction: () => void
      }>([
        { 
            regexNameButton: { name: /Cancel/i },
            buttonAction: dialogProps.onClose
        }, 
        { 
            regexNameButton: { name: /Accept/i },
            buttonAction: dialogProps.onAccept
        }, 
    ])(
        'should hidden if user click in accept or cancel button',
        async ({ regexNameButton, buttonAction }) => {
        // Arrange

        // Act
        const { rerender } = render(<ConfirmationDialogComponent {...dialogProps} />);
      
        const dialog = screen.getByRole('dialog');
        
        
        const buttonElement = screen.getByRole('button', regexNameButton);
        
        // Assert
        
        expect(dialog).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();

        await userEvent.click(buttonElement);
        
        expect(buttonAction).toHaveBeenCalled();
        expect(buttonAction).toHaveBeenCalledTimes(1);

        rerender(<ConfirmationDialogComponent {...dialogProps} isOpen={false} />);

        // await waitFor(() => {
        //     expect(dialog).not.toBeInTheDocument();
        // });

        await waitForElementToBeRemoved(screen.queryByRole('dialog'));
    });
});