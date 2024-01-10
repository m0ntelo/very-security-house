export interface Door {
    cols: number;
    rows: number;
    text?: string;
    color?: string;
    open: boolean;
    blocked: boolean;
    id: number;
    main: boolean;
}