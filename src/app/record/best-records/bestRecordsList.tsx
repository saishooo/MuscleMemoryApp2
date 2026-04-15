
// src/app/record/best-records/bestRecordsList.tsx
//最高記録を描写する

//
type record  = {
    id: string;
    userId: string | null;
    exercise: {
        id: string;
        name: string;
    }
    exerciseId: string;
    maxWeight: number;
    maxReps: number;
    createdAt: Date;
    updatedAt: Date;
}