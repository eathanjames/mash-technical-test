export interface Category {
    id: string;
    name: string;
    options: Option[];
}

export interface Option {
    id: string;
    value: string;
    active: boolean;
    categoryId: string;
}

export interface GameState{
    phase: 'choices' | 'spiral' | 'elimination' | 'results';
    categories: Category[];
    eliminationCount: number;
}