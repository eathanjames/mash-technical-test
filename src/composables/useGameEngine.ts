import type { Category, Option } from "../types/game";

export function useGameEngine() {

    function calculateEliminations(
        categories: Category[],
        eliminationNumber: number
    ): string[] {

        //Returned data
        const eliminatedOptionIds: string[] = [];

        //Flatten data to make looping easier
        const flattenedOptions: Option[] = categories.flatMap(c => c.options);

        //Track active options by category
        const activeByCategory = new Map<string, number>();
        for (const category of categories) {
            const count = category.options.filter(o => o.active).length;
            activeByCategory.set(category.id, count);
        }

        //Safeguard to make sure the loop won't go forever or exit out if we've been supplied bad data.
        let activeCount = flattenedOptions.filter(o => o.active).length;
        const minActiveCount = categories.length;
        const maxEliminations = activeCount - minActiveCount;
        if (maxEliminations <= 0) {
            return eliminatedOptionIds;
        }

        let currentIndex = 0;

        //Eliminations should loop until we hit the max possible Eliminations or isComplete returns true.
        for (let eliminations = 0;
             eliminations < maxEliminations && !isComplete(categories);
             eliminations++) {

            let stepsRemaining = eliminationNumber;

            while (stepsRemaining > 0) {
                const opt = flattenedOptions[currentIndex];

                //Taking a valid step through the list (Option is active and in a category with more than 1 active option)
                if (opt?.active && (activeByCategory.get(opt.categoryId) ?? 0) > 1) {
                    stepsRemaining--;
                }

                //Modulus operator used to wrap around the list
                if (stepsRemaining > 0) {
                    currentIndex = (currentIndex + 1) % flattenedOptions.length;
                }
            }

            //This is the candidate to make inactive.
            let candidate = flattenedOptions[currentIndex];

            //Double-check the candidate is valid.
            while (
                (!candidate?.active) ||
                (activeByCategory.get(candidate.categoryId) ?? 0) <= 1
                ) {
                currentIndex = (currentIndex + 1) % flattenedOptions.length;
                candidate = flattenedOptions[currentIndex];
            }

            //If the candidate is valid, then make it inactive.
            candidate.active = false;
            eliminatedOptionIds.push(candidate.id);
            activeCount--;

            //Decrease the active count for the category that the candidate was in.
            //Maybe extract this into a separate function.
            const catId = candidate.categoryId;
            const catCount = activeByCategory.get(catId)!;
            activeByCategory.set(catId, catCount - 1);

            //If we've hit the end of the game, we should break out of the loop.
            if (activeCount <= minActiveCount || isComplete(categories)) {
                break;
            }

            currentIndex = (currentIndex + 1) % flattenedOptions.length;
        }

        return eliminatedOptionIds;
    }

    function isComplete(categories: Category[]): boolean
    {
        return categories.every(category => category.options.filter(option => option.active).length === 1);
    }

    function getFinalSelections(categories: Category[]): Map<string, Option>
    {
        const selections = new Map<string, Option>();

        //Get the active option for each category, could add a validation step here to ensure there is only one active option
        categories.forEach(category => {
            const activeOption = category.options.find(option => option.active);
            if (activeOption) {
                selections.set(category.id, activeOption);
            }
        })

        return selections;
    }

    return {
        calculateEliminations,
        getFinalSelections
    };
}