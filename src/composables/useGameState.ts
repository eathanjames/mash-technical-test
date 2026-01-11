import type { GameState } from  "../types/game";
import {computed, ref} from "vue";

export function useGameState() {
    const gameState = ref<GameState>({
        phase: 'choices',
        categories: [],
        eliminationCount: 0
    });


    function initialiseMashGame() {
        gameState.value.phase = 'choices';
        gameState.value.eliminationCount = 0;

        gameState.value.categories = [
            {
                id: 'home',
                name: 'Home',
                options: [
                    {id: 'home1', value: 'Mansion', active: true, categoryId: 'home'},
                    {id: 'home2', value: 'Apartment', active: true, categoryId: 'home'},
                    {id: 'home3', value: 'Shack', active: true, categoryId: 'home'},
                    {id: 'home4', value: 'House', active: true, categoryId: 'home'},
                ]
            },
            {
                id: 'partner',
                name: 'Partner',
                options: []
            },
            {
                id: 'car',
                name: 'Car',
                options: []
            },
            {
                id: 'kids',
                name: 'Number of Kids',
                options: []
            },
            {
                id: 'job',
                name: 'Job',
                options: []
            },
            {
                id: 'salary',
                name: 'Salary',
                options: []
            }];
    }


    function updateCategory(categoryId: string, optionValues: string[]) {
        const category = gameState.value.categories.find(c => c.id === categoryId);
        if (category) {
            category.options = optionValues.map((value, index) => ({
                id: `${categoryId}-${index}`,
                value,
                active: true,
                categoryId
            }));
        }
    }

    function startSpiralPhase() {
        gameState.value.phase = 'spiral';
    }

    function startEliminationPhase(number: number = 5) {
        //Want to ensure the number is whole and manageable for the game.
        const validNumber = Math.max(3, Math.min(15, Math.floor(number)));

        gameState.value.phase = 'elimination';
        gameState.value.eliminationCount = validNumber;
    }

    function startResultsPhase() {
        gameState.value.phase = 'results';
    }

    function resetGameState() {
        initialiseMashGame();
    }

    const isSetupPhaseComplete = computed(() => {
        //Check every category has at least 4 options
        return gameState.value.categories.every(category => category.options.length >= 4);
        }
    )

    return {
        gameState,
        initialiseMashGame,
        updateCategory,
        startSpiralPhase,
        startEliminationPhase,
        startResultsPhase,
        resetGameState,
        isSetupPhaseComplete
    };

}

