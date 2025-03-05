import { act, renderHook } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook'
import { createEmptyLookup, Lookup } from '#common/models';


describe('useConfirmationDialog specs', () => {
    it('should return an object: isOpen equal false, itemToDelete with default values and onAccept, onClose and onOpenDialog functions', () => {
        // Arrange
        const emptyItemToDelete: Lookup = createEmptyLookup();

        // Act
        const { result } = renderHook(() => useConfirmationDialog());

        // Assert

        expect(result.current.isOpen).toBeFalsy();
        expect(result.current.itemToDelete).toEqual(emptyItemToDelete);
        expect(result.current.onAccept).toEqual(expect.any(Function));
        expect(result.current.onClose).toEqual(expect.any(Function));
        expect(result.current.onOpenDialog).toEqual(expect.any(Function));
    });
    it('should modify the values: onOpenDialog will set itemToDelete with the test data and isOpen with true value', () => {
        // Arrange
        const itemToDelete: Lookup = {
            id: `1`,
            name: 'James'
        };

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        
        act(()=> {
            result.current.onOpenDialog(itemToDelete);
        });

        // Assert
        expect(result.current.isOpen).toBeTruthy();
        expect(result.current.itemToDelete).toStrictEqual(itemToDelete);
    });
    it('should set isOpen to false when the onClose method is executed', () => {
        // Arrange
        const itemToDelete: Lookup = {
            id: `1`,
            name: 'James'
        };

        const emptyItemToDelete: Lookup = createEmptyLookup();

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        
        act(()=> {
            result.current.onOpenDialog(itemToDelete);
            result.current.onClose();
        });

        // Assert
        expect(result.current.isOpen).toBeFalsy();
        expect(result.current.itemToDelete).toEqual(emptyItemToDelete);
    });
    it('should set itemToDelete to empty when the onAccept method is executed', () => {
        // Arrange
        const itemToDelete: Lookup = {
            id: `1`,
            name: 'James'
        };

        const emptyItemToDelete: Lookup = createEmptyLookup();

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        
        act(()=> {
            result.current.onOpenDialog(itemToDelete);
            result.current.onAccept();
        });

        // Assert
        expect(result.current.isOpen).toBeTruthy();
        expect(result.current.itemToDelete).toStrictEqual(emptyItemToDelete);
    });
    //Tests used to check the hook. Once verified, the hook is modified to correct the cases

    /*it('should set itemToDelete to null when onOpenDialog is execute', () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        
        act(()=> {
            result.current.onOpenDialog(null);
        });

        // Assert
        expect(result.current.itemToDelete).toBeNull();
    });
    it('should set itemToDelete to undefined when onOpenDialog is execute', () => {
        // Arrange
        
        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        
        act(()=> {
            result.current.onOpenDialog(undefined);
        });

        // Assert
        expect(result.current.itemToDelete).toBeUndefined();
    });*/
    it.each<{
        item: null | undefined;
      }>([{ item: undefined }, { item: null }])(
        'should return empty itemToDelete when item selected to onOpenDialog is undefined or null',
        ({ item }) => {
        // Arrange
        const emptyItemToDelete: Lookup = createEmptyLookup();

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        
        act(()=> {
            result.current.onOpenDialog(undefined);
        });

        // Assert
        expect(result.current.itemToDelete).toStrictEqual(emptyItemToDelete);
    });

});